import { Observable, OperatorFunction, Subject } from 'rxjs';
import { switchMap, switchMapTo } from 'rxjs/operators';
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

export enum WorkPriority {
  smooth,
  blocking
}

export interface WorkDefinition {
  work: (...args: any[]) => void;
  priority: WorkPriority;
}

interface ScheduledWorkDefinition extends WorkDefinition {
  rescheduled?: number;
}

const workQueue = new Set<ScheduledWorkDefinition>();
const renderNotifier = new Subject<void>();
let isScheduling = false;

export function scheduleByPriority<T>(
  workDefinitionFn: () => WorkDefinition
): OperatorFunction<T, void> {
  const workToDeplete = [];
  const depleteQueue$ = new Observable<void>(subscriber => {
    subscriber.next();
    return () => {
      while (workToDeplete.length > 0) {
        const w = workToDeplete.pop();
        if (workQueue.has(w)) {
          workQueue.delete(w);
        }
      }
    };
  });
  return (o$: Observable<T>) => {
    return depleteQueue$.pipe(
      switchMapTo(o$),
      switchMap(() => {
        const scheduledWorkDefinition = {
          ...workDefinitionFn(),
          rescheduled: 0
        };
        workQueue.add(scheduledWorkDefinition);
        workToDeplete.push(scheduledWorkDefinition);
        if (!isScheduling) {
          isScheduling = true;
          const finishScheduling = () => (isScheduling = false);
          scheduleAndExhaust$().subscribe({
            error: finishScheduling,
            complete: finishScheduling
          });
        }
        return renderNotifier;
      })
    );
  };
}

// https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
function scheduleAndExhaust$(): Observable<void> {
  return new Observable<void>(subscriber => {
    let frameId;
    function exhaust() {
      if (workQueue.size > 0) {
        let runtime = 0;
        // fetch tasks as array and sort them by priority
        const tasks = Array.from(workQueue.entries(), def => def[0]).sort(
          (a, b) => a.priority - b.priority
        );
        // amount of blocking tasks in the current queue
        let blockingTasksLeft = tasks.filter(
          def => def.priority === WorkPriority.blocking
        ).length;
        // exhaust queue while there are tasks AND (there are blocking tasks left to process OR the runtime exceeds
        // 16ms)
        while ((blockingTasksLeft > 0 || runtime <= 16) && tasks.length > 0) {
          const taskDefinition = tasks.pop();
          const isSmooth = taskDefinition.priority === WorkPriority.smooth;
          // make sure to run all tasks marked with blocking priority and smooth tasks which got rescheduled at
          // least 2 times regardless of the runtime!
          if (!isSmooth || runtime <= 16 || taskDefinition.rescheduled >= 2) {
            // measure task runtime and add it to the runtime of this frame
            runtime += measure(taskDefinition.work);
            if (!isSmooth) {
              blockingTasksLeft--;
            }
            // delete work from queue
            workQueue.delete(taskDefinition);
            //console.warn(`running ${ isSmooth ? 'smooth' : 'blocking' } task. total runtime:`, runtime);
          } else {
            taskDefinition.rescheduled++;
          }
        }
        if (workQueue.size > 0) {
          // queue has entries left -> reschedule
          //console.warn('rescheduling:', workQueue.size);
          renderNotifier.next();
          frameId = animFrame(exhaust);
        } else {
          // queue is empty -> exhaust completed
          //console.warn('exhaust completed');
          renderNotifier.next();
          subscriber.complete();
        }
      } else {
        // queue is empty -> exhaust completed
        renderNotifier.next();
        subscriber.complete();
      }
    }
    frameId = animFrame(exhaust);
  });
}

function measure(job: () => void): number {
  const start = performance.now();
  job();
  const end = performance.now();
  return end - start;
}
