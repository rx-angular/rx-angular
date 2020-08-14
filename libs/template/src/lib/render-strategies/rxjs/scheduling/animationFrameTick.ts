import { Observable, SchedulerLike, Subscription } from 'rxjs';
import { getZoneUnPatchedApi } from '../../../core';

export const animationFrameTick = () =>
  new Observable<number>((subscriber) => {
    const id = getZoneUnPatchedApi('requestAnimationFrame')(() => {
      subscriber.next(0);
      subscriber.complete();
    });

    return () => {
      getZoneUnPatchedApi('cancelAnimationFrame')(id);
    };
  });
