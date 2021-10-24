import { Observable } from 'rxjs';
// @TODO: [bundle-size] replace with unpatched API method directly
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
