import {
  defer,
  from,
  SchedulerAction,
  SchedulerLike,
  Subscribable,
  Subscription,
} from 'rxjs';
import { createCoalesceManager, getUnpatchedResolvedPromise } from '../../core';

export interface SchedulerOptions {
  priority: string;
  delay: number;
}

declare const scheduler: {
  postTask: <T>(options: SchedulerOptions) => Promise<T>;
};

function getPostTaskScheduler<T>(options: SchedulerOptions) {
  return {
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

export function microtaskScheduler<T>(
  scope,
  options?: SchedulerOptions
): SchedulerLike {
  const schedule = (work: any, delay?: number, state?: T): Subscription => {
    return defer(() => from(getUnpatchedResolvedPromise())).subscribe();
  };

  return {
    now() {
      return 0;
    },
    schedule: coalesceScheduleMethod(scope, schedule),
  } as SchedulerLike;
}

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
