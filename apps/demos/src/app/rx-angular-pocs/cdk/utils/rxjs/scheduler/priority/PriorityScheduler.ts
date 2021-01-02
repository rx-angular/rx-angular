import { AsapScheduler } from 'rxjs/internal/scheduler/AsapScheduler';
import { Subscription } from 'rxjs';
import { PriorityAction } from './PriorityAction';
import { TaskQueue } from './task-queue';

export abstract class PriorityScheduler<P, T> extends AsapScheduler {
  public queueHandler: TaskQueue<P, T>
  constructor(schedulerAction: typeof PriorityAction,
              public priority: P) {
    // @ts-ignore
    super(schedulerAction, () => number = Date.now);
  }

  // @ts-ignore
  schedule<S>(work: (this: PriorityAction<S, P>, state?: S) => void, options?: O, state?: S): Subscription {
    return super.schedule(work, options?.delay, state);
  }
}
