import { Observable } from 'rxjs';
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
