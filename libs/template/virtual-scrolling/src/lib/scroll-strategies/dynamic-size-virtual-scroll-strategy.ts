import {
  Directive,
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
  MonoTypeOperatorFunction,
  Observable,
  ReplaySubject,
  Subject,
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
  RxVirtualScrollStrategy,
  RxVirtualScrollViewport,
  RxVirtualViewRepeater,
} from '../model';
import {
  calculateVisibleContainerSize,
  parseScrollTopBoundaries,
  toBoolean,
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
   * Function returning the size of an item
   */
  @Input('dynamic')
  set itemSize(fn: (item: T) => number) {
    if (fn) {
      this._itemSizeFn = fn;
    }
  }
  get itemSize() {
    return this._itemSizeFn;
  }
  private _itemSizeFn: (item: T) => number = defaultItemSize;

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
    /*
     * `waitForScroll` blocks rendering until the scroll event arrives. That
     * event only fires if the position can actually change - a target beyond
     * the scrollable bounds gets clamped by the browser. Deciding on the raw
     * target would latch `isStable` to false forever when the clamped position
     * equals the current one (e.g. compensating a removed transient row while
     * already scrolled to the very top).
     */
    const clampedTarget = Math.min(
      Math.max(scrollTo, 0),
      Math.max(0, this.contentSize - this.containerSize),
    );
    this.waitForScroll =
      clampedTarget !== this.scrollTop && this.contentSize > this.containerSize;
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

    let previousIds: unknown[] = [];
    let previousSizes: number[] = [];
    /*
     * when keepScrolledIndexOnPrepend is active, we need to listen to data changes
     * and figure out where the anchored item ended up
     */
    valueArray$
      .pipe(
        // TODO: this might cause issues when turning on/off at runtime
        filter(() => this.keepScrolledIndexOnPrepend),
        this.until$(),
      )
      .subscribe((valueArray) => {
        const trackBy = this.viewRepeater!._trackBy;
        const anchorIndex = this.anchorItem.index;
        const oldIds = previousIds;
        const oldSizes = previousSizes;
        const hadData = oldIds.length > 0;
        const ids = valueArray.map((v, i) => trackBy(i, v));
        previousIds = ids;
        previousSizes = valueArray.map((v) => this.itemSize(v));
        let anchorLookupIndex = anchorIndex;
        let anchorId = oldIds[anchorLookupIndex];
        if (!hadData || anchorId === undefined) {
          return;
        }
        /*
         * Instead of counting insertions, locate the anchored item again. That
         * nets out inserts, removals and moves ahead of the anchor in one go - a
         * transient row (e.g. a "loading older messages" item that gets replaced
         * by the batch) is both an insert and a remove and would otherwise leave
         * the list shifted by its height.
         */
        let newAnchorIndex = ids.indexOf(anchorId);
        let oldAnchorTop = this.anchorScrollTop - this.anchorItem.offset;
        /*
         * The anchored item itself got removed - e.g. a transient loading row
         * the anchor was sitting on. The nearest following survivor visually
         * takes its place and becomes the anchor. Without this fallback the
         * compensation silently bails, which pins the viewport to the top and,
         * in a reverse infinite scroller, retriggers loading forever.
         */
        while (newAnchorIndex === -1 && anchorLookupIndex + 1 < oldIds.length) {
          oldAnchorTop += oldSizes[anchorLookupIndex] ?? 0;
          anchorLookupIndex++;
          anchorId = oldIds[anchorLookupIndex];
          newAnchorIndex = anchorId !== undefined ? ids.indexOf(anchorId) : -1;
        }
        // nothing below the anchor survived, there is nothing to keep in place
        if (newAnchorIndex === -1) {
          return;
        }
        // _virtualItems has already been rebuilt with the new sizes above
        let newAnchorTop = 0;
        for (let i = 0; i < newAnchorIndex; i++) {
          newAnchorTop += this._virtualItems[i].size;
        }
        const delta = newAnchorTop - oldAnchorTop;
        if (delta === 0) {
          return;
        }
        /*
         * Shift by the height the change introduced instead of scrolling to the
         * top of the new anchor index - the latter drops the anchor's sub-item
         * offset, which is the jump reported in #1857.
         *
         * The anchor itself is deliberately left alone: `calcRenderedRange` is
         * its single writer and advances it by `scrollTop - anchorScrollTop`,
         * which lands back on the same item. Writing the anchor here as well
         * would race the positioning pass, which lays views out relative to it,
         * and desyncs the layout.
         */
        this.scrollTo(
          this.viewport!.getScrollTop() - this.viewportOffset + delta,
        );
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
