import { coalesceWith } from '@rx-angular/cdk/coalescing';
import { distinctUntilSomeChanged } from '@rx-angular/cdk/state';
import { animationFrameScheduler } from '@rx-angular/cdk/zone-less';
import { ListRange } from '../model';
import {
  Directive,
  EmbeddedViewRef,
  IterableDiffer,
  IterableDiffers,
  OnDestroy,
} from '@angular/core';
import { combineLatest, merge, Observable, scheduled, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  startWith,
  takeUntil,
} from 'rxjs/operators';
import { RxVirtualScrollViewportComponent } from '../virtual-scroll-viewport.component';
import { VirtualScrollStrategy } from './virtual-scroll-strategy';

@Directive({
  selector: 'rxa-virtual-scroll-viewport[autosize]',
  providers: [
    {
      provide: VirtualScrollStrategy,
      useExisting: AutosizeVirtualScrollStrategy,
    },
  ],
})
export class AutosizeVirtualScrollStrategy
  implements VirtualScrollStrategy, OnDestroy
{
  private viewport: RxVirtualScrollViewportComponent | null = null;
  private readonly averager = new ItemSizeAverager();
  private dataDiffer: IterableDiffer<any> | null = null;
  private readonly rangeAdjust$ = new Subject<ListRange>();
  private readonly scrollTo$ = new Subject<number>();
  private readonly containerHeight = 350;
  private margin = 50;

  scrolledIndexChange: Observable<number>;

  private heights: { height: number; scrollTop: number; sampled?: boolean }[] =
    [];
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

  attach(viewport: RxVirtualScrollViewportComponent): void {
    this.viewport = viewport;
    const onScroll$ = this.viewport.elementScrolled().pipe(startWith(0));
    onScroll$.pipe(this.until$).subscribe(() => this.onContentScrolled());
    this.dataDiffer = this.differs
      .find([])
      .create(this.viewport.viewRepeater._trackBy);
    this.viewport.viewRepeater.values$
      .pipe(this.until$)
      .subscribe((data) => this.onDataChanged(data as any[]));
    merge(
      combineLatest([
        this.viewport.viewRepeater.values$.pipe(
          map((values) =>
            Array.isArray(values)
              ? values
              : values != null
              ? Array.from(values)
              : []
          ),
          distinctUntilChanged(
            (oldItems, newItems) => oldItems?.length === newItems?.length
          )
        ),
        onScroll$.pipe(coalesceWith(scheduled([], animationFrameScheduler))),
      ]).pipe(
        map(([items]) => {
          const range = { start: null, end: items.length };
          const heightsLength = this.heights.length;
          let i = 0;

          const adjustedScrollTop = this.scrollTop + this.margin;
          console.log(items.length, 'itemLength');
          console.log(adjustedScrollTop, 'adjustedScrollTop');
          console.log(this.heights, 'heights');
          for (i; i < heightsLength; i++) {
            const entry = this.heights[i];
            if (
              entry.scrollTop + entry.height + this.margin <=
              this.scrollTop
            ) {
              range.start = i;
            } else if (
              entry.scrollTop >
              this.containerHeight + adjustedScrollTop
            ) {
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
      .subscribe((range: ListRange) => (this.viewport.renderedRange = range));
    this.viewport.viewRepeater.contentRendered$
      .pipe(this.until$)
      .subscribe((views: EmbeddedViewRef<any>[]) =>
        this.onContentRendered(views)
      );
  }
  detach(): void {
    this.viewport = null;
    this.detached$.next();
  }
  onContentRendered(views: EmbeddedViewRef<any>[]): void {
    const renderedRange = this.viewport.renderedRange;
    let scrollTop = this.heightsUntil(renderedRange.start);
    console.log('heightsUntil', scrollTop);
    let height = 0;
    let i = 0;
    let end = views.length;
    // update heights according to actual rendered items
    let expectedHeight = 0;
    for (i; i < end; i++) {
      expectedHeight += this.heights[i + renderedRange.start].height;
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
    const heightLength = this.heights.length;
    let _totalHeight = 0;
    for (let j = 0; j < heightLength; j++) {
      const entry = this.heights[j];
      if (entry.sampled) {
        entry.height = newAverage;
      }
      entry.scrollTop =
        j > 0 ? this.heights[j - 1].scrollTop + this.heights[j - 1].height : 0;
      _totalHeight += entry.height;
    }
    // this._totalHeight$.next(_totalHeight);
    this.viewport.updateContentSize(_totalHeight);
    console.log('heights', this.heights);
    const heightOffset = expectedHeight - height;
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
  }
  onContentScrolled(): void {
    // TODO: improve this
    const scrollTop = this.viewport.nativeElement.scrollTop;
    this.direction = scrollTop > this.scrollTop ? 'down' : 'up';
    this.scrollTop = scrollTop;
  }

  scrollToIndex(index: number, behavior: ScrollBehavior): void {
    this.viewport.scrollTo(index);
  }

  private onDataChanged(items: any[]): void {
    let _scrollTop;
    const averageSize = this.averager.getAverageItemSize();
    // we want to adjust our heightMap with the new items
    // TODO: move & delete need to be handled as well

    this.dataDiffer.diff(items)?.forEachAddedItem(({ currentIndex }) => {
      _scrollTop =
        _scrollTop == null ? this.heightsUntil(currentIndex) : _scrollTop || 0;
      this.heights[currentIndex] = {
        height: averageSize,
        scrollTop: _scrollTop,
        sampled: true,
      };
      _scrollTop += averageSize;
    });
  }

  private heightsUntil(index: number) {
    const entry = this.heights[index - 1];
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
    this.heights[adjustedIndex] = {
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
