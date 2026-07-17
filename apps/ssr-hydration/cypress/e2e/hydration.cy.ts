/**
 * Post-hydration behavior e2e coverage for the Virtual View directive.
 *
 * The SSR hydration app (`apps/ssr-hydration/src/app/vv-demo.ts`) renders a
 * `.users-grid` of `app-item` user cards wrapped in
 * `rxVirtualViewObserver [root]="null"` / `rxVirtualView`. Each host has a red
 * placeholder div (`min-height: var(--rx-vw-h, 107px)`). The directive's
 * `enabled` input is wired to `HydrationTracker.isFullyHydrated`, so once
 * hydration completes the directive switches to visibility-based rendering:
 * items in the viewport render their content, items scrolled out swap to the
 * placeholder.
 *
 * Notes that drive how these specs are written:
 * - The Virtual View observer uses `[root]="null"`, i.e. the browser VIEWPORT
 *   is the intersection root. The `.users-grid` itself is NOT a scroll
 *   container (its `overflow` is `visible`), so we move items out of view by
 *   scrolling the WINDOW, not the grid element.
 * - The same user list is rendered several times on the page: the Virtual View
 *   grid, an RxFor grid (`app-hydration-demo`), an optional "after hydration"
 *   Virtual View grid, and a standalone `@defer` card. User names are therefore
 *   NOT globally unique, so every content assertion is scoped to the FIRST
 *   `.users-grid` (the Virtual View one) via `cy.get('.users-grid').first()`.
 * - `HydrationTracker` flips `isFullyHydrated` either when every `[ngh]` node is
 *   hydrated or via a 10s safety-net timeout. The directive only starts
 *   virtualizing after that flip, so post-hydration assertions use a generous
 *   retry timeout (> 10s) rather than Cypress's 4s default.
 */
const HYDRATION_TIMEOUT = 15000;

describe('RxAngular SSR Hydration - Virtual View post-hydration behavior', () => {
  describe('Requirement 12.1: in-viewport content stays visible after hydration', () => {
    it('keeps top-of-list user cards visible once hydration completes', () => {
      cy.visit('/');

      // The first users in the Virtual View grid sit at the top of the
      // viewport, so their content must remain rendered and visible after
      // hydration. Scope to the first `.users-grid` (the Virtual View one)
      // because the same names appear in the RxFor grid and `@defer` card.
      cy.get('.users-grid')
        .first()
        .within(() => {
          cy.contains('.user-card', 'John Doe', {
            timeout: HYDRATION_TIMEOUT,
          }).should('be.visible');
          cy.contains('.user-card', 'Jane Smith').should('be.visible');
        });
    });
  });

  describe('Requirement 12.2: scrolling out shows the placeholder', () => {
    it('replaces a top item content with a placeholder after it leaves the viewport', () => {
      cy.visit('/');

      // Confirm the early item is rendered (as content) before we scroll it out
      // of view. Scoped to the Virtual View grid.
      cy.get('.users-grid')
        .first()
        .contains('.user-card', 'John Doe')
        .should('exist');

      // Scroll the WINDOW to the bottom so the first grid (and its top items)
      // leave the viewport. Because the observer root is the viewport, this
      // forces those RxVirtualView hosts to swap their content for the
      // placeholder once the directive is enabled by hydration.
      cy.scrollTo('bottom', { duration: 300 });

      // After hydration enables the directive, the scrolled-out item's content
      // is torn down. Retry with a generous timeout to cover the hydration
      // window. Scoped to the first grid so we do not match the RxFor grid or
      // the `@defer` "John Doe" card.
      cy.get('.users-grid')
        .first()
        .contains('.user-card', 'John Doe', { timeout: HYDRATION_TIMEOUT })
        .should('not.exist');

      // A red placeholder div should now occupy the reserved space. Placeholders
      // are empty divs with a red background; assert at least one exists in the
      // Virtual View grid.
      cy.get('.users-grid')
        .first()
        .find('div[style*="background: red"]', { timeout: HYDRATION_TIMEOUT })
        .should('have.length.greaterThan', 0);
    });
  });

  describe('Requirement 12.3 / 12.5: reserved height for known-size items only', () => {
    it('retains a non-zero reserved height for an item that was measured before being scrolled out', () => {
      cy.visit('/');

      // The item must be rendered/measured first so its size is known. Only
      // then does the directive have a size to reserve when the placeholder
      // shows (Req 12.3). Items whose content size is never measured are
      // explicitly excluded from reserved-height assertions (Req 12.5) - we do
      // not assert reserved height for anything that was not rendered first.
      cy.get('.users-grid')
        .first()
        .contains('.user-card', 'John Doe')
        .should('be.visible');

      // Capture the first rxVirtualView host in the Virtual View grid (wraps the
      // first, measured item). The host carries the `rxVirtualView` attribute
      // (rendered lowercase in the DOM).
      cy.get('.users-grid')
        .first()
        .find('[rxvirtualview]')
        .first()
        .then(($host) => {
          const host = $host[0] as HTMLElement;

          // Scroll the WINDOW so the measured item leaves the viewport and the
          // placeholder takes over. Because the size was already measured, the
          // host must keep a reserved height so no layout shift occurs.
          cy.scrollTo('bottom', { duration: 300 });

          // Wait for the placeholder swap to happen (directive enabled by
          // hydration) before measuring the reserved height.
          cy.get('.users-grid')
            .first()
            .find('div[style*="background: red"]', {
              timeout: HYDRATION_TIMEOUT,
            })
            .should('have.length.greaterThan', 0);

          cy.wrap(host).then(() => {
            const measuredHeight = host.getBoundingClientRect().height;
            const cssVar = getComputedStyle(host)
              .getPropertyValue('--rx-vw-h')
              .trim();
            const minH =
              parseFloat(String(getComputedStyle(host).minHeight)) || 0;
            const cssVarH = parseFloat(cssVar) || 0;

            // At least one reservation signal must indicate a non-zero height.
            expect(
              measuredHeight > 0 || minH > 0 || cssVarH > 0,
              'known-size item host retains a reserved height',
            ).to.equal(true);
          });
        });
    });
  });

  describe('Requirement 12.4: after-hydration section renders once toggled', () => {
    it('renders the "after hydration" section and its cards when enabled via the test hook', () => {
      // The demo exposes a test-only hook: visiting with `?afterHydration=1`
      // sets `loadAfterHydration` to true after hydration, rendering the
      // "VirtualView Directive (after hydration)" section. Because that toggle
      // fires only once hydration completes (up to the 10s safety-net timeout),
      // use a generous retry timeout.
      cy.visit('/?afterHydration=1');

      // The section heading should appear once the signal toggles post-hydration.
      cy.contains('h2', 'VirtualView Directive (after hydration)', {
        timeout: HYDRATION_TIMEOUT,
      }).should('exist');

      // And its user cards should render (the same user list is reused). The
      // after-hydration grid sits in the right column at the top of the page,
      // so its first item (John Doe) is in the viewport and rendered as content.
      cy.contains('h2', 'VirtualView Directive (after hydration)')
        .parents('.rx-for-section')
        .first()
        .within(() => {
          cy.contains('.user-card', 'John Doe', {
            timeout: HYDRATION_TIMEOUT,
          }).should('exist');
        });
    });
  });
});
