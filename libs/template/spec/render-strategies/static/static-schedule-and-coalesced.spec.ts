import { coalesceAndSchedule } from '../../../src/lib/render-strategies/static';
import { of } from 'rxjs';
import { SchedulingPriority } from '../../../src/lib/render-strategies/core/interfaces';

/** @test {coalesceWith} */
describe('priorityCoalesce', () => {
  it('should change the execution context', (done) => {
    let test = 0;
    const doWork = () => {
      console.log('in doWork');
      test++;
    }
    coalesceAndSchedule(doWork, SchedulingPriority.Promise, {});
    expect(test).toBe(0);
    Promise.resolve().then(() => {
      console.log('in promise1');
      expect(test).toBe(1);
      return Promise.resolve().then(() => {
        console.log('in promise1.1');
      });
    });
    Promise.resolve().then(() => {
      console.log('in promise2');
      expect(test).toBe(1);
    });
    setTimeout(() => {
      console.log('timeout');
      done();
    }, 100)
    expect(test).toBe(0);
  });

  it('should coalesce to a scope async', (done) => {
    let test = 0;
    const priority = SchedulingPriority.Promise;
    const doWork = () => test++;
    const scope = {};
    coalesceAndSchedule(doWork, priority, scope);
    coalesceAndSchedule(doWork, priority, scope);
    coalesceAndSchedule(doWork, priority, scope);
    coalesceAndSchedule(doWork, priority, scope);
    expect(test).toBe(0);
    Promise.resolve().then(() => {
      expect(test).toBe(1);
      done();
    });
    expect(test).toBe(0);
  });

  it('should work with multiple scopes async', (done) => {
    let test = 0;
    const priority = SchedulingPriority.Promise;
    const doWork = () => test++;
    const scope = {};
    const scope2 = {};
    coalesceAndSchedule(doWork, priority, scope);
    coalesceAndSchedule(doWork, priority, scope);
    coalesceAndSchedule(doWork, priority, scope2);
    coalesceAndSchedule(doWork, priority, scope2);
    expect(test).toBe(0);
    Promise.resolve().then(() => {
      expect(test).toBe(2);
      done();
    });
    expect(test).toBe(0);
  });
});
