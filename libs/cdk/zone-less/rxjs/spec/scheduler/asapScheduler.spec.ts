import {
  immediateProvider,
  intervalProvider,
} from '@rx-angular/cdk/internals/rxjs';
import { RxTestScheduler } from '@rx-angular/cdk/testing';
import { jestMatcher } from '@test-helpers';
import { Subscription, SchedulerAction, merge } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AsapAction } from '../../src/scheduler/asap/AsapAction';
import { AsapScheduler } from '../../src/scheduler/asap/AsapScheduler';

let asap: AsapScheduler;

/** @test {Scheduler} */
describe('Scheduler.asap', () => {
  let testScheduler: RxTestScheduler;

  beforeEach(() => {
    testScheduler = new RxTestScheduler(jestMatcher);
    asap = new AsapScheduler(AsapAction);
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('should exist', () => {
    expect(asap).toBeDefined();
  });

  it('should act like the async scheduler if delay > 0', () => {
    testScheduler.run(({ cold, expectObservable, time }) => {
      const a = cold('  a            ');
      const ta = time(' ----|        ');
      const b = cold('  b            ');
      const tb = time(' --------|    ');
      const expected = '----a---b----';

      const result = merge(a.pipe(delay(ta, asap)), b.pipe(delay(tb, asap)));
      expectObservable(result).toBe(expected);
    });
  });

  it('should cancel asap actions when delay > 0', () => {
    testScheduler.run(({ cold, expectObservable, flush, time }) => {
      const setImmediateSpy = jest.spyOn(immediateProvider, 'setImmediate');
      const setSpy = jest.spyOn(intervalProvider, 'setInterval');
      const clearSpy = jest.spyOn(intervalProvider, 'clearInterval');

      const a = cold('  a            ');
      const ta = time(' ----|        ');
      const subs = '    ^-!          ';
      const expected = '-------------';

      const result = merge(a.pipe(delay(ta, asap)));
      expectObservable(result, subs).toBe(expected);

      flush();
      expect(setImmediateSpy).not.toHaveBeenCalled();
      expect(setSpy).toHaveBeenCalledTimes(1);
      expect(clearSpy).toHaveBeenCalledTimes(1);
      setImmediateSpy.mockClear();
      setSpy.mockClear();
      clearSpy.mockClear();
    });
  });

  it('should not reuse the interval for recursively scheduled actions with a different delay', () => {
    jest.useFakeTimers();
    // callThrough is missing from the declarations installed by the typings tool in stable
    const intervalSpy = jest.spyOn(intervalProvider, 'setInterval');
    const period = 50;
    const state = { index: 0, period };
    type State = typeof state;
    function dispatch(this: SchedulerAction<State>, state: State): void {
      state.index += 1;
      state.period -= 1;
      if (state.index < 3) {
        this.schedule(state, state.period);
      }
    }
    asap.schedule(dispatch as any, period, state);
    expect(state).toHaveProperty('index', 0);
    expect(intervalSpy).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(period);
    // expect(state).toHaveProperty('index', 1);
    expect(intervalSpy).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(period);
    expect(state).toHaveProperty('index', 2);
    expect(intervalSpy).toHaveBeenCalledTimes(3);
  });

  it('should reuse the interval for recursively scheduled actions with the same delay', () => {
    jest.useFakeTimers();
    // callThrough is missing from the declarations installed by the typings tool in stable
    const intervalSpy = jest.spyOn(intervalProvider, 'setInterval');
    const period = 50;
    const state = { index: 0, period };
    type State = typeof state;
    function dispatch(this: SchedulerAction<State>, state: State): void {
      state.index += 1;
      if (state.index < 3) {
        this.schedule(state, state.period);
      }
    }
    asap.schedule(dispatch as any, period, state);
    expect(state).toHaveProperty('index', 0);
    expect(intervalSpy).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(period + 1);
    expect(state).toHaveProperty('index', 1);
    expect(intervalSpy).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(period);
    expect(state).toHaveProperty('index', 2);
    expect(intervalSpy).toHaveBeenCalledTimes(1);
  });

  it('should schedule an action to happen later', (done) => {
    let actionHappened = false;
    asap.schedule(() => {
      actionHappened = true;
      done();
    });
    if (actionHappened) {
      done(new Error('Scheduled action happened synchronously'));
    }
  });

  it('should execute recursively scheduled actions in separate asynchronous contexts', (done) => {
    let syncExec1 = true;
    let syncExec2 = true;
    asap.schedule(
      function (index) {
        if (index === 0) {
          this.schedule(1);
          asap.schedule(() => {
            syncExec1 = false;
          });
        } else if (index === 1) {
          this.schedule(2);
          asap.schedule(() => {
            syncExec2 = false;
          });
        } else if (index === 2) {
          this.schedule(3);
        } else if (index === 3) {
          if (!syncExec1 && !syncExec2) {
            done();
          } else {
            done(new Error('Execution happened synchronously.'));
          }
        }
      },
      0,
      0
    );
  });

  it('should cancel the setImmediate if all scheduled actions unsubscribe before it executes', (done) => {
    let asapExec1 = false;
    let asapExec2 = false;
    const action1 = asap.schedule(() => {
      asapExec1 = true;
    });
    const action2 = asap.schedule(() => {
      asapExec2 = true;
    });
    expect(asap._scheduled).toBeDefined();
    expect(asap.actions.length).toEqual(2);
    action1.unsubscribe();
    action2.unsubscribe();
    expect(asap.actions.length).toEqual(0);
    expect(asap._scheduled).toEqual(undefined);
    asap.schedule(() => {
      expect(asapExec1).toEqual(false);
      expect(asapExec2).toEqual(false);
      done();
    });
  });

  it('should execute the rest of the scheduled actions if the first action is canceled', (done) => {
    let actionHappened = false;
    let secondSubscription: Subscription | null = null;

    const firstSubscription = asap.schedule(() => {
      actionHappened = true;
      if (secondSubscription) {
        secondSubscription.unsubscribe();
      }
      done(new Error('The first action should not have executed.'));
    });

    secondSubscription = asap.schedule(() => {
      if (!actionHappened) {
        done();
      }
    });

    if (actionHappened) {
      done(new Error('Scheduled action happened synchronously'));
    } else {
      firstSubscription.unsubscribe();
    }
  });

  it('should not execute rescheduled actions when flushing', (done) => {
    let flushCount = 0;
    const scheduledIndices: number[] = [];

    const originalFlush = asap.flush;
    asap.flush = (...args) => {
      ++flushCount;
      originalFlush.apply(asap, args);
      if (flushCount === 2) {
        asap.flush = originalFlush;
        try {
          expect(scheduledIndices).toEqual([0, 1]);
          done();
        } catch (error) {
          done(error);
        }
      }
    };

    asap.schedule(
      function (index) {
        if (flushCount < 2) {
          this.schedule(index! + 1);
          scheduledIndices.push(index! + 1);
        }
      },
      0,
      0
    );
    scheduledIndices.push(0);
  });

  it('should execute actions scheduled when flushing in a subsequent flush', (done) => {
    const stubFlush = jest.spyOn(asap, 'flush');

    asap.schedule(() => {
      expect(stubFlush).toHaveBeenCalledTimes(1);
      asap.schedule(() => {
        expect(stubFlush).toHaveBeenCalledTimes(2);
        stubFlush.mockClear();
        done();
      });
    });
    asap.schedule(() => {
      expect(stubFlush).toHaveBeenCalledTimes(1);
    });
  });

  it('should execute actions scheduled when flushing in a subsequent flush when some actions are unsubscribed', (done) => {
    const stubFlush = jest.spyOn(asap, 'flush');

    // eslint-disable-next-line prefer-const
    let a: Subscription;
    let b: Subscription;

    asap.schedule(() => {
      expect(stubFlush).toHaveBeenCalledTimes(1);
      b = asap.schedule(() => {
        expect(stubFlush).toHaveBeenCalledTimes(2);
        stubFlush.mockClear();
        done();
      });
      a.unsubscribe();
    });
    a = asap.schedule(() => {
      stubFlush.mockClear();
      done(new Error('Unexpected execution of b'));
    });
  });

  it('should properly cancel an unnecessary flush', (done) => {
    const clearImmediateStub = jest.spyOn(immediateProvider, 'clearImmediate');

    let a: Subscription;

    asap.schedule(() => {
      expect(asap.actions).toHaveLength(1);
      a = asap.schedule(() => {
        done(new Error('Unexpected execution of c'));
      });
      expect(asap.actions).toHaveLength(2);
      // What we're testing here is that the unsubscription of action c effects
      // the cancellation of the microtask in a scenario in which the actions
      // queue is not empty - it contains action b.
      a.unsubscribe();
      expect(asap.actions).toHaveLength(1);
      expect(clearImmediateStub).toHaveBeenCalledTimes(1);
    });
    asap.schedule(() => {
      done();
    });
  });
});
