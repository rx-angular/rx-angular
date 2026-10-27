import {
  afterNextRender,
  Component,
  inject,
  Injectable,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  provideVirtualViewConfig,
  RxVirtualView,
  RxVirtualViewContent,
  RxVirtualViewObserver,
  RxVirtualViewPlaceholder,
} from '@rx-angular/template/virtual-view';

/**
 * Holds the `enabled` signal for this route's virtual views.
 *
 * Kept in a service rather than the component so the component-level
 * `provideVirtualViewConfig` factory can `inject()` it.
 */
@Injectable()
export class ClsEnableGate {
  /**
   * Starts `false` and is flipped after the first browser render.
   *
   * This reproduces the shape of a hydrated SSR page: while disabled the directive
   * renders its content eagerly and marks it as shown, so by the time
   * virtualization engages the content is mounted but has never been through the
   * visibility pipeline. It is the same state the vanilla build reaches via its
   * synchronous hydration claim plus an `enabled` gate on
   * `HydrationTracker.isFullyHydrated`.
   *
   * The demo drives it explicitly because this app prerenders without `[ngh]`
   * markers, so `HydrationTracker` reports full hydration immediately and the
   * directive would otherwise be enabled from its very first `ngAfterContentInit`
   * — never entering the state under test.
   */
  readonly enabled = signal(false);
}

/** Rendered height of one card, in px. Fixed so measurement is exact. */
export const CLS_CARD_HEIGHT = 180;

/**
 * Fallback height in the placeholder template, in px.
 *
 * Deliberately far smaller than {@link CLS_CARD_HEIGHT}. `--rx-vw-h` overrides
 * it whenever the directive has measured the content, so this value is only ever
 * used when measurement failed — which turns a missing reservation into a large,
 * unambiguous layout shift instead of a few stray pixels.
 */
export const CLS_PLACEHOLDER_FALLBACK = 8;

interface Row {
  id: number;
  label: string;
}

/**
 * CLS measurement demo (route `/cls`).
 *
 * Purpose-built to make the hydration size-reservation regression observable as a
 * real Cumulative Layout Shift score rather than as a unit-level assertion.
 *
 * Every row is server-rendered at a fixed {@link CLS_CARD_HEIGHT}, and `enabled`
 * is gated on hydration by the app-level `provideVirtualViewConfig`, so on load
 * this page reproduces the production sequence exactly:
 *
 * 1. the server renders all rows as real content;
 * 2. the client claims them during hydration, so they are mounted but were never
 *    put through the visibility pipeline;
 * 3. hydration completes, `enabled` flips true, and every row below the fold is
 *    reported non-intersecting on the observer's first callback and swaps to a
 *    placeholder — without ever having been reported visible.
 *
 * If the directive only measures content in its `visible === true` branch, step 3
 * collapses each of those rows from {@link CLS_CARD_HEIGHT} to
 * {@link CLS_PLACEHOLDER_FALLBACK} and the document height implodes. Scrolling
 * then walks the user through shift after shift as rows mount at their real height
 * and collapse again.
 *
 * `keepLastKnownSize` is intentionally left off: the reservation here comes from
 * `--rx-vw-h` in the placeholder's own `min-height`, which is how consumers
 * actually reserve space.
 */
@Component({
  selector: 'app-cls-demo',
  imports: [
    RxVirtualViewObserver,
    RxVirtualView,
    RxVirtualViewContent,
    RxVirtualViewPlaceholder,
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [
    ClsEnableGate,
    provideVirtualViewConfig(() => ({
      enabled: inject(ClsEnableGate).enabled,
    })),
  ],
  styles: `
    .cls-row {
      box-sizing: border-box;
      height: ${CLS_CARD_HEIGHT}px;
      padding: 16px;
      margin: 0;
      border: 1px solid #d0d7de;
      background: #fff;
    }
    .cls-list {
      display: block;
      width: 100%;
      max-width: 640px;
      margin: 0 auto;
    }
    .cls-placeholder {
      box-sizing: border-box;
      background: #ffe6e6;
    }
  `,
  template: `
    <div class="container demo-page">
      <h2 data-testid="cls-heading">CLS reservation under hydration</h2>
      <p class="demo-intro">
        Each row is server-rendered at a fixed {{ cardHeight }}px. The
        placeholder falls back to only {{ placeholderFallback }}px, so any row
        whose content was never measured collapses visibly when it swaps. A
        correct implementation publishes <code>--rx-vw-h</code> for every
        mounted row, including the ones below the fold that are hidden without
        ever having been visible, and the score stays at zero.
      </p>

      <div class="cls-list" rxVirtualViewObserver [root]="null">
        @for (row of rows(); track row.id) {
          <div
            rxVirtualView
            [useContainment]="false"
            data-testid="cls-host"
            [attr.data-row-id]="row.id"
          >
            <div
              *rxVirtualViewContent
              class="cls-row"
              data-testid="cls-content"
            >
              <h3>{{ row.label }}</h3>
              <p class="email">Fixed {{ cardHeight }}px row</p>
            </div>
            <div
              *rxVirtualViewPlaceholder
              class="cls-placeholder"
              data-testid="cls-placeholder"
              [style.min-height]="
                'var(--rx-vw-h, ' + placeholderFallback + 'px)'
              "
            ></div>
          </div>
        }
      </div>
    </div>
  `,
})
export class ClsDemoComponent {
  protected readonly cardHeight = CLS_CARD_HEIGHT;
  protected readonly placeholderFallback = CLS_PLACEHOLDER_FALLBACK;

  constructor() {
    const gate = inject(ClsEnableGate);
    // Enable virtualization only after the rows have been rendered and painted
    // once, so they are mounted-but-unmeasured when the pipeline takes over.
    afterNextRender(() => gate.enabled.set(true));
  }

  /** Enough rows to span many viewports, so most start below the fold. */
  protected readonly rows = signal<Row[]>(
    Array.from({ length: 60 }, (_, index) => ({
      id: index + 1,
      label: `Row ${index + 1}`,
    })),
  );
}
