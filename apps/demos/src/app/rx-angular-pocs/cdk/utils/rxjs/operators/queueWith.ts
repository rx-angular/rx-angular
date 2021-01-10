import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TaskQueue } from '../scheduler/priority/task-queue';
import { PrioritySchedulingOptions } from '../scheduler/priority';

export function queueWith<P, T>(h: TaskQueue<P, T>, p: PrioritySchedulingOptions<P>) {
  return (o$: Observable<(...args: any[]) => void>) => o$.pipe(
    mergeMap(w => new Observable(s => {
      const id = h.queueTask(() => () => s.next(w()), p);
      return () => {
        h.dequeueTask(id);
      }
    }))
  );
}
