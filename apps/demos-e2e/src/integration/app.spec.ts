import { getGreeting } from '../support/app.po';

describe('demos', () => {
  beforeEach(() => cy.task('resetCRI').visit('/experiments/rx-let-vs-push/list-toggle'));

  xdescribe('test with Performance', () => {
    it('should check performance of push pipe on 1st try', () => {
      cy.get('button').contains('Open Manual test for Push').click();
      cy.task('enablePerformanceMetrics');
      cy.get('button').contains('Toggle').click();
      cy.get('rxa-rendering-work').contains('0').task('getPerformanceMetrics');
      cy.task('disablePerformanceMetrics');
    });

    it('should check performance of push pipe on 2nd try', () => {
      cy.get('button').contains('Open Manual test for Push').click();

      cy.get('button').contains('Toggle').click();
      cy.get('rxa-rendering-work').contains('0');
      cy.get('button').contains('Toggle').click();
      cy.wait(500);

      cy.task('enablePerformanceMetrics');
      cy.get('button').contains('Toggle').click();
      cy.get('rxa-rendering-work').contains('0').task('getPerformanceMetrics');
      cy.task('disablePerformanceMetrics');
    });

    it('should check performance of let directive on 1st try', () => {
      cy.get('button').contains('Open Manual test for Let').click();

      cy.task('enablePerformanceMetrics');
      cy.get('button').contains('Toggle').click();
      cy.get('rxa-rendering-work').contains('0').task('getPerformanceMetrics');
      cy.task('disablePerformanceMetrics');
    });

    it('should check performance of let directive on 2nd try', () => {
      cy.get('button').contains('Open Manual test for Let').click();

      cy.get('button').contains('Toggle').click();
      cy.get('rxa-rendering-work').contains('0');
      cy.get('button').contains('Toggle').click();
      cy.wait(500);

      cy.task('enablePerformanceMetrics');
      cy.get('button').contains('Toggle').click();
      cy.get('rxa-rendering-work').contains('0').task('getPerformanceMetrics');
      cy.task('disablePerformanceMetrics');
    });
  });

  xdescribe('test with Profiler', () => {
    it('should check performance of push pipe', () => {
      cy.get('button').contains('Open Manual test for Push').click();

      cy.task('enableProfiler');
      cy.task('startProfiler');

      cy.get('button').contains('Toggle').click();
      cy.get('rxa-rendering-work').contains('0');
      cy.get('button').contains('Toggle').click();
      cy.wait(2000);
      cy.get('button').contains('Toggle').click();
      cy.get('rxa-rendering-work').contains('0');

      cy.task('stopProfiler');
      cy.task('disableProfiler');
    });

    it('should check performance of let directive', () => {
      cy.get('button').contains('Open Manual test for Let').click();

      cy.task('enableProfiler');
      cy.task('startProfiler');

      cy.get('button').contains('Toggle').click();
      cy.get('rxa-rendering-work').contains('0');
      cy.get('button').contains('Toggle').click();
      cy.wait(2000);
      cy.get('button').contains('Toggle').click();
      cy.get('rxa-rendering-work').contains('0');

      cy.task('stopProfiler');
      cy.task('disableProfiler');
    });
  });

  describe('test with Tracing', () => {
    it('should check performance of push pipe', () => {
      cy.get('button').contains('Open Manual test for Push').click();

      cy.task('startTracing');

      openAndCloseToggle();
      openAndCloseToggle();
      cy.get('button').contains('Toggle').click();
      cy.get('rxa-rendering-work').contains('0');
      cy.wait(2000);

      cy.task('endTracing');
    });

    xit('should check performance of let directive', () => {
      cy.get('button').contains('Open Manual test for Let').click();

      cy.task('startTracing');

      openAndCloseToggle();
      openAndCloseToggle();
      cy.get('button').contains('Toggle').click();
      cy.get('rxa-rendering-work').contains('0');
      cy.wait(2000);

      cy.task('endTracing');
    });
  });
});

function openAndCloseToggle() {
  cy.get('button').contains('Toggle').click();
  cy.get('rxa-rendering-work').contains('0');
  cy.wait(2000);
  cy.get('button').contains('Toggle').click();
  cy.wait(2000);
}
