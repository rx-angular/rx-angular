describe('@rx-angular/template universal rendering', () => {
  describe('PushPipe using native strategy', () => {
    it('should display green text', () => {
      cy.request('http://localhost:4200').its('body').then(
        html => {
          const el = Cypress.$(html).find('#push');
          expect(el).to.have.text('green');
        }
      )
    });
  });

  describe('LetDirective using native strategy', () => {
    it('should display green text using', () => {
      cy.request('http://localhost:4200').its('body').then(
        html => {
          const el = Cypress.$(html).find('#let');
          expect(el).to.have.text('green');
        }
      )
    });
  });
});
