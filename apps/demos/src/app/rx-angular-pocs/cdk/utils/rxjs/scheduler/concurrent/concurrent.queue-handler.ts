import { coalescingManager } from '../../../coalescing-manager';
import { scheduleCallback, cancelCallback } from '../../../scheduling/concurrent-scheduler/react-source-code/scheduler';
import { priorityLevel, PriorityNameToLevel } from '../../../../render-strategies/model/priority';
import { RxaSchedulingOptions } from '../../scheduler/priority/model';
import { TaskQueue } from '../priority/task-queue';
import { ReactSchedulerTask } from '../../../scheduling/concurrent-scheduler/react-source-code/schedulerMinHeap';

/**
 * Helper functions to schedule and unschedule tasks in a global queue.
 */
export class ConcurrentQueueHandler extends TaskQueue<priorityLevel, ReactSchedulerTask> {
  _queTask = (cb: () => void, options: RxaSchedulingOptions<priorityLevel>): [ReactSchedulerTask, number] => {
    const id = this.getTaskId();
    const scope = options.context;
    let task;
    if (!coalescingManager.isCoalescing(scope)) {
      coalescingManager.increment(scope);
      task = scheduleCallback(options?.priority || PriorityNameToLevel.normal, () => {
        coalescingManager.decrement(scope);
        this.clearTask(id, scope);
        cb();
      }, {});
    }

    return [task, id];
  }
  _dequeTask = (handle: any, scope): void => {
    coalescingManager.decrement(scope);
    cancelCallback(handle);
  }
};
