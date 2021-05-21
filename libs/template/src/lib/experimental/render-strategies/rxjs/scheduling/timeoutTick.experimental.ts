import { Observable } from 'rxjs';
import { setTimeout, clearTimeout } from '@rx-angular/cdk/zone-less';

export const timeoutTick = () =>
  new Observable<number>((subscriber) => {
    const id = setTimeout(() => {
      subscriber.next(0);
      subscriber.complete();
    });

    return () => {
      clearTimeout(id);
    };
  });
