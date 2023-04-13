import {
  cancelAnimationFrame,
  Promise,
  requestAnimationFrame,
} from '@rx-angular/cdk/zone-less/browser';
import { from, Observable } from 'rxjs';

export function unpatchedAnimationFrameTick(): Observable<void> {
  return new Observable<void>((observer) => {
    const tick = requestAnimationFrame(() => {
      observer.next();
      observer.complete();
    });
    return () => {
      cancelAnimationFrame(tick);
    };
  });
}

export function unpatchedMicroTask(): Observable<void> {
  return from(Promise.resolve()) as Observable<void>;
}
