import { inject, Injectable, NgZone, OnDestroy, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { HYDRATION_TRACKER_CONFIG_TOKEN } from './config';
import { PLATFORM } from './platform';

/**
 * A high-performance utility to track application hydration status using a MutationObserver,
 * with a timeout safety net.
 *
 * It provides a signal `isFullyHydrated` that becomes true once all components are
 * hydrated or after a configurable timeout (default: 10 seconds).
 *
 * Disclaimer: The service only runs in the browser and is not available on the server.
 */
@Injectable({ providedIn: 'root' })
export class HydrationTracker implements OnDestroy {
  private config = inject(HYDRATION_TRACKER_CONFIG_TOKEN);
  private platform = inject(PLATFORM);
  private ngZone = inject(NgZone);
  private observer: MutationObserver | null = null;
  private timeoutId: any = null; // Stores the setTimeout ID

  /**
   * A reactive signal that emits `true` when the application is fully hydrated.
   */
  readonly isFullyHydrated = signal(false);

  /**
   * An observable that emits `true` when the application is fully hydrated.
   */
  readonly isFullyHydrated$ = toObservable(this.isFullyHydrated);

  constructor() {
    if (this.platform.isServerRendered) {
      this.initializeObserver();
    } else if (this.platform.isBrowser) {
      this.isFullyHydrated.set(true);
    }
  }

  private initializeObserver(): void {
    const unhydratedElements = this.getUnhydratedElements();
    let unhydratedCount = unhydratedElements.length;

    if (unhydratedCount === 0) {
      this.isFullyHydrated.set(true);
      if (this.config.logging) {
        console.log(
          '[HydrationTracker] ✅ Application was already hydrated on initialization.',
        );
      }
      return;
    }

    this.observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'ngh'
        ) {
          const element = mutation.target as Element;
          if (!element.hasAttribute('ngh')) {
            unhydratedCount--;
          }
        }
      }

      if (unhydratedCount <= 0) {
        // Hydration finished normally, so we don't need the timeout.
        this.completeHydration(false);
      }
    });

    unhydratedElements.forEach((element) => {
      this.ngZone.runOutsideAngular(() => {
        this.observer?.observe(element, {
          attributes: true,
          attributeFilter: ['ngh'],
        });
      });
    });

    if (this.config.timeout) {
      // Set a timeout as a safety net.
      this.timeoutId = this.ngZone.runOutsideAngular(() =>
        setTimeout(() => {
          this.completeHydration(true); // `true` indicates it was a timeout
        }, this.config.timeout),
      );
    }
  }

  private getUnhydratedElements(): Element[] {
    return Array.from(document.body.querySelectorAll('[ngh]'));
  }

  private completeHydration(timedOut: boolean): void {
    // If this function is running, we must clear any pending timeout.
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    this.isFullyHydrated.set(true);

    if (timedOut) {
      if (this.config.logging) {
        console.warn(
          `[HydrationTracker] 🟡 Hydration check timed out after ${this.config.timeout} milliseconds. Forcing completion.`,
        );
      }
    } else {
      if (this.config.logging) {
        console.log('[HydrationTracker] ✅ Application is now fully hydrated.');
      }
    }

    // Disconnect the observer to free up resources.
    this.observer?.disconnect();
    this.observer = null;
  }

  ngOnDestroy(): void {
    // Ensure both the observer and the timeout are cleaned up.
    this.observer?.disconnect();
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
