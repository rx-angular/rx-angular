import {
  defer,
  from,
  SchedulerAction,
  SchedulerLike,
  Subscribable,
  Subscription,
} from 'rxjs';
import { createCoalesceManager } from '@rx-angular/template';

export interface PostTaskOptions {
  priority: string;
  delay: number;
}

declare const scheduler: {
  postTask: <T>(options: PostTaskOptions) => Promise<T>;
};

class RxScheduler {}

function getPostTaskScheduler<T>(options: PostTaskOptions): RxScheduler {
  return {
    now() {
      return 0;
    },
    schedule(work, state: T): Subscription {
      return defer(() =>
        from((scheduler as any).postTask(work, options))
      ).subscribe();
    },
  };
}

function getCoalescedSchedulerAction<T>(
  executionContext: Subscribable<any>,
  work
): SchedulerAction<T> {
  const subscription = new Subscription();
  const coalescingManager = createCoalesceManager(this.scope);

  return {
    schedule(state?: T, delay?: number): Subscription {
      if (!coalescingManager.isCoalescing()) {
        subscription.add(
          executionContext.subscribe(() => {
            this.coalescingManager.remove();
            subscription.unsubscribe();
            if (!coalescingManager.isCoalescing()) {
              work();
            }
          })
        );
        coalescingManager.add();
      }
      return subscription;
    },
  } as SchedulerAction<T>;
}

function _getPostTaskScheduler<T>(
  scope,
  options: PostTaskOptions
): SchedulerLike {
  const schedule = (work: any, delay?: number, state?: T): Subscription => {
    return defer(() =>
      from((scheduler as any).postTask(work(state), options))
    ).subscribe();
  };

  return {
    now() {
      return 0;
    },
    schedule: coalesceScheduleMethod(scope, schedule),
  } as SchedulerLike;
}

/*
function getIdleCallbackScheduler(scope, options: PostTaskOptions): SchedulerLike {
  return coalesceScheduleMethod(scope, {
    now() {
      return 0;
    },
    schedule<T>(work: any, delay?: number, state?: T): Subscription {
      return defer(() => new Observable(() => {
        const id = window.requestIdleCallback();

        return () => {
          window.cancelIdleCallbackId()
        }
      })).subscribe();
    }
  });
}
*/

function coalesceScheduleMethod2(
  scope: object,
  schedulerLike: SchedulerLike
): SchedulerLike {
  const coalescingManager = createCoalesceManager(this.scope);
  const subscription = new Subscription();
  const schedule = <T>(
    work: (action: SchedulerAction<T>, state?: T) => void,
    delay?: number,
    state?: T
  ): Subscription => {
    if (!coalescingManager.isCoalescing()) {
      schedulerLike.schedule(() => {
        coalescingManager.remove();
        if (!coalescingManager.isCoalescing()) {
          return work(this, state);
        }
      });
      coalescingManager.add();
    }
    return subscription;
  };
  schedulerLike.schedule = schedule as any;
  return schedulerLike;
}

type scheduleFn<T> = (
  work: (action: SchedulerAction<T>, state?: T) => void,
  delay?: number,
  state?: T
) => Subscription;

function coalesceScheduleMethod<T>(
  scope: object,
  originalSchedule: scheduleFn<T>
): scheduleFn<T> {
  const coalescingManager = createCoalesceManager(this.scope);
  const subscription = new Subscription();

  return (
    work: (action: SchedulerAction<T>, state?: T) => void,
    delay?: number,
    state?: T
  ): Subscription => {
    if (!coalescingManager.isCoalescing()) {
      coalescingManager.remove();
      if (!coalescingManager.isCoalescing()) {
        return subscription.add(originalSchedule(work, delay, state));
      }
    }
    coalescingManager.add();
  };
}
