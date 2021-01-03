import { priorityLevel } from '../../../../render-strategies/model/priority';
import { PriorityLevel } from '../../../scheduling/concurrent-scheduler/react-source-code/schedulerPriorities';
import { RxaSchedulingOptions } from '../priority/model';
import { ConcurrentAction } from './ConcurrentAction';
import { PriorityScheduler } from '../priority/PriorityScheduler';
import { ConcurrentQueueHandler } from './concurrent.queue-handler';
import { ReactSchedulerTask } from '../../../scheduling/concurrent-scheduler/react-source-code/schedulerMinHeap';

export class ConcurrentScheduler extends PriorityScheduler<priorityLevel, ReactSchedulerTask> {
  public queueHandler: ConcurrentQueueHandler = new ConcurrentQueueHandler();

  constructor(schedulerAction: typeof ConcurrentAction,
              public options: RxaSchedulingOptions<priorityLevel>
  ) {
    // @ts-ignore
    super(schedulerAction, options);
  }

}
