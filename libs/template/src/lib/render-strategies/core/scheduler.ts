import { from, SchedulerLike, Subscribable, Subscription } from 'rxjs';
import { getUnpatchedResolvedPromise } from '../../core';

export function getRxAsapScheduler<T>(): SchedulerLike {
  const resolvedPromise = getUnpatchedResolvedPromise();
  return {
    now: () => {
      return 0;
    },
    schedule: (
      work: () => void,
      options?: number,
      state?: any
    ): Subscription => {
      // We dont use defer as we subscribe directly here
      return from(resolvedPromise).subscribe(() => work());
    }
  };
}

declare const scheduler;
export function getRxPostTaskScheduler<T>(
  schedulerOptions?: SchedulingPriority
): SchedulerLike {
  return {
    now: () => {
      return 0;
    },
    schedule: (work: () => void, options?: number, ...state): Subscription => {
      return from(scheduler.postTask(schedulerOptions)).subscribe(() => work());
    }
  } as SchedulerLike;
}
