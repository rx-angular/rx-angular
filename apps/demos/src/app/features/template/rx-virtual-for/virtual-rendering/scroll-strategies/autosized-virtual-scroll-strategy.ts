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
  Observable,
  ReplaySubject,
  scheduled,
  Subject,
} from 'rxjs';
import {
  distinctUntilChanged,
  map,
  startWith,
  takeUntil,
  tap,
} from 'rxjs/operators';

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

  scrolledIndexChange: Observable<number>;

  private virtualViewContainer: {
    height: number;
    scrollTop: number;
    sampled?: boolean;
  }[] = [];

  private scrollTop = 0;
  private direction: 'up' | 'down' = 'down';

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
    this.virtualViewContainer = [];
    this.detached$.next();
  }

  scrollToIndex(index: number, behavior?: ScrollBehavior): void {
    const scrollTop = this.virtualViewContainer[index].scrollTop;
    this.viewport.scrollTo(scrollTop, behavior);
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
            ? this.heightsUntil(currentIndex)
            : _scrollTop || 0;
        this.virtualViewContainer[currentIndex] = {
          height: averageSize,
          scrollTop: _scrollTop,
          sampled: true,
        };
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
      startWith(0),
      tap((_scrollTop) => {
        // TODO: improve this
        this.direction = _scrollTop > this.scrollTop ? 'down' : 'up';
        this.scrollTop = _scrollTop;
        console.log('scrollTop', this.scrollTop);
      }),
      coalesceWith(scheduled([], animationFrameScheduler))
    );
    merge(
      combineLatest([
        dataLengthChanged$,
        this.viewport.containerSize$,
        onScroll$,
      ]).pipe(
        map(([length, containerHeight]) => {
          const range = { start: null, end: length };
          const heightsLength = this.virtualViewContainer.length;
          let i = 0;

          const adjustedScrollTop = this.scrollTop + this.buffer;
          console.log(length, 'itemLength');
          console.log(adjustedScrollTop, 'adjustedScrollTop');
          console.log(this.virtualViewContainer, 'heights');
          for (i; i < heightsLength; i++) {
            const entry = this.virtualViewContainer[i];
            if (
              entry.scrollTop + entry.height + this.buffer <=
              this.scrollTop
            ) {
              range.start = i;
            } else if (entry.scrollTop > containerHeight + adjustedScrollTop) {
              range.end = i;
              break;
            }
          }
          range.start = range.start == null ? 0 : range.start;
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
      .pipe(this.until$)
      .subscribe((views: EmbeddedViewRef<any>[]) => {
        const renderedRange = this.renderedRange;
        let scrollTop = this.heightsUntil(renderedRange.start);
        console.log('heightsUntil', scrollTop);
        let height = 0;
        let i = 0;
        let end = views.length;
        // update heights according to actual rendered items
        let expectedHeight = 0;
        for (i; i < end; i++) {
          expectedHeight +=
            this.virtualViewContainer[i + renderedRange.start].height;
          const _height = this._setViewHeight(
            views[i],
            i,
            scrollTop,
            renderedRange
          );
          height += _height;
          scrollTop += _height;
        }

        // set new sample
        this.averager.addSample(
          { ...renderedRange, end: renderedRange.end + 1 },
          height
        );
        const newAverage = Math.ceil(this.averager.getAverageItemSize());
        console.log('addSample', renderedRange, height, newAverage);
        // adjust heights of all guessed items based on the new average size
        const heightLength = this.virtualViewContainer.length;
        let _totalHeight = 0;
        for (let j = 0; j < heightLength; j++) {
          const entry = this.virtualViewContainer[j];
          if (entry.sampled) {
            entry.height = newAverage;
          }
          entry.scrollTop =
            j > 0
              ? this.virtualViewContainer[j - 1].scrollTop +
                this.virtualViewContainer[j - 1].height
              : 0;
          _totalHeight += entry.height;
        }
        const totalHeightOffset = this.contentSize - _totalHeight;
        console.log('totalHeightOffset', totalHeightOffset);
        this.contentSize = _totalHeight;
        console.log('heights', this.virtualViewContainer);
        const heightOffset = expectedHeight - height;
        console.log('heightOffset', heightOffset);
        /*if (totalHeightOffset != 0) {
          // this.scrollTo$.next(scrollTop + heightOffset);
          this.viewport.scrollTo(this.scrollTop + totalHeightOffset);
        }*/
        const underrendered = heightOffset >= newAverage;
        if (underrendered) {
          const reloadAmount = Math.ceil(heightOffset / newAverage);
          console.warn('reloadAmount', reloadAmount);
          console.warn('heightOffset / newAverage', heightOffset, newAverage);
          if (this.direction === 'down') {
            this.rangeAdjust$.next({
              start: renderedRange.start,
              end: renderedRange.end + reloadAmount,
            });
          } else {
            this.rangeAdjust$.next({
              start: renderedRange.start - reloadAmount,
              end: renderedRange.end,
            });
          }
        }
      });
  }

  private heightsUntil(index: number) {
    const entry = this.virtualViewContainer[index - 1];
    return (entry?.scrollTop || 0) + (entry?.height || 0);
  }

  private _setViewHeight(
    view: EmbeddedViewRef<any>,
    currentIndex: number,
    scrollTop: number,
    renderedRange: ListRange
  ): number {
    const element = view.rootNodes[0] as HTMLElement;
    const adjustedIndex = currentIndex + renderedRange.start;
    // const scrollTop = heightsUntil(adjustedIndex);
    // console.log('_setViewHeight', view.context);
    // console.log('currentIndex', currentIndex);
    // console.log('scrollTop', scrollTop);
    // console.log('heights', heights);
    // console.log('adjustedIndex', adjustedIndex);
    const height = element.offsetHeight;
    // console.log('element.offsetHeight', height);
    element.style.position = 'absolute';
    element.style.transform = `translateY(${scrollTop}px)`;
    this.virtualViewContainer[adjustedIndex] = {
      height,
      scrollTop,
      sampled: false,
    };
    return height;
  }
}

import { NgModule } from '@angular/core';

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
        this._averageItemSize = newAverageItemSize;
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
