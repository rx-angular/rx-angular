import { Observable } from 'rxjs';
import { getZoneUnPatchedApi } from '../../utils/zone-checks';

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
