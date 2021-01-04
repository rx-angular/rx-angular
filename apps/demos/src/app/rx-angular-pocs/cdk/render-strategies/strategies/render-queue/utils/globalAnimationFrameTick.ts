import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';
import { GlobalTask, globalTaskManager } from './global-task-manager';

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
    globalTaskManager.scheduleTask(task);
    return () => {
      globalTaskManager.deleteTask(task);
    };
  });

export function scheduleOnGlobalTick<T>(
  workDefinition: GlobalTask
): MonoTypeOperatorFunction<T> {
  return (o$: Observable<T>): Observable<T> => o$.pipe(
    switchMap(v => globalQueueTick(workDefinition).pipe(mapTo(v)))
  );
}
