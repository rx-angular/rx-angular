/**
 * Cumulative Layout Shift e2e coverage for the Virtual View hydration path.
 *
 * These specs exercise the `/cls` route
 * (`apps/ssr-hydration/src/app/demos/cls-demo.component.ts`), which is built so a
 * missing size reservation is unmissable rather than subtle: every row is
 * server-rendered at a fixed 180px, while the placeholder template falls back to
 * only 8px. `--rx-vw-h` overrides that fallback whenever the directive has
 * measured the content, so the fallback is reached only when measurement failed.
 *
 * The sequence under test is the production one. The app-level
 * `provideVirtualViewConfig` gates `enabled` on `HydrationTracker.isFullyHydrated`,
 * so on first load the server renders every row as content, the client claims those
 * views during hydration, and only afterwards does the visibility pipeline register.
 * At that point every row below the fold is reported non-intersecting on the
 * observer's *first* callback and swaps straight to a placeholder — without ever
 * having been reported visible. Any implementation that measures content only in its
 * `visible === true` branch never measures those rows.
 *
 * Three independent angles, weakest-to-strongest coupling to the browser:
 *  1. document height stays stable across the swap (deterministic, no timing);
 *  2. `--rx-vw-h` is published on rows that were never visible (surgical);
 *  3. the real `layout-shift` performance entries stay under the CLS budget.
 */

/** Fixed rendered height of one row, mirroring `CLS_CARD_HEIGHT`. */
const CARD_HEIGHT = 180;

/** Placeholder fallback height, mirroring `CLS_PLACEHOLDER_FALLBACK`. */
const PLACEHOLDER_FALLBACK = 8;

/** Number of rows the demo renders. */
const ROW_COUNT = 60;

/**
 * `HydrationTracker` flips `isFullyHydrated` when every `[ngh]` node is hydrated or
 * via its 10s safety-net timeout, and the directive only starts virtualizing after
 * that flip. Post-hydration assertions therefore need a budget above 10s rather
 * than Cypress's 4s default.
 */
const HYDRATION_TIMEOUT = 15000;

/** Google's "good" CLS threshold. */
const CLS_BUDGET = 0.1;

/** Viewport used for every spec, so which rows start below the fold is fixed. */
const VIEWPORT = { width: 800, height: 600 } as const;

/**
 * Installs a buffered `layout-shift` PerformanceObserver on the application window
 * before any application code runs, accumulating entries onto the window so the
 * spec can read them later.
 *
 * Must be wired through `cy.visit`'s `onBeforeLoad` — an observer attached after
 * load would miss the shifts fired during hydration, which are the ones that matter.
 */
function collectLayoutShifts(win: Window): void {
  const target = win as unknown as {
    __clsEntries: { value: number; hadRecentInput: boolean }[];
    PerformanceObserver: typeof PerformanceObserver;
  };
  target.__clsEntries = [];

  const observer = new target.PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const shift = entry as unknown as {
        value: number;
        hadRecentInput: boolean;
      };
      target.__clsEntries.push({
        value: shift.value,
        hadRecentInput: shift.hadRecentInput,
      });
    }
  });

  // `buffered` replays entries recorded before this observer existed.
  observer.observe({ type: 'layout-shift', buffered: true } as never);
}

/**
 * Resolves once the visibility pipeline has run at least one placeholder swap,
 * which can only happen after hydration has completed and `enabled` has flipped.
 */
function waitForFirstPlaceholderSwap(): void {
  cy.get('[data-testid="cls-placeholder"]', {
    timeout: HYDRATION_TIMEOUT,
  }).should('have.length.greaterThan', 0);
}

describe('RxVirtualView - CLS under hydration', () => {
  beforeEach(() => {
    cy.viewport(VIEWPORT.width, VIEWPORT.height);
  });

  it('server-renders every row as real content', () => {
    // Baseline: the page under test genuinely exercises the hydration path rather
    // than a client-only render. Asserted against the raw HTML so it cannot be
    // satisfied by post-hydration client rendering.
    cy.request('/cls').then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.contain('data-testid="cls-content"');
      expect(response.body).to.contain('Row 1');
      // A row far below the fold must also be present in the server payload.
      expect(response.body).to.contain(`Row ${ROW_COUNT}`);
    });
  });

  it('keeps the document height stable when below-fold rows swap to placeholders', () => {
    cy.visit('/cls');

    // Height of the fully-rendered server output, captured before the visibility
    // pipeline has had a chance to hide anything.
    cy.document().then((doc) => {
      const initialHeight = doc.documentElement.scrollHeight;
      const expectedContentHeight = ROW_COUNT * CARD_HEIGHT;

      // Sanity-check the fixture itself: all rows are laid out at full height.
      expect(
        initialHeight,
        'server-rendered document spans every row at full height',
      ).to.be.greaterThan(expectedContentHeight * 0.9);

      waitForFirstPlaceholderSwap();

      cy.document().then((afterDoc) => {
        const hydratedHeight = afterDoc.documentElement.scrollHeight;

        // With reservation working, swapping content for placeholders preserves
        // each row's height, so the document barely moves. Without it, 60 rows
        // collapse from 180px to 8px and the height implodes by roughly 10,000px.
        const collapsedHeight = ROW_COUNT * PLACEHOLDER_FALLBACK;
        expect(
          hydratedHeight,
          'document height must not collapse toward the placeholder fallback',
        ).to.be.greaterThan(collapsedHeight * 4);

        const drift = Math.abs(hydratedHeight - initialHeight);
        expect(
          drift,
          `document height drifted ${drift}px across the placeholder swap`,
        ).to.be.lessThan(CARD_HEIGHT);
      });
    });
  });

  it('publishes --rx-vw-h for rows hidden without ever being visible', () => {
    cy.visit('/cls');
    waitForFirstPlaceholderSwap();

    // Every host showing a placeholder was hidden by the pipeline. On first load
    // the ones below the fold were never reported visible, so this is exactly the
    // population that used to go unmeasured.
    cy.get('[data-testid="cls-host"]').then(($hosts) => {
      const hidden = $hosts
        .toArray()
        .filter(
          (host) =>
            host.querySelector('[data-testid="cls-placeholder"]') !== null,
        );

      expect(
        hidden.length,
        'some rows swapped to a placeholder',
      ).to.be.greaterThan(0);

      const unreserved = hidden.filter((host) => {
        const reserved = parseFloat(
          getComputedStyle(host).getPropertyValue('--rx-vw-h'),
        );
        return !(reserved > 0);
      });

      expect(
        unreserved.map((host) => host.getAttribute('data-row-id')),
        'every hidden row reserves its measured height via --rx-vw-h',
      ).to.deep.equal([]);
    });
  });

  it('reserves the real row height, not the placeholder fallback', () => {
    cy.visit('/cls');
    waitForFirstPlaceholderSwap();

    cy.get('[data-testid="cls-host"]').then(($hosts) => {
      const hidden = $hosts
        .toArray()
        .filter(
          (host) =>
            host.querySelector('[data-testid="cls-placeholder"]') !== null,
        );

      const collapsed = hidden.filter(
        (host) => host.getBoundingClientRect().height < CARD_HEIGHT * 0.9,
      );

      expect(
        collapsed.map((host) => host.getAttribute('data-row-id')),
        `hidden rows must stay near ${CARD_HEIGHT}px, not fall back to ${PLACEHOLDER_FALLBACK}px`,
      ).to.deep.equal([]);
    });
  });

  it('stays within the CLS budget through hydration and a full scroll', () => {
    cy.visit('/cls', { onBeforeLoad: collectLayoutShifts });

    waitForFirstPlaceholderSwap();

    // Walk the page so rows repeatedly cross the observer boundary in both
    // directions, mounting content and swapping back to placeholders. Each
    // transition is an opportunity for an unreserved height to shift the page.
    for (const y of ['25%', '50%', '75%', '100%'] as const) {
      cy.scrollTo('0%', y, { duration: 200 });
      cy.wait(150);
    }
    cy.scrollTo('0%', '0%', { duration: 200 });
    cy.wait(300);

    cy.window().then((win) => {
      const entries =
        (
          win as unknown as {
            __clsEntries?: { value: number; hadRecentInput: boolean }[];
          }
        ).__clsEntries ?? [];

      // Mirror the Core Web Vitals definition and discount shifts that followed
      // real user input. Cypress scrolls programmatically, so genuine swap-driven
      // shifts are still counted.
      const cls = entries
        .filter((entry) => !entry.hadRecentInput)
        .reduce((total, entry) => total + entry.value, 0);

      cy.log(`layout-shift entries: ${entries.length}, CLS: ${cls.toFixed(4)}`);

      expect(
        cls,
        `CLS ${cls.toFixed(4)} must stay within ${CLS_BUDGET}`,
      ).to.be.lessThan(CLS_BUDGET);
    });
  });
});
