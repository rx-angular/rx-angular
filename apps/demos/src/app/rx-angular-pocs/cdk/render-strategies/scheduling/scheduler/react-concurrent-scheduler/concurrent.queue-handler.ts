import { priorityLevel, PriorityNameToLevel } from '../../../../render-strategies/model/priority';
import { ReactSchedulerOptions } from './model';


import { coalescingManager } from '../../../../utils/coalescing-manager';
import { ReactSchedulerTask } from './react-scheduler/schedulerMinHeap';
import { cancelCallback, scheduleCallback } from './react-scheduler/scheduler';
import { TaskQueue } from '../priority-scheduler/task-queue';

/**
 * Helper functions to schedule and unschedule tasks in a global queue.
 */
export class ConcurrentQueueHandler extends TaskQueue<priorityLevel, ReactSchedulerTask> {
  _queTask = (cb: () => void, options: ReactSchedulerOptions): [ReactSchedulerTask, number] => {
    const id = this.getTaskId();
    const scope = options.scope;
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
