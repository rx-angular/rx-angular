import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { getZoneUnPatchedApi } from '@rx-angular/cdk/internals/core';
import {
  focusEvents,
  inputEvents,
  keyboardEvents,
  mouseEvents,
  touchEvents,
  wheelEvents,
} from '@rx-angular/cdk/zone-configurations';
import { BehaviorSubject, Subscription } from 'rxjs';

const zonePatchedEvents: string[] = [
  ...focusEvents,
  ...mouseEvents,
  ...wheelEvents,
  ...inputEvents,
  ...keyboardEvents,
  ...touchEvents,
];

/**
 *
 * @description
 *
 * This function takes an elem and event and re-applies the listeners from the passed event to the
 * passed element with the zone un-patched version of it.
 *
 * @param elem {HTMLElement} - The elem to re-apply the listeners to.
 * @param event {string} - The name of the event from which to re-apply the listeners.
 *
 * @returns void
 */
export function unpatchEventListener(
  element: HTMLElement & {
    eventListeners?: (event: string) => EventListenerOrEventListenerObject[];
  },
  event: string
): EventListenerOrEventListenerObject[] {
  // `EventTarget` is patched only in the browser environment, thus
  // running this code on the server-side will throw an exception:
  // `TypeError: element.eventListeners is not a function`.
  if (typeof element.eventListeners !== 'function') {
    return;
  }

  const eventListeners = element.eventListeners(event);

  // Return if no event listeners are present
  if (!Array.isArray(eventListeners) || eventListeners.length === 0) {
    return;
  }

  const addEventListener = getZoneUnPatchedApi(
    element,
    'addEventListener'
  ).bind(element) as typeof element.addEventListener;

  const listeners: EventListenerOrEventListenerObject[] = [];
  eventListeners.forEach((listener) => {
    // Remove and reapply listeners with patched API
    element.removeEventListener(event, listener);
    // Reapply listeners with un-patched API
    addEventListener(event, listener);

    listeners.push(listener);
  });

  return listeners;
}

declare const ngDevMode: boolean;

const NG_DEV_MODE = typeof ngDevMode === 'undefined' || !!ngDevMode;

/**
 * @Directive RxUnpatch
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
 *  - un-patch all events listeners except a specified set
 *  - works zone independent (it directly checks the window for patched APIs and un-patches them without the use of `runOutsideZone` which brings more performance)
 *  - Not interfering with any logic executed by the registered callback
 *
 * Apply in three distinct ways:
 *
 * 1. Unpatch all events: `<div [unpatch]>...<div>`
 * 2. Unpatch specified events*: `<div [unpatch]="['mouseenter', 'mouseleave']">...<div>`
 * 3. Unpatch all except specified events*: `<div [unpatch]="['!mouseenter', '!mouseleave']">...<div>`
 *
 * When combining negated and non-negated events i.e:  `<div [unpatch]="['!mouseenter', 'mouseleave']">...<div>` all non-negated events are ignored and an error will be thrown in dev mode!
 *
 * @usageNotes
 *
 * The `unpatch` directive can be used like shown here:
 * ```html
 * <button [unpatch] (click)="triggerSomeMethod($event)">click me</button>
 * <button [unpatch]="['mousemove']" (mousemove)="doStuff2($event)" (click)="doStuff($event)">click me</button>
 * ```
 *
 * @publicApi
 */
// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: '[unpatch]', standalone: true })
/**
 * @todo: add prefix [rxUnpatch]
 */
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class RxUnpatch implements OnChanges, AfterViewInit, OnDestroy {
  /**
   * @description
   * List of events that the element should be unpatched from. When input is empty or undefined,
   * the element is unpatched from all zone-patched events.
   *
   * Full list of zone-patched browser events can be found in
   * [this document](https://github.com/angular/angular/blob/master/packages/zone.js/STANDARD-APIS.md#browser).
   *
   */
  @Input('unpatch') events?: string[];

  private subscription = new Subscription();
  private events$ = new BehaviorSubject<string[]>(zonePatchedEvents);
  private listeners = new Map<string, EventListenerOrEventListenerObject[]>();

  constructor(private host: ElementRef<HTMLElement>) {}

  ngOnChanges({ events }: SimpleChanges): void {
    if (events && Array.isArray(this.events)) {
      const negatedEvents = this.events
        .filter((event) => event.startsWith('!'))
        .map((event) => event.replace('!', ''));

      const nextEvents = negatedEvents.length
        ? zonePatchedEvents.filter(
            (zonePatchedEvent) => !negatedEvents.includes(zonePatchedEvent)
          )
        : this.events;

      if (NG_DEV_MODE) {
        this.validateEvents(nextEvents, negatedEvents);
      }

      this.events$.next(nextEvents);
    }
  }

  ngAfterViewInit(): void {
    this.subscription = this.events$.subscribe((events) => {
      this.reapplyUnPatchedEventListeners(events);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

    for (const [event, listeners = []] of this.listeners) {
      listeners.forEach((listener) => {
        this.host.nativeElement.removeEventListener(event, listener);
      });
    }
  }

  private reapplyUnPatchedEventListeners(events: string[]): void {
    for (const event of events) {
      const listeners = unpatchEventListener(this.host.nativeElement, event);
      this.listeners.set(event, listeners);
    }
  }

  private validateEvents(nextEvents: string[], negatedEvents: string[]): void {
    // check if user has specified negated and non-negated events
    if (negatedEvents.length && negatedEvents.length !== this.events.length) {
      throw new Error(
        `Invalid value [${this.events.toString()}] specified for unpatch directive! Cannot combine negated & non-negated events!`
      );
    }

    // check if user has specified invalid events
    const unknownEvents = [...negatedEvents, ...nextEvents].filter(
      (event) => !zonePatchedEvents.includes(event)
    );
    if (unknownEvents.length) {
      throw new Error(
        `Unknown events [${unknownEvents.toString()}] specified for unpatch directive!`
      );
    }
  }
}
