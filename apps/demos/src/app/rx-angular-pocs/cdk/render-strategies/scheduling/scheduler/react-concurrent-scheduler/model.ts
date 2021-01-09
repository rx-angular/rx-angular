import { priorityLevel } from '../../../model';
import { CoalescingSchedulingOptions, PrioritySchedulerOptions } from '../priority-scheduler/model';

export { ReactSchedulerTask } from './react-scheduler/schedulerMinHeap';

export type ReactSchedulerOptions = PrioritySchedulerOptions<priorityLevel> & CoalescingSchedulingOptions;
