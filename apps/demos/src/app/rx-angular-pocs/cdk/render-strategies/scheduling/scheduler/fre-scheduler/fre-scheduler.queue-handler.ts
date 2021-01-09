import { coalescingManager } from '../../../../utils/coalescing-manager';
import { TaskQueue } from '../priority-scheduler/task-queue';
import { FreSchedulerOptions, ITask } from './model';
import { scheduleWork } from './scheduler';

/**
 * Helper functions to schedule and unschedule tasks in a global queue.
 */
export class FreSchedulerQueueHandler extends TaskQueue<
  ITask,
  FreSchedulerOptions
> {
  protected _queTask = (
    work: () => void,
    options: FreSchedulerOptions
  ): [ITask & { scope: any }, number] => {
    const id = this.getTaskId();
    const {scope} = options;
    let task;
    if (!coalescingManager.isCoalescing(scope)) {
      coalescingManager.increment(scope);
      const _work = () => {
        work();
        this.clearTask(id);
        return false;
      };
      task = scheduleWork(_work);
      task.scope = scope;
    }
    return [task, id];
  };
  protected _dequeTask = (handle: ITask & { scope: any }): void => {
    coalescingManager.decrement(handle.scope);
    handle.callback = null;
  };
}
