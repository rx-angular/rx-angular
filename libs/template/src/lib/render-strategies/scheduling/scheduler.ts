import { from, SchedulerLike, Subscription } from 'rxjs';
import { getUnpatchedResolvedPromise } from '../../core';

export interface SchedulerOptions {
  priority: string;
  delay: number;
}

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
    },
  };
}

declare const scheduler;
export function getRxPostTaskScheduler<T>(
  schedulerOptions?: SchedulerOptions
): SchedulerLike {
  return {
    now: () => {
      return 0;
    },
    schedule: (work: () => void, options?: number, ...state): Subscription => {
      // We dont use defer as we subscribe directly here
      return from(scheduler.postTask(schedulerOptions)).subscribe(() => work());
    },
  } as SchedulerLike;
}
