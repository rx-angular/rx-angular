import { intervalProvider } from '../../src/internals/intervalProvider';
import { animationFrameProvider } from '../../src/internals/animationFrameProvider';
import { animationFrameScheduler } from '@rx-angular/cdk/zone-less/rxjs';
import { Subscription, merge, delay } from 'rxjs';
import { jestMatcher } from '@test-helpers';
import { RxTestScheduler } from '../../src/testing/test-scheduler';

const animationFrame = animationFrameScheduler;

/** @test {Scheduler} */
describe('Scheduler.animationFrame', () => {
  let testScheduler: RxTestScheduler;

  beforeEach(() => {
    testScheduler = new RxTestScheduler(jestMatcher);
  });

  it('should exist', () => {
    expect(animationFrame).toBeDefined();
  });

  it('should act like the async scheduler if delay > 0', () => {
    testScheduler.run(({ animate, cold, expectObservable, time }) => {
      animate('         ----------x--');
      const a = cold('  a            ');
      const ta = time(' ----|        ');
      const b = cold('  b            ');
      const tb = time(' --------|    ');
      const expected = '----a---b----';
      const result = merge(
        a.pipe(delay(ta, animationFrame)),
        b.pipe(delay(tb, animationFrame))
      );
      expectObservable(result).toBe(expected);
    });
  });

  it('should cancel animationFrame actions when delay > 0', () => {
    testScheduler.run(({ animate, cold, expectObservable, flush, time }) => {
      const requestSpy = jest.spyOn(
        animationFrameProvider,
        'requestAnimationFrame'
      );
      const setSpy = jest.spyOn(intervalProvider, 'setInterval');
      const clearSpy = jest.spyOn(intervalProvider, 'clearInterval');

      animate('         ----------x--');
      const a = cold('  a            ');
      const ta = time(' ----|        ');
      const subs = '    ^-!          ';
      const expected = '-------------';

      const result = merge(a.pipe(delay(ta, animationFrame)));
      expectObservable(result, subs).toBe(expected);

      flush();
      expect(requestSpy).not.toHaveBeenCalled();
      expect(setSpy).toHaveBeenCalledTimes(1);
      expect(clearSpy).toHaveBeenCalledTimes(1);
      requestSpy.mockRestore();
      setSpy.mockRestore();
      clearSpy.mockRestore();
    });
  });

  it('should schedule an action to happen later', (done) => {
    let actionHappened = false;
    animationFrame.schedule(() => {
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
    animationFrame.schedule(
      function (index) {
        if (index === 0) {
          this.schedule(1);
          animationFrame.schedule(() => {
            syncExec1 = false;
          });
        } else if (index === 1) {
          this.schedule(2);
          animationFrame.schedule(() => {
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

  it('should cancel the animation frame if all scheduled actions unsubscribe before it executes', (done) => {
    let animationFrameExec1 = false;
    let animationFrameExec2 = false;
    const action1 = animationFrame.schedule(() => {
      animationFrameExec1 = true;
    });
    const action2 = animationFrame.schedule(() => {
      animationFrameExec2 = true;
    });
    expect((animationFrame as any)._scheduled).toBeDefined();
    expect(animationFrame.actions.length).toEqual(2);
    action1.unsubscribe();
    action2.unsubscribe();
    expect(animationFrame.actions.length).toEqual(0);
    expect((animationFrame as any)._scheduled).toEqual(undefined);
    animationFrame.schedule(() => {
      expect(animationFrameExec1).toEqual(false);
      expect(animationFrameExec2).toEqual(false);
      done();
    });
  });

  it('should execute the rest of the scheduled actions if the first action is canceled', (done) => {
    let actionHappened = false;
    let secondSubscription: Subscription | null = null;

    const firstSubscription = animationFrame.schedule(() => {
      actionHappened = true;
      if (secondSubscription) {
        secondSubscription.unsubscribe();
      }
      done(new Error('The first action should not have executed.'));
    });

    secondSubscription = animationFrame.schedule(() => {
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

    const originalFlush = animationFrame.flush;
    animationFrame.flush = (...args) => {
      ++flushCount;
      originalFlush.apply(animationFrame, args);
      if (flushCount === 2) {
        animationFrame.flush = originalFlush;
        try {
          expect(scheduledIndices).toEqual([0, 1]);
          done();
        } catch (error) {
          done(error);
        }
      }
    };

    animationFrame.schedule(
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
});
