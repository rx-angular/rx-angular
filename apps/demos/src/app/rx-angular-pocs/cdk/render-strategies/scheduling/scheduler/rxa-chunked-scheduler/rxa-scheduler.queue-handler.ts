import { RxaSchedulerOptions } from './model';
import { GlobalTask, rxaQueueManager } from './rxa-scheduler/rxa-queue-manager';
import { TaskQueue } from '../priority-scheduler/task-queue';

/**
 * Helper functions to schedule and unschedule tasks in a global queue.
 */
export class RxaSchedulerQueueHandler extends TaskQueue<
  GlobalTask,
  RxaSchedulerOptions
> {
  protected _queTask = (
    work: () => void,
    options: RxaSchedulerOptions
  ): [undefined, number] => {
    const id = this.getTaskId();
    const {scope, priority} = options;
    let task;
    task = rxaQueueManager.scheduleTask({
      work: () => {
        work();
        this.clearTask(id);
      },
      priority,
      scope,
    });
    return [task, id];
  };
  protected _dequeTask = (handle: GlobalTask): void => {
    rxaQueueManager.deleteTask(handle);
  };
}
