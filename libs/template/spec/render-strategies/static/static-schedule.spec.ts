import { staticSchedule } from '../../../src/lib/render-strategies/static';
import { SchedulingPriority } from '../../../src/lib/render-strategies/rxjs/scheduling';


describe('staticSchedule', () => {

  it('should change the execution context', (done) => {
    let test = 0;
    const priority = SchedulingPriority.Promise;
    const doWork = () => {
      console.log('INCREMENT');
      test++;
    }
    staticSchedule(doWork, priority);
    expect(test).toBe(0);

    Promise.resolve()
      .then(() => {
        console.log('RESOLVE');
        expect(test).toBe(1);
      })
      .catch((e) => {
        console.log('ERRORERRORERRORERRORERRORERROR', e);
        throw new Error('Should not get called');
      })
      .finally(() => {
        done();
      });

    expect(test).toBe(0);
  });

});
