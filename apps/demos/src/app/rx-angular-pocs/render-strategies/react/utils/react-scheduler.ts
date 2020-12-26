import { Observable } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';
import { unstable_cancelCallback, unstable_scheduleCallback } from './react-source-code/scheduler';
import { coalescingManager } from '../../../cdk/utils/coalescing-manager';
import { ReactCallBackCredentials, ReactPriorityLevel } from './model';


export const reactSchedulerTick = (credentials: ReactCallBackCredentials, context: any): Observable<number> =>
  new Observable<number>((subscriber) => {
    if (!coalescingManager.isCoalescing(context)) {
      const _work = () => {
        coalescingManager.remove(context);
        if (!coalescingManager.isCoalescing(context)) {
          credentials[1]();
          subscriber.next(0);
        }
      };
      const task = unstable_scheduleCallback(credentials[0], _work, credentials[2]);
      coalescingManager.add(context);
      return () => {
        coalescingManager.remove(context);
        unstable_cancelCallback(task);
      };
    }
  });


// RenderBehavior
export function scheduleLikeReact<T>(priority: ReactPriorityLevel, work: any, context: any) {
  return (o$: Observable<T>): Observable<T> => o$.pipe(
    switchMap(v => reactSchedulerTick([priority, work], context).pipe(mapTo(v))),
  );
}
