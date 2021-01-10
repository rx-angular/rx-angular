import { Observable } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';
import { coalescingManager } from '../../../../utils/coalescing-manager';
import { priorityLevel } from '../../../model/priority';
import { scheduleWork } from './scheduler';

export const freSchedulerTick = (work: () => any, context: any): Observable<any> =>
  new Observable<number>((subscriber) => {
    if (!coalescingManager.isCoalescing(context)) {
      const _work = () => {
        coalescingManager.decrement(context);
        if (!coalescingManager.isCoalescing(context)) {
          subscriber.next(work());
        }
      };
      const task = scheduleWork(credentials[0], _work, credentials[2]);
      coalescingManager.increment(context);
      return () => {
        coalescingManager.decrement(context);
        cancelCallback(task);
      };
    }
  });

// RenderBehavior
export function scheduleFre<T>(work: any, context: any) {
  return (o$: Observable<T>): Observable<T> => o$.pipe(
    switchMap(v => freSchedulerTick(work, context).pipe(mapTo(v)))
  );
}

export function getConcurrentScheduler<T>(priority: priorityLevel) {
  const  work: any = undefined;
  const context: any = undefined;
  return (o$: Observable<T>): Observable<T> => o$.pipe(
    switchMap((v) => scheduleFre([priority, work], context).pipe(mapTo(v)))
  );
}
