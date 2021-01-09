import { Observable } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';
import { coalescingManager } from '../../../utils/coalescing-manager';
import { priorityLevel } from '../../../render-strategies/model/priority';
import { cancelCallback, scheduleCallback } from '../scheduler/react-concurrent-scheduler/react-scheduler/scheduler';

type ReactCallBackCredentials = [priorityLevel, () => any, any?]

const reactSchedulerTick = (credentials: ReactCallBackCredentials, context: any): Observable<any> =>
  new Observable<number>((subscriber) => {
    if (!coalescingManager.isCoalescing(context)) {
      const _work = () => {
        coalescingManager.decrement(context);
        if (!coalescingManager.isCoalescing(context)) {
          subscriber.next(credentials[1]());
        }
      };
      const task = scheduleCallback(credentials[0], _work, credentials[2]);
      coalescingManager.increment(context);
      return () => {
        coalescingManager.decrement(context);
        cancelCallback(task);
      };
    }
  });

// RenderBehavior
export function scheduleLikeReact<T>(priority: priorityLevel, work: any, context: any) {
  return (o$: Observable<T>): Observable<T> => o$.pipe(
    switchMap(v => reactSchedulerTick([priority, work], context).pipe(mapTo(v)))
  );
}
