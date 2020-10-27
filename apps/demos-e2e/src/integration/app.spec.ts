import * as Performance from '../support/performance.util';

const WAIT_DURATION = 1000;

describe('RxLet vs Push demo', () => {
  beforeEach(() => cy.task('resetCRI').visit('/performance/rx-let-vs-push/list-toggle'));

  describe('test and generate Profiler reports', () => {
    it('should check performance of push pipe', () => {
      cy.get('button').contains('Open Manual test for Push').click();

      Performance.startProfiler();
      testOpeningAndClosingToggleThreeTimes();
      Performance.stopProfiler('push-pipe');
    });

    it('should check performance of let directive', () => {
      cy.get('button').contains('Open Manual test for Let').click();

      Performance.startProfiler();
      testOpeningAndClosingToggleThreeTimes();
      Performance.stopProfiler('let-directive');
    });
  });

  describe('test and generate Tracing reports', () => {
    it('should check performance of push pipe', () => {
      cy.get('button').contains('Open Manual test for Push').click();

      Performance.startTracing();
      testOpeningAndClosingToggleThreeTimes();
      Performance.stopTracing('push-pipe');
    });

    it('should check performance of let directive', () => {
      cy.get('button').contains('Open Manual test for Let').click();

      Performance.startTracing();
      testOpeningAndClosingToggleThreeTimes();
      Performance.stopTracing('let-directive');
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
