const WAIT_DURATION = 1000;

describe('RxLet vs Push demo', () => {
  beforeEach(() => cy.task('resetCRI').visit('/experiments/rx-let-vs-push/list-toggle'));

  describe('test and generate Profiler reports', () => {
    it('should check performance of push pipe', () => {
      cy.get('button').contains('Open Manual test for Push').click();

      cy.task('enableProfiler');
      cy.task('startProfiler');

      testOpeningAndClosingToggleThreeTimes();

      cy.task('stopProfiler', { title: 'push-pipe' });
      cy.task('disableProfiler');
    });

    it('should check performance of let directive', () => {
      cy.get('button').contains('Open Manual test for Let').click();

      cy.task('enableProfiler');
      cy.task('startProfiler');

      testOpeningAndClosingToggleThreeTimes();

      cy.task('stopProfiler', { title: 'let-directive' });
      cy.task('disableProfiler');
    });
  });

  describe('test and generate Tracing reports', () => {
    it('should check performance of push pipe', () => {
      cy.get('button').contains('Open Manual test for Push').click();

      cy.task('startTracing');

      testOpeningAndClosingToggleThreeTimes();

      cy.task('endTracing', { title: 'push-pipe' });
    });

    it('should check performance of let directive', () => {
      cy.get('button').contains('Open Manual test for Let').click();

      cy.task('startTracing');

      testOpeningAndClosingToggleThreeTimes();

      cy.task('endTracing', { title: 'let-directive' });
    });
  });
});

function openAndCloseToggle() {
  cy.get('button').contains('Toggle').click();
  cy.get('rxa-rendering-work').contains('0');
  cy.wait(WAIT_DURATION);
  cy.get('button').contains('Toggle').click();
  cy.wait(WAIT_DURATION);
}

function testOpeningAndClosingToggleThreeTimes() {
  openAndCloseToggle();
  openAndCloseToggle();
  openAndCloseToggle();
}
