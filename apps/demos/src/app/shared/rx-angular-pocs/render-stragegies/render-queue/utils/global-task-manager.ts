import { getZoneUnPatchedApi } from '@rx-angular/template';
import { Observable, Subject } from 'rxjs';
import { exhaustMap, publish, tap } from 'rxjs/operators';

export const animFrame = getZoneUnPatchedApi('requestAnimationFrame');
const cancelAnimFrame = getZoneUnPatchedApi('cancelAnimationFrame');

/*export const animFrame = getZoneUnPatchedApi('setTimeout');
const cancelAnimFrame = getZoneUnPatchedApi('clearTimeout');*/

export enum GlobalTaskPriority {
  chunk,
  blocking
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
  taskDefinition$: Observable<any>;
  subscribe(): void;
  setFrameRate(frameRate: number): void,
  scheduleTask(task: GlobalTask): void; // Observable<void> ?
  deleteTask(task: GlobalTask): void;
  tick(): Observable<void>;
}

// PLAY AROUND WITH THIS IF YOU WANT TO CHANGE FRAME SIZE!
const rescheduleMax = 3;

function createGlobalTaskManager(cfg: {frameRate: number, pendingInput?: { enabled: boolean, options?: { includeContinuous: boolean } }}): GlobalTaskManager {
  const frameRate = cfg.frameRate || 16;
  const respectPendingInput = cfg?.pendingInput?.enabled || false;
  const pendingInputOptions = cfg?.pendingInput?.options || { includeContinuous: true };
  const queue = new Map<GlobalTaskScope, ScheduledGlobalTask>();
  const chunkedQueue = new Map<GlobalTaskScope, ScheduledGlobalTask>();
  const tick = new Subject<void>();
  const tick$ = tick.asObservable();
  const canRun = respectPendingInput ?
                 (o) => !navigator['scheduling'].isInputPending(o) :
                 () => true;

  const taskDefinition$ = new Subject<GlobalTask>();

  (taskDefinition$.pipe(
    tap((taskDefinition) => {
      (taskDefinition as ScheduledGlobalTask).rescheduled = 0;
      deleteTask(taskDefinition);
      if (taskDefinition.priority === GlobalTaskPriority.chunk) {
        chunkedQueue.set(taskDefinition.scope, taskDefinition);
      } else {
        queue.set(taskDefinition.scope, taskDefinition);
      }
    }),
    exhaustMap(scheduleAndExhaust$),
    publish()
  ) as any).connect();


  return {
    subscribe: () => void 0,
    setFrameRate: () => {},
    scheduleTask: (taskDefinition: GlobalTask) => {
      taskDefinition$.next(taskDefinition);
    },
    tick: () => tick$,
    deleteTask,
    taskDefinition$: taskDefinition$.asObservable()
  };

  function deleteTask(taskDefinition: GlobalTask) {
    // only delete this task if this is the latest one queued
    queue.delete(taskDefinition.scope);
    chunkedQueue.delete(taskDefinition.scope);
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
    return new Observable<void>(subscriber => {
      let frameId;
      function exhaust() {
        if (!canRun(pendingInputOptions)) {
          cancelAnimFrame(frameId);
          // queue is empty -> exhaust completed
          frameId = animFrame(exhaust);
          subscriber.next();
        }
        if (size() > 0) {
          let runtime = 0;
          for (const blockingEntry of queue.entries()) {
            const task = blockingEntry[1];
            runtime += runTask(task.work);
            deleteTask(task);
          }
          if (runtime <= frameRate) {
            for (const chunkEntry of chunkedQueue.entries()) {
              if (runtime > frameRate) {
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
            frameId = animFrame(exhaust);
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
      frameId = animFrame(exhaust);

      return () => cancelAnimFrame(frameId);
    });
  }
}

export const globalTaskManager = createGlobalTaskManager({frameRate: 16});
