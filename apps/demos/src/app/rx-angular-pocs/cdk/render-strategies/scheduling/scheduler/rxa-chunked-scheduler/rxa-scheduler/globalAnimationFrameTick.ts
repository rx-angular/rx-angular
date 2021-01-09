import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';
import { GlobalTask, GlobalTaskPriority, GlobalTaskScope, rxaQueueManager } from './rxa-queue-manager';

export const globalQueueTick = (credentials: GlobalTask): Observable<number> =>
  new Observable<number>((subscriber) => {
    const task = {
      priority: credentials.priority,
      work: () => {
        credentials.work();
        subscriber.next(0);
      },
      scope: credentials.scope
    };
    rxaQueueManager.scheduleTask(task);
    return () => {
      rxaQueueManager.deleteTask(task);
    };
  });

export function scheduleOnRxaQueue<T>(
  work: (...args: any[]) => void,
  options: {
    priority: GlobalTaskPriority,
    scope: GlobalTaskScope
  }
): MonoTypeOperatorFunction<T> {
  return (o$: Observable<T>): Observable<T> =>
    o$.pipe(
      switchMap((v) => globalQueueTick({ work, ...options }).pipe(mapTo(v)))
    );
}
