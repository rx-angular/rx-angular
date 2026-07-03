describe('Rebundle Build Demo', () => {
  const expectedLoadedBundleCount = 4;

  it('loads optimized bundles without browser errors', () => {
    const jsRequests = new Set<string>();

    cy.intercept('GET', '**/*.js', (req) => {
      jsRequests.add(req.url.split('?')[0]);
      req.continue();
    });

    cy.visit('/500/chunk-001', {
      onBeforeLoad(win) {
        const errors: string[] = [];
        const consoleError = win.console.error.bind(win.console);

        Object.assign(win, { __ngxBuildErrors: errors });

        win.addEventListener('error', (event) => {
          errors.push(event.message);
        });

        win.addEventListener('unhandledrejection', (event) => {
          errors.push(String(event.reason));
        });

        win.console.error = (...args) => {
          errors.push(args.map(String).join(' '));
          consoleError(...args);
        };
      },
    });

    cy.get('h1').should('contain', 'Ngx Build Demo');
    cy.get('h2').should('contain', 'Chunk 001 Component');

    cy.window().its('__ngxBuildErrors').should('deep.equal', []);

    cy.wrap(null).then(() => {
      expect([...jsRequests], 'loaded JS bundles').to.have.length(
        expectedLoadedBundleCount,
      );
    });
  });
});
