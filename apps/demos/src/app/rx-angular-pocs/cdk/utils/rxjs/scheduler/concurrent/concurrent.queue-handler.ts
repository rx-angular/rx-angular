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
    const task = scheduleCallback(options?.priority || PriorityNameToLevel.normal, () => this.clearTask(id) && cb(), {});
    return [task, id];
  }
  _dequeTask = (handle: any): void => {
    cancelCallback(handle);
  }
};
