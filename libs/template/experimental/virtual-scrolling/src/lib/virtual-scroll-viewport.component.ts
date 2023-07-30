import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  OnDestroy,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

import {
  RxVirtualScrollStrategy,
  RxVirtualScrollViewport,
  RxVirtualViewRepeater,
} from './model';
import { observeElementSize } from './observe-element-size';
import { getZoneUnPatchedApi } from '@rx-angular/cdk/internals/core';

/**
 * @description Will be provided through Terser global definitions by Angular CLI
 * during the production build.
 */
declare const ngDevMode: boolean;

const NG_DEV_MODE = typeof ngDevMode === 'undefined' || !!ngDevMode;

/** Options used to bind passive event listeners. */
const passiveEventListenerOptions = { passive: true };

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
    <div #runway class="rx-virtual-scroll__run-way">
      <div #sentinel class="rx-virtual-scroll__sentinel"></div>
      <ng-content></ng-content>
    </div>
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
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        contain: strict;
      }

      :host:not(.rx-virtual-scroll-viewport--withSyncScrollbar)
        .rx-virtual-scroll__run-way {
        transform: translateZ(0);
        will-change: scroll-position;
      }

      .rx-virtual-scroll__run-way {
        contain: strict;
        -webkit-overflow-scrolling: touch;
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        overflow: auto;
      }

      .rx-virtual-scroll__sentinel {
        width: 1px;
        height: 1px;
        contain: strict;
        position: absolute;
        will-change: transform;
      }
    `,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxVirtualScrollViewportComponent
  implements
    RxVirtualScrollViewport,
    AfterViewInit,
    AfterContentInit,
    OnDestroy
{
  private elementRef = inject(ElementRef<HTMLElement>);
  private scrollStrategy = inject(RxVirtualScrollStrategy<unknown>, {
    optional: true,
  });

  /** @internal */
  @ViewChild('sentinel', { static: true })
  private scrollSentinel!: ElementRef<HTMLElement>;

  /** @internal */
  @ViewChild('runway', { static: true })
  private runway!: ElementRef<HTMLElement>;

  /** @internal */
  @ContentChild(RxVirtualViewRepeater)
  viewRepeater!: RxVirtualViewRepeater<unknown>;

  /** @internal */
  private _elementScrolled = new Subject<Event>();
  readonly elementScrolled$ =
    this._elementScrolled.asObservable() as unknown as Observable<void>;

  /** @internal */
  private _containerRect$ = new ReplaySubject<{
    width: number;
    height: number;
  }>(1);
  readonly containerRect$ = this._containerRect$.asObservable();

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
  readonly viewRange = this.scrollStrategy.renderedRange$;

  /**
   * @description
   *
   * The index of the currently scrolled item. The scrolled item is the topmost
   * item actually being visible to the user.
   */
  @Output()
  readonly scrolledIndexChange = this.scrollStrategy.scrolledIndex$;

  /** @internal */
  private readonly destroy$ = new Subject<void>();

  /** @internal */
  constructor() {
    if (NG_DEV_MODE && !this.scrollStrategy) {
      throw Error(
        'Error: rx-virtual-scroll-viewport requires an `RxVirtualScrollStrategy` to be set.'
      );
    }
    observeElementSize(this.elementRef.nativeElement, {
      extract: (entries) => ({
        height: Math.round(entries[0].contentRect.height),
        width: Math.round(entries[0].contentRect.width),
      }),
    })
      .pipe(
        distinctUntilChanged(
          ({ height: prevHeight, width: prevWidth }, { height, width }) =>
            prevHeight === height && prevWidth === width
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(this._containerRect$);
  }

  ngAfterViewInit() {
    getZoneUnPatchedApi(this.scrollContainer(), 'addEventListener').call(
      this.scrollContainer(),
      'scroll',
      this.scrollListener,
      passiveEventListenerOptions
    );
  }

  /** @internal */
  ngAfterContentInit(): void {
    if (ngDevMode && !this.viewRepeater) {
      throw Error(
        'Error: rx-virtual-scroll-viewport requires a `RxVirtualViewRepeater` to be provided.'
      );
    }
    this.scrollStrategy.attach(this, this.viewRepeater);
    this.scrollStrategy.contentSize$
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((size) => this.updateContentSize(size));
  }

  /** @internal */
  ngOnDestroy(): void {
    getZoneUnPatchedApi(this.scrollContainer(), 'removeEventListener').call(
      this.scrollContainer(),
      'scroll',
      this.scrollListener,
      passiveEventListenerOptions
    );
    this.destroy$.next();
    this.scrollStrategy.detach();
  }

  elementScrolled(): Observable<Event> {
    return this._elementScrolled.asObservable();
  }

  scrollContainer(): HTMLElement {
    return this.runway.nativeElement;
  }

  getScrollTop(): number {
    return this.scrollContainer().scrollTop;
  }

  scrollTo(index: number, behavior?: ScrollBehavior): void {
    // TODO: implement more complex scroll scenarios
    this.scrollContainer().scrollTo({ top: index, behavior: behavior });
  }

  scrollToIndex(index: number, behavior?: ScrollBehavior): void {
    this.scrollStrategy.scrollToIndex(index, behavior);
  }

  protected updateContentSize(size: number): void {
    this.scrollSentinel.nativeElement.style.transform = `translate(0, ${size}px)`;
  }

  private scrollListener = (event: Event) => this._elementScrolled.next(event);
}
