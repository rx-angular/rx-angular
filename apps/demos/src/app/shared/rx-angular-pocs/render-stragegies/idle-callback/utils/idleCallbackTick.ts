import { Observable } from 'rxjs';
import { cancelIdleCallback, requestIdleCallback } from './idleCallback';

export const idleCallbackTick = (work?: () => void) =>
  new Observable<number>((subscriber) => {
    const id = requestIdleCallback(() => {
      work();
      subscriber.next(0);
      subscriber.complete();
    });

    return () => cancelIdleCallback(id);
  });
