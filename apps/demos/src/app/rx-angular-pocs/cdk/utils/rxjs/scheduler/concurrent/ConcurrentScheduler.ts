import { Subscription } from 'rxjs';
import { priorityLevel, PriorityNameToLevel } from '../../../../render-strategies/model/priority';
import { ConcurrentAction } from './ConcurrentAction';
import { PriorityScheduler } from '../priority/PriorityScheduler';
import { ConcurrentQueueHandler } from './concurrent.queue-handler';
import { ReactSchedulerTask } from '../../../scheduling/concurrent-scheduler/react-source-code/schedulerMinHeap';

export class ConcurrentScheduler extends PriorityScheduler<priorityLevel, ReactSchedulerTask> {
  public queueHandler: ConcurrentQueueHandler = new ConcurrentQueueHandler();

  constructor(schedulerAction: typeof ConcurrentAction,
              public priority: priorityLevel = PriorityNameToLevel.normal
  ) {
    // @ts-ignore
    super(schedulerAction, Date.now);
  }

  schedule<S>(work: (this: ConcurrentAction<S>, state?: S) => void, options?: any, state?: S): Subscription {
    return super.schedule(work, options?.delay, state);
  }
}
