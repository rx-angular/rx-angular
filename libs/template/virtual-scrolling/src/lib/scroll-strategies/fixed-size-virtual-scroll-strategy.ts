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
  MonoTypeOperatorFunction,
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
  RxVirtualForViewContext,
  RxVirtualScrollStrategy,
  RxVirtualScrollViewport,
  RxVirtualViewRepeater,
} from '../model';
import {
  calculateVisibleContainerSize,
  parseScrollTopBoundaries,
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

/**
 * @Directive FixedSizeVirtualScrollStrategy
 *
 * @description
 *
 * The `FixedSizeVirtualScrollStrategy` provides a very performant way of rendering
 * items of a given size. It is comparable to \@angular/cdk `FixedSizeVirtualScrollStrategy`, but
 * with a high performant layouting technique.
 *
 * @docsCategory RxVirtualFor
 * @docsPage RxVirtualFor
 * @publicApi
 */
@Directive({
  selector: 'rx-virtual-scroll-viewport[itemSize]',
  providers: [
    {
      provide: RxVirtualScrollStrategy,
      useExisting: FixedSizeVirtualScrollStrategy,
    },
  ],
  standalone: true,
})
export class FixedSizeVirtualScrollStrategy<
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
   * The size of the items in the virtually scrolled list
   */
  @Input()
  set itemSize(itemSize: number) {
    if (typeof itemSize === 'number') {
      this._itemSize = itemSize;
    }
  }
  get itemSize() {
    return this._itemSize;
  }

  private _itemSize = DEFAULT_ITEM_SIZE;

  /**
   * @description
   * When enabled, the scroll strategy stops removing views from the viewport,
   * instead it only adds views. This setting can be changed on the fly. Views will be added in both directions
   * according to the user interactions.
   */
  @Input({ transform: toBoolean }) appendOnly = false;

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
   * If this flag is true, the virtual scroll strategy maintains the scrolled item when new data
   * is prepended to the list. This is very useful when implementing a reversed infinite scroller, that prepends
   * data instead of appending it
   */
  @Input({ transform: toBoolean }) keepScrolledIndexOnPrepend = false;

  /** @internal */
  private readonly runwayStateChanged$ = new Subject<void>();

  private viewport: RxVirtualScrollViewport | null = null;
  private viewRepeater: RxVirtualViewRepeater<T, U> | null = null;

  private readonly _scrolledIndex$ = new ReplaySubject<number>(1);
  readonly scrolledIndex$ = this._scrolledIndex$.pipe(distinctUntilChanged());
  private _scrolledIndex = 0;
  private set scrolledIndex(index: number) {
    this._scrolledIndex = index;
    this._scrolledIndex$.next(index);
  }

  private get scrolledIndex(): number {
    return this._scrolledIndex;
  }

  private readonly _contentSize$ = new ReplaySubject<number>(1);
  readonly contentSize$ = this._contentSize$.asObservable();
  private _contentSize = 0;
  private set contentSize(size: number) {
    this._contentSize = size;
    this._contentSize$.next(size);
  }

  private readonly _renderedRange$ = new ReplaySubject<ListRange>(1);
  renderedRange$ = this._renderedRange$.asObservable();
  private _renderedRange: ListRange = { start: 0, end: 0 };
  private set renderedRange(range: ListRange) {
    this._renderedRange = range;
    this._renderedRange$.next(range);
  }
  private get renderedRange(): ListRange {
    return this._renderedRange;
  }

  private scrollTop = 0;
  /** @internal */
  private scrollTopWithOutOffset = 0;
  /** @internal */
  private scrollTopAfterOffset = 0;
  /** @internal */
  private viewportOffset = 0;
  /** @internal */
  private containerSize = 0;
  private direction: 'up' | 'down' = 'down';

  private readonly detached$ = new Subject<void>();

  /** @internal */
  ngOnChanges(changes: SimpleChanges) {
    if (
      (changes['runwayItemsOpposite'] &&
        !changes['runwayItemsOpposite'].firstChange) ||
      (changes['runwayItems'] && !changes['runwayItems'].firstChange)
    ) {
      this.runwayStateChanged$.next();
    }
  }

  ngOnDestroy() {
    this.detach();
  }

  attach(
    viewport: RxVirtualScrollViewport,
    viewRepeater: RxVirtualViewRepeater<T, U>,
  ): void {
    this.viewport = viewport;
    this.viewRepeater = viewRepeater;
    this.calcRenderedRange();
    this.positionElements();
  }

  detach(): void {
    this.viewport = null;
    this.viewRepeater = null;
    this.detached$.next();
  }

  private positionElements(): void {
    this.viewRepeater!.renderingStart$.pipe(
      switchMap(() => {
        return this.viewRepeater!.viewRendered$.pipe(
          tap(({ view, item }) => {
            this._setViewPosition(view, view.context.index * this.itemSize);
            this.viewRenderCallback.next({
              view,
              item,
              index: view.context.index,
            });
          }),
        );
      }),
      this.untilDetached$(),
    ).subscribe();
  }

  private calcRenderedRange(): void {
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
    /*
     * when keepScrolledIndexOnPrepend is active, we need to listen to data changes and figure out what was appended
     * before the last scrolledToItem
     */
    let previousIds: unknown[] = [];
    valueArray$
      .pipe(
        // TODO: this might cause issues when turning on/off
        filter(() => this.keepScrolledIndexOnPrepend),
        coalesceWith(unpatchedMicroTask()),
        map((valueArray) => {
          const trackBy = this.viewRepeater!._trackBy;
          const anchorIndex = this.scrolledIndex;
          const oldIds = previousIds;
          const hadData = oldIds.length > 0;
          const ids = valueArray.map((v, i) => trackBy(i, v));
          previousIds = ids;
          let anchorLookupIndex = anchorIndex;
          let anchorId = oldIds[anchorLookupIndex];
          if (!hadData || anchorId === undefined) {
            return 0;
          }
          /*
           * Instead of counting insertions, locate the anchored item again. That
           * nets out inserts, removals and moves ahead of the anchor in one go -
           * a transient row (e.g. a "loading older messages" item that gets
           * replaced by the batch) is both an insert and a remove and would
           * otherwise leave the list shifted by its height.
           */
          let newAnchorIndex = ids.indexOf(anchorId);
          /*
           * The anchored item itself got removed - e.g. a transient loading row
           * the anchor was sitting on. The nearest following survivor visually
           * takes its place and becomes the anchor. Without this fallback the
           * compensation silently bails, which pins the viewport to the top
           * and, in a reverse infinite scroller, retriggers loading forever.
           */
          while (
            newAnchorIndex === -1 &&
            anchorLookupIndex + 1 < oldIds.length
          ) {
            anchorLookupIndex++;
            anchorId = oldIds[anchorLookupIndex];
            newAnchorIndex =
              anchorId !== undefined ? ids.indexOf(anchorId) : -1;
          }
          // nothing below the anchor survived, there is nothing to keep in place
          return newAnchorIndex === -1 ? 0 : newAnchorIndex - anchorLookupIndex;
        }),
        this.untilDetached$(),
      )
      .subscribe((anchorShift) => {
        if (anchorShift !== 0) {
          /*
           * Adjust by the *delta* the data change introduced instead of scrolling
           * to the top of the new anchor index. This keeps the sub-item offset of
           * the anchor intact and, because it is relative to the live scroll
           * position, it also survives the user scrolling while the batch lands.
           */
          const delta = anchorShift * this.itemSize;
          this.viewport!.scrollTo(this.viewport!.getScrollTop() + delta);
          /*
           * the range is recalculated in the same microtask batch, so refresh the
           * cached scroll position now instead of waiting for the scroll event.
           */
          this.updateScrollTop(false);
        }
      });
    const dataLengthChanged$ = valueArray$.pipe(
      map((values) => values.length),
      distinctUntilChanged(),
      tap((dataLength) => (this.contentSize = dataLength * this.itemSize)),
    );
    const onScroll$ = this.viewport!.elementScrolled$.pipe(
      coalesceWith(unpatchedAnimationFrameTick()),
      startWith(void 0),
      tap(() => this.updateScrollTop()),
    );
    combineLatest([
      dataLengthChanged$,
      this.viewport!.containerRect$.pipe(
        map(({ height }) => {
          this.containerSize = height;
          return height;
        }),
        distinctUntilChanged(),
      ),
      onScroll$,
      this.runwayStateChanged$.pipe(startWith(void 0)),
    ])
      .pipe(
        coalesceWith(unpatchedMicroTask()),
        map(([length]) => {
          const containerSize = calculateVisibleContainerSize(
            this.containerSize,
            this.scrollTopWithOutOffset,
            this.scrollTopAfterOffset,
          );
          const range: ListRange = { start: 0, end: 0 };
          if (this.direction === 'up') {
            range.start = Math.floor(
              Math.max(0, this.scrollTop - this.runwayItems * this.itemSize) /
                this.itemSize,
            );
            range.end = Math.min(
              length,
              Math.ceil(
                (this.scrollTop +
                  containerSize +
                  this.runwayItemsOpposite * this.itemSize) /
                  this.itemSize,
              ),
            );
          } else {
            range.start = Math.floor(
              Math.max(
                0,
                this.scrollTop - this.runwayItemsOpposite * this.itemSize,
              ) / this.itemSize,
            );
            range.end = Math.min(
              length,
              Math.ceil(
                (this.scrollTop +
                  containerSize +
                  this.runwayItems * this.itemSize) /
                  this.itemSize,
              ),
            );
          }
          if (this.appendOnly) {
            range.start = Math.min(this._renderedRange.start, range.start);
            range.end = Math.max(this._renderedRange.end, range.end);
          }
          this.scrolledIndex = Math.floor(this.scrollTop / this.itemSize);
          return range;
        }),
        distinctUntilChanged(
          ({ start: prevStart, end: prevEnd }, { start, end }) =>
            prevStart === start && prevEnd === end,
        ),
        this.untilDetached$(),
      )
      .subscribe((range) => (this.renderedRange = range));
  }

  scrollToIndex(index: number, behavior?: ScrollBehavior): void {
    const scrollTop = this.itemSize * index;
    this.viewport!.scrollTo(this.viewportOffset + scrollTop, behavior);
  }

  /**
   * @internal
   * reads the live scroll position from the DOM into the cached values the
   * range calculation operates on.
   */
  private updateScrollTop(updateDirection = true): void {
    this.viewportOffset = this.viewport!.measureOffset();
    const { scrollTop, scrollTopWithOutOffset, scrollTopAfterOffset } =
      parseScrollTopBoundaries(
        this.viewport!.getScrollTop(),
        this.viewportOffset,
        this._contentSize,
        this.containerSize,
      );
    if (updateDirection) {
      this.direction =
        scrollTopWithOutOffset > this.scrollTopWithOutOffset ? 'down' : 'up';
    }
    this.scrollTopWithOutOffset = scrollTopWithOutOffset;
    this.scrollTopAfterOffset = scrollTopAfterOffset;
    this.scrollTop = scrollTop;
  }

  private untilDetached$<A>(): MonoTypeOperatorFunction<A> {
    return (o$) => o$.pipe(takeUntil(this.detached$));
  }

  private _setViewPosition(
    view: EmbeddedViewRef<RxVirtualForViewContext<T, U>>,
    scrollTop: number,
  ): void {
    const element = this.getElement(view);
    element.style.position = 'absolute';
    element.style.transform = `translateY(${scrollTop}px)`;
  }
}
