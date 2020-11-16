import { bootstrap, getSortedMeasurements, testComponentBootstrap } from '../support/component-bootstrap-time/component-bootstrap-time.po';
import * as Devtools from '../support/devtools-protocol-tasks.utils';

const serviceComponentIds = ['#pureComponent', '#injectService', '#extendService', '#injectState', '#extendState'];
const templateComponentIds = [ '#asyncPipe', '#pushPipe', '#letDirective'];

describe('Component bootstrap time test', () => {
  beforeEach(() => cy.task('resetCRI').visit('/performance/bootstrap-time/bootstrap-time'));

    it('should check performance of pure component and components with services', async (done) => {
          serviceComponentIds.forEach(id => {
            testComponentBootstrap(id);
          });
          cy.window().then((win) => {
            Devtools.writeAverage('componentsWithServices', getSortedMeasurements(serviceComponentIds, win));
          });
    });
    it('should check performance of components with pipes and directives', async (done) => {
          templateComponentIds.forEach(id => {
            testComponentBootstrap(id);
          });

          cy.window().then((win) => {
            Devtools.writeAverage('componentsWithPipesAndDirective', getSortedMeasurements(templateComponentIds, win));
          });
    });
});
