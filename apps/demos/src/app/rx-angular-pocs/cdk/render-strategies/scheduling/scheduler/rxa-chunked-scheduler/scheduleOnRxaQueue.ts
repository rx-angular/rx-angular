import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';
import { GlobalTask, GlobalTaskPriority, GlobalTaskScope, rxaQueueManager } from './rxa-scheduler/rxa-queue-manager';
import { scheduleOnQueueOperatorFactory } from '../priority-scheduler';

function scheduleTask(work, options: {
  priority: GlobalTaskPriority,
  scope: GlobalTaskScope
}) {
  const task: GlobalTask = {
    priority: options.priority,
    work,
    scope: options.scope
  };
  rxaQueueManager.scheduleTask(task);
  return task
}
function deleteTask(taskHandle: GlobalTask): void {
  rxaQueueManager.deleteTask(taskHandle);
}

export const _scheduleOnRxaQueue = scheduleOnQueueOperatorFactory(scheduleTask, deleteTask);

export function scheduleOnRxaQueue<T>(
  work: (...args: any[]) => void,
  options: {
    priority: GlobalTaskPriority,
    scope: GlobalTaskScope
  }
): MonoTypeOperatorFunction<T> {
  return (o$: Observable<T>): Observable<T> =>
    o$.pipe(
      switchMap((v) => _scheduleOnRxaQueue(work, options).pipe(mapTo(v)))
    );
}
