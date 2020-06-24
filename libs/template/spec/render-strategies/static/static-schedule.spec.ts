import { schedule } from '../../../src/lib/render-strategies/static';
import { SchedulingPriority } from '../../../src/lib/render-strategies/rxjs/scheduling/interfaces';

/** @test {coalesceWith} */
describe('staticSchedule', () => {

  it('should change the execution context', (done) => {
    let test = 0;
    const priority = SchedulingPriority.Promise;
    const doWork = () => test++;
    schedule(doWork, priority);
    expect(test).toBe(0);
    Promise.resolve().then(() => {
      expect(test).toBe(1);
      done();
    });
    expect(test).toBe(0);
  });

});
