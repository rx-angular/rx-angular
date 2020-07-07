import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map, switchMap, switchMapTo } from 'rxjs/operators';
import { globalWorker, TaskDefinition } from './globalAnimationFrame';

export function scheduleOnGlobalTick<T>(
  workDefinitionFn: () => TaskDefinition
): MonoTypeOperatorFunction<T> {
  const workToDeplete = [];
  const depleteQueue$ = new Observable<void>(subscriber => {
    subscriber.next();
    return () => {
      while (workToDeplete.length > 0) {
        const w = workToDeplete.pop();
        globalWorker.deleteTask(w);
      }
    };
  });
  return (o$: Observable<T>) => {
    return depleteQueue$.pipe(
      switchMapTo(o$),
      switchMap(val => {
        const scheduledTask = workDefinitionFn();
        globalWorker.scheduleTask(scheduledTask);
        workToDeplete.push(scheduledTask);
        return globalWorker.tick().pipe(map(() => val));
      })
    );
  };
}
