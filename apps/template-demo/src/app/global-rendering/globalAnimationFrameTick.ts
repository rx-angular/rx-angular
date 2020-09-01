import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter, map, switchMap, switchMapTo, tap } from 'rxjs/operators';
import { GlobalTask, globalTaskManager } from './global-task-manager';

export function scheduleOnGlobalTick<T>(
  workDefinitionFn: () => GlobalTask
): MonoTypeOperatorFunction<T> {
  // Local queue of references of the work function needed to dispose their execution
  let scheduledTask: GlobalTask;
  const depleteQueue$ = new Observable<void>(subscriber => {
    subscriber.next();
    return () => {
      if (scheduledTask) {
        globalTaskManager.deleteTask(scheduledTask);
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
        // get the workFn
        const inputTask = workDefinitionFn();
        // if a work was scheduled before, remove it
        // we just want to execute the latest work
        if (scheduledTask) {
          globalTaskManager.deleteTask(scheduledTask);
        }
        // define a condition for when to emit that this work was done
        let workDone = false;
        // create a new scheduledTask which executes the inputWork
        scheduledTask = {
          priority: inputTask.priority,
          work: () => {
            inputTask.work();
            // work was done, so let we can emit on next tick
            workDone = true;
          }
        }
        // schedule the new task
        globalTaskManager.scheduleTask(scheduledTask);
        // listen to next tick from globalTaskManager
        return globalTaskManager.tick()
          .pipe(
            // only emit if work was done
            filter(() => workDone),
            // reset the state
            tap(() => {
              scheduledTask = null;
              workDone = false;
            }),
            // return the actual value
            map(() => val),
          );
      })
    );
  };
}
