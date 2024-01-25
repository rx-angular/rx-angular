describe('RxAngular ISR', () => {
  it('should render home page with static data', () => {
    cy.visit('/');

    cy.get('h1').should('contain', 'Static');
    cy.get('p').should('contain', 'Static');
  });

  it('should render page 1 with dynamic data', () => {
    cy.visit('/');

    cy.intercept('https://jsonplaceholder.typicode.com/posts/1', {
      body: {
        title: 'Dynamic Title',
        body: 'Dynamic Paragraph',
      },
    });

    cy.get('a').contains('Page 1').click();

    cy.get('h2').contains('Dynamic Title');
    cy.get('p').contains('Dynamic Paragraph');
  });
});
