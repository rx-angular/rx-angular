import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map, switchMap, switchMapTo } from 'rxjs/operators';
import { GlobalTask, globalTaskManager } from './global-task-manager';

export function scheduleOnGlobalTick<T>(
  workDefinitionFn: () => GlobalTask
): MonoTypeOperatorFunction<T> {
  // Local queue of references of the work function needed to dispose their execution
  const workToDeplete = [];
  const depleteQueue$ = new Observable<void>(subscriber => {
    subscriber.next();
    return () => {
      // Exhaust local queue
      while (workToDeplete.length > 0) {
        const w = workToDeplete.pop();
        globalTaskManager.deleteTask(w);
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
        const scheduledTask = workDefinitionFn();
        globalTaskManager.scheduleTask(scheduledTask);
        workToDeplete.push(scheduledTask);
        return globalTaskManager.tick().pipe(map(() => val));
      })
    );
  };
}
