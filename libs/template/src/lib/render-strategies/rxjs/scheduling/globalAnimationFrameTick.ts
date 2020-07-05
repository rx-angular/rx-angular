import { Observable, OperatorFunction } from 'rxjs';
import { switchMap, switchMapTo } from 'rxjs/operators';
import {
  globalWorker,
  scheduleAndExhaust$,
  WorkDefinition
} from './globalAnimationFrame';

export function scheduleByPriority<T>(
  workDefinitionFn: () => WorkDefinition
): OperatorFunction<T, void> {
  const workToDeplete = [];
  const depleteQueue$ = new Observable<void>(subscriber => {
    subscriber.next();
    return () => {
      while (workToDeplete.length > 0) {
        const w = workToDeplete.pop();
        if (globalWorker.queue.has(w)) {
          globalWorker.queue.delete(w);
        }
      }
    };
  });
  return (o$: Observable<T>) => {
    return depleteQueue$.pipe(
      switchMapTo(o$),
      switchMap(() => {
        const scheduledWorkDefinition = {
          ...workDefinitionFn(),
          rescheduled: 0
        };
        globalWorker.queue.add(scheduledWorkDefinition);
        workToDeplete.push(scheduledWorkDefinition);
        if (!globalWorker.isScheduling) {
          globalWorker.isScheduling = true;
          const finishScheduling = () => (globalWorker.isScheduling = false);
          scheduleAndExhaust$().subscribe({
            error: finishScheduling,
            complete: finishScheduling
          });
        }
        return globalWorker.renderNotifier;
      })
    );
  };
}
