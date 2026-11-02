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
  of,
  ReplaySubject,
  Subject,
  Subscription,
} from 'rxjs';
import {
  distinctUntilChanged,
  map,
  shareReplay,
  startWith,
  switchMap,
  take,
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
  relocateItem,
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
   *
   * The item at the bottom edge of the viewport is kept in place, any data
   * change before it (inserts, removals, moves) shifts the content above it.
   */
  @Input({ transform: toBoolean }) keepScrolledIndexOnPrepend = false;

  /**
   * @internal
   * How far the scroll position the range is calculated for is ahead of the
   * one of the browser, see `keepInPlace`. Views are positioned in the
   * coordinate system of the browser until both get aligned.
   */
  private scrollDrift = 0;
  /** @internal */
  private scrollAlignment?: Subscription;
  /** @internal */
  private renderingInFlight = false;
  /** @internal the item at the bottom edge of the viewport */
  private lastScreenIndex = -1;

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

  private readonly _visibleRange$ = new ReplaySubject<ListRange>(1);
  override get visibleRange$(): Observable<ListRange> {
    return this._visibleRange$.pipe(distinctUntilChanged(rangesEqual));
  }
  private set visibleRange(range: ListRange) {
    this._visibleRange$.next(range);
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
    merge(
      this.viewRepeater!.renderingStart$.pipe(map(() => true)),
      this.viewRepeater!.viewsRendered$.pipe(map(() => false)),
    )
      .pipe(this.untilDetached$())
      .subscribe((renderingInFlight) => {
        this.renderingInFlight = renderingInFlight;
      });
    this.viewRepeater!.renderingStart$.pipe(
      switchMap(() => {
        return this.viewRepeater!.viewRendered$.pipe(
          tap(({ view, item }) => {
            this._setViewPosition(
              view,
              view.context.index * this.itemSize - this.scrollDrift,
            );
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
    let ids: unknown[] = [];
    valueArray$.pipe(this.untilDetached$()).subscribe((valueArray) => {
      if (!this.keepScrolledIndexOnPrepend || !valueArray.length) {
        ids = [];
        return;
      }
      const previousIds = ids;
      const trackBy = this.viewRepeater!._trackBy;
      ids = valueArray.map((item, i) => trackBy(i, item));
      const relocated = relocateItem(previousIds, ids, this.lastScreenIndex);
      if (relocated) {
        // removed items hand their place over to the next survivor
        const shift = relocated[1] - relocated[0];
        this.lastScreenIndex += shift;
        if (shift !== 0) {
          this.keepInPlace(shift * this.itemSize, valueArray.length);
        }
      }
    });
    const dataLengthChanged$ = valueArray$.pipe(
      map((values) => values.length),
      distinctUntilChanged(),
      tap((dataLength) => this.updateContentSize(dataLength)),
    );
    const onScroll$ = this.viewport!.elementScrolled$.pipe(
      coalesceWith(unpatchedAnimationFrameTick()),
      startWith(void 0),
      tap(() => {
        this.viewportOffset = this.viewport!.measureOffset();
        this.updateScrollTop(this.viewport!.getScrollTop() + this.scrollDrift);
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
          this.scrolledIndex = Math.floor(this.scrollTop / this.itemSize);
          const visibleEnd = Math.min(
            length,
            Math.ceil((this.scrollTop + containerSize) / this.itemSize),
          );
          this.lastScreenIndex = visibleEnd - 1;
          this.visibleRange = {
            start: this.scrolledIndex,
            end: visibleEnd,
          };
          if (this.appendOnly) {
            range.start = Math.min(this._renderedRange.start, range.start);
            range.end = Math.max(this._renderedRange.end, range.end);
          }
          return range;
        }),
        distinctUntilChanged(rangesEqual),
        this.untilDetached$(),
      )
      .subscribe((range) => (this.renderedRange = range));
  }

  scrollToIndex(index: number, behavior?: ScrollBehavior): void {
    const scrollTop = this.itemSize * index;
    this.viewport!.scrollTo(
      this.viewportOffset + scrollTop - this.scrollDrift,
      behavior,
    );
  }

  /**
   * @internal
   * Keeps the content in place after a data change shifted it by `delta`, see
   * `keepScrolledIndexOnPrepend`. The range is calculated for the shifted
   * scroll position right away, so the same views stay rendered. Writing the
   * scroll position now would force a layout and move the views before they
   * are re-positioned. Both happen at once after the views are rendered
   * instead, see `alignScrollTop`.
   */
  private keepInPlace(delta: number, dataLength: number): void {
    this.scrollDrift += delta;
    this.updateContentSize(dataLength);
    this.updateScrollTop(
      this.scrollTopWithOutOffset + this.viewportOffset + delta,
      false,
    );
    this.alignScrollTop();
  }

  /**
   * @internal
   * Moves the scroll position and the views by `scrollDrift` at once. It runs
   * right after the layout of the frame the rendered views get painted in:
   * the layout is clean at that point, so neither reading nor writing the
   * scroll position forces a synchronous layout.
   */
  private alignScrollTop(): void {
    this.scrollAlignment?.unsubscribe();
    const rendered$ = this.renderingInFlight
      ? this.viewRepeater!.viewsRendered$.pipe(take(1))
      : of(void 0);
    this.scrollAlignment = rendered$
      .pipe(
        switchMap(() => afterNextLayout(this.viewport!.getScrollElement())),
        this.untilDetached$(),
      )
      .subscribe(() => {
        // a running render positions its views in the current coordinate system
        if (this.renderingInFlight) {
          this.alignScrollTop();
          return;
        }
        const drift = this.scrollDrift;
        this.scrollDrift = 0;
        this.viewport!.scrollTo(this.viewport!.getScrollTop() + drift);
        const viewContainer = this.viewRepeater!.viewContainer;
        for (let i = 0; i < viewContainer.length; i++) {
          const view = <EmbeddedViewRef<RxVirtualForViewContext<T, U>>>(
            viewContainer.get(i)
          );
          this._setViewPosition(view, view.context.index * this.itemSize);
        }
        if (drift < 0) {
          this.contentSize = this._contentSize + drift;
        }
      });
  }

  /**
   * @internal
   * the runway has to cover views positioned in the coordinate system of the
   * browser, see `scrollDrift`
   */
  private updateContentSize(dataLength: number): void {
    this.contentSize =
      dataLength * this.itemSize + Math.max(0, -this.scrollDrift);
  }

  /**
   * @internal
   * updates the cached values the range calculation operates on
   */
  private updateScrollTop(rawScrollTop: number, updateDirection = true): void {
    const { scrollTop, scrollTopWithOutOffset, scrollTopAfterOffset } =
      parseScrollTopBoundaries(
        rawScrollTop,
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
