import { Dir, Directionality } from '@angular/cdk/bidi';
import { ScrollDispatcher } from '@angular/cdk/scrolling/scroll-dispatcher';
import { ExtendedScrollToOptions } from '@angular/cdk/scrolling/scrollable';
import { AfterViewInit, Component, ElementRef, Inject, NgZone, Optional, ViewChild } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'rxa-virtual-for-viewport',
  template: `
    <div
      #scrollContainer
      class="rxa-virtual-scroll-container">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    .rxa-virtual-scroll-container {
      contain: layout;
    }
  `],
})
export class RxVirtualForViewportComponent implements AfterViewInit {

  protected scrollDispatcher: ScrollDispatcher;

  @ViewChild('scrollContainer')
  private _scrollContainer: ElementRef<HTMLElement>;

  private _sub?: Subscription;

  private _elementScrolled = new Subject<Event>();

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private ngZone: NgZone,
    @Optional() @Inject(Dir) private dir?: Directionality
  ) {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    this._sub?.unsubscribe();
  }

  elementScrolled(): Observable<Event> {
    return this._elementScrolled.asObservable();
  }

  scrollContainer(): ElementRef<HTMLElement> {
    return this._scrollContainer;
  }

  scrollTo(options: ExtendedScrollToOptions): void {

  }

  measureScrollOffset(from: 'top' | 'left' | 'right' | 'bottom' | 'start' | 'end'): number {

  }
}
