import { Observable } from 'rxjs';
// @TODO: [bundle-size] replace with unpatched API method directly
import {
  requestAnimationFrame,
  cancelAnimationFrame,
} from '@rx-angular/cdk/zone-less';

export const animationFrameTick = () =>
  new Observable<number>((subscriber) => {
    const id = requestAnimationFrame(() => {
      subscriber.next(0);
      subscriber.complete();
    });

    return () => {
      cancelAnimationFrame(id);
    };
  });
