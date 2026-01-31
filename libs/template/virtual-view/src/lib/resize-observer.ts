import { DestroyRef, inject, Injectable } from '@angular/core';
import { EMPTY, Observable, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, finalize } from 'rxjs/operators';
import { PLATFORM } from './util';

/**
 * A service that observes the resize of the elements.
 *
 * @developerPreview
 */
@Injectable()
export class RxaResizeObserver {
  #destroyRef = inject(DestroyRef);
  #platform = inject(PLATFORM);

  #resizeObserver: ResizeObserver | null = null;

  /** @internal */
  #elements = new Map<Element, Subject<ResizeObserverEntry>>();

  constructor() {
    if (this.#platform.isBrowser) {
      this.#resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          if (this.#elements.has(entry.target))
            this.#elements.get(entry.target)!.next(entry);
        });
      });
    }

    this.#destroyRef.onDestroy(() => {
      this.#elements.clear();
      this.#resizeObserver?.disconnect();
    });
  }

  observeElement(
    element: Element,
    options?: ResizeObserverOptions,
  ): Observable<ResizeObserverEntry> {
    if (!this.#resizeObserver) {
      return EMPTY;
    }

    const resizeEvent$ = new ReplaySubject<ResizeObserverEntry>(1);
    this.#elements.set(element, resizeEvent$);
    this.#resizeObserver.observe(element, options);

    return resizeEvent$.pipe(
      distinctUntilChanged(),
      finalize(() => {
        this.#resizeObserver?.unobserve(element);
        this.#elements.delete(element);
      }),
    );
  }
}
