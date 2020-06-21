import { Observable, SchedulerLike, Subscription } from 'rxjs';
import { getZoneUnPatchedApi } from '../../../core';

const animationFrameTick = new Observable(subscriber => {
  let i = 0;
  const id = getZoneUnPatchedApi('requestAnimationFrame')(() => {
    subscriber.next(++i);
  });

  return () => {
    getZoneUnPatchedApi('cancelAnimationFrame')(id);
  };
});

export const unpatchedAnimationFrameScheduler: SchedulerLike = {
  now() {
    return 0;
  },
  schedule(
    work: (...args: any[]) => void,
    options?: number,
    state?: any
  ): Subscription {
    return animationFrameTick.subscribe(() => work(state));
  }
};
