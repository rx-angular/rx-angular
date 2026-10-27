import {
  Directive,
  EmbeddedViewRef,
  inject,
  Input,
  NgIterable,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { coalesceWith } from '@rx-angular/cdk/coalescing';
import {
  combineLatest,
  merge,
  MonoTypeOperatorFunction,
  Observable,
  ReplaySubject,
  Subject,
  Subscription,
} from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import {
  ListRange,
  RxVirtualForViewContext,
  RxVirtualScrollStrategy,
  RxVirtualScrollViewport,
  RxVirtualViewRepeater,
} from '../model';
import {
  afterNextLayout,
  calculateVisibleContainerSize,
  parseScrollTopBoundaries,
  rangesEqual,
  toBoolean,
  unpatchedAnimationFrameTick,
  unpatchedMicroTask,
} from '../util';
import {
  DEFAULT_ITEM_SIZE,
  DEFAULT_RUNWAY_ITEMS,
  DEFAULT_RUNWAY_ITEMS_OPPOSITE,
  RX_VIRTUAL_SCROLL_DEFAULT_OPTIONS,
} from '../virtual-scroll.config';

/** @internal */
type VirtualViewItem = {
  size: number;
};

/** @internal */
type AnchorItem = {
  index: number;
  offset: number;
};

const defaultItemSize = () => DEFAULT_ITEM_SIZE;

/**
 * @Directive DynamicSizeVirtualScrollStrategy
 *
 * @description
 *
 * The `DynamicSizeVirtualScrollStrategy` is very similar to the `AutosizeVirtualScrollStrategy`.
 * It positions items based on a function determining its size.
 *
 * @docsCategory RxVirtualFor
 * @docsPage RxVirtualFor
 * @publicApi
 */
@Directive({
  selector: 'rx-virtual-scroll-viewport[dynamic]',
  providers: [
    {
      provide: RxVirtualScrollStrategy,
      useExisting: DynamicSizeVirtualScrollStrategy,
    },
  ],
  standalone: true,
})
export class DynamicSizeVirtualScrollStrategy<
  T,
  U extends NgIterable<T> = NgIterable<T>,
>
  extends RxVirtualScrollStrategy<T, U>
  implements OnChanges, OnDestroy
{
  private readonly defaults? = inject(RX_VIRTUAL_SCROLL_DEFAULT_OPTIONS, {
    optional: true,
  });

  /**
   * @description
   * The amount of items to render upfront in scroll direction
   */
  @Input() runwayItems = this.defaults?.runwayItems ?? DEFAULT_RUNWAY_ITEMS;

  /**
   * @description
   * The amount of items to render upfront in reverse scroll direction
   */
  @Input() runwayItemsOpposite =
    this.defaults?.runwayItemsOpposite ?? DEFAULT_RUNWAY_ITEMS_OPPOSITE;

  /**
   * @description
   * When enabled, the scroll strategy stops removing views from the viewport,
   * instead it only adds views. This setting can be changed on the fly. Views will be added in both directions
   * according to the user interactions.
   */
  @Input({ transform: toBoolean }) appendOnly = false;

  /**
   * @description
   * If this flag is true, the virtual scroll strategy maintains the scrolled item when new data
   * is prepended to the list. This is very useful when implementing a reversed infinite scroller, that prepends
   * data instead of appending it
   */
  @Input({ transform: toBoolean }) keepScrolledIndexOnPrepend = false;

  /**
   * @description
   * Function returning the size of an item.
   *
   * Assigning a new function reference forces the strategy to re-run it for
   * every item and to re-layout the list. This is the way to inform the
   * strategy about changes which affect the size of items, but are not caused
   * by a change of the data itself.
   */
  @Input('dynamic')
  set itemSize(fn: (item: T) => number) {
    if (fn && fn !== this._itemSizeFn) {
      this._itemSizeFn = fn;
      this._itemSizeFnChanged = true;
    }
  }
  get itemSize() {
    return this._itemSizeFn;
  }
  private _itemSizeFn: (item: T) => number = defaultItemSize;
  /** @internal */
  private _itemSizeFnChanged = false;
  /** @internal */
  private scrollTopAlignment?: Subscription;
  /** @internal */
  private alignedContentSize = 0;
  /** @internal */
  private renderingInFlight = false;

  /** @internal */
  private waitForScroll = false;

  /** @internal */
  private isStable$ = new ReplaySubject<boolean>(1);

  /** @internal */
  override get isStable(): Observable<boolean> {
    return this.isStable$.pipe(filter((w) => w));
  }

  /** @internal */
  private viewport: RxVirtualScrollViewport | null = null;
  /** @internal */
  private viewRepeater: RxVirtualViewRepeater<T, U> | null = null;

  /** @internal */
  private readonly _contentSize$ = new ReplaySubject<number>(1);
  /** @internal */
  readonly contentSize$ = this._contentSize$.asObservable();

  /** @internal */
  private _contentSize = 0;
  /** @internal */
  private set contentSize(size: number) {
    this._contentSize = size;
    this._contentSize$.next(size);
  }

  private get contentSize(): number {
    return this._contentSize;
  }

  /** @internal */
  private readonly _renderedRange$ = new ReplaySubject<ListRange>(1);
  /** @internal */
  readonly renderedRange$ = this._renderedRange$.asObservable();
  /** @internal */
  private _renderedRange: ListRange = { start: 0, end: 0 };
  // range of items where size is known and doesn't need to be re-calculated

  /** @internal */
  private set renderedRange(range: ListRange) {
    this._renderedRange = range;
    this._renderedRange$.next(range);
  }
  /** @internal */
  private get renderedRange(): ListRange {
    return this._renderedRange;
  }
  /** @internal */
  private readonly _visibleRange$ = new ReplaySubject<ListRange>(1);
  /** @internal */
  override get visibleRange$(): Observable<ListRange> {
    return this._visibleRange$.pipe(distinctUntilChanged(rangesEqual));
  }
  /** @internal */
  private set visibleRange(range: ListRange) {
    this._visibleRange$.next(range);
  }
  /** @internal */
  private readonly _scrolledIndex$ = new ReplaySubject<number>(1);
  /** @internal */
  readonly scrolledIndex$ = this._scrolledIndex$.pipe(distinctUntilChanged());
  private _scrolledIndex = 0;
  /** @internal */
  private set scrolledIndex(index: number) {
    this._scrolledIndex = index;
    this._scrolledIndex$.next(index);
  }
  private get scrolledIndex() {
    return this._scrolledIndex;
  }
  /** @internal */
  private get contentLength(): number {
    return this._virtualItems.length;
  }
  /** @internal */
  private containerSize = 0;
  /** @internal */
  private _virtualItems: VirtualViewItem[] = [];
  /** @internal */
  private _values: T[] = [];
  /** @internal */
  private scrollTop = 0;
  /** @internal */
  private scrollTopWithOutOffset = 0;
  /** @internal */
  private scrollTopAfterOffset = 0;
  /** @internal */
  private viewportOffset = 0;
  /** @internal */
  private direction: 'up' | 'down' = 'down';
  /** @internal */
  private anchorScrollTop = 0;
  /** @internal */
  private anchorItem = {
    index: 0,
    offset: 0,
  };
  /** @internal */
  private lastScreenItem = {
    index: 0,
    offset: 0,
  };

  /** @internal */
  private readonly detached$ = new Subject<void>();
  /** @internal */
  private readonly recalculateRange$ = new Subject<void>();
  /** @internal */
  private until$<A>(): MonoTypeOperatorFunction<A> {
    return (o$) => o$.pipe(takeUntil(this.detached$));
  }

  /** @internal */
  ngOnChanges(changes: SimpleChanges) {
    if (
      (changes['runwayItemsOpposite'] &&
        !changes['runwayItemsOpposite'].firstChange) ||
      (changes['runwayItems'] && !changes['runwayItems'].firstChange)
    ) {
      this.recalculateRange$.next();
    }
    if (
      this._itemSizeFnChanged &&
      changes['itemSize'] &&
      !changes['itemSize'].firstChange &&
      this.viewport
    ) {
      this.recalculateSizes();
    }
    this._itemSizeFnChanged = false;
  }

  /** @internal */
  ngOnDestroy() {
    this.detach();
  }

  /** @internal */
  attach(
    viewport: RxVirtualScrollViewport,
    viewRepeater: RxVirtualViewRepeater<T, U>,
  ): void {
    this.viewport = viewport;
    this.viewRepeater = viewRepeater;
    this.maintainVirtualItems();
    this.calcRenderedRange();
    this.positionElements();
  }

  /** @internal */
  detach(): void {
    this.viewport = null;
    this.viewRepeater = null;
    this._virtualItems = [];
    this._values = [];
    this.detached$.next();
  }

  scrollToIndex(index: number, behavior?: ScrollBehavior): void {
    const _index = Math.min(Math.max(index, 0), this.contentLength - 1);
    let scrollTo = 0;
    for (let i = 0; i < _index; i++) {
      scrollTo += this._virtualItems[i].size;
    }
    this.scrollTo(scrollTo, behavior);
  }

  private scrollTo(scrollTo: number, behavior?: ScrollBehavior): void {
    this.waitForScroll =
      scrollTo !== this.scrollTop && this.contentSize > this.containerSize;
    if (this.waitForScroll) {
      this.isStable$.next(false);
    }
    this.viewport!.scrollTo(this.viewportOffset + scrollTo, behavior);
  }

  /** @internal */
  private maintainVirtualItems(): void {
    const valueArray$ = this.viewRepeater!.values$.pipe(
      map((values) =>
        Array.isArray(values)
          ? values
          : values != null
            ? Array.from(values)
            : [],
      ),
      shareReplay({ bufferSize: 1, refCount: true }),
    );

    valueArray$.pipe(this.until$()).subscribe((dataArr) => {
      this._values = dataArr;
      const dataLength = dataArr.length;
      if (!dataLength) {
        this._virtualItems = [];
        this.contentSize = 0;
        this._renderedRange = {
          start: 0,
          end: 0,
        };
        this.anchorItem = {
          index: 0,
          offset: 0,
        };
        this.recalculateRange$.next();
      } else {
        let shouldRecalculateRange = false;
        let contentSize = 0;
        for (let i = 0; i < dataArr.length; i++) {
          const oldSize = this._virtualItems[i]?.size;
          const newSize = this.itemSize(dataArr[i]);
          contentSize += newSize;
          if (oldSize === undefined || oldSize !== newSize) {
            this._virtualItems[i] = { size: newSize };
            if (
              !shouldRecalculateRange &&
              (!this.contentSize ||
                (i >= this.renderedRange.start && i < this.renderedRange.end))
            ) {
              shouldRecalculateRange = true;
            }
          }
        }
        // drop stale entries when the data shrank, otherwise `contentLength`
        // (= _virtualItems.length) desyncs from the data and the anchor math
        // positions items outside of [0, contentSize]
        if (this._virtualItems.length > dataLength) {
          this._virtualItems.length = dataLength;
          shouldRecalculateRange = true;
        }
        if (dataLength < this._renderedRange.end) {
          this.anchorItem = this.calculateAnchoredItem(
            {
              index: dataLength,
              offset: 0,
            },
            -calculateVisibleContainerSize(
              this.containerSize,
              this.scrollTopWithOutOffset,
              this.scrollTopAfterOffset,
            ),
          );
          this._renderedRange.start = Math.max(
            0,
            this.anchorItem.index - this.runwayItems,
          );
          this._renderedRange.end = dataLength;
          this.calcAnchorScrollTop();
          this.scrollTo(contentSize);
          this.scrollTop = this.anchorScrollTop;
        }
        this.contentSize = contentSize;
        if (shouldRecalculateRange) {
          this.recalculateRange$.next();
        }
      }
    });

    let valueCache: Record<any, T> = {};
    /*
     * when keepScrolledIndexOnPrepend is active, we need to listen to data changes and figure out what was appended
     * before the last scrolledToItem
     */
    valueArray$
      .pipe(
        // TODO: this might cause issues when turning on/off at runtime
        filter(() => this.keepScrolledIndexOnPrepend),
        this.until$(),
      )
      .subscribe((valueArray) => {
        const trackBy = this.viewRepeater!._trackBy;
        let scrollTo = this.scrolledIndex;
        const dataLength = valueArray.length;
        const oldDataLength = Object.keys(valueCache).length;

        if (oldDataLength > 0) {
          let i = 0;
          // check for each item from the last known scrolledIndex if it's an insert
          for (i; i <= scrollTo && i < dataLength; i++) {
            // item is not in the valueCache, so it was added
            if (!valueCache[trackBy(i, valueArray[i])]) {
              scrollTo++;
            }
          }
        }
        valueCache = {};
        valueArray.forEach((v, i) => (valueCache[trackBy(i, v)] = v));
        if (scrollTo !== this.scrolledIndex) {
          this.scrollToIndex(scrollTo);
        }
      });
  }

  /**
   * @internal
   * re-runs the itemSize function for the whole dataset and re-layouts the list
   * based on the new sizes. This is an O(n) operation.
   */
  private recalculateSizes(): void {
    const anchorIndex = this.anchorItem.index;
    const previousAnchorSize = this._virtualItems[anchorIndex]?.size;
    let contentSize = 0;
    let anchorPosition = 0;
    for (let i = 0; i < this._values.length; i++) {
      if (i === anchorIndex) {
        anchorPosition = contentSize;
      }
      const size = this.itemSize(this._values[i]);
      this._virtualItems[i] = { size };
      contentSize += size;
    }
    // keep the anchored item where the user sees it. Rendered views are
    // positioned relative to (anchorScrollTop, anchorItem), so leaving both in
    // place keeps the viewport visually stable without touching the scroll
    // position - writing it now would force a layout, every item size just
    // changed. Only the offset into the anchored item follows its new size.
    const anchorSize = this._virtualItems[anchorIndex]?.size;
    if (previousAnchorSize && anchorSize !== undefined) {
      this.anchorItem = {
        index: anchorIndex,
        offset: Math.round(
          (this.anchorItem.offset * anchorSize) / previousAnchorSize,
        ),
      };
    }
    // the content after the anchor might not fill the viewport anymore. The
    // anchored item can't stay at the top then, the end of the list is kept
    // at the bottom of the viewport instead.
    const maxScrollTop = Math.max(0, contentSize - this.containerSize);
    const anchorScrollPosition = anchorPosition + this.anchorItem.offset;
    if (anchorScrollPosition > maxScrollTop) {
      this.anchorItem = this.calculateAnchoredItem(
        this.anchorItem,
        maxScrollTop - anchorScrollPosition,
      );
      anchorPosition = maxScrollTop - this.anchorItem.offset;
    }
    // until the scroll position is aligned, the views live in the anchor
    // relative coordinate system. If the content above the anchor shrank, it
    // ends further down than the new content size. The runway has to cover it,
    // otherwise the browser clamps the scroll position and the anchor is lost.
    const drift =
      anchorPosition + this.anchorItem.offset - this.anchorScrollTop;
    this.alignedContentSize = contentSize;
    this.contentSize = contentSize + Math.max(0, -drift);
    // the rendered range can stay the same, in which case the viewRepeater
    // won't render (and therefore position) anything. position what's there
    this.positionRenderedViews();
    this.recalculateRange$.next();
    this.alignScrollTopWithAnchor();
  }

  /**
   * @internal
   * After `recalculateSizes` the views are positioned relative to the anchor,
   * which differs from their absolute position by the size change above the
   * anchor. This moves the scroll position and the views by that difference
   * at once, so nothing visibly moves, but `scrollToIndex` & co. operate on
   * absolute positions again.
   * It runs right after the layout of the next frame, before paint: the layout
   * is clean at that point, so writing the scroll position doesn't force a
   * synchronous layout. A running render positions its views in the current
   * coordinate system, so the alignment waits for it to finish.
   * The runway is shrunk to its final size in the following frame, so the
   * layout for it happens in that frame's regular rendering steps.
   */
  private alignScrollTopWithAnchor(): void {
    this.scrollTopAlignment?.unsubscribe();
    this.scrollTopAlignment = afterNextLayout(this.viewport!.getScrollElement())
      .pipe(this.until$())
      .subscribe(() => {
        if (this.renderingInFlight) {
          this.alignScrollTopWithAnchor();
          return;
        }
        let anchorPosition = this.anchorItem.offset;
        for (let i = 0; i < this.anchorItem.index; i++) {
          anchorPosition += this._virtualItems[i].size;
        }
        const drift = anchorPosition - this.anchorScrollTop;
        if (drift !== 0) {
          this.scrollTo(anchorPosition);
          this.anchorScrollTop = anchorPosition;
          this.scrollTop = anchorPosition;
          this.scrollTopWithOutOffset += drift;
          this.scrollTopAfterOffset += drift;
          this.positionRenderedViews();
        }
        if (this.contentSize !== this.alignedContentSize) {
          this.scrollTopAlignment = unpatchedAnimationFrameTick()
            .pipe(this.until$())
            .subscribe(() => (this.contentSize = this.alignedContentSize));
        }
      });
  }

  /** @internal */
  private calcRenderedRange(): void {
    combineLatest([
      this.viewport!.containerRect$.pipe(
        map(({ height }) => {
          this.containerSize = height;
          return height;
        }),
        distinctUntilChanged(),
      ),
      this.viewport!.elementScrolled$.pipe(
        startWith(void 0),
        tap(() => {
          this.viewportOffset = this.viewport!.measureOffset();
          const { scrollTop, scrollTopWithOutOffset, scrollTopAfterOffset } =
            parseScrollTopBoundaries(
              this.viewport!.getScrollTop(),
              this.viewportOffset,
              this._contentSize,
              this.containerSize,
            );
          this.direction =
            scrollTopWithOutOffset > this.scrollTopWithOutOffset
              ? 'down'
              : 'up';
          this.scrollTopWithOutOffset = scrollTopWithOutOffset;
          this.scrollTopAfterOffset = scrollTopAfterOffset;
          this.scrollTop = scrollTop;
          this.waitForScroll = false;
        }),
      ),
      this._contentSize$.pipe(distinctUntilChanged()),
      this.recalculateRange$.pipe(startWith(void 0)),
    ])
      .pipe(
        // make sure to not over calculate things by coalescing all triggers to the next microtask
        coalesceWith(unpatchedMicroTask()),
        map(() => {
          const range = { start: 0, end: 0 };
          const length = this.contentLength;
          const delta = this.scrollTop - this.anchorScrollTop;
          if (this.scrollTop == 0) {
            this.anchorItem = { index: 0, offset: 0 };
          } else {
            this.anchorItem = this.calculateAnchoredItem(
              this.anchorItem,
              delta,
            );
          }
          this.scrolledIndex = this.anchorItem.index;
          this.anchorScrollTop = this.scrollTop;
          this.lastScreenItem = this.calculateAnchoredItem(
            this.anchorItem,
            calculateVisibleContainerSize(
              this.containerSize,
              this.scrollTopWithOutOffset,
              this.scrollTopAfterOffset,
            ),
          );
          this.visibleRange = {
            start: this.anchorItem.index,
            // `lastScreenItem.offset` is the distance between the top of the
            // item and the bottom edge of the viewport. it is `> 0` when the
            // item intersects the viewport and exactly `0` when the item starts
            // at the bottom edge, in which case it is not visible at all.
            end: Math.min(
              length,
              this.lastScreenItem.index +
                (this.lastScreenItem.offset > 0 ? 1 : 0),
            ),
          };
          if (this.direction === 'up') {
            range.start = Math.max(0, this.anchorItem.index - this.runwayItems);
            range.end = Math.min(
              length,
              this.lastScreenItem.index + this.runwayItemsOpposite,
            );
          } else {
            range.start = Math.max(
              0,
              this.anchorItem.index - this.runwayItemsOpposite,
            );
            range.end = Math.min(
              length,
              this.lastScreenItem.index + this.runwayItems,
            );
          }
          if (this.appendOnly) {
            range.start = Math.min(this._renderedRange.start, range.start);
            range.end = Math.max(this._renderedRange.end, range.end);
          }
          return range;
        }),
      )
      .pipe(this.until$())
      .subscribe((range: ListRange) => {
        this.renderedRange = range;
        this.isStable$.next(!this.waitForScroll);
      });
  }

  /** @internal */
  private positionElements(): void {
    merge(
      this.viewRepeater!.renderingStart$.pipe(map(() => true)),
      this.viewRepeater!.viewsRendered$.pipe(map(() => false)),
    )
      .pipe(this.until$())
      .subscribe((renderingInFlight) => {
        this.renderingInFlight = renderingInFlight;
      });
    this.viewRepeater!.renderingStart$.pipe(
      switchMap((batchedUpdates) => {
        const renderedRange = this.renderedRange;
        const adjustIndexWith = renderedRange.start;
        const initialIndex = batchedUpdates.size
          ? batchedUpdates.values().next().value + this.renderedRange.start
          : this.renderedRange.start;
        let position = this.calcInitialPosition(initialIndex);
        return this.viewRepeater!.viewRendered$.pipe(
          tap(({ view, index: viewIndex, item }) => {
            const index = viewIndex + adjustIndexWith;
            const size = this.getItemSize(index);
            this.positionElement(this.getElement(view), position);
            position += size;
            this.viewRenderCallback.next({
              index,
              view,
              item,
            });
          }),
        );
      }),
      this.until$(),
    ).subscribe();
  }

  /**
   * @internal
   * re-positions all currently rendered views without waiting for the
   * viewRepeater to re-render them
   */
  private positionRenderedViews(): void {
    const viewContainer = this.viewRepeater!.viewContainer;
    const start = this.renderedRange.start;
    let position = this.calcInitialPosition(start);
    for (let i = 0; i < viewContainer.length; i++) {
      const index = start + i;
      if (index >= this.contentLength) {
        break;
      }
      const view = <EmbeddedViewRef<RxVirtualForViewContext<T, U>>>(
        viewContainer.get(i)!
      );
      this.positionElement(this.getElement(view), position);
      position += this.getItemSize(index);
    }
  }

  /**
   * @internal
   * heavily inspired by
   *   https://github.com/GoogleChromeLabs/ui-element-samples/blob/gh-pages/infinite-scroller/scripts/infinite-scroll.js
   */
  private calculateAnchoredItem(
    initialAnchor: AnchorItem,
    delta: number,
  ): AnchorItem {
    if (delta == 0) return initialAnchor;
    delta += initialAnchor.offset;
    let i = initialAnchor.index;
    const items = this._virtualItems;
    if (delta < 0) {
      while (delta < 0 && i > 0) {
        delta += items[i - 1].size;
        i--;
      }
    } else {
      while (delta > 0 && i < items.length && items[i].size <= delta) {
        delta -= items[i].size;
        i++;
      }
    }
    return {
      index: Math.min(i, items.length),
      offset: delta,
    };
  }

  /** @internal */
  private calcInitialPosition(start: number): number {
    // Calculate position of starting node
    let pos = this.anchorScrollTop - this.anchorItem.offset;
    let i = this.anchorItem.index;
    while (i > start) {
      const itemSize = this.getItemSize(i - 1);
      pos -= itemSize;
      i--;
    }
    while (i < start) {
      const itemSize = this.getItemSize(i);
      pos += itemSize;
      i++;
    }
    return pos;
  }

  /** @internal */
  private calcAnchorScrollTop(): void {
    this.anchorScrollTop = 0;
    for (let i = 0; i < this.anchorItem.index; i++) {
      this.anchorScrollTop += this.getItemSize(i);
    }
    this.anchorScrollTop += this.anchorItem.offset;
  }

  /** @internal */
  private getItemSize(index: number): number {
    return this._virtualItems[index].size;
  }

  /** @internal */
  private positionElement(element: HTMLElement, scrollTop: number): void {
    element.style.position = 'absolute';
    element.style.transform = `translateY(${scrollTop}px)`;
  }
}
