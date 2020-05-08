import { Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { revertEventListenerZonePatch } from '../../core/utils/make-zone-less';

const zonePatchedEvents = [
  'scroll',
  'mousedown',
  'mouseenter',
  'mouseleave',
  'mousemove',
  'mouseout',
  'mouseover',
  'mouseup',
  'load',
  'pointerup',
  'change',
  'blur',
  'focus',
  'click',
  'contextmenu',
  'drag',
  'dragend',
  'dragenter',
  'dragleave',
  'dragover',
  'dragstart',
  'drop',
  'input'
];

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[zoneless]' })
export class EventsDirective implements OnDestroy {
  subscription = new Subscription();
  events$ = new BehaviorSubject<string[]>(zonePatchedEvents);

  @Input('zoneless')
  set events(value: string[]) {
    if (value && value.length > 0) {
      this.events$.next(value);
    } else {
      this.events$.next(zonePatchedEvents);
    }
  }

  reapplyEventListenersZoneUnPatched(events) {
    events.forEach(ev => {
      revertEventListenerZonePatch(this.el.nativeElement, ev);
    });
  }

  constructor(private el: ElementRef) {
    this.subscription = this.events$
      .pipe(
        tap(eventList => this.reapplyEventListenersZoneUnPatched(eventList))
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
