import { AsyncAction } from 'rxjs/internal/scheduler/AsyncAction';
import { SchedulerAction } from 'rxjs/internal/types';
import { Subscription } from 'rxjs';
import { GlobalQueue } from '../util/GlobalQueue';
import { ConcurrentScheduler } from './ConcurrentScheduler';
import { PriorityNameToLevel } from '../../../render-strategies/model';

export class ConcurrentAction<T> extends AsyncAction<T> {

  constructor(protected scheduler: ConcurrentScheduler,
              protected work: (this: SchedulerAction<T>, state?: T) => void) {
    super(scheduler, work);
  }

  schedule(state?: T, options?: any): Subscription {
    return super.schedule(state, options);
  }

  protected requestAsyncId(scheduler: ConcurrentScheduler, id?: any, options: any = { }): any {
    // Push the action to the end of the scheduler queue.
    scheduler.actions.push(this);
    // If a task has already been scheduled, don't schedule another
    // one. If a task hasn't been scheduled yet, schedule one now. Return
    // the current scheduled task id.
    return scheduler.scheduled || (scheduler.scheduled = GlobalQueue.setHandle(
      scheduler.flush.bind(scheduler, undefined), options?.priority || PriorityNameToLevel.normal
    ));
  }
  protected recycleAsyncId(scheduler: ConcurrentScheduler, id?: any, options: any = { }): any {
    // If delay exists and is greater than 0, or if the delay is null (the
    // action wasn't rescheduled) but was originally scheduled as an async
    // action, then recycle as an async action.
    if ((options?.delay !== null && options?.delay > 0) || (options?.delay === null && this.delay > 0)) {
      return super.recycleAsyncId(scheduler, id, options);
    }
    // If the scheduler queue is empty, cancel the requested task and
    // set the scheduled flag to undefined so the next ConcurrentAction will schedule
    // its own.
    if (scheduler.actions.length === 0) {
      GlobalQueue.clearHandle(id);
      scheduler.scheduled = undefined;
    }
    // Return undefined so the action knows to request a new async id if it's rescheduled.
    return undefined;
  }
}
