/**
 * Server-rendered output e2e coverage for the SSR hydration app.
 *
 * These tests fetch the raw server-rendered HTML via `cy.request('/')` (no
 * hydration/JS execution) and assert on the response body. On the server the
 * Virtual View directive is disabled (its `enabled` input is wired to
 * `HydrationTracker.isFullyHydrated`, which is `false` on the server), so the
 * directive renders CONTENT synchronously and suppresses the visibility-based
 * size-reservation styles.
 */
describe('SSR hydration app - server-rendered output', () => {
  // Req 11.1: the server-rendered body contains the Virtual View list content.
  it('renders the Virtual View list content on the server', () => {
    cy.request('/')
      .its('body')
      .then((html: string) => {
        // A known user name from the rendered list should be present.
        expect(html).to.include('John Doe');

        // The `app-item` user-card markup is rendered as content (not a
        // placeholder) while the directive is disabled on the server.
        expect(html).to.include('user-card');

        // Sanity check using the DOM parser as well: at least one rendered card.
        const cards = Cypress.$(html).find('.user-card');
        expect(cards.length).to.be.greaterThan(0);
      });
  });

  // Req 11.2: no visibility-based reservation styles on the RxVirtualView hosts.
  it('does not include reservation styles on the server-rendered host elements', () => {
    cy.request('/')
      .its('body')
      .then((html: string) => {
        // The directive suppresses `contain: size layout paint` while disabled.
        expect(html).not.to.match(/contain:\s*size layout paint/);

        // No inline min-width / min-height reservations should be emitted.
        // (The placeholder template uses `min-height`, but placeholders are NOT
        // rendered on the server - content is shown while the directive is
        // disabled - so `min-height`/`min-width` must be absent.)
        expect(html).not.to.match(/min-width:/);
        expect(html).not.to.match(/min-height:/);
      });
  });

  // Req 11.3: the server-rendered body contains Angular hydration state markup.
  it('includes Angular hydration markup on the server-rendered output', () => {
    cy.request('/')
      .its('body')
      .then((html: string) => {
        // Angular SSR with `provideClientHydration` annotates hydratable nodes
        // with `ngh` attributes.
        expect(html).to.include('ngh=');
      });
  });
});
