import {
  Directive,
  EmbeddedViewRef,
  inject,
  Input,
  IterableDiffer,
  IterableDiffers,
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
} from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
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
import { unpatchedAnimationFrameTick, unpatchedMicroTask } from '../util';
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

/** @internal */
function removeFromArray(arr: any[], index: number): any {
  // perf: array.pop is faster than array.splice!
  if (index >= arr.length - 1) {
    return arr.pop();
  } else {
    return arr.splice(index, 1)[0];
  }
}

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
 * rendered to the DOM and properly re-position accordingly.
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
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'rx-virtual-scroll-viewport[autosize]',
  providers: [
    {
      provide: RxVirtualScrollStrategy,
      useExisting: AutosizeVirtualScrollStrategy,
    },
  ],
  standalone: true,
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class AutosizeVirtualScrollStrategy<
    T,
    U extends NgIterable<T> = NgIterable<T>
  >
  extends RxVirtualScrollStrategy<T, U>
  implements OnChanges, OnDestroy
{
  private readonly differs = inject(IterableDiffers);
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
   * The default size of the items being rendered. The autosized strategy will assume
   * this size for items it doesn't know yet. For the smoothest experience,
   * you provide the mean size of all items being rendered - if possible of course.
   *
   * As soon as rxVirtualFor is able to also render actual tombstone items, this
   * will be the size of a tombstone item being rendered before the actual item
   * is inserted into its position.
   */
  @Input() tombstoneSize = this.defaults?.itemSize ?? DEFAULT_ITEM_SIZE;

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

  /** @internal */
  private viewport: RxVirtualScrollViewport | null = null;
  /** @internal */
  private viewRepeater: RxVirtualViewRepeater<T, U> | null = null;
  /** @internal */
  private dataDiffer: IterableDiffer<T> | null = null;

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

  /** @internal */
  private readonly _renderedRange$ = new ReplaySubject<ListRange>(1);
  /** @internal */
  readonly renderedRange$ = this._renderedRange$.asObservable();
  /** @internal */
  private _renderedRange: ListRange = { start: 0, end: 0 };
  // range of items where size is known and doesn't need to be re-calculated
  /** @internal */
  private _cachedSet = new Set<number>();

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
   * is set, when scrollToIndex is called and the scroll event touches
   * the edge of the viewport at the bottom. This is the only event where
   * we actually have to `guess` the scroll anchor and might end up having
   * to adjust
   * @internal
   * */
  private _scrollToEdgeIndex: number | null = null;

  /**
   * is set, when scrollToIndex is called
   * @internal
   * */
  private _scrollToAnchor: AnchorItem | null = null;

  /** @internal */
  private containerSize = 0;
  /** @internal */
  private contentLength = 0;
  /** @internal */
  private _virtualItems: VirtualViewItem[] = [];
  /** @internal */
  private scrollTop = 0;
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
  private resizeObserver?: ResizeObserver;
  /** @internal */
  private readonly viewsResized$ = new Subject<ResizeObserverEntry[]>();
  /** @internal */
  private readonly afterViewResized$ = new Subject<void>();
  /** @internal */
  private readonly runwayStateChanged$ = new Subject<void>();

  /** @internal */
  private until$<A>(): MonoTypeOperatorFunction<A> {
    return (o$) => o$.pipe(takeUntil(this.detached$));
  }

  /** @internal */
  private get extractSize() {
    return this.resizeObserverConfig?.extractSize ?? defaultSizeExtract;
  }

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

  /** @internal */
  ngOnDestroy() {
    this.detach();
  }

  /** @internal */
  attach(
    viewport: RxVirtualScrollViewport,
    viewRepeater: RxVirtualViewRepeater<T, U>
  ): void {
    this.viewport = viewport;
    this.viewRepeater = viewRepeater;
    this.resizeObserver = new ResizeObserver((events) => {
      this.viewsResized$.next(events);
    });
    this.maintainVirtualItems();
    this.calcRenderedRange();
    this.positionElements();
  }

  /** @internal */
  detach(): void {
    this.viewport = null;
    this.viewRepeater = null;
    this._virtualItems = [];
    this.resizeObserver?.disconnect();
    this.resizeObserver = undefined;
    this.detached$.next();
  }

  scrollToIndex(index: number, behavior?: ScrollBehavior): void {
    const _index = Math.min(Math.max(index, 0), this.contentLength - 1);
    let size = 0;
    for (let i = 0; i < _index; i++) {
      size += this.getItemSize(i);
    }
    this._scrollToAnchor = {
      index: _index,
      offset: 0,
    };
    this._scrollToEdgeIndex = null;
    if (size + this.containerSize > this._contentSize) {
      this._scrollToEdgeIndex = _index;
      this._scrollToAnchor = this.calculateAnchoredItem(
        this._scrollToAnchor,
        -Math.max(size + this.containerSize - this._contentSize)
      );
    }
    this.viewport!.scrollTo(size, behavior);
  }

  /** @internal */
  private maintainVirtualItems(): void {
    // reset virtual viewport when opposite orientation to the scroll direction
    // changes, as we have to expect dimension changes for all items when this
    // happens. This could also be configurable as it maybe costs performance
    this.viewport!.containerRect$.pipe(
      filter(() => this._virtualItems.length > 0),
      map(({ width }) => width),
      distinctUntilChanged(),
      this.until$()
    ).subscribe(() => {
      // reset because we have no idea how items will behave
      let i = 0;
      let size = 0;
      this._cachedSet.clear();
      while (i < this.renderedRange.start) {
        this._virtualItems[i].size = 0;
        i++;
        size += this.tombstoneSize;
      }
      while (i >= this.renderedRange.start && i < this.renderedRange.end) {
        size += this._virtualItems[i].size;
        this._cachedSet.add(i);
        i++;
      }
      while (i < this.contentLength - 1) {
        this._virtualItems[i].size = 0;
        i++;
        size += this.tombstoneSize;
      }
      this.contentSize = size;
    });
    this.viewRepeater!.values$.pipe(this.until$()).subscribe((items) => {
      const changes = this.getDiffer(items)?.diff(items);
      if (changes) {
        // reset cache on update
        changes.forEachOperation(
          (item, adjustedPreviousIndex, currentIndex) => {
            if (item.previousIndex == null) {
              const entry = {
                size: 0,
              };
              if (
                currentIndex !== null &&
                currentIndex < this._virtualItems.length
              ) {
                this._virtualItems.splice(currentIndex, 0, entry);
              } else {
                this._virtualItems.push(entry);
              }
            } else if (currentIndex === null) {
              const removeIdx =
                adjustedPreviousIndex === null
                  ? this._virtualItems.length - 1
                  : adjustedPreviousIndex;
              removeFromArray(this._virtualItems, removeIdx);
              this._cachedSet.delete(removeIdx);
            } else if (adjustedPreviousIndex !== null) {
              this._virtualItems[currentIndex] =
                this._virtualItems[adjustedPreviousIndex];
            }
          }
        );
        changes.forEachIdentityChange(
          ({ currentIndex }) =>
            currentIndex && this._cachedSet.delete(currentIndex)
        );
      }
      if (!this._contentSize && this._virtualItems.length > 0) {
        this.contentSize = this._virtualItems.length * this.tombstoneSize;
      }
    });
  }

  /** @internal */
  private calcRenderedRange(): void {
    const dataLengthChanged$ = this.viewRepeater!.values$.pipe(
      map(
        (values) =>
          (Array.isArray(values)
            ? values
            : values != null
            ? Array.from(values)
            : []
          ).length
      ),
      distinctUntilChanged()
    );
    const onScroll$ = this.viewport!.elementScrolled$.pipe(
      coalesceWith(unpatchedAnimationFrameTick()),
      map(() => this.viewport!.getScrollTop()),
      startWith(0),
      tap((scrollTop) => {
        this.direction = scrollTop > this.scrollTop ? 'down' : 'up';
        this.scrollTop = scrollTop;
      })
    );
    combineLatest([
      dataLengthChanged$.pipe(
        tap((length) => {
          this.contentLength = length;
        })
      ),
      this.viewport!.containerRect$.pipe(
        map(({ height }) => height),
        distinctUntilChanged()
      ),
      onScroll$,
      this.afterViewResized$.pipe(startWith(void 0)),
      this.runwayStateChanged$.pipe(startWith(void 0)),
    ])
      .pipe(
        map(([length, containerSize]) => {
          this.containerSize = containerSize;
          const range = { start: 0, end: 0 };
          const delta = this.scrollTop - this.anchorScrollTop;
          if (this._scrollToAnchor) {
            this.anchorItem = this._scrollToAnchor;
            this._scrollToAnchor = null;
          } else {
            // reset scrollToIndex after consequent scroll or any other update
            if (this._scrollToEdgeIndex !== null) {
              this._scrollToEdgeIndex = null;
            }
            if (this.scrollTop == 0) {
              this.anchorItem = { index: 0, offset: 0 };
            } else {
              this.anchorItem = this.calculateAnchoredItem(
                this.anchorItem,
                delta
              );
            }
          }
          this.scrolledIndex = this.anchorItem.index;
          this.anchorScrollTop = this.scrollTop;
          this.lastScreenItem = this.calculateAnchoredItem(
            this.anchorItem,
            containerSize
          );
          if (this.direction === 'up') {
            range.start = Math.max(0, this.anchorItem.index - this.runwayItems);
            range.end = Math.min(
              length,
              this.lastScreenItem.index + this.runwayItemsOpposite
            );
          } else {
            range.start = Math.max(
              0,
              this.anchorItem.index - this.runwayItemsOpposite
            );
            range.end = Math.min(
              length,
              this.lastScreenItem.index + this.runwayItems
            );
          }
          return range;
        })
      )
      .pipe(
        distinctUntilChanged(
          ({ start: prevStart, end: prevEnd }, { start, end }) =>
            prevStart === start && prevEnd === end
        ),
        this.until$()
      )
      .subscribe((range: ListRange) => (this.renderedRange = range));
  }

  /** @internal */
  private positionElements(): void {
    this.viewRepeater!.renderingStart$.pipe(
      switchMap(() => {
        const renderedRange = this.renderedRange;
        const adjustIndexWith = renderedRange.start;
        let scrolledIndex: number | null = null;
        let position = 0;
        let renderedViews: {
          view: EmbeddedViewRef<any>;
          index: number;
          item: T;
        }[] = [];
        return merge(
          this.viewRepeater!.viewRendered$.pipe(
            tap(({ view, index: viewIndex, item }) => {
              const adjustedIndex = viewIndex + adjustIndexWith;
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
              this.updateElementSize(view, adjustedIndex);
              renderedViews.push({
                view,
                index: adjustedIndex,
                item,
              });
            }),
            // coalescing the layout to the next microtask
            // -> layout happens in the same tick as the scheduler. it will
            // be executed at the end and causes a forced reflow
            // to not have a reflow, we would need to let the browser stabilize the
            // current layout before reading `offsetHeight` of the nodes.
            // while the flames get smoother, other issues arise with that approach.
            // but here is def. room for improvement
            coalesceWith(unpatchedMicroTask()),
            map(() => {
              if (position === 0) {
                position = this.calcInitialPosition(renderedRange);
              }
              let lastIndex = 0;
              let scrollTo = this.anchorScrollTop;
              // update DOM happens here
              // layout should be stable by now, we are thrashing it again, though
              for (let i = 0; i < renderedViews.length; i++) {
                const { view, index, item } = renderedViews[i];
                const element = this.getElement(view);
                this.positionElement(element, position);
                if (index === this._scrollToEdgeIndex) {
                  scrollTo = position;
                  this._scrollToEdgeIndex = null;
                }
                position += this._virtualItems[index].size;
                if (scrolledIndex == null && position > this.scrollTop) {
                  scrolledIndex = index;
                }
                lastIndex = index;
                this.viewRenderCallback.next({
                  index,
                  view,
                  item,
                });
              }
              renderedViews = [];
              // this condition only covers the edge case when we scroll to the
              // lower edge of the viewport and we have to wait until the whole
              // renderedRange actually got rendered
              if (this._scrollToEdgeIndex === null) {
                this.contentSize =
                  position + this.getRemainingSizeFrom(lastIndex + 1);
                if (
                  scrolledIndex != null &&
                  scrolledIndex !== this.scrolledIndex
                ) {
                  this.scrolledIndex = scrolledIndex;
                }
                if (scrollTo !== this.scrollTop) {
                  const maxScrollTo = this._contentSize - this.containerSize;
                  if (
                    scrollTo >= maxScrollTo &&
                    Math.ceil(this.scrollTop) >= maxScrollTo
                  ) {
                    // just trigger re-calculation of the renderedRange in case this happens
                    this.afterViewResized$.next();
                  } else {
                    this.viewport!.scrollTo(scrollTo);
                  }
                } else if (
                  position < this.containerSize &&
                  lastIndex < this.contentLength
                ) {
                  this.afterViewResized$.next();
                }
              }
            })
          ),
          this.viewRepeater!.viewsRendered$.pipe(
            switchMap((views) =>
              this.observeViewSizes$(adjustIndexWith, views).pipe(
                tap((lowestId) => {
                  let i = lowestId;
                  const range = {
                    start: i + adjustIndexWith,
                    end: renderedRange.end,
                  };
                  let position = this.calcInitialPosition(range);
                  let index = range.start;
                  for (i; i < views.length; i++) {
                    const element = this.getElement(views[i]);
                    this.positionElement(element, position);
                    index = i + adjustIndexWith;
                    position += this.getItemSize(index);
                  }
                  this.contentSize =
                    position + this.getRemainingSizeFrom(index + 1);
                  this.afterViewResized$.next();
                })
              )
            )
          )
        );
      }),
      this.until$()
    ).subscribe();
  }

  /**
   * @internal
   * heavily inspired by
   *   https://github.com/GoogleChromeLabs/ui-element-samples/blob/gh-pages/infinite-scroller/scripts/infinite-scroll.js
   */
  private calculateAnchoredItem(
    initialAnchor: AnchorItem,
    delta: number
  ): AnchorItem {
    if (delta == 0) return initialAnchor;
    delta += initialAnchor.offset;
    let i = initialAnchor.index;
    let tombstones = 0;
    const items = this._virtualItems;
    if (delta < 0) {
      while (delta < 0 && i > 0 && items[i - 1].size) {
        delta += items[i - 1].size;
        i--;
      }
      tombstones = Math.max(
        -i,
        Math.ceil(Math.min(delta, 0) / this.tombstoneSize)
      );
    } else {
      while (
        delta > 0 &&
        i < this.contentLength &&
        items[i]?.size &&
        items[i].size < delta
      ) {
        delta -= items[i].size;
        i++;
      }
      if (i >= this.contentLength) {
        tombstones = 0;
      } else if (!items[i].size) {
        tombstones = Math.floor(Math.max(delta, 0) / this.tombstoneSize);
      }
    }
    i += tombstones;
    delta -= tombstones * this.tombstoneSize;
    return {
      index: Math.min(i, this.contentLength),
      offset: Math.max(0, delta),
    };
  }
  /** @internal */
  private calcInitialPosition(range: ListRange): number {
    let pos = 0;
    let i = 0;
    this.anchorScrollTop = 0;
    for (i = 0; i < this.anchorItem.index; i++) {
      this.anchorScrollTop += this.getItemSize(i);
    }
    this.anchorScrollTop += this.anchorItem.offset;

    // Calculate position of starting node
    pos = this.anchorScrollTop - this.anchorItem.offset;
    i = this.anchorItem.index;
    while (i > range.start) {
      const itemSize = this.getItemSize(i - 1);
      pos -= itemSize;
      i--;
    }
    while (i < range.start) {
      const itemSize = this.getItemSize(i);
      pos += itemSize;
      i++;
    }
    return pos;
  }

  /** @internal */
  private updateElementSize(view: EmbeddedViewRef<any>, index: number): number {
    const oldSize = this._virtualItems[index].size;
    const isCached = this._cachedSet.has(index) && oldSize > 0;
    const size = isCached
      ? oldSize
      : this.getElementSize(this.getElement(view));
    this._virtualItems[index] = { size };
    this._cachedSet.add(index);
    return size;
  }

  /** @internal */
  private observeViewSizes$(
    adjustIndexWith: number,
    views: EmbeddedViewRef<any>[]
  ): Observable<number> {
    const elementCache = new WeakMap<Element, number>();
    let lowestResizedId: number | undefined;
    for (let i = 0; i < views.length; i++) {
      const element = this.getElement(views[i]);
      this.resizeObserver!.observe(element, this.resizeObserverConfig?.options);
      elementCache.set(element, i);
    }
    return new Observable<number>((observer) => {
      const inner = this.viewsResized$.subscribe((events) => {
        events.forEach((event) => {
          if (!event.target.isConnected) {
            return;
          }
          const cachedId = elementCache.get(event.target);
          if (cachedId !== undefined) {
            const adjustedId = cachedId + adjustIndexWith;
            const size = Math.round(this.extractSize(event));
            if (this._virtualItems[adjustedId].size !== size) {
              lowestResizedId = Math.min(
                lowestResizedId ?? Number.MAX_SAFE_INTEGER,
                cachedId
              );
              this._virtualItems[adjustedId].size = size;
            }
          }
        });
        if (lowestResizedId !== undefined) {
          observer.next(lowestResizedId);
        }
      });
      return () => {
        for (let i = 0; i < views.length; i++) {
          const element = this.getElement(views[i]);
          this.resizeObserver?.unobserve(element);
        }
        inner.unsubscribe();
      };
    }).pipe(
      coalesceWith(unpatchedAnimationFrameTick()),
      map((lowestId) => {
        lowestResizedId = undefined;
        return lowestId;
      })
    );
  }

  /** @internal */
  private getRemainingSizeFrom(from: number): number {
    let remaining = 0;
    for (let i = from; i < this.contentLength; i++) {
      remaining += this.getItemSize(i);
    }
    return remaining;
  }

  /** @internal */
  private getItemSize(index: number): number {
    return this._virtualItems[index].size || this.tombstoneSize;
  }
  /** @internal */
  private getElementSize(element: HTMLElement): number {
    return element.offsetHeight;
  }
  /** @internal */
  private positionElement(element: HTMLElement, scrollTop: number): void {
    element.style.position = 'absolute';
    element.style.transform = `translateY(${scrollTop}px)`;
  }
  /** @internal */
  private getDiffer(values: U | null | undefined): IterableDiffer<T> | null {
    if (this.dataDiffer) {
      return this.dataDiffer;
    }
    return values
      ? (this.dataDiffer = this.differs
          .find(values)
          .create(this.viewRepeater!._trackBy))
      : null;
  }
}
