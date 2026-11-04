import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class RxaResizeObserver {
  private resizeObserver = new ResizeObserver((events) => {
    const byTarget = new Map<Element, ResizeObserverEntry>();
    for (let i = 0; i < events.length; i++) {
      byTarget.set(events[i].target, events[i]);
    }
    this.viewsResized$.next(byTarget);
    this.batchEnd$.next();
  });

  /** @internal */
  private readonly viewsResized$ = new Subject<
    Map<Element, ResizeObserverEntry>
  >();

  /** @internal */
  private readonly observed = new WeakSet<Element>();

  /**
   * Emits after all entries of a single `ResizeObserver` callback were
   * delivered, so their consequences can be handled once per batch.
   */
  readonly batchEnd$ = new Subject<void>();

  observeElement(
    element: Element,
    options?: ResizeObserverOptions,
  ): Observable<ResizeObserverEntry> {
    this.resizeObserver.observe(element, options);
    this.observed.add(element);
    return new Observable<ResizeObserverEntry>((observer) => {
      const inner = this.viewsResized$.subscribe((byTarget) => {
        const event = byTarget.get(element);
        if (event) {
          observer.next(event);
        }
      });
      return () => {
        this.resizeObserver.unobserve(element);
        this.observed.delete(element);
        inner.unsubscribe();
      };
    });
  }

  /**
   * Restarts the observation of an observed element. A restarted observation
   * reports after the next layout, even if the size didn't change since the
   * last report.
   */
  remeasure(element: Element, options?: ResizeObserverOptions): void {
    if (this.observed.has(element)) {
      this.resizeObserver.observe(element, options);
    }
  }

  destroy() {
    this.resizeObserver.disconnect();
  }
}
