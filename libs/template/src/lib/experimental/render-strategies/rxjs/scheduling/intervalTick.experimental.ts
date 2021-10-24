import { Observable } from 'rxjs';
// @TODO: [bundle-size] replace with unpatched API method directly
import { setInterval, clearInterval } from '@rx-angular/cdk/zone-less';

export const intervalTick = () =>
  new Observable<number>((subscriber) => {
    const id = setInterval(() => {
      subscriber.next(0);
      subscriber.complete();
    });

    return () => {
      clearInterval(id);
    };
  });
