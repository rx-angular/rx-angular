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
  OnDestroy,
} from '@angular/core';
import {
  asyncScheduler,
  combineLatest,
  merge,
  ReplaySubject,
  scan,
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

type VirtualViewItem = {
  height: number;
  width?: number;
  tombstone?: boolean;
};

type AnchorItem = {
  index: number;
  offset: number;
};

function removeFromArray(arr: any[], index: number): any {
  // perf: array.pop is faster than array.splice!
  if (index >= arr.length - 1) {
    return arr.pop();
  } else {
    return arr.splice(index, 1)[0];
  }
}

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
   * The amount of items to render upfront in scroll direction
   */
  @Input() runwayItems = 20;

  /**
   * The amount of items to render upfront in reverse scroll direction
   */
  @Input() runwayItemsOpposite = 5;

  @Input() tombstoneSize = 50;

  private viewport: RxVirtualScrollViewport | null = null;
  private viewRepeater: RxVirtualViewRepeater<T, U> | null = null;
  private dataDiffer: IterableDiffer<T> | null = null;

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
  // range of items where size is known and doesn't need to be re-calculated
  private _cachedRange: ListRange | null = null;

  private set renderedRange(range: ListRange) {
    this._renderedRange = range;
    this._renderedRange$.next(range);
  }
  private get renderedRange(): ListRange {
    return this._renderedRange;
  }

  private readonly _scrolledIndex$ = new ReplaySubject<number>(1);
  scrolledIndex$ = this._scrolledIndex$.asObservable();
  private _scrolledIndex = 0;
  private get scrolledIndex(): number {
    return this._scrolledIndex;
  }
  private set scrolledIndex(index: number) {
    this._scrolledIndex = index;
    this._scrolledIndex$.next(index);
  }

  private containerSize = 0;
  private contentLength = 0;

  private _virtualItems: VirtualViewItem[] = [];

  private scrollTop = 0;
  private direction: 'up' | 'down' = 'down';
  private anchorScrollTop = 0;
  private anchorItem = {
    index: 0,
    offset: 0,
  };
  private lastScreenItem = {
    index: 0,
    offset: 0,
  };

  private readonly detached$ = new Subject<void>();

  private until$ = (o$) => o$.pipe(takeUntil(this.detached$));

  constructor(private differs: IterableDiffers) {
    super();
  }

  ngOnDestroy() {
    this.detach();
  }

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
      offset += this._virtualItems[i].height || this.tombstoneSize;
    }
    this.viewport.scrollTo(offset, behavior);
  }

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
                height: 0,
                width: 0,
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
          this.direction = delta >= 0 ? 'down' : 'up';
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
                    coalesceWith(scheduled([], animationFrameScheduler)),
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

  // heavily inspired by https://github.com/GoogleChromeLabs/ui-element-samples/blob/gh-pages/infinite-scroller/scripts/infinite-scroll.js
  private calculateAnchoredItem(initialAnchor, delta): AnchorItem {
    if (delta == 0) return initialAnchor;
    delta += initialAnchor.offset;
    let i = initialAnchor.index;
    let tombstones = 0;
    const items = this._virtualItems;
    if (delta < 0) {
      while (delta < 0 && i > 0 && items[i - 1]?.height) {
        delta += items[i - 1].height;
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
        items[i]?.height &&
        items[i].height < delta
      ) {
        delta -= items[i].height;
        i++;
      }
      if (i >= this.contentLength) {
        tombstones = 0;
      } else if (!items[i]?.height) {
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
    const oldSize = this._virtualItems[index].height;
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
      height: size,
    };
    return size;
  }

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
        return entries[0];
      },
    }).pipe(
      filter(
        ({ target, contentRect, borderBoxSize }) =>
          target.isConnected &&
          Math.ceil(borderBoxSize[0].blockSize) !==
            this._virtualItems[adjustedIndex].height
      ),
      map(({ contentRect, borderBoxSize }) => ({
        size: Math.ceil(borderBoxSize[0].blockSize),
        view,
        index,
        adjustedIndex,
      })),
      distinctUntilKeyChanged('size')
    );
  }

  private getItemSize(index: number): number {
    return this._virtualItems[index].height || this.tombstoneSize;
  }

  private getElementSize(element: HTMLElement): number {
    return element.offsetHeight;
  }

  private positionElement(element: HTMLElement, scrollTop: number): void {
    element.style.position = 'absolute';
    element.style.transform = `translateY(${scrollTop}px)`;
  }

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
