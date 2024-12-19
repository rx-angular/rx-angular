import { DestroyRef, inject, Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';

/**
 * A service that observes the resize of the elements.
 *
 * @developerPreview
 */
@Injectable()
export class RxaResizeObserver {
  #destroyRef = inject(DestroyRef);
  #resizeObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      if (this.#elements.has(entry.target))
        this.#elements.get(entry.target).next(entry);
    });
  });

  /** @internal */
  #elements = new WeakMap<Element, Subject<ResizeObserverEntry>>();

  constructor() {
    this.#destroyRef.onDestroy(() => this.#resizeObserver.disconnect());
  }

  observeElement(
    element: Element,
    options?: ResizeObserverOptions,
  ): Observable<ResizeObserverEntry> {
    const resizeEvent$ = new ReplaySubject<ResizeObserverEntry>(1);
    this.#elements.set(element, resizeEvent$);
    this.#resizeObserver.observe(element, options);

    return this.#elements.get(element).pipe(
      distinctUntilChanged(),
      tap({
        unsubscribe: () => this.#elements.delete(element),
      }),
    );
  }
}
