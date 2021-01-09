import { coalescingManager } from '../../../../utils/coalescing-manager';
import { TaskQueue } from '../priority-scheduler/task-queue';
import { FreSchedulerOptions, ITask } from './model';
import { getTime, scheduleWork } from './scheduler';

let prio = 0;

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
    const {scope, priority} = options;
    let task;
    if (!coalescingManager.isCoalescing(scope)) {
      coalescingManager.increment(scope);
      const _work = (time: boolean) => {
        console.log(time);
        work();
        this.clearTask(id);
        return false;
      };
      console.log(prio);
      task = scheduleWork(_work, getTime());
      task.scope = scope;
    }
    return [task, id];
  };
  protected _dequeTask = (handle: ITask & { scope: any }): void => {
    coalescingManager.decrement(handle.scope);
    handle.callback = null;
  };
}
