import { Observable, Subject } from 'rxjs';

// TODO: fetch the unpatched version but keep the fallbacks!
export const animFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  (window as any).mozRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };

const cancelAnimFrame =
  window.cancelAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  (window as any).mozCancelAnimationFrame ||
  function (callback) {};

const postMessage = (cb) => (() => {
  if (typeof MessageChannel !== 'undefined') {
    const { port1, port2 } = new MessageChannel()
    port1.onmessage = cb
    return () => port2.postMessage(null)
  }
  return () => setTimeout(cb)
})()

/*export const animFrame = getZoneUnPatchedApi('setTimeout');
const cancelAnimFrame = getZoneUnPatchedApi('clearTimeout');*/

export enum GlobalTaskPriority {
  blocking,
  chunk,
}

export type GlobalTaskScope = object;

export interface GlobalTask {
  work: (...args: any[]) => void;
  priority: GlobalTaskPriority;
  scope: GlobalTaskScope;
}

interface ScheduledGlobalTask extends GlobalTask {
  rescheduled?: number;
}

interface GlobalTaskManager {
  // taskDefinition$: Observable<any>;
  // subscribe(): void;
  // setFrameRate(frameRate: number): void,
  scheduleTask(task: GlobalTask): GlobalTask; // Observable<void> ?
  deleteTask(task: GlobalTask): void;

  tick(): Observable<void>;
}

// PLAY AROUND WITH THIS IF YOU WANT TO CHANGE FRAME SIZE!
const rescheduleMax = 3;
const frameThresh = 32;

function createGlobalTaskManager(): GlobalTaskManager {
  const queue = new Map<GlobalTaskScope, ScheduledGlobalTask>();
  const chunkedQueue = new Map<GlobalTaskScope, ScheduledGlobalTask>();
  const tick = new Subject<void>();
  const tick$ = tick.asObservable();
  let isScheduled = false;

  return {
    scheduleTask,
    tick: () => tick$,
    deleteTask,
  };

  function deleteTask(taskDefinition: GlobalTask) {
    // only delete this task if this is the latest one queued
    queue.delete(taskDefinition.scope);
    chunkedQueue.delete(taskDefinition.scope);
  }

  function scheduleTask(taskDefinition: GlobalTask): GlobalTask {
    (taskDefinition as ScheduledGlobalTask).rescheduled = 0;
    deleteTask(taskDefinition);
    if (taskDefinition.priority === GlobalTaskPriority.chunk) {
      chunkedQueue.set(taskDefinition.scope, taskDefinition);
    } else {
      queue.set(taskDefinition.scope, taskDefinition);
    }
    if (!isScheduled) {
      isScheduled = true;
      const finishScheduling = () => (isScheduled = false);
      scheduleAndExhaust$().subscribe({
        next: () => tick.next(),
        error: finishScheduling,
        complete: finishScheduling,
      });
    }
    return taskDefinition;
  }

  function size(): number {
    return queue.size + chunkedQueue.size;
  }

  function runTask(task: () => void): number {
    const start = performance.now();
    task();
    const end = performance.now();
    return end - start;
  }

  function scheduleAndExhaust$(): Observable<void> {
    return new Observable<void>((subscriber) => {
      let frameId;

      function exhaust() {
        if (size() > 0) {
          let runtime = 0;
          // fetch tasks as array and sort them by priority
          // amount of blocking tasks in the current queue
          for (const blockingEntry of queue.entries()) {
            const task = blockingEntry[1];
            runtime += runTask(task.work);
            deleteTask(task);
          }
          if (runtime <= frameThresh) {
            // exhaust queue while there are tasks AND (there are blocking tasks left to process OR the
            // runtime exceeds 16ms)
            for (const chunkEntry of chunkedQueue.entries()) {
              if (runtime > frameThresh) {
                break;
              }
              const task = chunkEntry[1];
              runtime += runTask(task.work);
              deleteTask(task);
            }
          }
          if (size() > 0) {
            // queue has entries left -> reschedule
            cancelAnimFrame(frameId);
            // console.warn('rescheduling:', size());
            frameId = postMessage(exhaust)();
            subscriber.next();
          } else {
            // queue is empty -> exhaust completed
            cancelAnimFrame(frameId);
            // console.warn('exhaust completed');
            subscriber.next();
            subscriber.complete();
          }
        } else {
          cancelAnimFrame(frameId);
          // queue is empty -> exhaust completed
          subscriber.next();
          subscriber.complete();
        }
      }

      // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
      frameId = postMessage(exhaust)();
    });
  }
}

export const rxaQueueManager = createGlobalTaskManager();
