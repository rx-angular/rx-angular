import { MonoTypeOperatorFunction, Observable, Subject } from 'rxjs';
import { switchMap, switchMapTo } from 'rxjs/operators';
import { unstable_cancelCallback, unstable_scheduleCallback } from './scheduler';
import { ReactSchedulerTask } from './schedulerMinHeap';
import { PriorityLevel } from './schedulerPriorities';
import { coalescingManager } from './coalescing-manager';

export interface ReactSchedulerWorkDefinition {
  work: () => void;
  priority: PriorityLevel;
  scope: any;
}

export function scheduleLikeReact<T>(
  workDefinitionFn: () => ReactSchedulerWorkDefinition
): MonoTypeOperatorFunction<T> {
  // Local queue of references of the work function needed to dispose their execution
  let scheduledTask: ReactSchedulerTask;
  let scope: any;
  const depleteQueue$ = new Observable<void>(subscriber => {
    subscriber.next();
    return () => {
      coalescingManager.remove(scope)
      if (scheduledTask) {
        unstable_cancelCallback(scheduledTask);
        scheduledTask = null;
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
        const inputTask = workDefinitionFn();
        scope = inputTask.scope;
        coalescingManager.add(scope);
        if (scheduledTask) {
          unstable_cancelCallback(scheduledTask);
        }
        const workDone = new Subject<T>();
        scheduledTask = unstable_scheduleCallback(
          inputTask.priority,
          () => {
            coalescingManager.remove(scope);
            scheduledTask = null;
            if (!coalescingManager.isCoalescing(scope)) {
              inputTask.work();
              workDone.next(val);
            }
          },
          null
        );
        return workDone;
      })
    );
  };
}
