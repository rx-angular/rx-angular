import { staticSchedule } from '../../../src/lib/render-strategies/static';
import { SchedulingPriority } from '../../../src/lib/render-strategies/rxjs/scheduling';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { mockConsole } from '@test-helpers';


describe('staticSchedule', () => {
  beforeAll(() => mockConsole());

  it('should change the execution context', (done) => {
    let test = 0;
    const priority = SchedulingPriority.Promise;
    const doWork = () => {
      test++;
    }
    staticSchedule(doWork, priority);
    expect(test).toBe(0);

    Promise.resolve()
      .then(() => {
        expect(test).toBe(1);
      })
      .catch((e) => {
        throw new Error('Should not get called');
      })
      .finally(() => {
        done();
      });

    expect(test).toBe(0);
  });


  it('should stop if aborted', (done) => {
    let test = 0;
    const priority = SchedulingPriority.Promise;
    const doWork = () => {
      test++;
    }

    const abC = staticSchedule(doWork, priority);
    expect(test).toBe(0);
    abC.abort();
    Promise.resolve()
      .then(() => {
        expect(test).toBe(0);
      })
      .catch((e) => {
        throw new Error('Should not get called');
      })
      .finally(() => {
        done();
      });

    expect(test).toBe(0);
  });

});
