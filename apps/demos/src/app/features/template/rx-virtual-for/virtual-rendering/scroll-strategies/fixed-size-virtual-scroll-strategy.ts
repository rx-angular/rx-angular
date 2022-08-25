import { distinctUntilSomeChanged } from '@rx-angular/state/selections';
import { switchMap } from 'rxjs/operators';
import {
  ListRange,
  RxVirtualForViewContext,
  RxVirtualScrollViewport,
  RxVirtualViewRepeater,
} from '../model';
import {
  Directive,
  EmbeddedViewRef,
  Input,
  NgIterable,
  OnDestroy,
} from '@angular/core';
import {
  combineLatest,
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

/**
 * @Directive FixedSizeVirtualScrollStrategy
 *
 * @description
 *
 * The `FixedSizeVirtualScrollStrategy` provides a very performant way of rendering
 * items of a given size. It is comparable to \@angular/cdk `FixedSizeVirtualScrollStrategy`, but
 * with a high performant layouting technique.
 *
 * @docsCategory RxVirtualFor
 * @docsPage RxVirtualFor
 * @publicApi
 */
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
export class FixedSizeVirtualScrollStrategy<
    T,
    U extends NgIterable<T> = NgIterable<T>
  >
  extends RxVirtualScrollStrategy<T, U>
  implements OnDestroy
{
  /**
   * @description
   * The size of the items in the virtually scrolled list
   */
  @Input() itemSize = 50;

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
   * Styles that will be applied to a DOM element when being positioned. A useful
   * example is if you want to implement a css based fade-in animation by setting
   * the opacity of the rendered item to 1 when getting position.
   *
   * @example
   * \@Component({
   *   template: `
   *    <rx-virtual-scroll-viewport
   *      [itemSize]="50"
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

  private viewport: RxVirtualScrollViewport | null = null;
  private viewRepeater: RxVirtualViewRepeater<T, U> | null = null;

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

  private readonly detached$ = new Subject<void>();

  private until$ = (o$) => o$.pipe(takeUntil(this.detached$));

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
    this.positionElements();
  }

  detach(): void {
    this.viewport = null;
    this.viewRepeater = null;
    this.detached$.next();
  }

  private positionElements(): void {
    this.viewRepeater.renderingStart$
      .pipe(
        switchMap(() => {
          const start = this.renderedRange.start;
          return this.viewRepeater.viewRendered$.pipe(
            tap(({ view, index, item }) => {
              this._setViewPosition(view, (index + start) * this.itemSize);
              this.viewRenderCallback.next({
                view,
                item,
                index,
              });
            })
          );
        }),
        this.until$
      )
      .subscribe();
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
    view: EmbeddedViewRef<RxVirtualForViewContext<T, U>>,
    scrollTop: number
  ): void {
    const element = this.getElement(view);
    element.style.position = 'absolute';
    element.style.transform = `translateY(${scrollTop}px)`;
    if (this.enterStyles) {
      Object.keys(this.enterStyles).forEach((style) => {
        element.style[style] = this.enterStyles[style];
      });
    }
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
