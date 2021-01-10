import { priorityLevel } from '../../../../render-strategies/model/priority';
import { ConcurrentAction } from './ConcurrentAction';
import { ConcurrentQueueHandler } from './concurrent.queue-handler';
import { ReactSchedulerOptions, ReactSchedulerTask } from './model';
import { PriorityScheduler } from '../priority-scheduler';

export class ConcurrentScheduler extends PriorityScheduler<
  priorityLevel,
  ReactSchedulerTask
> {
  public queueHandler = new ConcurrentQueueHandler();

  constructor(
    schedulerAction: typeof ConcurrentAction,
    public options: ReactSchedulerOptions
  ) {
    // @ts-ignore
    super(schedulerAction, options);
  }
}
