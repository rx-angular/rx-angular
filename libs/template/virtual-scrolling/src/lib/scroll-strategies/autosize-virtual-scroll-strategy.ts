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
} from 'rxjs';
import {
  distinctUntilChanged,
  exhaustMap,
  filter,
  finalize,
  groupBy,
  map,
  mergeMap,
  pairwise,
  startWith,
  switchMap,
  take,
  takeUntil,
  takeWhile,
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
  isNotRendered,
  parseScrollTopBoundaries,
  rangesEqual,
  relocateItem,
  toBoolean,
  unpatchedAnimationFrameTick,
  unpatchedMicroTask,
} from '../util';
import { RX_VIRTUAL_SCROLL_DEFAULT_OPTIONS } from '../virtual-scroll.config';
import { RxaResizeObserver } from './resize-observer';
import { SizeTree } from './size-tree';

/** @internal */
type VirtualViewItem = {
  size: number;
  cached?: boolean;
  position?: number;
};

/** @internal */
type AnchorItem = {
  index: number;
  offset: number;
};

const defaultSizeExtract = (entry: ResizeObserverEntry) =>
  entry.borderBoxSize[0].blockSize;

/**
 * @Directive AutosizeVirtualScrollStrategy
 *
 * @description
 *
 * The `AutosizeVirtualScrollStrategy` provides a twitter-like virtual-scrolling
 * experience. It is able to render and position items based on their individual
 * size. It is comparable to \@angular/cdk/experimental `AutosizeVirtualScrollStrategy`, but
 * with a high performant layouting technique and more features.
 *
 * On top of this the `AutosizeVirtualScrollStrategy` is leveraging the native
 * `ResizeObserver` in order to detect size changes for each individual view
 * rendered to the DOM and properly re-position accordingly. Views are measured
 * by the `ResizeObserver` only, right after the browser computed the layout
 * of a frame and before it gets painted. Rendering a view never forces a
 * synchronous layout.
 *
 * In order to provide top-notch runtime performance the `AutosizeVirtualScrollStrategy`
 * builds up caches that prevent DOM interactions whenever possible. Once a view
 * was visited, its properties will be stored instead of re-read from the DOM again as
 * this can potentially lead to unwanted forced reflows.
 *
 * @docsCategory RxVirtualFor
 * @docsPage RxVirtualFor
 * @publicApi
 */
@Directive({
  selector: 'rx-virtual-scroll-viewport[autosize]',
  providers: [
    {
      provide: RxVirtualScrollStrategy,
      useExisting: AutoSizeVirtualScrollStrategy,
    },
    RxaResizeObserver,
  ],
  standalone: true,
})
export class AutoSizeVirtualScrollStrategy<
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
  @Input() runwayItems = this.defaults?.runwayItems ?? 10;

  /**
   * @description
   * The amount of items to render upfront in reverse scroll direction
   */
  @Input() runwayItemsOpposite = this.defaults?.runwayItemsOpposite ?? 2;

  /**
   * @description
   * The default size of the items being rendered. The autosized strategy will assume
   * this size for items it doesn't know yet. For the smoothest experience,
   * you provide the mean size of all items being rendered - if possible of course.
   *
   * As soon as rxVirtualFor is able to also render actual tombstone items, this
   * will be the size of a tombstone item being rendered before the actual item
   * is inserted into its position.
   */
  @Input() tombstoneSize = this.defaults?.itemSize ?? 50;

  /**
   * @description
   * The autosized strategy uses the native ResizeObserver in order to determine
   * if an item changed in size to afterwards properly position the views.
   * You can customize the config passed to the ResizeObserver as well as determine
   * which result property to use when determining the views size.
   */
  @Input() resizeObserverConfig?: {
    options?: ResizeObserverOptions;
    extractSize?: (entry: ResizeObserverEntry) => number;
  };

  /**
   * @description
   * When enabled, the autosized scroll strategy attaches a `ResizeObserver`
   * to every view within the given renderedRange. If your views receive
   * dimension changes that are not caused by list updates, this is a way to
   * still track height changes. This also applies to resize events of the whole
   * document.
   */
  @Input({ transform: toBoolean }) withResizeObserver = true;

  /**
   * @description
   * When enabled, the scroll strategy stops removing views from the viewport,
   * instead it only adds views. This setting can be changed on the fly. Views will be added in both directions
   * according to the user interactions.
   */
  @Input({ transform: toBoolean }) appendOnly = false;

  /**
   * @description
   * When enabled, the autosized scroll strategy removes css styles that
   * prevent the scrollbar from being in sync with the input device.
   * Use with caution, as this can lead to extremely weird scroll behavior
   * on chromium based browsers when the rendered views differ
   * in dimensions too much or change dimensions heavily.
   */
  @Input({ transform: toBoolean }) withSyncScrollbar = false;

  /**
   * @description
   * If this flag is true, the virtual scroll strategy maintains the scrolled item when new data
   * is prepended to the list. This is very useful when implementing a reversed infinite scroller, that prepends
   * data instead of appending it
   *
   * The item at the bottom edge of the viewport is kept in place, any data
   * change before it (inserts, removals, moves) shifts the content above it.
   * Inserted items count with `tombstoneSize` until they get measured.
   */
  @Input({ transform: toBoolean }) keepScrolledIndexOnPrepend = false;

  /** @internal */
  private viewport: RxVirtualScrollViewport | null = null;
  /** @internal */
  private viewRepeater: RxVirtualViewRepeater<T, U> | null = null;

  /** @internal */
  private readonly _contentSize$ = new ReplaySubject<number>(1);
  /** @internal */
  override readonly contentSize$ = this._contentSize$.asObservable();

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
  private readonly _renderedRange$ = new Subject<ListRange>();
  /** @internal */
  readonly renderedRange$ = this._renderedRange$.asObservable();
  /** @internal */
  private _renderedRange: ListRange = { start: 0, end: 0 };

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
  private positionedRange: ListRange = { start: 0, end: 0 };

  /** @internal */
  private readonly _scrolledIndex$ = new ReplaySubject<number>(1);
  /** @internal */
  readonly scrolledIndex$ = this._scrolledIndex$.pipe(distinctUntilChanged());
  /**
   * @internal
   * The action used to kick off the scroll process
   */
  private scrollToTrigger$ = new Subject<{
    scrollTop: number;
    behavior?: ScrollBehavior;
  }>();
  /** @internal */
  private _scrolledIndex = 0;
  /** @internal */
  private get scrolledIndex(): number {
    return this._scrolledIndex;
  }
  /** @internal */
  private set scrolledIndex(index: number) {
    this._scrolledIndex = index;
    this._scrolledIndex$.next(index);
  }

  /**
   * is set, when scrollToIndex is called
   * @internal
   * */
  private _scrollToIndex: number | null = null;

  /** @internal */
  private containerSize = 0;
  /** @internal */
  private contentLength = 0;
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
  /**
   * @internal
   * The item kept in place after a prepend, see `keepInPlace`. Until the user
   * scrolls, the anchor is derived from it whenever sizes change.
   */
  private keptItem: AnchorItem | undefined;

  /** @internal */
  private waitForScroll = false;

  /** @internal */
  private isStable$ = new ReplaySubject<boolean>(1);

  /** @internal */
  private readonly detached$ = new Subject<void>();

  /** @internal */
  private resizeObserver = inject(RxaResizeObserver, { self: true });
  /** @internal */
  private readonly recalculateRange$ = new Subject<void>();

  /**
   * trackBy id -> { item, index } for the *latest* dataset. This is the
   * authority for where an item currently lives in `_virtualItems`.
   * @internal
   */
  private readonly itemCache = new Map<
    any,
    { item: T; index: number; generation: number }
  >();
  /**
   * stamps the itemCache entries of the latest dataset, see `maintainVirtualItems`
   * @internal
   */
  private itemCacheGeneration = 0;

  /**
   * prefix sums of the item sizes, see `virtualItemSize`
   * @internal
   */
  private readonly sizeTree = new SizeTree();

  /** @internal */
  private readonly positionedElements = new WeakSet<HTMLElement>();

  /**
   * Resolves the index a view's item currently has in the dataset.
   *
   * `view.context.index` goes stale whenever a new value emission rebuilds
   * `_virtualItems` while a render or ResizeObserver pass for the previous
   * dataset is still in flight - e.g. a transient loading row that gets
   * replaced one tick later. Writing sizes or positions through the stale
   * index books them onto the neighboring item, and since measurements are
   * cached, the corruption is permanent. Resolving via trackBy keeps every
   * write on the item it was measured from.
   * @internal
   */
  private resolveItemIndex(
    view: EmbeddedViewRef<RxVirtualForViewContext<T, U>>,
  ): number {
    const trackBy =
      this.viewRepeater!._trackBy ?? ((_: number, item: T) => item);
    const id = trackBy(view.context.index, view.context.$implicit);
    return this.itemCache.get(id)?.index ?? view.context.index;
  }

  /** @internal */
  private until$<A>(): MonoTypeOperatorFunction<A> {
    return (o$) => o$.pipe(takeUntil(this.detached$));
  }

  /** @internal */
  private get extractSize() {
    return this.resizeObserverConfig?.extractSize ?? defaultSizeExtract;
  }

  /** @internal */
  override get isStable(): Observable<boolean> {
    return this.isStable$.pipe(filter((w) => w));
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
    if (changes['withSyncScrollbar']) {
      this.updateScrollElementClass();
    }
    if (changes['tombstoneSize'] && !changes['tombstoneSize'].firstChange) {
      this.resetSizeTree();
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
    this.updateScrollElementClass();
    this.maintainVirtualItems();
    this.calcRenderedRange();
    this.positionElements();
    this.listenToScrollTrigger();
  }

  /** @internal */
  detach(): void {
    this.updateScrollElementClass(false);
    this.viewport = null;
    this.viewRepeater = null;
    this._virtualItems = [];
    this.sizeTree.reset([]);
    this.itemCache.clear();
    this.keptItem = undefined;
    this.resizeObserver.destroy();
    this.detached$.next();
  }

  scrollToIndex(index: number, behavior?: ScrollBehavior): void {
    const _index = Math.min(
      Math.max(index, 0),
      Math.max(0, this.contentLength - 1),
    );
    if (_index !== this.scrolledIndex) {
      this.keptItem = undefined;
      const scrollTop = this.calcInitialPosition(_index);
      this._scrollToIndex = _index;
      this.scrollToTrigger$.next({ scrollTop, behavior });
    }
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

  /**
   * starts the subscriptions that maintain the virtualItems array on changes
   * to the underlying dataset
   * @internal
   */
  private maintainVirtualItems(): void {
    // reset virtual viewport when opposite orientation to the scroll direction
    // changes, as we have to expect dimension changes for all items when this
    // happens. This could also be configurable as it maybe costs performance
    this.viewport!.containerRect$.pipe(
      map(({ width }) => width),
      distinctUntilChanged(),
      filter(() => this.renderedRange.end > 0 && this._virtualItems.length > 0),
      this.until$(),
    ).subscribe(() => {
      // reset because we have no idea how items will behave
      let i = 0;
      while (i < this.renderedRange.start) {
        this._virtualItems[i].cached = false;
        i++;
      }
      i = this.renderedRange.end;
      while (i < this._virtualItems.length) {
        this._virtualItems[i].cached = false;
        i++;
      }
      this.resetSizeTree();
    });

    // synchronises the values with the virtual viewport we've built up
    // it might get costy when having > 100k elements, it's still faster than
    // the IterableDiffer approach, especially on move operations
    // trackBy ids of the last dataset, see keepScrolledIndexOnPrepend
    let ids: unknown[] = [];
    const trackBy = this.viewRepeater!._trackBy ?? ((i, item) => item);
    this.renderedRange$
      .pipe(pairwise(), this.until$())
      .subscribe(([oldRange, newRange]) => {
        let i = oldRange.start;
        if (i < this._virtualItems.length) {
          for (i; i < Math.min(this._virtualItems.length, oldRange.end); i++) {
            if (i < newRange.start || i >= newRange.end) {
              this._virtualItems[i].position = undefined;
            }
          }
        }
      });
    this.viewRepeater!.values$.pipe(
      this.until$(),
      tap((values) => {
        const dataArr = Array.isArray(values)
          ? values
          : values
            ? Array.from(values)
            : [];
        // entries of the cache that don't get this stamp were removed
        const generation = ++this.itemCacheGeneration;
        let size = 0;
        const dataLength = dataArr.length;
        const virtualItems = new Array<VirtualViewItem>(dataLength);
        const sizes = new Float64Array(dataLength);
        const nextIds = new Array<unknown>(dataLength);
        const keepScrolledIndexOnPrepend =
          this.keepScrolledIndexOnPrepend &&
          dataArr.length > 0 &&
          this.itemCache.size > 0;
        for (let i = 0; i < dataLength; i++) {
          const item = dataArr[i];
          const id = trackBy(i, item);
          nextIds[i] = id;
          const cachedItem = this.itemCache.get(id);
          if (cachedItem === undefined) {
            // add
            virtualItems[i] = { size: 0 };
            this.itemCache.set(id, { item, index: i, generation });
          } else if (cachedItem.index !== i) {
            // move
            virtualItems[i] = this._virtualItems[cachedItem.index];
            virtualItems[i].position = undefined;
            cachedItem.item = item;
            cachedItem.index = i;
            cachedItem.generation = generation;
          } else {
            // update
            // todo: properly determine update (Object.is?)
            virtualItems[i] = this._virtualItems[i];
            // if index is not part of rendered range, remove cache
            if (
              !this.withResizeObserver ||
              i < this.renderedRange.start ||
              i >= this.renderedRange.end
            ) {
              virtualItems[i].cached = false;
            }
            cachedItem.item = item;
            cachedItem.generation = generation;
          }
          sizes[i] = this.virtualItemSize(virtualItems[i]);
          size += sizes[i];
        }
        // keep the pre-rebuild ledger around: sizes of rows that got removed
        // in this emission are only known there
        const oldVirtualItems = this._virtualItems;
        this._virtualItems = virtualItems;
        this.sizeTree.reset(sizes);
        // sync delete operations
        if (this.itemCache.size > dataLength) {
          this.itemCache.forEach((v, k) => {
            if (v.generation !== generation) {
              this.itemCache.delete(k);
            }
          });
        }
        this.contentLength = dataLength;
        const previousIds = ids;
        ids = this.keepScrolledIndexOnPrepend ? nextIds : [];
        if (!keepScrolledIndexOnPrepend) {
          this.keptItem = undefined;
        }
        const keptItem = keepScrolledIndexOnPrepend
          ? this.relocateLastScreenItem(previousIds, nextIds, oldVirtualItems)
          : undefined;
        if (keptItem) {
          this.keepInPlace(keptItem);
          // positioning stops at the rendered range, it can't exceed the data
          this._renderedRange = {
            start: this._renderedRange.start,
            end: Math.min(this._renderedRange.end, dataLength),
          };
        } else if (dataLength === 0) {
          this.keptItem = undefined;
          this.anchorItem = {
            index: 0,
            offset: 0,
          };
          this._renderedRange = {
            start: 0,
            end: 0,
          };
          this.scrollTo(0);
          this.scrollTop = this.anchorScrollTop = 0;
        } else if (dataLength < this._renderedRange.end) {
          this.keptItem = undefined;
          this.anchorItem = this.calculateAnchoredItem(
            {
              index: dataLength,
              offset: 0,
            },
            Math.max(
              -size,
              -calculateVisibleContainerSize(
                this.containerSize,
                this.scrollTopWithOutOffset,
                this.scrollTopAfterOffset,
              ),
            ),
          );
          this.calcAnchorScrollTop();
          this._renderedRange = {
            start: Math.max(0, this.anchorItem.index - this.runwayItems),
            end: dataLength,
          };
          this.scrollTo(size);
          this.scrollTop = this.anchorScrollTop;
        }
        this.contentSizeReserve = 0;
        this.contentSize = size;
      }),
      finalize(() => this.itemCache.clear()),
    ).subscribe();
  }

  /**
   * listen to triggers that should change the renderedRange
   * @internal
   */
  private calcRenderedRange(): void {
    let removeScrollAnchorOnNextScroll = false;
    const onlyTriggerWhenStable =
      <A>() =>
      (o$: Observable<A>) =>
        o$.pipe(
          filter(
            () =>
              this.renderedRange.end === 0 ||
              (this.scrollTop === this.anchorScrollTop &&
                this._scrollToIndex === null),
          ),
        );
    combineLatest([
      this.viewport!.containerRect$.pipe(
        map(({ height }) => {
          this.containerSize = height;
          return height;
        }),
        distinctUntilChanged(),
        onlyTriggerWhenStable(),
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
          if (removeScrollAnchorOnNextScroll) {
            this._scrollToIndex = null;
            removeScrollAnchorOnNextScroll = false;
          } else {
            removeScrollAnchorOnNextScroll = this._scrollToIndex !== null;
          }
          this.waitForScroll = false;
        }),
      ),
      this._contentSize$.pipe(distinctUntilChanged(), onlyTriggerWhenStable()),
      this.recalculateRange$.pipe(onlyTriggerWhenStable(), startWith(void 0)),
    ])
      .pipe(
        // make sure to not over calculate things by coalescing all triggers to the next microtask
        coalesceWith(unpatchedMicroTask()),
        map(() => {
          const range = { start: 0, end: 0 };
          const delta = this.scrollTop - this.anchorScrollTop;
          // the user scrolled, the kept item is released
          if (delta !== 0) {
            this.keptItem = undefined;
          }
          // a kept anchor (see keepInPlace) isn't aligned with the scroll
          // position yet, without scrolling it stays where it is
          if (this.scrollTop === 0 && delta !== 0) {
            this.anchorItem = { index: 0, offset: 0 };
          } else {
            this.anchorItem = this.calculateAnchoredItem(
              this.anchorItem,
              delta,
            );
          }
          this.anchorScrollTop = this.scrollTop;
          this.scrolledIndex = this.anchorItem.index;
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
              this.contentLength,
              this.lastScreenItem.index +
                (this.lastScreenItem.offset > 0 ? 1 : 0),
            ),
          };
          if (this.direction === 'up') {
            range.start = Math.max(0, this.anchorItem.index - this.runwayItems);
            range.end = Math.min(
              this.contentLength,
              this.lastScreenItem.index + this.runwayItemsOpposite,
            );
          } else {
            range.start = Math.max(
              0,
              this.anchorItem.index - this.runwayItemsOpposite,
            );
            range.end = Math.min(
              this.contentLength,
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
        // a synchronous render strategy (e.g. native) renders right here,
        // possibly within a ResizeObserver callback, see `updateElementSize`
        this.renderingSynchronously = true;
        this.renderedRange = range;
        this.isStable$.next(!this.waitForScroll);
        this.renderingSynchronously = false;
      });
  }

  /**
   * position elements after they are created/updated/moved or their dimensions
   * change from other sources
   * @internal
   */
  private positionElements(): void {
    const viewsToObserve$ = new Subject<
      EmbeddedViewRef<RxVirtualForViewContext<T, U>>
    >();
    let observeNextFrameViews: EmbeddedViewRef<
      RxVirtualForViewContext<T, U>
    >[] = [];
    const observeNextFrame = (
      view: EmbeddedViewRef<RxVirtualForViewContext<T, U>>,
    ) => {
      if (observeNextFrameViews.push(view) === 1) {
        unpatchedAnimationFrameTick()
          .pipe(this.until$())
          .subscribe(() => {
            const views = observeNextFrameViews;
            observeNextFrameViews = [];
            views.forEach((v) => viewsToObserve$.next(v));
          });
      }
    };
    const positionByIterableChange$ = this.viewRepeater!.renderingStart$.pipe(
      switchMap((batchedUpdates) => {
        // initialIndex tells us what will be the first index to be change detected
        // if it's not the first one, we maybe have to adjust the position
        // of all items in the viewport before this index
        const initialIndex = batchedUpdates.size
          ? batchedUpdates.values().next().value + this.renderedRange.start
          : this.renderedRange.start;
        let position = 0;
        let scrollToAnchorPosition: number | null = null;
        return this.viewRepeater!.viewRendered$.pipe(
          tap(({ view, index: viewIndex, item }) => {
            const itemIndex = this.resolveItemIndex(view);
            // this most of the time causes a forced reflow per rendered view.
            // it doesn't sound good, but it's still way more stable than
            // having one large reflow in a microtask after the actual
            // scheduler tick.
            // Right here, we can insert work into the task which is currently
            // executed as part of the concurrent scheduler tick.
            // causing the forced reflow here, also makes it count for the
            // schedulers frame budget. This way we will always run with the
            // configured FPS. The only case where this is not true is when rendering 1 single view
            // already explodes the budget
            const [, sizeDiff] = this.updateElementSize(view, itemIndex);
            const virtualItem = this._virtualItems[itemIndex];
            // superseded pass racing a data change that removed the item -
            // the follow-up render repositions everything anyway
            if (!virtualItem) {
              return;
            }

            // before positioning the first view of this batch, calculate the
            // anchorScrollTop & initial position of the view
            if (itemIndex === initialIndex) {
              this.calcAnchorScrollTop();
              position = this.calcInitialPosition(itemIndex);

              // if we receive a partial update and the current views position is
              // new, we can safely assume that all positions from views before the current
              // index are also off. We need to adjust them
              if (
                initialIndex > this.renderedRange.start &&
                virtualItem.position !== position
              ) {
                let beforePosition = position;
                let i = initialIndex - 1;
                while (i >= this.renderedRange.start) {
                  const view = this.getViewRef(i - this.renderedRange.start);
                  const virtualItem = this._virtualItems[i];
                  const element = this.getElement(view);
                  beforePosition -= this.virtualItemSize(virtualItem);
                  virtualItem.position = beforePosition;
                  this.positionElement(element, beforePosition);
                  i--;
                }
              }
            } else if (itemIndex < this.anchorItem.index && sizeDiff) {
              this.anchorScrollTop += sizeDiff;
            }
            const size = this.virtualItemSize(virtualItem);
            // position current element if we need to
            if (virtualItem.position !== position) {
              const element = this.getElement(view);
              this.positionElement(element, position);
              virtualItem.position = position;
            }
            if (this._scrollToIndex === itemIndex) {
              scrollToAnchorPosition = position;
            }
            position += size;
            // immediately activate the ResizeObserver after initial positioning.
            // A view rendered synchronously may be rendered within a running
            // ResizeObserver loop, observing it there leaves a notification
            // undelivered (an error). It's measured already, observe it with
            // the next frame.
            if (this.renderingSynchronously) {
              observeNextFrame(view);
            } else {
              viewsToObserve$.next(view);
            }
            this.viewRenderCallback.next({
              index: itemIndex,
              view,
              item,
            });
            // after positioning the actual view, we also need to position all
            // views from the current index on until either the renderedRange.end
            // is hit or we hit an index that will anyway receive an update.
            // we can derive that information from the batchedUpdates index Set
            const { lastPositionedIndex: lastIndex, position: newPosition } =
              this.positionUnchangedViews({
                viewIndex,
                itemIndex,
                batchedUpdates,
                position,
              });
            position = newPosition;
            this.positionedRange.start = this.renderedRange.start;
            this.positionedRange.end = lastIndex + 1;
          }),
          coalesceWith(unpatchedMicroTask()),
          tap(() => {
            // sizes measured in this pass may have moved the kept item
            if (this.keptItem) {
              this.calcAnchorScrollTop();
            }
            this.adjustContentSize(position);
            if (this._scrollToIndex === null) {
              this.maybeAdjustScrollPosition();
            } else if (scrollToAnchorPosition != null) {
              if (scrollToAnchorPosition !== this.anchorScrollTop) {
                if (
                  scrollToAnchorPosition >
                  this.contentSize - this.containerSize
                ) {
                  // if the anchorItemPosition is larger than the maximum scrollPos,
                  // we want to scroll until the bottom.
                  // of course, we need to be sure all the items until the end are positioned
                  // until we are sure that we need to scroll to the bottom
                  if (this.renderedRange.end === this.positionedRange.end) {
                    this._scrollToIndex = null;
                    this.scrollTo(this.contentSize);
                  }
                } else {
                  this._scrollToIndex = null;
                  this.scrollTo(scrollToAnchorPosition);
                }
              } else {
                this._scrollToIndex = null;
                this.maybeAdjustScrollPosition();
              }
            }
          }),
        );
      }),
    );
    // sizes are booked per entry, the views get positioned once per batch
    let repositionAfterBatch = false;
    const positionByResizeObserver$ = merge(
      viewsToObserve$.pipe(
        filter(() => this.withResizeObserver),
        groupBy((viewRef) => viewRef),
        mergeMap((o$) =>
          o$.pipe(
            exhaustMap((viewRef) => this.observeViewSize$(viewRef)),
            tap(() => (repositionAfterBatch = true)),
          ),
        ),
      ),
      this.resizeObserver.batchEnd$.pipe(
        tap(() => {
          if (this.pendingContentSizeDiff !== 0) {
            this.applyContentSizeDiff(this.pendingContentSizeDiff);
            this.pendingContentSizeDiff = 0;
          }
          if (repositionAfterBatch) {
            repositionAfterBatch = false;
            this.positionRenderedViews();
          }
        }),
      ),
    );
    merge(positionByIterableChange$, positionByResizeObserver$)
      .pipe(this.until$())
      .subscribe();
  }

  /** @internal */
  private pendingContentSizeDiff = 0;
  /** @internal */
  private renderingSynchronously = false;
  /**
   * content size kept on top of the measured one for a frame, see
   * `applyContentSizeDiff`
   * @internal
   */
  private contentSizeReserve = 0;

  /**
   * @internal
   * Applies a size change measured by the ResizeObserver. While the content
   * overflows the container, it keeps overflowing within the ResizeObserver
   * callback: removing the scrollbar there changes the width of all views,
   * which the ResizeObserver could only report with the next frame (an
   * error). The content shrinks to its measured size with the next frame.
   */
  private applyContentSizeDiff(diff: number): void {
    const size = this.contentSize + diff;
    if (
      diff < 0 &&
      this.contentSize > this.containerSize &&
      size <= this.containerSize
    ) {
      const reserve = this.containerSize + 1 - size;
      this.contentSizeReserve += reserve;
      this.contentSize = size + reserve;
      unpatchedAnimationFrameTick()
        .pipe(this.until$())
        .subscribe(() => {
          // an absolute update (adjustContentSize) dropped it already
          if (this.contentSizeReserve > 0) {
            const release = Math.min(reserve, this.contentSizeReserve);
            this.contentSizeReserve -= release;
            this.contentSize -= release;
          }
        });
      return;
    }
    this.contentSize = size;
  }

  /**
   * @internal
   * positions all rendered views after their sizes changed
   */
  private positionRenderedViews(): void {
    const length = this.viewRepeater!.viewContainer.length;
    this.calcAnchorScrollTop();
    let position: number | undefined;
    for (let viewIdx = 0; viewIdx < length; viewIdx++) {
      const view = this.getViewRef(viewIdx);
      const itemIndex = this.resolveItemIndex(view);
      const virtualItem = this._virtualItems[itemIndex];
      // superseded pass racing a data change that removed the item
      if (!virtualItem) {
        continue;
      }
      if (position === undefined) {
        position = this.calcInitialPosition(itemIndex);
      }
      if (virtualItem.position !== position) {
        this.positionElement(this.getElement(view), position);
        virtualItem.position = position;
      }
      position += this.virtualItemSize(virtualItem);
    }
    this.maybeAdjustScrollPosition();
  }

  /** listen to API initiated scroll triggers (e.g. initialScrollIndex) */
  private listenToScrollTrigger(): void {
    this.scrollToTrigger$
      .pipe(
        switchMap((scrollTo) =>
          // wait until containerRect at least emitted once
          this.containerSize === 0
            ? this.viewport!.containerRect$.pipe(
                map(() => scrollTo),
                take(1),
              )
            : of(scrollTo),
        ),
        this.until$(),
      )
      .subscribe(({ scrollTop, behavior }) => {
        this.scrollTo(scrollTop, behavior);
      });
  }
  /** @internal */
  private adjustContentSize(position: number) {
    this.contentSizeReserve = 0;
    this.contentSize =
      position +
      Math.max(
        0,
        this.sizeTree.total - this.sizeUpTo(this.positionedRange.end),
      );
  }

  /** @internal */
  private observeViewSize$(
    viewRef: EmbeddedViewRef<RxVirtualForViewContext<T, U>>,
  ) {
    const element = this.getElement(viewRef);
    return this.resizeObserver
      .observeElement(element, this.resizeObserverConfig?.options)
      .pipe(
        takeWhile(
          (event) =>
            event.target.isConnected &&
            !!this._virtualItems[this.resolveItemIndex(viewRef)],
        ),
        // a view that is not rendered at all (e.g. an ancestor is
        // `display: none`) reports a collapsed box. That is not a measurement,
        // booking it would wipe out the cached size. The real size arrives as
        // soon as the view is rendered again.
        filter(
          ({ target, contentRect }) =>
            !isNotRendered(target, contentRect.width, contentRect.height),
        ),
        map((event) => {
          const index = this.resolveItemIndex(viewRef);
          const item = this._virtualItems[index];
          const size = Math.round(this.extractSize(event));
          // an item that was never measured counts with the tombstone size
          const diff = size - this.virtualItemSize(item);
          item.size = size;
          item.cached = true;
          if (diff === 0) {
            return -1;
          }
          this.sizeTree.set(index, size);
          // the content size is updated once per batch
          this.pendingContentSizeDiff += diff;
          return index;
        }),
        filter(
          (index) =>
            index >= this.positionedRange.start &&
            index < this.positionedRange.end,
        ),
        takeUntil(
          merge(
            this.viewRepeater!.viewRendered$,
            this.viewRepeater!.renderingStart$,
          ).pipe(
            tap(() => {
              // we need to clean up the position property for views
              // that fall out of the renderedRange.
              const index = this.resolveItemIndex(viewRef);
              if (
                this._virtualItems[index] &&
                (index < this.renderedRange.start ||
                  index >= this.renderedRange.end)
              ) {
                this._virtualItems[index].position = undefined;
              }
            }),
            filter(
              () => this.viewRepeater!.viewContainer.indexOf(viewRef) === -1,
            ),
          ),
        ),
      );
  }

  /**
   * @internal
   * Where the item at the bottom edge of the viewport ends up in the next
   * dataset, see `keepScrolledIndexOnPrepend`. The item is looked up with the
   * sizes of the previous dataset.
   */
  private relocateLastScreenItem(
    previousIds: unknown[],
    ids: unknown[],
    previousItems: VirtualViewItem[],
  ): AnchorItem | undefined {
    if (!previousIds.length) {
      return undefined;
    }
    const previousSize = (i: number) =>
      previousItems[i]
        ? this.virtualItemSize(previousItems[i])
        : this.tombstoneSize;
    let { index, offset } = this.lastScreenItem;
    // the list ends above the bottom edge, keep its last item in place
    if (index >= previousIds.length) {
      index = previousIds.length - 1;
      offset += previousSize(index);
    }
    const relocated = relocateItem(previousIds, ids, index);
    if (!relocated) {
      this.keptItem = undefined;
      return undefined;
    }
    // nothing to keep in place, the anchor (or a kept item) still holds
    if (relocated[0] === index && relocated[1] === index) {
      return undefined;
    }
    // removed items hand their place over to the next survivor
    for (let i = index; i < relocated[0]; i++) {
      offset -= previousSize(i);
    }
    return { index: relocated[1], offset };
  }

  /**
   * @internal
   * Keeps `item` (see `relocateLastScreenItem`) where the user sees it after
   * a data change by deriving the anchor from it. anchorScrollTop is left
   * alone: the next positioning pass calculates the new one and adjusts the
   * scroll position in the same task it moves the views in.
   * The items above it are mostly not measured yet. The anchor would end up
   * in one of them, its measured size would move everything below it. Until
   * the user scrolls, the anchor is derived from the kept item instead, see
   * `calcAnchorScrollTop`.
   */
  private keepInPlace(item: AnchorItem): void {
    this.keptItem = item;
    this.anchorAboveKeptItem(item);
    this.recalculateRange$.next();
  }

  /** @internal */
  private anchorAboveKeptItem(item: AnchorItem): void {
    const visibleSize = calculateVisibleContainerSize(
      this.containerSize,
      this.scrollTopWithOutOffset,
      this.scrollTopAfterOffset,
    );
    const anchorItem = this.calculateAnchoredItem(item, -visibleSize);
    // not enough content above the item to keep it in place
    this.anchorItem =
      anchorItem.offset < 0 ? { index: 0, offset: 0 } : anchorItem;
    this.lastScreenItem = this.calculateAnchoredItem(
      this.anchorItem,
      visibleSize,
    );
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
    // no early return for delta === 0: measuring items can shrink the anchor
    // below its offset, walking from it re-normalizes the anchor
    delta += initialAnchor.offset;
    let i = initialAnchor.index;
    const items = this._virtualItems;
    if (delta !== 0 && i <= items.length) {
      const target = this.sizeUpTo(i) + delta;
      if (target < 0) {
        return { index: 0, offset: target };
      }
      const index = this.sizeTree.indexAt(target);
      return { index, offset: target - this.sizeUpTo(index) };
    }
    // superseded pass: the anchor is beyond the ledger
    if (delta < 0) {
      while (delta < 0 && i > 0) {
        delta += this.getItemSize(i - 1);
        i--;
      }
    } else {
      while (delta > 0 && i < items.length && this.getItemSize(i) <= delta) {
        delta -= this.getItemSize(i);
        i++;
      }
    }
    return {
      index: Math.min(i, items.length),
      offset: delta,
    };
  }

  /** @internal */
  private positionUnchangedViews({
    viewIndex,
    itemIndex,
    batchedUpdates,
    position,
  }: {
    viewIndex: number;
    itemIndex: number;
    batchedUpdates: Set<number>;
    position: number;
  }): { position: number; lastPositionedIndex: number } {
    let _viewIndex = viewIndex + 1;
    let index = itemIndex + 1;
    let lastPositionedIndex = itemIndex;
    while (!batchedUpdates.has(_viewIndex) && index < this.renderedRange.end) {
      const virtualItem = this._virtualItems[index];
      // superseded pass racing a data change that shrank the dataset
      if (!virtualItem) {
        break;
      }
      if (position !== virtualItem.position) {
        const view = this.getViewRef(_viewIndex);
        const element = this.getElement(view);
        this.positionElement(element, position);
        virtualItem.position = position;
      }
      position += this.virtualItemSize(virtualItem);
      lastPositionedIndex = index;
      index++;
      _viewIndex++;
    }
    return { position, lastPositionedIndex };
  }

  /**
   * Adjust the scroll position when the anchorScrollTop differs from
   * the actual scrollTop.
   * Trigger a range recalculation if there is empty space
   *
   * @internal
   */
  private maybeAdjustScrollPosition(): void {
    if (this.anchorScrollTop !== this.scrollTop) {
      this.scrollTo(this.anchorScrollTop);
    }
  }

  /** @internal */
  private calcAnchorScrollTop(): void {
    if (this.keptItem) {
      this.anchorAboveKeptItem(this.keptItem);
    }
    this.anchorScrollTop =
      this.sizeUpTo(this.anchorItem.index) + this.anchorItem.offset;
  }

  /** @internal */
  private calcInitialPosition(start: number): number {
    return (
      this.anchorScrollTop -
      this.anchorItem.offset +
      this.sizeUpTo(start) -
      this.sizeUpTo(this.anchorItem.index)
    );
  }

  /**
   * @internal
   * The summed up size of the items before `index`. Indices of superseded
   * passes beyond the ledger count with the tombstone size.
   */
  private sizeUpTo(index: number): number {
    const length = this.sizeTree.length;
    return index <= length
      ? this.sizeTree.prefix(index)
      : this.sizeTree.total + (index - length) * this.tombstoneSize;
  }

  /** @internal */
  private resetSizeTree(): void {
    const items = this._virtualItems;
    const sizes = new Float64Array(items.length);
    for (let i = 0; i < items.length; i++) {
      sizes[i] = this.virtualItemSize(items[i]);
    }
    this.sizeTree.reset(sizes);
  }

  /** @internal */
  private getViewRef(
    index: number,
  ): EmbeddedViewRef<RxVirtualForViewContext<T, U>> {
    return <EmbeddedViewRef<RxVirtualForViewContext<T, U>>>(
      this.viewRepeater!.viewContainer.get(index)!
    );
  }

  /** @internal */
  private updateElementSize(
    view: EmbeddedViewRef<any>,
    index: number,
  ): [number, number] {
    const oldSize = this.getItemSize(index);
    const entry = this._virtualItems[index];
    // superseded pass racing a data change that removed the item
    if (!entry) {
      return [oldSize, 0];
    }
    if (
      !entry.cached &&
      this.withResizeObserver &&
      !this.renderingSynchronously &&
      this.contentSize > this.containerSize
    ) {
      // the ResizeObserver measures it after the next layout. Reading the
      // size now would force a synchronous layout for every rendered view.
      // In case the element is still observed for a former item of the same
      // size, a restarted observation makes sure it gets reported.
      // Only while the content overflows: growing beyond the container within
      // the ResizeObserver callback adds a scrollbar, which changes the width
      // of all views - the ResizeObserver could only report it with the next
      // frame (an error). A synchronous render may happen within a
      // ResizeObserver callback, see `positionElements`.
      this.resizeObserver.remeasure(
        this.getElement(view),
        this.resizeObserverConfig?.options,
      );
      return [oldSize, 0];
    }
    const size = entry.cached
      ? oldSize
      : this.getElementSize(this.getElement(view)) || this.tombstoneSize;
    entry.size = size;
    entry.cached = true;
    this.sizeTree.set(index, size);
    return [size, size - oldSize];
  }

  /**
   * @internal
   * defensive against indices of superseded passes - a render or measure pass
   * may still be in flight while a data change already shrank the ledger
   */
  private getItemSize(index: number): number {
    const item = this._virtualItems[index];
    return item ? this.virtualItemSize(item) : this.tombstoneSize;
  }
  /**
   * @internal
   * A size of `0` is ambiguous: a new item starts at `0` before it was ever
   * measured, an item rendering no content is measured as `0`. Only measured
   * (cached) sizes are taken as they are, unknown ones fall back to the
   * tombstone size.
   */
  private virtualItemSize(item: VirtualViewItem): number {
    return item.cached ? item.size : item.size || this.tombstoneSize;
  }
  /** @internal */
  private getElementSize(element: HTMLElement): number {
    return element.offsetHeight;
  }
  /** @internal */
  private positionElement(element: HTMLElement, scrollTop: number): void {
    if (!this.positionedElements.has(element)) {
      element.style.position = 'absolute';
      this.positionedElements.add(element);
    }
    element.style.transform = `translateY(${scrollTop}px)`;
  }

  /** @internal */
  private updateScrollElementClass(force = this.withSyncScrollbar): void {
    const scrollElement = this.viewport?.getScrollElement?.();
    if (
      !!scrollElement &&
      scrollElement.classList.contains('rx-virtual-scroll-element')
    ) {
      scrollElement.classList.toggle(
        'rx-virtual-scroll-element--withSyncScrollbar',
        force,
      );
    }
  }
}
