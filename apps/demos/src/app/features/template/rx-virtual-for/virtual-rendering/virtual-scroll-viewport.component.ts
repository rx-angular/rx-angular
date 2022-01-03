import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  Inject,
  NgZone,
  OnDestroy,
  Optional,
  ViewChild,
} from '@angular/core';
import { fromEvent } from '@rx-angular/cdk/zone-less';
import {
  BehaviorSubject,
  defer,
  Observable,
  ReplaySubject,
  Subject,
} from 'rxjs';
import { distinctUntilChanged, startWith, takeUntil } from 'rxjs/operators';
import {
  RxVirtualScrollViewport,
  RxVirtualViewRepeater,
  RxVirtualScrollStrategy,
} from './model';
import { observeElementSize } from './observe-element-size';

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
        contain: layout;
        will-change: transform;
      }
      .rxa-virtual-scroll-run-way {
        width: 1px;
        height: 1px;
        transition: transform 0.2s ease 0s;
        position: absolute;
      }
    `,
  ],
})
export class RxVirtualScrollViewportComponent
  implements RxVirtualScrollViewport, AfterContentInit, OnDestroy
{
  @ViewChild('runway', { static: true })
  private _runway: ElementRef<HTMLElement>;

  @ContentChild(RxVirtualViewRepeater)
  viewRepeater: RxVirtualViewRepeater<any>;

  private _elementScrolled = new Subject<Event>();
  readonly elementScrolled$ =
    this._elementScrolled.asObservable() as unknown as Observable<void>;

  private _containerSize$ = new ReplaySubject<number>(1);
  readonly containerSize$ = this._containerSize$.asObservable();

  readonly renderedRange$ = defer(() => this.scrollStrategy.renderedRange$);

  readonly nativeElement = this.elementRef.nativeElement;

  private destroy$ = new Subject<void>();

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private ngZone: NgZone,
    @Optional() private scrollStrategy: RxVirtualScrollStrategy
  ) {
    if (!scrollStrategy /*TODO: use ngDevMode approach from scheduler.ts*/) {
      throw Error(
        'Error: rx-virtual-scroll-viewport requires a `VirtualScrollStrategy` to be set.'
      );
    }
  }

  ngOnInit(): void {
    fromEvent(this.elementRef.nativeElement, 'scroll', {
      passive: true,
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe(this._elementScrolled);
  }

  ngAfterContentInit(): void {
    observeElementSize(this.elementRef.nativeElement, 'height')
      .pipe(
        startWith(this.elementRef.nativeElement.offsetHeight),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(this._containerSize$);
    this.scrollStrategy.attach(this, this.viewRepeater);
    this.scrollStrategy.contentSize$
      .pipe(takeUntil(this.destroy$))
      .subscribe((size) => this.updateContentSize(size));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.scrollStrategy.detach();
  }

  updateContentSize(size: number): void {
    this._runway.nativeElement.style.transform = `translate(0, ${size}px)`;
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
