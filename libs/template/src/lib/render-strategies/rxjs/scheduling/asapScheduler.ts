import { from, SchedulerLike, Subscription } from 'rxjs';
import { getUnpatchedResolvedPromise } from '../../../core';

export const unpatchedAsapScheduler: SchedulerLike = {
  now() {
    return 0;
  },
  schedule(
    work: (...args: any[]) => void,
    options?: number,
    state?: any
  ): Subscription {
    return from(getUnpatchedResolvedPromise()).subscribe(() => work(state));
  }
};
