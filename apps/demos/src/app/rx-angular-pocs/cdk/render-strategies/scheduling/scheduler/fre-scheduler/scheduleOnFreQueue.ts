import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';
import { scheduleOnQueueOperatorFactory } from '../priority-scheduler';
import { FreSchedulerQueueHandler } from './fre-scheduler.queue-handler';
import { FreSchedulerOptions } from './model';

const qh = new FreSchedulerQueueHandler();

function scheduleTask(work, options: FreSchedulerOptions) {
  return qh.queueTask(work, options);
}
function deleteTask(taskId: number): void {
  qh.dequeueTask(taskId);
}

export const _scheduleOnFreQueue = scheduleOnQueueOperatorFactory(
  scheduleTask,
  deleteTask
);

export function scheduleOnFreQueue<T>(
  work: (...args: any[]) => void,
  options: FreSchedulerOptions
): MonoTypeOperatorFunction<T> {
  return (o$: Observable<T>): Observable<T> =>
    o$.pipe(
      switchMap((v) => _scheduleOnFreQueue(work, options).pipe(mapTo(v)))
    );
}
