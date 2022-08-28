describe('@rx-angular/template universal rendering', () => {
  describe('PushPipe', () => {
    it('should display green text', () => {
      cy.request('http://localhost:4200').its('body').then(
        html => {
          const el = Cypress.$(html).find('#push');
          expect(el).to.have.text('green');
        }
      )
    });
  });

  describe('LetDirective', () => {
    it('should display green text', () => {
      cy.request('http://localhost:4200').its('body').then(
        html => {
          const el = Cypress.$(html).find('#let');
          expect(el).to.have.text('green');
        }
      )
    });
  });

  describe('RxFor', () => {
    it('should display green and purple text', () => {
      cy.request('http://localhost:4200').its('body').then(
        html => {
          const el = Cypress.$(html).find('.for');
          expect(el.length).eq(2);
          expect(el.eq(0)).to.include.text('green');
          expect(el.eq(1)).to.include.text('purple');
        }
      )
    });
  });
});
