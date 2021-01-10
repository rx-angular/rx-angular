import { CoalescingSchedulingOptions } from '../priority-scheduler';
import { PrioritySchedulerOptions } from '../priority-scheduler';


import { GlobalTaskPriority } from './rxa-scheduler/rxa-queue-manager';
export { GlobalTaskPriority } from './rxa-scheduler/rxa-queue-manager';

export type RxaSchedulerOptions = PrioritySchedulerOptions<GlobalTaskPriority> & CoalescingSchedulingOptions;
