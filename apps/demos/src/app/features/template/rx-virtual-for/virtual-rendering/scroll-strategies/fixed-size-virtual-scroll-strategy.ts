import { coalesceWith } from '@rx-angular/cdk/coalescing';
import { distinctUntilSomeChanged } from '@rx-angular/cdk/state';
import { animationFrameScheduler } from '@rx-angular/cdk/zone-less';
import {
  ListRange,
  RxVirtualScrollViewport,
  RxVirtualViewRepeater,
} from '../model';
import { Directive, EmbeddedViewRef, Input, OnDestroy } from '@angular/core';
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
  shareReplay,
  startWith,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { RxVirtualScrollStrategy } from '../model';

@Directive({
  selector: 'rx-virtual-scroll-viewport[itemSize]',
  providers: [
    {
      provide: RxVirtualScrollStrategy,
      useExisting: FixedSizeVirtualScrollStrategy,
    },
  ],
})
export class FixedSizeVirtualScrollStrategy
  implements RxVirtualScrollStrategy, OnDestroy
{
  /**
   * The size of the items in the virtually scrolled list
   */
  @Input() itemSize = 50;

  /**
   * The amount of buffer (in px) to render on either side of the viewport
   */
  @Input() buffer = 150;

  private viewport: RxVirtualScrollViewport | null = null;
  private viewRepeater: RxVirtualViewRepeater<any> | null = null;

  scrolledIndexChange: Observable<number>;
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

  private scrollTop = 0;
  private direction: 'up' | 'down' = 'down';

  private readonly destroy$ = new Subject<void>();
  private readonly detached$ = new Subject<void>();

  private until$ = (o$) =>
    o$.pipe(takeUntil(merge(this.destroy$, this.detached$)));

  ngOnDestroy() {
    this.destroy$.next();
  }

  attach(
    viewport: RxVirtualScrollViewport,
    viewRepeater: RxVirtualViewRepeater<any>
  ): void {
    this.viewport = viewport;
    this.viewRepeater = viewRepeater;
    this.onContentScrolled();
    this.onContentRendered();
  }
  detach(): void {
    this.viewport = null;
    this.detached$.next();
  }

  private onContentRendered(): void {
    this.viewRepeater.contentRendered$
      .pipe(this.until$)
      .subscribe((views: EmbeddedViewRef<any>[]) => {
        const renderedRange = this.renderedRange;
        let scrollTop = this.itemSize * renderedRange.start;
        let i = 0;
        let end = views.length;
        for (i; i < end; i++) {
          this._setViewPosition(views[i], scrollTop);
          scrollTop += this.itemSize;
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
      distinctUntilChanged(),
      shareReplay({ bufferSize: 1, refCount: true })
    );
    dataLengthChanged$.subscribe((dataLength) => {
      this.contentSize = dataLength * this.itemSize;
    });
    const onScroll$ = this.viewport.elementScrolled$.pipe(
      map(() => this.viewport.getScrollTop()),
      startWith(0),
      tap((_scrollTop) => {
        this.direction = _scrollTop > this.scrollTop ? 'down' : 'up';
        this.scrollTop = _scrollTop;
      }),
      coalesceWith(scheduled([], animationFrameScheduler))
    );
    merge(
      combineLatest([
        dataLengthChanged$,
        this.viewport.containerSize$,
        onScroll$,
      ]).pipe(
        map(([length, containerSize]) => {
          const start = Math.floor(
            Math.max(0, this.scrollTop - this.buffer) / this.itemSize
          );
          const end = Math.min(
            length,
            Math.ceil(
              (this.scrollTop + containerSize + this.buffer) / this.itemSize
            )
          );
          return { start, end };
        })
      )
    )
      .pipe(distinctUntilSomeChanged(['start', 'end']), this.until$)
      .subscribe((range: ListRange) => (this.renderedRange = range));
  }

  scrollToIndex(index: number, behavior?: ScrollBehavior): void {
    const scrollTop = this.itemSize * index;
    this.viewport.scrollTo(scrollTop, behavior);
  }

  private _setViewPosition(
    view: EmbeddedViewRef<any>,
    scrollTop: number
  ): void {
    const element = view.rootNodes[0] as HTMLElement;
    element.style.position = 'absolute';
    element.style.transform = `translateY(${scrollTop}px)`;
  }
}

import { NgModule } from '@angular/core';

@NgModule({
  imports: [],
  exports: [FixedSizeVirtualScrollStrategy],
  declarations: [FixedSizeVirtualScrollStrategy],
  providers: [],
})
export class FixedSizeVirtualScrollStrategyModule {}
