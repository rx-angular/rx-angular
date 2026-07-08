import { getZoneUnPatchedApi } from '@rx-angular/cdk/internals/core';
import { Observable } from 'rxjs';

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
