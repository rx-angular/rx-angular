import { Observable } from 'rxjs';
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
