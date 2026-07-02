import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';
import type { SpeculativeLink } from '../index';
import schedule from './schedule';
import { SpeculativeLinkRegistry } from './speculative-link-registry.service';

@Injectable({ providedIn: 'root' })
export class SpeculativeLinkObserver {
  readonly #ngZone = inject(NgZone);
  readonly #platformId = inject(PLATFORM_ID);
  readonly #linkRegistry = inject(SpeculativeLinkRegistry);

  readonly observer = this.#createObserver();

  register(el: SpeculativeLink): void {
    if (!this.observer) {
      return;
    }

    if (!this.#linkRegistry.registeredElements.has(el.element)) {
      this.#linkRegistry.registeredElements.set(el.element, el);

      this.#ngZone.runOutsideAngular(() => {
        this.observer?.observe(el.element);
      });
    } else if (this.#linkRegistry.intersectingElements.has(el)) {
      el.onEnterViewport();
    }
  }

  unregister(el: SpeculativeLink): void {
    this.observer?.unobserve(el.element);
    this.#linkRegistry.registeredElements.delete(el.element);

    if (this.#linkRegistry.intersectingElements.has(el)) {
      this.#linkRegistry.intersectingElements.delete(el);

      el.onExitViewport();
    }
  }

  #createObserver(): IntersectionObserver | null {
    if (
      !isPlatformBrowser(this.#platformId) ||
      typeof IntersectionObserver === 'undefined'
    ) {
      return null;
    }

    return new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = this.#linkRegistry.registeredElements.get(
            entry.target,
          );

          if (!target) {
            return;
          }

          if (entry.isIntersecting) {
            this.#linkRegistry.intersectingElements.add(target);

            schedule(() => target.onEnterViewport());
          } else if (this.#linkRegistry.intersectingElements.has(target)) {
            this.#linkRegistry.intersectingElements.delete(target);

            schedule(() => target.onExitViewport());
          }
        });
      },
      {
        threshold: 0.1,
      },
    );
  }
}
