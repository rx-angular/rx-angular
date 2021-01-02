import { priorityLevel } from '../../../../render-strategies/model/priority';
import { ConcurrentAction } from './ConcurrentAction';
import { PriorityScheduler } from '../priority/PriorityScheduler';
import { ConcurrentQueueHandler } from './concurrent.queue-handler';
import { ReactSchedulerTask } from '../../../scheduling/concurrent-scheduler/react-source-code/schedulerMinHeap';
import { PriorityAction } from '../priority';

export class ConcurrentScheduler extends PriorityScheduler<priorityLevel, ReactSchedulerTask> {
  public queueHandler: ConcurrentQueueHandler = new ConcurrentQueueHandler();

  constructor(schedulerAction: typeof ConcurrentAction,
              public priority: priorityLevel
  ) {
    // @ts-ignore
    super(schedulerAction, priority);
  }

}
