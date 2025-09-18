import { isPlatformBrowser } from '@angular/common';
import {
  inject,
  Injectable,
  OnDestroy,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

/**
 * A high-performance utility to track application hydration status using a MutationObserver,
 * with a timeout safety net.
 *
 * It provides a signal `isFullyHydrated` that becomes true once all components are
 * hydrated or after a 10-second timeout.
 */
@Injectable({
  providedIn: 'root',
})
export class HydrationTrackerService implements OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private observer: MutationObserver | null = null;
  private timeoutId: any = null; // Stores the setTimeout ID

  /**
   * A reactive signal that emits `true` when the application is fully hydrated.
   */
  readonly isFullyHydrated = signal(false);

  readonly isFullyHydrated$ = toObservable(this.isFullyHydrated);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeObserver();
    }
  }

  private initializeObserver(): void {
    const initialUnhydratedElements = document.body.querySelectorAll('[ngh]');
    let unhydratedCount = initialUnhydratedElements.length;

    if (unhydratedCount === 0) {
      this.isFullyHydrated.set(true);
      console.log('✅ Application was already hydrated on initialization.');
      return;
    }

    // Set a 10-second timeout as a safety net.
    this.timeoutId = setTimeout(() => {
      this.completeHydration(true); // `true` indicates it was a timeout
    }, 10000);

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

    initialUnhydratedElements.forEach((element) => {
      this.observer?.observe(element, {
        attributes: true,
        attributeFilter: ['ngh'],
      });
    });
  }

  private completeHydration(timedOut: boolean): void {
    // If this function is running, we must clear any pending timeout.
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    this.isFullyHydrated.set(true);

    if (timedOut) {
      console.warn(
        '🟡 Hydration check timed out after 10 seconds. Forcing completion.',
      );
    } else {
      console.log('✅ Application is now fully hydrated.');
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
