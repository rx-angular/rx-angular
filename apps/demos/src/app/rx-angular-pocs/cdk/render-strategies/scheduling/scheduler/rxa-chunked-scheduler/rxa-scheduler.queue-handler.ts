import { coalescingManager } from '../../../../utils/coalescing-manager';
import { GlobalTaskPriority, RxaSchedulerOptions } from './model';
import { rxaQueueManager } from './rxa-scheduler/rxa-queue-manager';
import { TaskQueue } from '../priority-scheduler/task-queue';

/**
 * Helper functions to schedule and unschedule tasks in a global queue.
 */
export class RxaSchedulerQueueHandler extends TaskQueue<
  GlobalTaskPriority,
  undefined
> {
  _queTask = (
    cb: () => void,
    options: RxaSchedulerOptions
  ): [undefined, number] => {
    const id = this.getTaskId();
    const scope = options.scope;
    const priority = options.priority;
    let task;
    if (!coalescingManager.isCoalescing(scope)) {
      coalescingManager.increment(scope);
      task = rxaQueueManager.scheduleTask({
        work: () => {
          coalescingManager.decrement(scope);
          this.clearTask(id, scope);
          cb();
        },
        priority,
        scope,
      });
    }

    return [task, id];
  };
  _dequeTask = (handle: any, scope): void => {
    coalescingManager.decrement(scope);
    rxaQueueManager.deleteTask(handle);
  };
}
