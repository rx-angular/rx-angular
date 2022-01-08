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
  auditTime,
  combineLatest,
  EMPTY,
  merge,
  ReplaySubject,
  scan,
  scheduled,
  Subject,
} from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  ignoreElements,
  map,
  skip,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';

type VirtualViewItem = {
  height: number;
  scrollTop: number;
  sampled?: boolean;
};

class VirtualViewContainer {
  totalHeight = 0;
  items: Record<number, VirtualViewItem> = {};

  get size(): number {
    return Object.keys(this.items).length;
  }

  get(index: number): VirtualViewItem | null {
    return this.items[index] || null;
  }

  set(index: number, item: VirtualViewItem) {
    this.totalHeight += item.height - (this.items[index]?.height || 0);
    this.items[index] = item;
    /*if (index <= (this.firstItem?.index || 0)) {
      this.firstItem = { ...item, index };
    }
    if (index >= (this.lastItem?.index || 0)) {
      this.lastItem = { ...item, index };
    }*/
  }

  delete(index: number) {
    const item = this.items[index];
    if (item) {
      this.totalHeight -= item.height;
      delete this.items[index];
    }
  }

  clear() {
    this.items = {};
    this.totalHeight = 0;
  }
}

function toDecimal(value: number): number {
  return parseFloat(value.toFixed(2));
}

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
   * The amount of buffer (in px) to render on either side of the viewport
   */
  @Input() buffer = 150;

  private viewport: RxVirtualScrollViewport | null = null;
  private viewRepeater: RxVirtualViewRepeater<any> | null = null;
  private readonly averager = new ItemSizeAverager();
  private dataDiffer: IterableDiffer<any> | null = null;
  private readonly rangeAdjust$ = new Subject<ListRange>();

  private readonly _contentSize$ = new ReplaySubject<number>(1);
  readonly contentSize$ = this._contentSize$.asObservable();

  private _contentSize = 0;
  private set contentSize(size: number) {
    this._contentSize = size;
    this._contentSize$.next(size);
  }
  private get contentSize(): number {
    return this._contentSize;
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

  private _virtualViewContainer: VirtualViewContainer;

  private scrollTop = 0;
  private scrollDelta = 0;
  private direction: 'up' | 'down' = 'down';
  private currentOffset = 0;
  private lastScrollAverage = this.averager.getAverageItemSize();
  private anchorTop = 0;

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
    this._virtualViewContainer = new VirtualViewContainer();

    /*
     * scroll
     *   calc range (with average)
     * render
     * calc heights
     * calc average
     * adjust viewport height
     * position
     * adjust scrollposition
     *
     */

    this.onDataChanged();
    this.onContentScrolled();
    this.onContentRendered();
  }

  detach(): void {
    this.viewport = null;
    this._virtualViewContainer.clear();
    this._virtualViewContainer = null;
    this.detached$.next();
  }

  scrollToIndex(index: number, behavior?: ScrollBehavior): void {
    const _index = Math.min(Math.max(index, 0), this.contentLength - 1);
    this.viewport.scrollTo(this.scrollTopUntil(_index), behavior);
  }

  private setContentSize(): void {
    this.contentSize = this._virtualViewContainer.totalHeight;
    // this.contentSize = this.contentLength * this.averager.getAverageItemSize();
  }

  private onDataChanged(): void {
    this.dataDiffer = this.differs.find([]).create(this.viewRepeater._trackBy);
    this.viewRepeater.values$.pipe(this.until$).subscribe((items: any[]) => {
      let _scrollTop;
      const averageSize = this.averager.getAverageItemSize();
      // we want to adjust our heightMap with the new items
      // TODO: move & delete need to be handled as well

      this.dataDiffer.diff(items)?.forEachAddedItem(({ currentIndex }) => {
        _scrollTop =
          _scrollTop == null
            ? this.scrollTopUntil(currentIndex)
            : _scrollTop || 0;
        this._virtualViewContainer.set(currentIndex, {
          height: averageSize,
          scrollTop: _scrollTop,
          sampled: true,
        });
        _scrollTop += averageSize;
      });
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
        // TODO: improve this
        this.direction = _scrollTop >= this.scrollTop ? 'down' : 'up';
        this.scrollDelta = _scrollTop - this.scrollTop;
        this.scrollTop = _scrollTop;
        console.group('scroll');
        console.log('scrollTop', this.scrollTop);
        console.log('scrollDelta', this.scrollDelta);
        console.log('direction', this.direction);
        console.groupEnd();
      })
    );
    merge(
      combineLatest([
        dataLengthChanged$.pipe(
          tap((length) => {
            this.contentLength = length;
            this.setContentSize();
          })
        ),
        this.viewport.containerSize$,
        onScroll$,
      ]).pipe(
        map(([length, containerHeight]) => {
          console.group('onScroll');
          this.containerSize = containerHeight;
          const oldRange = this.renderedRange;
          const range = {
            ...oldRange,
            end: oldRange.end === 0 ? length : oldRange.end,
          };
          const scrollTopWithBuffer = this.scrollTop + this.buffer;
          const delta = this.scrollTop - this.anchorTop;
          if (delta >= 0) {
            let j = oldRange.start;
            range.end = length;
            let scrollTop = this.anchorTop;
            for (j; j < length; j++) {
              const item = this._virtualViewContainer.get(j);
              scrollTop += item.height;
              if (scrollTop + this.buffer <= this.scrollTop) {
                range.start = j;
              } else if (scrollTop > containerHeight + scrollTopWithBuffer) {
                range.end = j;
                break;
              }
            }
          } else {
            let j = Math.max(oldRange.end - 1, 0);
            range.start = 0;
            for (j; j >= 0; j--) {
              const item = this._virtualViewContainer.get(j);
              if (item.scrollTop > containerHeight + scrollTopWithBuffer) {
                range.end = j;
              } else if (
                item.scrollTop + item.height + this.buffer <=
                this.scrollTop
              ) {
                range.start = j;
                break;
              }
            }
          }
          /*let scrolledIndex;
          let scrollTopAcc = 0;
          const avg = this.lastScrollAverage;
          for (i; i < length; i++) {
            const entry = this._virtualViewContainer.get(i);
            const entryPos = entry.scrollTop + entry.height;
            if (entryPos + this.buffer <= adjustedScrollTop) {
              range.start = i;
            } else if (
              entry.scrollTop >
              containerHeight + scrollTopWithBuffer
            ) {
              range.end = i;
              break;
            }
            scrollTopAcc += entry.height;
            if (scrolledIndex == null && scrollTopAcc > adjustedScrollTop) {
              scrolledIndex = i;
            }
          }
          this.scrolledIndex = scrolledIndex;
          this.lastScrollAverage = this.averager.getAverageItemSize();
          console.log('scrolledIndex after scroll', scrolledIndex);*/
          console.log('renderedRange', oldRange, '->', range);
          console.groupEnd();
          return range;
        })
      ),
      this.rangeAdjust$
    )
      .pipe(distinctUntilSomeChanged(['start', 'end']), this.until$)
      .subscribe((range: ListRange) => (this.renderedRange = range));
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
                    this._virtualViewContainer.get(adjustedIndex).height
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
            // ignoreElements(),
            // takeUntil(this.renderedRange$.pipe(skip(1))),
            startWith({
              adjusted: false,
              views,
              index: 0,
            })
          );
        }),
        this.until$
      )
      .subscribe(({ adjusted, views, index }) => {
        console.group('rendering');
        const updatedRange = {
          ...this.renderedRange,
          start: this.renderedRange.start + index,
        };
        const renderedRange = this.renderedRange;
        let scrollTopUntil = this.scrollTopUntil(updatedRange.start);
        console.log('scrollTopUntil', scrollTopUntil);
        console.log('renderedRange', renderedRange);
        let renderedSize = 0;
        let i = index;
        let end = views.length;
        let expectedHeight = 0;
        const adjustIndexWith = renderedRange.start;

        let scrolledIndex;
        for (i; i < end; i++) {
          const adjustedIndex = i + adjustIndexWith;
          expectedHeight +=
            this._virtualViewContainer.get(adjustedIndex)?.height;
          const _size = this._setViewHeight(
            views[i],
            adjustedIndex,
            scrollTopUntil
          );
          renderedSize += _size;
          scrollTopUntil += _size;
          if (scrolledIndex == null && scrollTopUntil > this.scrollTop) {
            scrolledIndex = i + adjustIndexWith;
          }
        }
        // console.log('scrolledIndex after render', scrolledIndex);
        if (scrolledIndex != null) {
          this.scrolledIndex = scrolledIndex;
        }
        const heightOffset = expectedHeight - renderedSize;
        let adjustScrollTop;
        // set new sample
        this.averager.addSample(
          { ...updatedRange, end: updatedRange.end },
          renderedSize
        );
        const newAverage = this.averager.getAverageItemSize();
        const contentSizeApprox = this.contentLength * newAverage;
        this.anchorTop = this._virtualViewContainer.get(
          renderedRange.start
        ).scrollTop;
        let s = 0;
        let l = this.contentLength;
        let offset = 0;
        const firstItem = this._virtualViewContainer.get(renderedRange.start);
        let untilStartTarget = firstItem.scrollTop;
        for (s; s < l; s++) {
          const view = this._virtualViewContainer.get(s);
          let height = view.height;
          if (s < renderedRange.start) {
            if (view.sampled) {
              const remaining = untilStartTarget - offset;
              height = remaining / (renderedRange.start - s);
            }
            if (s === renderedRange.start - 1) {
              const remaining = untilStartTarget - offset;
              const isOff = remaining - height;
              if (isOff != 0) {
                height = remaining;
                console.warn('adjusted height', remaining, height, s);
                /* if (view.sampled) {
                  console.warn('adjusted height', remaining, height, s);
                  height = remaining;
                } else {
                  let r = s;
                  offset += isOff;
                  while (r >= 0) {
                    const _view = this._virtualViewContainer.get(r);
                    if (_view.sampled) {
                      this._virtualViewContainer.set(r, {
                        ..._view,
                        height: remaining,
                      });
                      console.warn(
                        'adjusted height boom',
                        remaining,
                        _view.height,
                        r
                      );
                      let rr = r;
                      for (rr; rr < s; rr++) {
                        this._virtualViewContainer.items[rr].scrollTop += isOff;
                      }
                      break;
                    }
                    r--;
                  }
                }*/
              }
            }
          } else if (s >= renderedRange.end) {
            if (view.sampled) {
              const remaining = l - s;
              height = (contentSizeApprox - offset) / remaining;
            }
          } else {
            if (view.scrollTop !== offset) {
              console.warn('should be', view.scrollTop);
              console.warn('is', offset);
            }
          }
          this._virtualViewContainer.set(s, {
            height,
            scrollTop: offset,
            sampled: view.sampled,
          });
          offset += height;
        }
        this.setContentSize();

        console.log('items', { ...this._virtualViewContainer.items });
        if (adjustScrollTop) {
          console.log('adjustScrollTop', adjustScrollTop);
          this.viewport.scrollTo(adjustScrollTop);
        }
        /*const heightAfter = this.contentSize;
        console.log('heightBefore', heightBefore);
        console.log('heightAfter', heightAfter);
        const heightDiff = !heightBefore ? 0 : heightBefore - heightAfter;
        console.log('heightDiff', heightBefore - heightAfter);
        let heightDiffPerc;
        if (heightDiff > 0) {
          heightDiffPerc = (heightDiff / heightBefore) * 100;
        } else if (heightDiff < 0) {
          heightDiffPerc = (heightBefore / heightAfter - 1) * 100;
        }
        console.log('heightDiffPerc', heightDiffPerc);
        console.log('this.currentOffset', this.currentOffset);*/
        console.groupEnd();
        const underrendered =
          renderedSize < this.containerSize + this.buffer &&
          heightOffset >= newAverage;
        if (underrendered) {
          const reloadAmount = Math.ceil(heightOffset / newAverage);
          /*console.warn('reloadAmount', reloadAmount);
          console.warn('heightOffset / newAverage', heightOffset, newAverage);*/
          if (this.direction === 'down') {
            this.rangeAdjust$.next({
              start: renderedRange.start,
              end: renderedRange.end + reloadAmount,
            });
          } else {
            this.rangeAdjust$.next({
              start: Math.max(0, renderedRange.start - reloadAmount),
              end: renderedRange.end,
            });
          }
        }
      });
  }

  private scrollTopUntil(index: number) {
    const entry = this._virtualViewContainer.get(index);
    if (entry) {
      return entry.scrollTop;
    }
    const lastEntry = this._virtualViewContainer.get(index - 1);
    return lastEntry?.scrollTop + lastEntry?.height || 0;
  }

  private getViewSize(view: EmbeddedViewRef<any>): number {
    const element = view.rootNodes[0] as HTMLElement;
    return element.offsetHeight;
  }

  private _setViewHeight(
    view: EmbeddedViewRef<any>,
    currentIndex: number,
    scrollTop: number
  ): number {
    const element = view.rootNodes[0] as HTMLElement;
    const height = element.offsetHeight;
    element.style.position = 'absolute';
    element.style.transform = `translateY(${scrollTop}px)`;
    this._virtualViewContainer.set(currentIndex, {
      height,
      scrollTop,
    });
    return height;
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

// stolen from @angular/cdk/scrolling
/**
 * A class that tracks the size of items that have been seen and uses it to estimate the average
 * item size.
 */
export class ItemSizeAverager {
  /** The total amount of weight behind the current average. */
  private _totalWeight = 0;

  /** The current average item size. */
  private _averageItemSize: number;

  /** The default size to use for items when no data is available. */
  private _defaultItemSize: number;

  /** @param defaultItemSize The default size to use for items when no data is available. */
  constructor(defaultItemSize = 50) {
    this._defaultItemSize = defaultItemSize;
    this._averageItemSize = defaultItemSize;
  }

  /** Returns the average item size. */
  getAverageItemSize(): number {
    return this._averageItemSize;
  }

  /**
   * Adds a measurement sample for the estimator to consider.
   * @param range The measured range.
   * @param size The measured size of the given range in pixels.
   */
  addSample(range: ListRange, size: number) {
    const newTotalWeight = this._totalWeight + range.end - range.start;
    if (newTotalWeight) {
      const newAverageItemSize =
        (size + this._averageItemSize * this._totalWeight) / newTotalWeight;
      if (newAverageItemSize) {
        this._averageItemSize = toDecimal(newAverageItemSize);
        this._totalWeight = newTotalWeight;
      }
    }
  }

  /** Resets the averager. */
  reset() {
    this._averageItemSize = this._defaultItemSize;
    this._totalWeight = 0;
  }
}
