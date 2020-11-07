/*
  Set of helpers for testing "RxLet vs Push" demo page.
*/

const WAIT_DURATION = 1000;

export function openAndCloseToggle() {
  cy.get('button').contains('Toggle').click();
  cy.get('rxa-rendering-work').contains('0');
  cy.wait(WAIT_DURATION);
  cy.get('button').contains('Toggle').click();
  cy.wait(WAIT_DURATION);
}

export function testOpeningAndClosingToggleThreeTimes() {
  openAndCloseToggle();
  openAndCloseToggle();
  openAndCloseToggle();
}
