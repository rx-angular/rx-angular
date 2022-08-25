import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  NgZone,
  OnDestroy,
  Optional,
  Output,
  ViewChild,
} from '@angular/core';
import {
  defer,
  fromEvent,
  Observable,
  ReplaySubject,
  Subject,
  distinctUntilChanged,
  takeUntil,
  merge,
  map,
} from 'rxjs';
import {
  RxVirtualScrollStrategy,
  RxVirtualScrollViewport,
  RxVirtualViewRepeater,
} from './model';
import { observeElementSize } from './observe-element-size';

/**
 * @description Will be provided through Terser global definitions by Angular CLI
 * during the production build.
 */
declare const ngDevMode: boolean;

/**
 * @Component RxVirtualScrollViewport
 *
 * @description
 * Container component comparable to CdkVirtualScrollViewport acting as viewport
 * for `*rxVirtualFor` to operate on.
 *
 * Its main purpose is to implement the `RxVirtualScrollViewport` interface
 * as well as maintaining the scroll runways' height in order to give
 * the provided `RxVirtualScrollStrategy` room to position items.
 *
 * Furthermore, it will gather and forward all events to the consumer of `rxVirtualFor`.
 *
 * @docsCategory RxVirtualFor
 * @docsPage RxVirtualFor
 * @publicApi
 */
@Component({
  selector: 'rx-virtual-scroll-viewport',
  template: `
    <div #runway class="rxa-virtual-scroll-run-way"></div>
    <ng-content></ng-content>
  `,
  providers: [
    {
      provide: RxVirtualScrollViewport,
      useExisting: RxVirtualScrollViewportComponent,
    },
  ],
  styles: [
    `
      :host {
        display: block;
        overflow-x: hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        contain: content;
      }

      .rxa-virtual-scroll-run-way {
        width: 1px;
        height: 1px;
        transition: transform 0.2s ease 0s;
        position: absolute;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxVirtualScrollViewportComponent
  implements RxVirtualScrollViewport, AfterContentInit, OnDestroy
{
  /** @internal */
  @ViewChild('runway', { static: true })
  private runway: ElementRef<HTMLElement>;

  /** @internal */
  @ContentChild(RxVirtualViewRepeater)
  viewRepeater: RxVirtualViewRepeater<unknown>;

  /** @internal */
  readonly rendered$ = defer(() => this.viewRepeater.rendered$);

  /** @internal */
  private _elementScrolled = new Subject<Event>();
  readonly elementScrolled$ =
    this._elementScrolled.asObservable() as unknown as Observable<void>;

  /** @internal */
  private _containerSize$ = new ReplaySubject<number>(1);
  readonly containerSize$ = this._containerSize$.asObservable();

  /**
   * @description
   *
   * The range to be rendered by `*rxVirtualFor`. This value is determined by the
   * provided `RxVirtualScrollStrategy`. It gives the user information about the
   * range of items being actually rendered to the DOM.
   * Note this value updates before the `renderCallback` kicks in, thus it is only
   * in sync with the DOM when the next `renderCallback` emitted an event.
   */
  @Output()
  readonly viewRange = defer(() => this.scrollStrategy.renderedRange$);

  /**
   * @description
   *
   * The index of the currently scrolled item. The scrolled item is the topmost
   * item actually being visible to the user.
   */
  @Output('scrolledIndexChange')
  readonly scrolledIndex$ = defer(() => this.scrollStrategy.scrolledIndex$);
  /** @internal */
  readonly nativeElement = this.elementRef.nativeElement;
  /** @internal */
  private readonly destroy$ = new Subject<void>();

  /** @internal */
  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private ngZone: NgZone,
    @Optional() private scrollStrategy: RxVirtualScrollStrategy<unknown>
  ) {
    if (ngDevMode && !scrollStrategy) {
      throw Error(
        'Error: rx-virtual-scroll-viewport requires an `RxVirtualScrollStrategy` to be set.'
      );
    }
  }

  /** @internal */
  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(this.elementRef.nativeElement, 'scroll', {
        passive: true,
      })
        .pipe(takeUntil(this.destroy$))
        .subscribe(this._elementScrolled);
    });
    observeElementSize(this.elementRef.nativeElement, {
      extract: (entries) => entries[0].contentRect.height,
    })
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(this._containerSize$);
  }

  /** @internal */
  ngAfterContentInit(): void {
    this.scrollStrategy.attach(this, this.viewRepeater);
    this.scrollStrategy.contentSize$
      .pipe(takeUntil(this.destroy$))
      .subscribe((size) => this.updateContentSize(size));
    merge(
      this.elementScrolled$.pipe(map(() => '')),
      this.viewRepeater.viewsRendered$.pipe(map(() => 'transform 0.2s ease 0s'))
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe((transition) => {
        this.runway.nativeElement.style.transition = transition;
      });
  }

  /** @internal */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.scrollStrategy.detach();
  }

  updateContentSize(size: number): void {
    this.runway.nativeElement.style.transform = `translate(0, ${size}px)`;
  }

  elementScrolled(): Observable<Event> {
    return this._elementScrolled.asObservable();
  }

  scrollContainer(): ElementRef<HTMLElement> {
    return this.elementRef;
  }

  getScrollTop(): number {
    return this.nativeElement.scrollTop;
  }

  scrollTo(index: number, behavior?: ScrollBehavior): void {
    // TODO: implement more complex scroll scenarios
    this.nativeElement.scrollTo({ top: index, behavior: behavior });
  }

  scrollToIndex(index: number, behavior?: ScrollBehavior): void {
    this.scrollStrategy.scrollToIndex(index, behavior);
  }
}
