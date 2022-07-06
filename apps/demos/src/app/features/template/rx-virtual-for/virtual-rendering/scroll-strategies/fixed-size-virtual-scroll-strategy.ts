import { distinctUntilSomeChanged } from '@rx-angular/state/selections';
import {
  ListRange,
  RxVirtualScrollViewport,
  RxVirtualViewRepeater,
} from '../model';
import { Directive, EmbeddedViewRef, Input, OnDestroy } from '@angular/core';
import {
  combineLatest,
  merge,
  ReplaySubject,
  Subject,
  distinctUntilChanged,
  map,
  shareReplay,
  startWith,
  takeUntil,
  tap,
} from 'rxjs';
import { RxVirtualScrollStrategy } from '../model';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
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
  @Input() buffer = 350;

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

  private readonly _scrolledIndex$ = new ReplaySubject<number>(1);
  scrolledIndex$ = this._scrolledIndex$.asObservable();
  private _scrolledIndex = 0;
  private set scrolledIndex(index: number) {
    this._scrolledIndex = index;
    this._scrolledIndex$.next(index);
  }

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
        const end = views.length;
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
      })
    );
    combineLatest([dataLengthChanged$, this.viewport.containerSize$, onScroll$])
      .pipe(
        map(([length, containerSize]) => {
          const range = { start: 0, end: 0 };
          if (this.direction === 'up') {
            range.start = Math.floor(
              Math.max(0, this.scrollTop - this.runwayItems * this.itemSize) /
                this.itemSize
            );
            range.end = Math.min(
              length,
              Math.ceil(
                (this.scrollTop +
                  containerSize +
                  this.runwayItemsOpposite * this.itemSize) /
                  this.itemSize
              )
            );
          } else {
            range.start = Math.floor(
              Math.max(
                0,
                this.scrollTop - this.runwayItemsOpposite * this.itemSize
              ) / this.itemSize
            );
            range.end = Math.min(
              length,
              Math.ceil(
                (this.scrollTop +
                  containerSize +
                  this.runwayItems * this.itemSize) /
                  this.itemSize
              )
            );
          }
          this.scrolledIndex = Math.floor(this.scrollTop / this.itemSize);
          return range;
        }),
        distinctUntilSomeChanged(['start', 'end']),
        this.until$
      )
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
    // element.style.opacity = '1';
    element.style.transform = `translateY(${scrollTop}px)`;
    element.style.position = 'absolute';
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
