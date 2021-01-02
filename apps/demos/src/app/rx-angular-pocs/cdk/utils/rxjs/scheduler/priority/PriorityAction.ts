import { AsyncAction } from 'rxjs/internal/scheduler/AsyncAction';
import { SchedulerAction } from 'rxjs/internal/types';
import { Subscription } from 'rxjs';
import { PriorityScheduler } from './PriorityScheduler';
import { RxaSchedulingOptions } from './model';

export class PriorityAction<S, P, T> extends AsyncAction<S> {

  constructor(protected scheduler: PriorityScheduler<P, T>,
              protected work: (this: SchedulerAction<S>, state?: S) => void) {
    super(scheduler, work);
  }

  // @ts-ignore
  public schedule(state?: S, options?: RxaSchedulingOptions<P>): Subscription {
    if (this.closed) {
      return this;
    }

    this.state = state;

    const id = this.id;
    const scheduler = this.scheduler;
    if (id != null) {
      this.id = this.recycleAsyncId(scheduler, id, options);
    }

    this.pending = true;
    this.delay = options.delay;
    this.id = this.id || this.requestAsyncId(scheduler, this.id, options);

    return this;
  }

  // @ts-ignore
  protected requestAsyncId(scheduler: PriorityScheduler<P>, id?: any, options?: RxaSchedulingOptions<P>): any {
    // Push the action to the end of the scheduler queue.
    // @ts-ignore
    scheduler.actions.push(this);
    // If a task has already been scheduled, don't schedule another
    // one. If a task hasn't been scheduled yet, schedule one now. Return
    // the current scheduled task id.
    return scheduler.scheduled || (scheduler.scheduled = scheduler.queueHandler.queueTask(
      scheduler.flush.bind(scheduler, undefined), options
    ));
  }

  // @ts-ignore
  protected recycleAsyncId(scheduler: PriorityScheduler<P>, id?: any, options?: RxaSchedulingOptions<P>): any {
    // If delay exists and is greater than 0, or if the delay is null (the
    // action wasn't rescheduled) but was originally scheduled as an async
    // action, then recycle as an async action.
    if ((options?.delay !== null && options?.delay > 0) || (options?.delay === null && this.delay > 0)) {
      return super.recycleAsyncId(scheduler, id, options.delay);
    }
    // If the scheduler queue is empty, cancel the requested task and
    // set the scheduled flag to undefined so the next ConcurrentAction will schedule
    // its own.
    if (scheduler.actions.length === 0) {
      scheduler.queueHandler.dequeueTask(id);
      scheduler.scheduled = undefined;
    }
    // Return undefined so the action knows to request a new async id if it's rescheduled.
    return undefined;
  }
}
