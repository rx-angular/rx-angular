import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter, map, mapTo, switchMap, switchMapTo, tap } from 'rxjs/operators';
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
    switchMap(v => globalQueueTick(workDefinition).pipe(mapTo(v))),
  );
}

export function _scheduleOnGlobalTick<T>(
  workDefinitionFn: () => GlobalTask
): MonoTypeOperatorFunction<T> {
  // Local queue of references of the work function needed to dispose their execution
  let scheduledTask: GlobalTask;
  const depleteQueue$ = new Observable<void>(subscriber => {
    subscriber.next();
    return () => {
      if (scheduledTask) {
          globalTaskManager.deleteTask(scheduledTask);
          scheduledTask = null;
      }
    };
  });
  return (o$: Observable<T>) => {
    // To clarify

    // If we could switchMap into the next schedule call
    // switchMap(() => globalWorker.scheduleTask(scheduledTask))
    // pro: do less work in global queue
    // cons: end up in eternal scheduling

    // Is it important to tie the signal of an executed work to the related scheduled work,
    // meaning maintaining the order of emission?
    return depleteQueue$.pipe(
      switchMapTo(o$),
      switchMap(val => {
        const inputTask = workDefinitionFn();
        if (scheduledTask) {
            globalTaskManager.deleteTask(scheduledTask);
        }
        let workDone = false;
        scheduledTask = {
            priority: inputTask.priority,
            work: () => {
                inputTask.work();
                workDone = true;
            },
            scope: inputTask.scope
        }
        globalTaskManager.scheduleTask(scheduledTask);
        return globalTaskManager.tick()
            .pipe(
                filter(() => workDone),
                tap(() => {
                    scheduledTask = null;
                    workDone = false;
                }),
                map(() => val),
            );
      })
    );
  };
}
