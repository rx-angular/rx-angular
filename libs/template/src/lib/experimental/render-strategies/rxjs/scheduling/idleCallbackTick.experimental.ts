import { Observable } from 'rxjs';
import {
  cancelIdleCallback,
  requestIdleCallback,
} from './idleCallback.experimental';

export const idleCallbackTick = () =>
  new Observable<number>((subscriber) => {
    const id = requestIdleCallback(() => {
      subscriber.next(0);
      subscriber.complete();
    });

    return () => cancelIdleCallback(id);
  });
