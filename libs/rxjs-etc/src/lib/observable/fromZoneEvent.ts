// Source: https://github.com/angular/zone.js/blob/master/example/benchmarks/addEventListener.html

import { fromEventPattern, Observable } from 'rxjs';

interface ZoneEventListenerOptions extends EventListenerOptions {
  patched: boolean
}

export function fromZoneEvent<T>(target: any, eventName: string, options?: ZoneEventListenerOptions): Observable<T> {
  return fromEventPattern<T>(
    addClickHandler,
    removeClickHandler
  );

  function addClickHandler(handler) {
    if (options.patched) {
      target.addEventListener(eventName, handler);
    }
    (target as any).__zone_symbol__addEventListener(eventName, handler);
  }

  function removeClickHandler(handler) {
    if (options.patched) {
      target.removeEventListener(eventName, handler);
    }
    (target as any).__zone_symbol__removeEventListener(eventName, handler);
  }

}

