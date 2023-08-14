import { NgIf } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  inject,
  OnDestroy,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { defer, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

import {
  RxVirtualScrollElement,
  RxVirtualScrollStrategy,
  RxVirtualScrollViewport,
  RxVirtualViewRepeater,
} from './model';
import { observeElementSize } from './observe-element-size';
import { unpatchedScroll } from './util';

/**
 * @description Will be provided through Terser global definitions by Angular CLI
 * during the production build.
 */
declare const ngDevMode: boolean;

const NG_DEV_MODE = typeof ngDevMode === 'undefined' || !!ngDevMode;

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
    <div
      #runway
      class="rx-virtual-scroll__runway"
      [class.rx-virtual-scroll-element]="!scrollElement"
    >
      <div
        #sentinel
        class="rx-virtual-scroll__sentinel"
        *ngIf="!this.scrollElement"
      ></div>
      <ng-content></ng-content>
    </div>
  `,
  providers: [
    {
      provide: RxVirtualScrollViewport,
      useExisting: RxVirtualScrollViewportComponent,
    },
  ],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./virtual-scroll-viewport.component.scss'],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'rx-virtual-scroll-viewport',
  },
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf],
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
  protected scrollElement = inject(RxVirtualScrollElement, { optional: true });

  /** @internal */
  @ViewChild('sentinel')
  private scrollSentinel!: ElementRef<HTMLElement>;

  /** @internal */
  @ViewChild('runway', { static: true })
  private runway!: ElementRef<HTMLElement>;

  /** @internal */
  @ContentChild(RxVirtualViewRepeater)
  viewRepeater!: RxVirtualViewRepeater<unknown>;

  readonly elementScrolled$ =
    this.scrollElement?.elementScrolled$ ??
    defer(() => unpatchedScroll(this.runway.nativeElement));

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

  private contentSize = 0;

  /** @internal */
  constructor() {
    if (NG_DEV_MODE && !this.scrollStrategy) {
      throw Error(
        'Error: rx-virtual-scroll-viewport requires an `RxVirtualScrollStrategy` to be set.'
      );
    }
    observeElementSize(
      this.scrollElement?.getElementRef()?.nativeElement ??
        this.elementRef.nativeElement,
      {
        extract: (entries) => ({
          height: Math.round(entries[0].contentRect.height),
          width: Math.round(entries[0].contentRect.width),
        }),
      }
    )
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
    this.scrollStrategy.contentSize$
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((size) => {
        this.contentSize = size;
        this.updateContentSize(size);
      });
  }

  /** @internal */
  ngAfterContentInit(): void {
    if (ngDevMode && !this.viewRepeater) {
      throw Error(
        'Error: rx-virtual-scroll-viewport requires a `RxVirtualViewRepeater` to be provided.'
      );
    }
    this.scrollStrategy.attach(this, this.viewRepeater);
  }

  /** @internal */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.scrollStrategy.detach();
  }

  getScrollElement(): HTMLElement {
    return (
      this.scrollElement?.getElementRef()?.nativeElement ??
      this.runway.nativeElement
    );
  }

  getScrollTop(): number {
    return this.getScrollElement().scrollTop;
  }

  scrollTo(position: number, behavior?: ScrollBehavior): void {
    // TODO: implement more complex scroll scenarios
    this.getScrollElement().scrollTo({ top: position, behavior: behavior });
  }

  scrollToIndex(index: number, behavior?: ScrollBehavior): void {
    this.scrollStrategy.scrollToIndex(index, behavior);
  }

  measureOffset(): number {
    if (this.scrollElement) {
      const scrollableOffset = this.scrollElement.measureOffset();
      const rect = this.elementRef.nativeElement.getBoundingClientRect();
      return this.getScrollTop() + (rect.top - scrollableOffset);
    } else {
      return 0;
    }
  }

  protected updateContentSize(size: number): void {
    if (this.scrollElement) {
      this.elementRef.nativeElement.style.height = `${size}px`;
    } else {
      this.scrollSentinel.nativeElement.style.transform = `translate(0, ${size}px)`;
    }
  }
}
