import {
  animationFrameScheduler,
  from,
  SchedulerLike,
  Subscribable,
  Subscription
} from 'rxjs';
import { getUnpatchedResolvedPromise } from '../../../core';
import { SchedulingPriority } from '../../core/interfaces';
import { prioritiesMap } from '../../core/priorities-map';

export function getRxAsapScheduler<T>(): SchedulerLike {
  return {
    now: () => {
      return 0;
    },
    schedule: (
      work: (...args: any[]) => void,
      options?: number,
      state?: any
    ): Subscription => {
      return from(getUnpatchedResolvedPromise()).subscribe(() => work(state));
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
