import { AsapScheduler } from 'rxjs/internal/scheduler/AsapScheduler';
import { Subscription } from 'rxjs';
import { priorityLevel, PriorityNameToLevel } from '../../../render-strategies/model/priority';
import { ConcurrentAction } from './ConcurrentAction';

export class ConcurrentScheduler extends AsapScheduler {
  constructor(schedulerAction: typeof ConcurrentAction,
              now: () => number = Date.now) {
    // @ts-ignore
    super(schedulerAction, now);
  }

  schedule<T>(work: (this: ConcurrentAction<T>, state?: T) => void, options?: any, state?: T): Subscription {
    return super.schedule(work, options, state);
  }
}
