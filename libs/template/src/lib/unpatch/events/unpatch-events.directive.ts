import { Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { zonePatchedEvents } from './unpatch-event-list';
import { revertEventListenerZonePatch } from '../../core/utils/make-zone-less';

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[unpatch]' })
export class UnpatchEventsDirective implements OnDestroy {
  subscription = new Subscription();
  events$ = new BehaviorSubject<string[]>(zonePatchedEvents);

  @Input('unpatch')
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
