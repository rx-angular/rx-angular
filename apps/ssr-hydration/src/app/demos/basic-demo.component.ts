import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  computed,
  inject,
  PLATFORM_ID,
  ViewEncapsulation,
} from '@angular/core';
import { HydrationTracker } from '@rx-angular/cdk/ssr';
import { VVHydrationDemo } from '../vv-demo';

/**
 * Home route (`/`) demo.
 *
 * Renders exactly what the app rendered before routing was introduced: the
 * optional "after hydration" VirtualView section at the top of the container
 * (driven by the `?afterHydration=1` test hook), followed by the two
 * side-by-side VirtualView demos (one always enabled, one enabled only after
 * hydration completes). Behavior here is intentionally identical to the
 * original single-page demo so the existing e2e specs keep passing.
 */
@Component({
  selector: 'app-basic-hydration-demo',
  imports: [VVHydrationDemo],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="container">
      @if (showAfterHydration()) {
        <app-vv-hydration-demo [show]="true" [after]="true" />
      }

      <div class="comparison-container">
        <app-vv-hydration-demo [show]="true" />
        <app-vv-hydration-demo [show]="hydrationTracker.isFullyHydrated()" />
      </div>
    </div>
  `,
})
export class BasicHydrationDemoComponent {
  hydrationTracker = inject(HydrationTracker);

  readonly #isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  // Test-only hook: `?afterHydration=1` (or `=true`) opts into rendering the
  // "after hydration" VirtualView section once hydration completes. Guarded so
  // it is server-safe. Does not affect library runtime behavior.
  readonly #afterHydrationRequested =
    this.#isBrowser &&
    ['1', 'true'].includes(
      new URLSearchParams(window.location.search).get('afterHydration') ?? '',
    );

  protected readonly showAfterHydration = computed(
    () =>
      this.#afterHydrationRequested && this.hydrationTracker.isFullyHydrated(),
  );
}
