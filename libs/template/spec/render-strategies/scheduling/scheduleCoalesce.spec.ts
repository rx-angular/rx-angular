import { scheduleCoalesced } from '@rx-angular/template';
import { jestMatcher } from '@test-helpers';
import { from, of } from 'rxjs';
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';

/** @test {coalesceWith} */
describe('scheduleCoalesce', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler(jestMatcher);
  });

  it('should change the execution context', (done) => {
    let test = 0;
    const schedule = work => from(Promise.resolve()).subscribe(() => work());
    const doWork = () => test++;
    scheduleCoalesced(doWork, schedule, {});
    expect(test).toBe(0);
    Promise.resolve().then(() => {
      expect(test).toBe(1);
      done();
    });
    expect(test).toBe(0);
  });

  it('should not change the execution context', (done) => {
    let test = 0;
    const schedule = work => of(null).subscribe(() => work());
    const doWork = () => test++;
    scheduleCoalesced(doWork, schedule, {});
    expect(test).toBe(1);
    doWork();
    expect(test).toBe(2);
    done();
  });

  it('should coalesce to a scope async', (done) => {
    let test = 0;
    const schedule = work => from(Promise.resolve()).subscribe(() => work());
    const doWork = () => test++;
    const scope = {};
    scheduleCoalesced(doWork, schedule, scope);
    scheduleCoalesced(doWork, schedule, scope);
    scheduleCoalesced(doWork, schedule, scope);
    scheduleCoalesced(doWork, schedule, scope);
    expect(test).toBe(0);
    Promise.resolve().then(() => {
      expect(test).toBe(1);
      done();
    });
    expect(test).toBe(0);
  });

  it('should coalesce to a scope sync', (done) => {
    let test = 0;
    const schedule = work => from(of(null)).subscribe(() => work());
    const doWork = () => test++;
    const scope = {};
    scheduleCoalesced(doWork, schedule, scope);
    scheduleCoalesced(doWork, schedule, scope);
    scheduleCoalesced(doWork, schedule, scope);
    scheduleCoalesced(doWork, schedule, scope);
    expect(test).toBe(4);
    done();
  });

  it('should work with multiple scopes async', (done) => {
    let test = 0;
    const schedule = work => from(Promise.resolve()).subscribe(() => work());
    const doWork = () => test++;
    const scope = {};
    const scope2 = {};
    scheduleCoalesced(doWork, schedule, scope);
    scheduleCoalesced(doWork, schedule, scope);
    scheduleCoalesced(doWork, schedule, scope2);
    scheduleCoalesced(doWork, schedule, scope2);
    expect(test).toBe(0);
    Promise.resolve().then(() => {
      expect(test).toBe(2);
      done();
    });
    expect(test).toBe(0);
  });
});
