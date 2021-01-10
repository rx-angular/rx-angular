import { RxaAction } from './RxaAction';
import { RxaSchedulerQueueHandler } from './rxa-scheduler.queue-handler';
import {
  CoalescingSchedulingOptions,
  PriorityScheduler,
  PrioritySchedulerOptions,
} from '../priority-scheduler';
import { GlobalTaskPriority } from './rxa-scheduler/rxa-queue-manager';

export class RxaScheduler extends PriorityScheduler<
  GlobalTaskPriority,
  undefined
> {
  public queueHandler: RxaSchedulerQueueHandler = new RxaSchedulerQueueHandler();

  constructor(
    schedulerAction: typeof RxaAction,
    public options: CoalescingSchedulingOptions &
      PrioritySchedulerOptions<GlobalTaskPriority>
  ) {
    // @ts-ignore
    super(schedulerAction, options);
  }
}
