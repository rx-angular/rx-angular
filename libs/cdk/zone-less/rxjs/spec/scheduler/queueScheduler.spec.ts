import { queueScheduler } from '@rx-angular/cdk/zone-less/rxjs';
import { Subscription, merge } from 'rxjs';
import { delay } from 'rxjs/operators';
import { RxTestScheduler } from '@rx-angular/cdk/testing';
import { jestMatcher } from '@test-helpers';

const queue = queueScheduler;

/** @test {Scheduler} */
describe('Scheduler.queue', () => {
  let testScheduler: RxTestScheduler;

  beforeEach(() => {
    testScheduler = new RxTestScheduler(jestMatcher);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should act like the async scheduler if delay > 0', () => {
    testScheduler.run(({ cold, expectObservable, time }) => {
      const a = cold('  a            ');
      const ta = time(' ----|        ');
      const b = cold('  b            ');
      const tb = time(' --------|    ');
      const expected = '----a---b----';

      const result = merge(a.pipe(delay(ta, queue)), b.pipe(delay(tb, queue)));
      expectObservable(result).toBe(expected);
    });
  });

  it('should switch from synchronous to asynchronous at will', () => {
    jest.useFakeTimers();

    let asyncExec = false;
    const state: Array<number> = [];

    queue.schedule(
      function (index) {
        state.push(index!);
        if (index === 0) {
          this.schedule(1, 100);
        } else if (index === 1) {
          asyncExec = true;
          this.schedule(2, 0);
        }
      },
      0,
      0
    );

    expect(asyncExec).toBe(false);
    expect(state).toEqual([0]);

    jest.advanceTimersByTime(100);

    expect(asyncExec).toBe(true);
    expect(state).toEqual([0, 1, 2]);
  });

  it('should unsubscribe the rest of the scheduled actions if an action throws an error', () => {
    const actions: Subscription[] = [];
    let action2Exec = false;
    let action3Exec = false;
    let errorValue: any = undefined;
    try {
      queue.schedule(() => {
        actions.push(
          queue.schedule(() => {
            throw new Error('oops');
          }),
          queue.schedule(() => {
            action2Exec = true;
          }),
          queue.schedule(() => {
            action3Exec = true;
          })
        );
      });
    } catch (e) {
      errorValue = e;
    }
    expect(actions.every((action) => action.closed)).toBe(true);
    expect(action2Exec).toBe(false);
    expect(action3Exec).toBe(false);
    expect(errorValue).toBeDefined();
    expect(errorValue.message).toEqual('oops');
  });
});
