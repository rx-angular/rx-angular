import { Dir, Directionality } from '@angular/cdk/bidi';
import { ScrollDispatcher } from '@angular/cdk/scrolling/scroll-dispatcher';
import { ExtendedScrollToOptions } from '@angular/cdk/scrolling/scrollable';
import { AfterViewInit, Component, ElementRef, Inject, NgZone, Optional, ViewChild } from '@angular/core';
import { fromEvent } from '@rx-angular/cdk/zone-less';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'rxa-virtual-for-viewport',
  template: `
    <div
      #runway
      class="rxa-virtual-scroll-run-way">
    </div>
    <ng-content></ng-content>
  `,
  styles: [`
    :host {
      display: block;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      width: 100%;
      height: 100%;
      position: absolute;
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
  `],
})
export class RxVirtualForViewportComponent implements AfterViewInit {

  protected scrollDispatcher: ScrollDispatcher;

  @ViewChild('runway')
  private _runway: ElementRef<HTMLElement>;

  private _sub?: Subscription;

  private _elementScrolled = new Subject<Event>();

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private ngZone: NgZone,
    @Optional() @Inject(Dir) private dir?: Directionality
  ) {

  }

  ngOnInit(): void {
    fromEvent(
      this.elementRef.nativeElement,
      'scroll',
      { passive: true }
    ).subscribe(this._elementScrolled);
  }

  ngAfterViewInit(): void {

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

  scrollTo(options: ExtendedScrollToOptions): void {

  }

  measureScrollOffset(from: 'top' | 'left' | 'right' | 'bottom' | 'start' | 'end'): number {
    return 0;
  }
}
