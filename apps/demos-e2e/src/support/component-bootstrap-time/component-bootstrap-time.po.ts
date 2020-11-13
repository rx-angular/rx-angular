/*
  Set of helpers for testing "RxLet vs Push" demo page.
*/

// export function openAndCloseToggle() {
//   cy.get('button').contains('Toggle').click();
//   cy.get('rxa-rendering-work').contains('0');
//   cy.wait(WAIT_DURATION);
//   cy.get('button').contains('Toggle').click();
//   cy.wait(WAIT_DURATION);
// }

export function bootstrap(id: string) {
  cy.get(id).click();
  cy.get(id).click();
}

export function testComponentBootstrap(id: string) {
  for (let i = 0; i < 100; ++i) {
    bootstrap(id);
  }
}
