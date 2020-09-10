import { coalesceAndSchedule } from '../../../src/lib/render-strategies/static';
import { SchedulingPriority } from '../../../src/lib/render-strategies/rxjs/scheduling/interfaces';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { mockConsole } from '@test-helpers';

/** @test {coalesceWith} */
describe('schedule and coalesce', () => {
  beforeAll(() => mockConsole());

  it('should be callable', (done) => {
    let test = 0;
    const doWork = () => {
      test++;
      expect(test).toBe(1);
      done();
    };
    coalesceAndSchedule(doWork, false);
    expect(test).toBe(0);
    // this happens after coalescing
    expect(test).toBe(0);
  });


  it('should change the execution context for coalescing', (done) => {
    let test = 0;
    const doWork = () => {
      test++;
    };
    coalesceAndSchedule(doWork, SchedulingPriority.Promise, {});
    expect(test).toBe(0);
    // this happens after coalescing
    Promise.resolve().then(() => {
      expect(test).toBe(0);
    });
    // this happens after scheduling
    setTimeout(() => {
      expect(test).toBe(1);
      done();
    }, 0);
    expect(test).toBe(0);
  });

  it('should coalesce to a scope', (done) => {
    let test = 0;
    const priority = SchedulingPriority.Promise;
    const doWork = () => test++;
    const scope = {};
    coalesceAndSchedule(doWork, priority, scope);
    coalesceAndSchedule(doWork, priority, scope);
    coalesceAndSchedule(doWork, priority, scope);
    coalesceAndSchedule(doWork, priority, scope);
    expect(test).toBe(0);
    // this happens after coalescing
    Promise.resolve().then(() => {
      expect(test).toBe(0);
    });
    // this happens after scheduling
    setTimeout(() => {
      expect(test).toBe(1);
      done();
    }, 100);
    expect(test).toBe(0);
  });

  it('should work with multiple scopes', (done) => {
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
    // this happens after coalescing
    Promise.resolve().then(() => {
      expect(test).toBe(0);
    });
    // this happens after scheduling
    setTimeout(() => {
      expect(test).toBe(2);
      done();
    });
    expect(test).toBe(0);
  });

  it('should stop if aborted', (done) => {
    let test = 0;
    const priority = SchedulingPriority.Promise;
    const doWork = () => test++;
    const scope = {};
    const abC = new AbortController();
    coalesceAndSchedule(doWork, priority, scope, abC);
    coalesceAndSchedule(doWork, priority, scope, abC);
    coalesceAndSchedule(doWork, priority, scope, abC);
    coalesceAndSchedule(doWork, priority, scope, abC);
    expect(test).toBe(0);
    abC.abort();
    // this happens after coalescing
    Promise.resolve().then(() => {
      expect(test).toBe(0);
    });
    // this happens after scheduling
    setTimeout(() => {
      expect(test).toBe(0);
      done();
    }, 100);
    expect(test).toBe(0);
  });

});
