import { bootstrap, testComponentBootstrap } from '../support/component-bootstrap-time/component-bootstrap-time.po';
import * as Devtools from '../support/devtools-protocol-tasks.utils';

const ids = ['#pureComponent', '#injectService', '#extendService', '#injectState', '#extendState', '#asyncPipe', '#pushPipe', '#letDirective'];

describe('Component bootstrap time demo', () => {
  beforeEach(() => cy.task('resetCRI').visit('/performance/bootstrap-time/bootstrap-time'));

  describe('test and generate Profiler reports', () => {
    it('should check performance of pure component', async (done) => {
          // Devtools.startTracing();
          ids.forEach(id => testComponentBootstrap(id));

          cy.window().then((win) => {
            Devtools.writeAverage('allComponents', ids.map(id => `${id}. ${win.performance.getEntriesByName(id).length} runs. Average bootstrap time: ${
              win.performance
                .getEntriesByName(id)
                .reduce((acc, val) => acc + val.duration, 0) /
              win.performance.getEntriesByName(id).length
            }`).join('\n\n'));
          });
});


    // it('should check performance of let directive', () => {
    //   cy.get('button').contains('Open Manual test for Let').click();

    //   Devtools.startProfiler();
    //   testOpeningAndClosingToggleThreeTimes();
    //   Devtools.stopProfiler('let-directive');
    // });
  });

  // describe('test and generate Tracing reports', () => {
  //   it('should check performance of push pipe', () => {
  //     cy.get('button').contains('Open Manual test for Push').click();

  //     Devtools.startTracing();
  //     testOpeningAndClosingToggleThreeTimes();
  //     Devtools.stopTracing('push-pipe');
  //   });

  //   it('should check performance of let directive', () => {
  //     cy.get('button').contains('Open Manual test for Let').click();

  //     Devtools.startTracing();
  //     testOpeningAndClosingToggleThreeTimes();
  //     Devtools.stopTracing('let-directive');
  //   });
  // });
});
