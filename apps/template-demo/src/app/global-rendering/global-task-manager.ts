import { Observable, Subject } from 'rxjs';

// TODO: fetch the unpatched version but keep the fallbacks!
export const animFrame = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  (window as any).mozRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };

const cancelAnimFrame = window.cancelAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  (window as any).mozCancelAnimationFrame || function(callback) {};

export enum GlobalTaskPriority {
  chunk,
  blocking
}

export interface GlobalTask {
  work: (...args: any[]) => void;
  priority: GlobalTaskPriority;
}

interface ScheduledGlobalTask extends GlobalTask {
  rescheduled?: number;
}

interface GlobalTaskManager {
  scheduleTask(task: GlobalTask): void; // Observable<void> ?
  deleteTask(task: GlobalTask): void;
  tick(): Observable<void>;
}

const frameThresh = 16;
const rescheduleMax = 2;

function createGlobalTaskManager(): GlobalTaskManager {
  const queue = new Set<ScheduledGlobalTask>();
  const tick = new Subject<void>();
  const tick$ = tick;
  let isScheduled = false;

  return {
    scheduleTask,
    tick: () => tick$,
    deleteTask
  };

  function deleteTask(taskDefinition: GlobalTask) {
    queue.delete(taskDefinition);
  }

  function scheduleTask(taskDefinition: GlobalTask) {
    (taskDefinition as ScheduledGlobalTask).rescheduled = 0;
    queue.add(taskDefinition as ScheduledGlobalTask);
    if (!isScheduled) {
      isScheduled = true;
      const finishScheduling = () => (isScheduled = false);
      scheduleAndExhaust$().subscribe({
        next: () => tick.next(),
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
            def => def.priority === GlobalTaskPriority.blocking
          ).length;
          // exhaust queue while there are tasks AND (there are blocking tasks left to process OR the runtime exceeds
          // 16ms)
          while (
            (blockingTasksLeft > 0 || runtime <= frameThresh) &&
            remainingTasks.length > 0
            ) {
            // TODO: consider using pop over shift! (render inside-out)
            const taskDefinition = remainingTasks.shift();
            const chunkTask =
              taskDefinition.priority === GlobalTaskPriority.chunk;
            // make sure to run all tasks marked with blocking priority and chunk tasks which got rescheduled at
            // least 2 times regardless of the runtime!
            if (
              !chunkTask ||
              runtime <= frameThresh ||
              taskDefinition.rescheduled >= rescheduleMax
            ) {
              // measure task runtime and add it to the runtime of this frame
              runtime += runTask(taskDefinition.work);
              if (!chunkTask) {
                blockingTasksLeft--;
              }
              // delete work from queue
              queue.delete(taskDefinition);
              // console.warn(`running ${ chunkTask ? 'chunk' : 'blocking' } task. total runtime:`, runtime);
            } else {
              taskDefinition.rescheduled++;
            }
          }
          cancelAnimFrame(frameId);
          if (size() > 0) {
            // queue has entries left -> reschedule
            // console.warn('rescheduling:', size());
            // cancelAnimationFrame(frameId);
            frameId = animFrame(exhaust);
            subscriber.next();
          } else {
            // queue is empty -> exhaust completed
            // console.warn('exhaust completed');
            subscriber.next();
            subscriber.complete();
          }
        } else {
          // queue is empty -> exhaust completed
          subscriber.next();
          subscriber.complete();
        }
      }
      // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
      frameId = animFrame(exhaust);
    });
  }
}

export const globalTaskManager = createGlobalTaskManager();
