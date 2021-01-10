import { AsapScheduler } from 'rxjs/internal/scheduler/AsapScheduler';
import { Subscription } from 'rxjs';
import { PrioritySchedulerOptions } from './model';
import { PriorityAction } from './PriorityAction';
import { TaskQueue } from './task-queue';

export abstract class PriorityScheduler<P, T> extends AsapScheduler {
  public queueHandler: TaskQueue<T, PrioritySchedulerOptions<P>>;

  constructor(
    schedulerAction: typeof PriorityAction,
    public options: PrioritySchedulerOptions<P>
  ) {
    // @ts-ignore
    super(schedulerAction, () => (number = Date.now));
  }

  // @ts-ignore
  schedule<S>(
    work: (this: PriorityAction<S, P, T>, state?: S) => void,
    options?: PrioritySchedulerOptions<P>,
    state?: S
  ): Subscription {
    // options get passed to action schedule. the scheduler holds the fallback priority
    return super.schedule(work as any, this.options as any, state);
  }
}
