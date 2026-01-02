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
        const start = this.renderedRange.start;
        return this.viewRepeater!.viewRendered$.pipe(
          tap(({ view, index, item }) => {
            this._setViewPosition(view, (index + start) * this.itemSize);
            this.viewRenderCallback.next({
              view,
              item,
              index,
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
    let valueCache: Record<any, T> = {};
    valueArray$
      .pipe(
        // TODO: this might cause issues when turning on/off
        filter(() => this.keepScrolledIndexOnPrepend),
        coalesceWith(unpatchedMicroTask()),
        map((valueArray) => {
          const trackBy = this.viewRepeater!._trackBy;
          let scrollTo = this.scrolledIndex;
          const dataLength = valueArray.length;
          const oldDataLength = Object.keys(valueCache).length;

          if (oldDataLength > 0) {
            // const oldItem = valueCache[scrollTo];
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

          return scrollTo;
        }),
        this.untilDetached$(),
      )
      .subscribe((scrollTo) => {
        if (scrollTo !== this.scrolledIndex) {
          this.scrollToIndex(
            scrollTo,
            undefined,
            this.scrollTop - this.scrolledIndex * this.itemSize,
          );
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
          scrollTopWithOutOffset > this.scrollTopWithOutOffset ? 'down' : 'up';
        this.scrollTopWithOutOffset = scrollTopWithOutOffset;
        this.scrollTopAfterOffset = scrollTopAfterOffset;
        this.scrollTop = scrollTop;
      }),
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
        // coalesceWith(unpatchedMicroTask()),
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

  scrollToIndex(
    index: number,
    behavior?: ScrollBehavior,
    offset: number = 0,
  ): void {
    const scrollTop = this.itemSize * index;
    this.viewport!.scrollTo(this.viewportOffset + scrollTop + offset, behavior);
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
