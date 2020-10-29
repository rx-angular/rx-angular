import * as Devtools from '../support/devtools-protocol-tasks.utils';
import { testOpeningAndClosingToggleThreeTimes } from '../support/rx-let-vs-push.po';

describe('RxLet vs Push demo', () => {
  beforeEach(() => cy.task('resetCRI').visit('/performance/rx-let-vs-push/list-toggle'));

  describe('test and generate Profiler reports', () => {
    it('should check performance of push pipe', () => {
      cy.get('button').contains('Open Manual test for Push').click();

      Devtools.startProfiler();
      testOpeningAndClosingToggleThreeTimes();
      Devtools.stopProfiler('push-pipe');
    });

    it('should check performance of let directive', () => {
      cy.get('button').contains('Open Manual test for Let').click();

      Devtools.startProfiler();
      testOpeningAndClosingToggleThreeTimes();
      Devtools.stopProfiler('let-directive');
    });
  });

  describe('test and generate Tracing reports', () => {
    it('should check performance of push pipe', () => {
      cy.get('button').contains('Open Manual test for Push').click();

      Devtools.startTracing();
      testOpeningAndClosingToggleThreeTimes();
      Devtools.stopTracing('push-pipe');
    });

    it('should check performance of let directive', () => {
      cy.get('button').contains('Open Manual test for Let').click();

      Devtools.startTracing();
      testOpeningAndClosingToggleThreeTimes();
      Devtools.stopTracing('let-directive');
    });
  });
});
