import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map, switchMap, switchMapTo } from 'rxjs/operators';
import { globalTaskManager, GlobalTask } from '../../../core/render-aware';

export function scheduleOnGlobalTick<T>(
  workDefinitionFn: () => GlobalTask
): MonoTypeOperatorFunction<T> {
  const workToDeplete = [];
  const depleteQueue$ = new Observable<void>(subscriber => {
    subscriber.next();
    return () => {
      while (workToDeplete.length > 0) {
        const w = workToDeplete.pop();
        globalTaskManager.deleteTask(w);
      }
    };
  });
  return (o$: Observable<T>) => {
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
