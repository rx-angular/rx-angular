import { Observable, OperatorFunction, Subject } from 'rxjs';
import { share, switchMap, switchMapTo } from 'rxjs/operators';
import { getZoneUnPatchedApi } from '../../../core/utils';

// TODO: fetch the unpatched version but keep the fallbacks!
const animFrame = /*window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  (window as any).mozRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };*/ getZoneUnPatchedApi(
  'requestAnimationFrame'
);

export enum TaskPriority {
  smooth,
  blocking
}

export interface TaskDefinition {
  work: (...args: any[]) => void;
  priority: TaskPriority;
}

interface ScheduledTaskDefinition extends TaskDefinition {
  rescheduled?: number;
}

interface GlobalWorker {
  scheduleTask(task: TaskDefinition): void; // Observable<void> ?
  deleteTask(task: TaskDefinition): void;
  tick(): Observable<void>;
}

function createGlobalWorker(): GlobalWorker {
  const queue = new Set<ScheduledTaskDefinition>();
  const tick = new Subject<void>();
  const tick$ = tick.pipe(share());
  let isScheduled = false;

  return {
    scheduleTask,
    tick: () => tick$,
    deleteTask
  };

  function deleteTask(taskDefinition: TaskDefinition) {
    queue.delete(taskDefinition);
  }

  function scheduleTask(taskDefinition: TaskDefinition) {
    const scheduledWorkDefinition = {
      ...taskDefinition,
      rescheduled: 0
    };
    queue.add(scheduledWorkDefinition);
    if (!isScheduled) {
      const finishScheduling = () => (isScheduled = false);
      scheduleAndExhaust$().subscribe({
        error: finishScheduling,
        complete: finishScheduling
      });
    }
  }

  function tasks() {
    return Array.from(queue.entries(), def => def[0]).sort(
      (a, b) => a.priority - b.priority
    );
  }

  function size(): number {
    return queue.size;
  }

  function runTask(task: () => void): number {
    const start = performance.now();
    task();
    const end = performance.now();
    return end - start;
  }

  function scheduleAndExhaust$(): Observable<void> {
    return new Observable<void>(subscriber => {
      let frameId;
      function exhaust() {
        if (size() > 0) {
          let runtime = 0;
          // fetch tasks as array and sort them by priority
          const remainingTasks = tasks();
          // amount of blocking tasks in the current queue
          let blockingTasksLeft = remainingTasks.filter(
            def => def.priority === TaskPriority.blocking
          ).length;
          // exhaust queue while there are tasks AND (there are blocking tasks left to process OR the runtime exceeds
          // 16ms)
          while (
            (blockingTasksLeft > 0 || runtime <= 16) &&
            remainingTasks.length > 0
          ) {
            const taskDefinition = remainingTasks.slice(0, 1)[0];
            const isSmooth = taskDefinition.priority === TaskPriority.smooth;
            // make sure to run all tasks marked with blocking priority and smooth tasks which got rescheduled at
            // least 2 times regardless of the runtime!
            if (!isSmooth || runtime <= 16 || taskDefinition.rescheduled >= 2) {
              // measure task runtime and add it to the runtime of this frame
              runtime += runTask(taskDefinition.work);
              if (!isSmooth) {
                blockingTasksLeft--;
              }
              // delete work from queue
              queue.delete(taskDefinition);
              //console.warn(`running ${ isSmooth ? 'smooth' : 'blocking' } task. total runtime:`, runtime);
            } else {
              taskDefinition.rescheduled++;
            }
          }
          if (size() > 0) {
            // queue has entries left -> reschedule
            //console.warn('rescheduling:', globalWorker.queue.size);
            tick.next();
            frameId = animFrame(exhaust);
          } else {
            // queue is empty -> exhaust completed
            //console.warn('exhaust completed');
            tick.next();
            subscriber.complete();
          }
        } else {
          // queue is empty -> exhaust completed
          tick.next();
          subscriber.complete();
        }
      }
      // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
      frameId = animFrame(exhaust);
    });
  }
}

export const globalWorker = createGlobalWorker();
