import {
  asyncScheduler,
  SchedulerAction,
  SchedulerLike,
  Subscription
} from 'rxjs';

/**
 *
 * Implementation based on rxjs-etc => IdleScheduler
 *
 */
type IdleId = ReturnType<typeof setTimeout>;

type RequestIdleCallbackHandle = any;

interface RequestIdleCallbackOptions {
  timeout: number;
}

interface RequestIdleCallbackDeadline {
  readonly didTimeout: boolean;
  timeRemaining: () => number;
}

type RequestIdleCallback = (
  callback: (deadline: RequestIdleCallbackDeadline) => void,
  opts?: RequestIdleCallbackOptions
) => RequestIdleCallbackHandle;

type CancelIdleCallback = (idleId: IdleId) => void;

const cancelIdleCallback: CancelIdleCallback =
  typeof window !== 'undefined'
    ? (window as any).cancelIdleCallback ||
      function(idleId: IdleId): void {
        console.warn('Fake cancelIdleCallback used');
        clearTimeout(idleId);
      }
    : () => {};

const requestIdleCallback: RequestIdleCallback =
  typeof window !== 'undefined'
    ? (window as any).requestIdleCallback ||
      function(cb: Function) {
        console.warn('Fake requestIdleCallback used');
        const start = Date.now();
        return setTimeout(function() {
          cb({
            didTimeout: false,
            timeRemaining: function() {
              return Math.max(0, 50 - (Date.now() - start));
            }
          });
        }, 1);
      }
    : () => {};

class IdleAction<T> extends Subscription {
  constructor(private work: (this: SchedulerAction<T>, state?: T) => void) {
    super();
  }

  schedule(state?: T, delay?: number) {
    if (this.closed) {
      return this;
    }
    return idleScheduler.schedule(this.work, delay, state);
  }
}

export const idleScheduler: SchedulerLike = {
  now() {
    return asyncScheduler.now();
  },
  schedule<T>(
    work: (this: SchedulerAction<T>, state?: T) => void,
    delay?: number,
    state?: T
  ): Subscription {
    if (delay) {
      return asyncScheduler.schedule(work, delay, state);
    }

    const action = new IdleAction(work);
    const id = requestIdleCallback(() => {
      try {
        work.call(action, state);
      } catch (error) {
        action.unsubscribe();
        throw error;
      }
    });
    action.add(() => cancelIdleCallback(id));
    return action;
  }
};
