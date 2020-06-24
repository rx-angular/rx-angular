import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { zonePatchedEvents } from './unpatch-event-list';
import { unpatchEventListener } from '../../core/utils/make-zone-less';

/**
 * @Directive UnpatchEventsDirective
 *
 * @description
 *
 * The `unpatch` directive helps in partially migrating to zone-less apps as well as getting rid
 * of unnecessary renderings through zones `addEventListener` patches.
 * It can be used on any element you apply event bindings.
 *
 * The current way of binding events to the DOM is to use output bindings:
 *  ```html
 * <button (click)="doStuff($event)">click me</button>
 * ```
 *
 * The problem is that every event registered over `()` syntax, e.g. `(click)`
 * marks the component and all its ancestors as dirty and re-renders the whole component tree.
 * This is because zone.js patches the native browser API and whenever one of the patched APIs is used it re-renders.
 *
 * So even if your button is not related to a change that needs a re-render the app will re-render completely.
 * This leads to bad performance. This is especially helpful if you work with frequently fired events like 'mousemove'
 *
 * `unpatch` directive solves that problem.
 *
 * Included Features:
 *  - by default un-patch all registered listeners of the host it is applied on
 *  - un-patch only a specified set of registered event listeners
 *  - works zone independent (it directly checks the widow for patched APIs and un-patches them without the use of `runOutsideZone` which brings more performance)
 *  - Not interfering with any logic executed by the registered callback
 *
 * @usageNotes
 *
 * The `unpatch` directive can be used like shown here:
 * ```html
 * <button [unoatch] (click)="triggerSomeMethod($event)">click me</button>
 * <button [unoatch]="['mousemove']" (mousemove)="doStuff2($event)" (click)="doStuff($event)">click me</button>
 * ```
 *
 * @publicApi
 */
// tslint:disable-next-line:directive-selector
@Directive({ selector: '[unpatch]' })
export class UnpatchEventsDirective implements AfterViewInit, OnDestroy {
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
      unpatchEventListener(this.el.nativeElement, ev);
    });
  }

  constructor(private el: ElementRef) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.subscription = this.events$
      .pipe(
        tap(eventList => this.reapplyEventListenersZoneUnPatched(eventList))
      )
      .subscribe();
  }
}
