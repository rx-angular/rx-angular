import { coalesceWith } from '@rx-angular/cdk/coalescing';
import { distinctUntilSomeChanged } from '@rx-angular/state/selections';
import { distinctUntilKeyChanged } from 'rxjs/operators';
import {
  ListRange,
  RxVirtualScrollViewport,
  RxVirtualScrollStrategy,
  RxVirtualViewRepeater,
} from '../model';
import {
  Directive,
  EmbeddedViewRef,
  Input,
  IterableDiffer,
  IterableDiffers,
  NgIterable,
  NgZone,
  OnDestroy,
} from '@angular/core';
import {
  combineLatest,
  merge,
  ReplaySubject,
  scheduled,
  Subject,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
  takeUntil,
  tap,
  Observable,
  animationFrameScheduler,
} from 'rxjs';

/** @internal */
type VirtualViewItem = {
  size: number;
  tombstone?: boolean;
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
})
export class AutosizeVirtualScrollStrategy<
    T,
    U extends NgIterable<T> = NgIterable<T>
  >
  extends RxVirtualScrollStrategy<T, U>
  implements OnDestroy
{
  /**
   * @description
   * The amount of items to render upfront in scroll direction
   */
  @Input() runwayItems = 20;

  /**
   * @description
   * The amount of items to render upfront in reverse scroll direction
   */
  @Input() runwayItemsOpposite = 5;

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
  @Input() tombstoneSize = 50;

  /**
   * @description
   * Styles that will be applied to a DOM element when being positioned. A useful
   * example is if you want to implement a css based fade-in animation by setting
   * the opacity of the rendered item to 1 when getting position.
   *
   * @example
   * \@Component({
   *   template: `
   *    <rx-virtual-scroll-viewport
   *      autosized
   *      [enterStyles]="{opacity: '1'}"
   *    ></rx-virtual-scroll-viewport>
   *   `,
   *   styles: [`
   *    .item {
   *      opacity: 0;
   *      transition: opacity 125ms linear;
   *    }
   *   `]
   * })
   * export class VirtualComponent {}
   */
  @Input() enterStyles?: Record<keyof CSSStyleDeclaration, string>;

  /**
   * @description
   * The autosized strategy uses the native ResizeObserver in order to determine
   * if an item changed in size to afterwards properly position the views.
   * You can customize the config passed to the ResizeObserver as well as determine
   * which result property to use when determining the views size.
   */
  @Input() resizeObserverConfig: {
    options?: ResizeObserverOptions;
    extractSize?: (entries: ResizeObserverEntry[]) => number;
  } = {
    extractSize: (entries) => entries[0].contentRect.height,
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
  readonly contentSize$ = this._contentSize$.asObservable();

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
  renderedRange$ = this._renderedRange$.asObservable();
  /** @internal */
  private _renderedRange: ListRange = { start: 0, end: 0 };
  // range of items where size is known and doesn't need to be re-calculated
  /** @internal */
  private _cachedRange: ListRange | null = null;

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
  scrolledIndex$ = this._scrolledIndex$.asObservable();
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

  /** @internal */
  private containerSize = 0;
  /** @internal */
  private contentLength = 0;
  /** @internal */
  private _virtualItems: VirtualViewItem[] = [];
  /** @internal */
  private scrollTop = 0;
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
  private until$ = (o$) => o$.pipe(takeUntil(this.detached$));

  /** @internal */
  constructor(private differs: IterableDiffers, private ngZone: NgZone) {
    super();
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
    this.calcRenderedRange();
    this.maintainVirtualItems();
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
    let offset = 0;
    for (let i = 0; i < _index; i++) {
      offset += this._virtualItems[i].size || this.tombstoneSize;
    }
    this.viewport.scrollTo(offset, behavior);
  }

  /** @internal */
  private maintainVirtualItems(): void {
    this.viewRepeater.values$.pipe(this.until$).subscribe((items: any[]) => {
      const changes = this.getDiffer(items).diff(items);
      if (changes) {
        // reset cache on update
        this._cachedRange = null;
        changes.forEachOperation(
          (item, adjustedPreviousIndex, currentIndex) => {
            if (item.previousIndex == null) {
              const entry = {
                size: 0,
                tombstone: true,
              };
              if (currentIndex < this._virtualItems.length) {
                this._virtualItems.splice(currentIndex, 0, entry);
              } else {
                this._virtualItems.push(entry);
              }
            } else if (currentIndex == null) {
              const removeIdx =
                adjustedPreviousIndex == null
                  ? this._virtualItems.length - 1
                  : adjustedPreviousIndex;
              removeFromArray(this._virtualItems, removeIdx);
            } else if (adjustedPreviousIndex !== null) {
              this._virtualItems[currentIndex] =
                this._virtualItems[adjustedPreviousIndex];
            }
          }
        );
      }
    });
  }

  /** @internal */
  private calcRenderedRange(): void {
    const dataLengthChanged$ = this.viewRepeater.values$.pipe(
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
    const onScroll$ = this.viewport.elementScrolled$.pipe(
      map(() => this.viewport.getScrollTop()),
      distinctUntilChanged(),
      startWith(0),
      tap((_scrollTop) => {
        this.scrollTop = _scrollTop;
      })
    );
    merge(
      combineLatest([
        dataLengthChanged$.pipe(
          tap((length) => {
            this.contentLength = length;
          })
        ),
        this.viewport.containerSize$,
        onScroll$,
      ]).pipe(
        map(([length, containerHeight]) => {
          this.containerSize = containerHeight;
          const range = { start: 0, end: 0 };

          const delta = this.scrollTop - this.anchorScrollTop;
          if (this.scrollTop == 0) {
            this.anchorItem = { index: 0, offset: 0 };
          } else {
            this.anchorItem = this.calculateAnchoredItem(
              this.anchorItem,
              delta
            );
          }
          this.scrolledIndex = this.anchorItem.index;
          this.anchorScrollTop = this.scrollTop;
          this.lastScreenItem = this.calculateAnchoredItem(
            this.anchorItem,
            containerHeight
          );
          if (delta < 0) {
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
    )
      .pipe(distinctUntilSomeChanged(['start', 'end']), this.until$)
      .subscribe((range: ListRange) => (this.renderedRange = range));
  }

  /** @internal */
  private positionElements(): void {
    this.viewRepeater.renderingStart$
      .pipe(
        switchMap(() => {
          const renderedRange = this.renderedRange;
          const adjustIndexWith = renderedRange.start;
          let scrolledIndex = null;
          let remainingSize = 0;
          let position = 0;
          return merge(
            this.viewRepeater.viewRendered$.pipe(
              map(({ view, index: viewIndex, item }, idx) => {
                const index = viewIndex + adjustIndexWith;
                if (idx === 0) {
                  position = this.calcInitialPosition(renderedRange);
                  for (let i = index; i < this.contentLength; i++) {
                    remainingSize += this.getItemSize(i);
                  }
                }
                remainingSize -= this.getItemSize(index);
                position += this.adjustElementPosition({
                  index,
                  position,
                  view,
                });
                this.updateCachedRange(index);
                if (scrolledIndex == null && position > this.scrollTop) {
                  scrolledIndex = index;
                }
                if (scrolledIndex != null) {
                  this.scrolledIndex = scrolledIndex;
                }
                this.contentSize = position + remainingSize;
                if (this.anchorScrollTop !== this.scrollTop) {
                  this.viewport.scrollTo(this.anchorScrollTop);
                }
                this.viewRenderCallback.next({
                  index,
                  view,
                  item,
                });
              })
            ),
            this.viewRepeater.viewsRendered$.pipe(
              switchMap((views) =>
                merge(
                  ...views.map((view, index) =>
                    this.observeViewSize$(view, index, index + adjustIndexWith)
                  )
                ).pipe((o$) => {
                  const _resized = new Map<
                    number,
                    {
                      view: EmbeddedViewRef<any>;
                      index: number;
                      size: number;
                      adjustedIndex: number;
                    }
                  >();
                  return o$.pipe(
                    tap((v) => _resized.set(v.index, v)),
                    coalesceWith(this.animationFrameTick()),
                    tap(() => {
                      const sortedIds = Array.from(_resized.keys()).sort(
                        (a, b) => a - b
                      );
                      let i = sortedIds[0];
                      const first = _resized.get(i);
                      const range = {
                        start: first.adjustedIndex,
                        end: renderedRange.end,
                      };
                      let position = this.calcInitialPosition(range);
                      for (i; i < views.length; i++) {
                        const index = i + adjustIndexWith;
                        position += this.adjustElementPosition({
                          view: views[i],
                          index,
                          position,
                          viewSize: _resized.get(i)?.size,
                        });
                        if (
                          position < this.scrollTop &&
                          index >= this.scrolledIndex
                        ) {
                          this.scrolledIndex = index + 1;
                        } else if (
                          index < this.scrolledIndex &&
                          position > this.scrollTop
                        ) {
                          this.scrolledIndex = index;
                        }
                      }
                      this.contentSize = position + remainingSize;
                      _resized.clear();
                    })
                  );
                })
              )
            )
          );
        }),
        this.until$
      )
      .subscribe();
  }

  /**
   * @internal
   * heavily inspired by https://github.com/GoogleChromeLabs/ui-element-samples/blob/gh-pages/infinite-scroller/scripts/infinite-scroll.js
   */
  private calculateAnchoredItem(initialAnchor, delta): AnchorItem {
    if (delta == 0) return initialAnchor;
    delta += initialAnchor.offset;
    let i = initialAnchor.index;
    let tombstones = 0;
    const items = this._virtualItems;
    if (delta < 0) {
      while (delta < 0 && i > 0 && items[i - 1]?.size) {
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
      } else if (!items[i]?.size) {
        tombstones = Math.floor(Math.max(delta, 0) / this.tombstoneSize);
      }
    }
    i += tombstones;
    delta -= tombstones * this.tombstoneSize;
    return {
      index: Math.min(i, this.contentLength),
      offset: delta,
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
  private adjustElementPosition({
    index,
    view,
    viewSize,
    position,
  }: {
    position: number;
    view: EmbeddedViewRef<any>;
    index: number;
    viewSize?: number;
  }): number {
    const element = this.getElement(view);
    const oldSize = this._virtualItems[index].size;
    let size = viewSize;
    if (!size) {
      const isCached =
        this._cachedRange &&
        index >= this._cachedRange.start &&
        index <= this._cachedRange.end;
      size = isCached && oldSize ? oldSize : this.getElementSize(element);
    }
    this.positionElement(element, position);
    this._virtualItems[index] = {
      size: size,
    };
    return size;
  }
  /** @internal */
  private observeViewSize$(
    view: EmbeddedViewRef<any>,
    index: number,
    adjustedIndex: number
  ): Observable<{
    view: EmbeddedViewRef<any>;
    index: number;
    size: number;
    adjustedIndex: number;
  }> {
    return observeElementSize(this.getElement(view), {
      extract: (entries) => {
        return {
          target: entries[0].target,
          size: this.resizeObserverConfig.extractSize(entries),
        };
      },
      options: this.resizeObserverConfig.options,
    }).pipe(
      filter(
        ({ target, size }) =>
          target.isConnected &&
          Math.ceil(size) !== this._virtualItems[adjustedIndex].size
      ),
      map(({ size }) => ({
        size: Math.ceil(size),
        view,
        index,
        adjustedIndex,
      })),
      distinctUntilKeyChanged('size')
    );
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
    if (this.enterStyles) {
      Object.keys(this.enterStyles).forEach((style) => {
        element.style[style] = this.enterStyles[style];
      });
    }
  }
  /** @internal */
  private updateCachedRange(index: number): void {
    if (!this._cachedRange) {
      this._cachedRange = {
        start: index,
        end: index,
      };
    } else {
      this._cachedRange = {
        start: Math.min(this._cachedRange.start, index),
        end: Math.max(this._cachedRange.end, index),
      };
    }
  }
  /** @internal */
  private getDiffer(values: unknown[]): IterableDiffer<unknown> | null {
    if (this.dataDiffer) {
      return this.dataDiffer;
    }
    return values
      ? (this.dataDiffer = this.differs
          .find(values)
          .create(this.viewRepeater._trackBy))
      : null;
  }
  /** @internal */
  private animationFrameTick() {
    return this.ngZone.runOutsideAngular(() =>
      scheduled([], animationFrameScheduler)
    );
  }
}

import { NgModule } from '@angular/core';
import { observeElementSize } from '../observe-element-size';

@NgModule({
  imports: [],
  exports: [AutosizeVirtualScrollStrategy],
  declarations: [AutosizeVirtualScrollStrategy],
  providers: [],
})
export class AutosizeVirtualScrollStrategyModule {}
