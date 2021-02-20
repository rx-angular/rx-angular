import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';
import { cancelCallback, scheduleCallback } from './scheduler';
import { ReactSchedulerTask } from './schedulerMinHeap';
import { PriorityLevel } from './schedulerPriorities';

function scheduleTask(
  work: () => any,
  options: {
    priority: PriorityLevel;
    scope: object;
    delay?: number;
  }
) {
  return scheduleCallback(options.priority, work, { delay: options.delay });
}

function deleteTask(taskHandle: ReactSchedulerTask): void {
  cancelCallback(taskHandle);
}

const _scheduleOnReactQueue = (
  work: () => void,
  options: {
    priority: PriorityLevel;
    scope: object;
    delay?: number;
  }
): Observable<ReactSchedulerTask> => {
  return new Observable<ReactSchedulerTask>((subscriber) => {
    const task = scheduleTask(() => {
      work();
      subscriber.next(task);
    }, options);
    return () => {
      deleteTask(task);
    };
  });
};

export function scheduleOnReactQueue<T>(
  work: (...args: any[]) => void,
  options: {
    priority: PriorityLevel;
    scope: object;
    delay?: number;
  }
): MonoTypeOperatorFunction<T> {
  return (o$: Observable<T>): Observable<T> =>
    o$.pipe(
      switchMap((v) => _scheduleOnReactQueue(work, options).pipe(mapTo(v)))
    );
}
