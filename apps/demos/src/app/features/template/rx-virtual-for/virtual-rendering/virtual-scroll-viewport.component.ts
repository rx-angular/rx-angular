import { Dir, Directionality } from '@angular/cdk/bidi';
import { ScrollDispatcher } from '@angular/cdk/scrolling/scroll-dispatcher';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  Inject,
  NgZone,
  Optional,
  ViewChild,
} from '@angular/core';
import { fromEvent } from '@rx-angular/cdk/zone-less';
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  Subject,
  Subscription,
} from 'rxjs';
import { ListRange, VirtualViewRepeater } from './model';
import { VirtualScrollStrategy } from './scroll-strategies/virtual-scroll-strategy';

@Component({
  selector: 'rxa-virtual-scroll-viewport',
  template: `
    <div #runway class="rxa-virtual-scroll-run-way"></div>
    <ng-content></ng-content>
  `,
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
export class RxVirtualScrollViewportComponent implements AfterContentInit {
  protected scrollDispatcher: ScrollDispatcher;

  @ViewChild('runway', { static: true })
  private _runway: ElementRef<HTMLElement>;

  @ContentChild(VirtualViewRepeater)
  viewRepeater: VirtualViewRepeater<any>;

  private _sub?: Subscription;

  private _elementScrolled = new Subject<Event>();

  private readonly _renderedRange = new ReplaySubject<ListRange>(1);
  readonly renderedRange$ = this._renderedRange.asObservable();

  private renderedRage: ListRange = { start: 0, end: 0 };
  get renderedRange(): ListRange {
    return this.renderedRage;
  }

  set renderedRange(range: ListRange) {
    this.renderedRage = range;
    this._renderedRange.next(range);
  }

  readonly nativeElement = this.elementRef.nativeElement;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private ngZone: NgZone,
    @Optional() private scrollStrategy: VirtualScrollStrategy,
    @Optional() @Inject(Dir) private dir?: Directionality
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
    }).subscribe(this._elementScrolled);
  }

  ngAfterContentInit(): void {
    this.scrollStrategy.attach(this);
  }

  ngOnDestroy(): void {
    this._sub?.unsubscribe();
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

  scrollTo(index: number, behavior?: ScrollBehavior): void {
    // TODO: implement more complex scroll scenarios
    this.nativeElement.scrollTo({ top: index, behavior: behavior });
  }
}
