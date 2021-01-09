import { PriorityOperatorOptions } from './model';
import { Observable } from 'rxjs';
type Work = (...args: any[]) => void;

export const scheduleOnQueueOperatorFactory = <P, T>(scheduleTask:(work: Work, options: PriorityOperatorOptions<P>) => T, deleteTask: (taskHandle: T) => void) =>
  (work: Work, options: PriorityOperatorOptions<P>): Observable<T> =>
    new Observable<T>((subscriber) => {
      const task = scheduleTask(() => {
        work();
        subscriber.next(task);
      }, options);
      return () => {
        deleteTask(task);
      };
    });
