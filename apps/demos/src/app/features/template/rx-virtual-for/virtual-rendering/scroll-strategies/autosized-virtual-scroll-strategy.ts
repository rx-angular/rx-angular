import { coalesceWith } from '@rx-angular/cdk/coalescing';
import { distinctUntilSomeChanged } from '@rx-angular/cdk/state';
import { animationFrameScheduler } from '@rx-angular/cdk/zone-less';
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
  combineLatest,
  merge,
  ReplaySubject,
  scan,
  scheduled,
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

type VirtualViewItem = {
  height: number;
  width?: number;
  tombstone?: boolean;
};

type AnchorItem = {
  index: number;
  offset: number;
};

@Directive({
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
  private _scrolledIndex: number = 0;
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
  private tombstoneSize = 50;
  private anchorItem = {
    index: 0,
    offset: 0,
  };
  private rangeRendered: ListRange = { start: 0, end: 0 };

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

    /*
     * scroll
     *   calc range
     * render
     *    calc heights
     *    position
     *    adjust viewport height
     *    adjust scrollposition
     *
     */

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
      // we want to adjust our heightMap with the new items
      // TODO: move & delete need to be handled as well
      const diff = this.dataDiffer.diff(items);
      if (diff) {
        const moveCache = new Map<
          number,
          VirtualViewItem & { restoreTo: number }
        >();
        diff.forEachOperation((item, adjustedPreviousIndex, currentIndex) => {
          if (item.previousIndex == null) {
            this._virtualItems[currentIndex] = {
              height: 0,
              width: 0,
              tombstone: true,
            };
          } else if (currentIndex == null) {
            this._virtualItems.splice(adjustedPreviousIndex, 1);
          } else if (adjustedPreviousIndex !== null) {
            const entry =
              moveCache.get(adjustedPreviousIndex) ||
              this._virtualItems[adjustedPreviousIndex];
            moveCache.delete(adjustedPreviousIndex);
            const toCache = {
              ...this._virtualItems[currentIndex],
              restoreTo: adjustedPreviousIndex,
            };
            moveCache.set(currentIndex, toCache);
            this._virtualItems[currentIndex] = entry;
          }
        });
        if (moveCache.size) {
          for (const [index, entry] of moveCache) {
            this._virtualItems[entry.restoreTo] = entry;
          }
        }
        moveCache.clear();
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
      coalesceWith(scheduled([], animationFrameScheduler)),
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
          const lastScreenItem = this.calculateAnchoredItem(
            this.anchorItem,
            containerHeight
          );
          this.direction = delta < 0 ? 'down' : 'up';
          if (delta < 0) {
            range.start = Math.max(0, this.anchorItem.index - this.runwayItems);
            range.end = Math.min(
              length,
              lastScreenItem.index + this.runwayItemsOpposite
            );
          } else {
            range.start = Math.max(
              0,
              this.anchorItem.index - this.runwayItemsOpposite
            );
            range.end = Math.min(
              length,
              lastScreenItem.index + this.runwayItems
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
          return merge(
            ...views.map((view, index) => {
              const adjustedIndex = index + this.renderedRange.start;
              return observeElementSize(
                view.rootNodes[0],
                (entries) => entries[0].borderBoxSize[0].blockSize,
                { box: 'border-box' }
              ).pipe(
                distinctUntilChanged(),
                filter(
                  () =>
                    view.rootNodes[0].offsetHeight !==
                    this._virtualItems[adjustedIndex].height
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
            coalesceWith(scheduled([], animationFrameScheduler)),
            map((adjusts) => ({
              adjusted: true,
              views,
              index: adjusts.sort((a, b) => a.index - b.index)[0].index,
            })),
            startWith({
              adjusted: false,
              views,
              index: 0,
            }),
            filter(({ views }) => !!views)
          );
        }),
        this.until$
      )
      .subscribe(({ adjusted, views, index }) => {
        const updatedRange = {
          ...this.renderedRange,
          start: this.renderedRange.start + index,
        };
        const renderedRange = this.renderedRange;
        let i = index;
        let end = views.length;
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
            item.height = size;
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
        this.rangeRendered = this.renderedRange;
      });
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
    element.style.position = 'absolute';
    element.style.transform = `translateY(${scrollTop}px)`;
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
