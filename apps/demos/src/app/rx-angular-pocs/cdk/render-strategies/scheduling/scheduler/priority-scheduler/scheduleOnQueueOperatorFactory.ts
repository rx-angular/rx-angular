import { PriorityOperatorOptions } from './model';
import { Observable } from 'rxjs';
type Work = (...args: any[]) => void;

export const scheduleOnQueueOperatorFactory = <O, T>(
  scheduleTask: (work: Work, options: O) => T,
  deleteTask: (taskHandle: T) => void
) => (work: Work, options: O): Observable<T> =>
  new Observable<T>((subscriber) => {
    const task = scheduleTask(() => {
      work();
      subscriber.next(task);
    }, options);
    return () => {
      deleteTask(task);
    };
  });
