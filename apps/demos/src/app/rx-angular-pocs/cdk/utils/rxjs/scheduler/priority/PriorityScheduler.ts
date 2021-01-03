import { AsapScheduler } from 'rxjs/internal/scheduler/AsapScheduler';
import { Subscription } from 'rxjs';
import { priorityLevel } from '../../../../render-strategies/model/priority';
import { RxaSchedulingOptions } from './model';
import { PriorityAction } from './PriorityAction';
import { TaskQueue } from './task-queue';

export abstract class PriorityScheduler<P, T> extends AsapScheduler {
  public queueHandler: TaskQueue<P, T>
  constructor(schedulerAction: typeof PriorityAction,
    public options: RxaSchedulingOptions<priorityLevel>) {
    // @ts-ignore
    super(schedulerAction, () => number = Date.now);
  }

  // @ts-ignore
  schedule<S>(work: (this: PriorityAction<S, P>, state?: S) => void, options?: O, state?: S): Subscription {
    // options get passed to action schedule. the scheduler holds the fallback priority
    return super.schedule(work, this.options as any, state);
  }
}
