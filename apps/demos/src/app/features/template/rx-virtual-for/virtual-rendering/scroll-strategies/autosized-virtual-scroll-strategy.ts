import { coalesceWith } from '@rx-angular/cdk/coalescing';
import { distinctUntilSomeChanged } from '@rx-angular/state/selections';
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
export class AutosizeVirtualScrollStrategy
  implements RxVirtualScrollStrategy, OnDestroy
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
  private viewRepeater: RxVirtualViewRepeater<any> | null = null;
  private dataDiffer: IterableDiffer<any> | null = null;

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

  private readonly _scrolledIndex$ = new ReplaySubject<number>(1);
  scrolledIndex$ = this._scrolledIndex$.asObservable();
  private _scrolledIndex = 0;
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

  private readonly destroy$ = new Subject<void>();
  private readonly detached$ = new Subject<void>();

  private until$ = (o$) =>
    o$.pipe(takeUntil(merge(this.destroy$, this.detached$)));

  constructor(private differs: IterableDiffers) {}

  ngOnDestroy() {
    this.destroy$.next();
  }

  attach(
    viewport: RxVirtualScrollViewport,
    viewRepeater: RxVirtualViewRepeater<any>
  ): void {
    this.viewport = viewport;
    this.viewRepeater = viewRepeater;

    this.onDataChanged();
    this.onContentScrolled();
    this.onContentRendered();
  }

  detach(): void {
    this.viewport = null;
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

  private onDataChanged(): void {
    this.dataDiffer = this.differs.find([]).create(this.viewRepeater._trackBy);
    this.viewRepeater.values$.pipe(this.until$).subscribe((items: any[]) => {
      const diff = this.dataDiffer.diff(items);
      if (diff) {
        diff.forEachOperation((item, adjustedPreviousIndex, currentIndex) => {
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
        });
      }
    });
  }

  private onContentScrolled(): void {
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
      // coalesceWith(scheduled([], animationFrameScheduler)),
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

  // heavily inspired by https://github.com/GoogleChromeLabs/ui-element-samples/blob/gh-pages/infinite-scroller/scripts/infinite-scroll.js
  private calculateAnchoredItem(initialAnchor, delta): AnchorItem {
    if (delta == 0) return initialAnchor;
    delta += initialAnchor.offset;
    let i = initialAnchor.index;
    let tombstones = 0;
    const items = this._virtualItems;
    if (delta < 0) {
      while (delta < 0 && i > 0 && items[i - 1].height) {
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
        i < items.length &&
        items[i].height &&
        items[i].height < delta
      ) {
        delta -= items[i].height;
        i++;
      }
      if (i >= items.length) {
        tombstones = 0;
      } else if (!items[i].height) {
        tombstones = Math.floor(Math.max(delta, 0) / this.tombstoneSize);
      }
    }
    i += tombstones;
    delta -= tombstones * this.tombstoneSize;
    return {
      index: Math.min(i, items.length),
      offset: delta,
    };
  }

  private onContentRendered(): void {
    this.viewRepeater.contentRendered$
      .pipe(
        switchMap((views) => {
          this.adjustElementPositions({
            views,
            index: 0,
            adjusted: false,
          });
          const renderedRange = {
            ...this.renderedRange,
          };
          return merge(
            ...views.map((view, index) => {
              const adjustedIndex = index + renderedRange.start;
              return observeElementSize(
                view.rootNodes[0],
                (entries) => {
                  return entries[0];
                }
                // { box: 'border-box' }
              ).pipe(
                distinctUntilChanged(),
                filter(
                  (entry) =>
                    (entry as ResizeObserverEntry).target.isConnected &&
                    (entry as ResizeObserverEntry).borderBoxSize[0]
                      .blockSize !==
                      (this._virtualItems[adjustedIndex]?.height ||
                        this.tombstoneSize)
                ),
                map(() => ({
                  view,
                  index,
                }))
              );
            })
          ).pipe(
            scan((sizeAdjusts, adjust) => {
              sizeAdjusts.push(adjust);
              return sizeAdjusts;
            }, []),
            coalesceWith(scheduled([], asyncScheduler)),
            map((adjusts) => ({
              adjusted: true,
              views,
              index: adjusts.sort((a, b) => a.index - b.index)[0].index,
            })),
            filter(({ views }) => !!views),
            takeUntil(this.viewRepeater.beforeContentRendered$)
          );
        }),
        this.until$
      )
      .subscribe(this.adjustElementPositions.bind(this));
  }

  private adjustElementPositions({
    views,
    index,
  }: {
    adjusted: boolean;
    views: EmbeddedViewRef<any>[];
    index: number;
  }): void {
    const renderedRange = this.renderedRange;
    const updatedRange = {
      ...this.renderedRange,
      start: this.renderedRange.start + index,
    };
    let i = index;
    const end = views.length;
    let renderedSize = 0;
    const adjustIndexWith = renderedRange.start;
    let scrolledIndex;
    const elements = [];
    // get height of all rendered elements in range
    let heightChanged = false;
    for (i; i < end; i++) {
      const view = views[i];
      const { size, element } = this._getElementAndSize(view);
      elements[i] = element;
      const itemIndex = i + adjustIndexWith;
      const item = this._virtualItems[itemIndex];
      if (item.height != size) {
        this._virtualItems[itemIndex] = {
          height: size,
        };
        heightChanged = true;
      }
    }

    // Fix scroll position in case we have realized the heights of elements
    // that we didn't used to know.
    /* if (heightChanged) {
     this.anchorScrollTop = 0;
     for (i = 0; i < this.anchorItem.index; i++) {
     this.anchorScrollTop +=
     this._virtualViewContainer.items[i].height || this.tombstoneSize;
     }
     this.anchorScrollTop += this.anchorItem.offset;
     }*/

    this.anchorScrollTop = 0;
    for (i = 0; i < this.anchorItem.index; i++) {
      this.anchorScrollTop +=
        this._virtualItems[i].height || this.tombstoneSize;
    }
    this.anchorScrollTop += this.anchorItem.offset;

    // Position all nodes.
    let curPos = this.anchorScrollTop - this.anchorItem.offset;
    i = this.anchorItem.index;
    while (i > updatedRange.start) {
      curPos -= this._virtualItems[i - 1].height || this.tombstoneSize;
      i--;
    }
    while (i < updatedRange.start) {
      curPos += this._virtualItems[i].height || this.tombstoneSize;
      i++;
    }
    i = index;
    for (i; i < end; i++) {
      const adjustedIndex = i + adjustIndexWith;
      const item = this._virtualItems[adjustedIndex];
      this._positionView(elements[i], curPos);
      this._virtualItems[adjustedIndex] = {
        height: item.height,
      };
      renderedSize += item.height;
      curPos += item.height;
      if (scrolledIndex == null && curPos > this.scrollTop) {
        scrolledIndex = i + adjustIndexWith;
      }
    }
    if (scrolledIndex != null) {
      this.scrolledIndex = scrolledIndex;
    }
    let size = 0;
    for (i = 0; i < this.contentLength; i++) {
      const item = this._virtualItems[i];
      size += item?.height || this.tombstoneSize;
    }
    this.contentSize = size;
    if (this.anchorScrollTop !== this.scrollTop) {
      this.viewport.scrollTo(this.anchorScrollTop);
    }
  }

  private _getElementAndSize(view: EmbeddedViewRef<any>): {
    element: HTMLElement;
    size: number;
  } {
    const element = view.rootNodes[0] as HTMLElement;
    return {
      element,
      size: element.offsetHeight,
    };
  }

  private _positionView(element: HTMLElement, scrollTop: number): void {
    // element.style.opacity = '1';
    element.style.transform = `translateY(${scrollTop}px)`;
    element.style.position = 'absolute';
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
