import { priorityLevel } from '../../../model';
import { CoalescingSchedulingOptions, PrioritySchedulerOptions } from '../priority-scheduler/model';

export { ReactSchedulerTask } from './react-scheduler/schedulerMinHeap';
export {
  ImmediatePriority as ReactImmediatePriority,
  LowPriority as ReactLowPriority,
  NoPriority as ReactNoPriority,
  NormalPriority as ReactNormalPriority,
  UserBlockingPriority as ReactUserBlockingPriority,
  IdlePriority as ReactIdlePriority
} from './react-scheduler/schedulerPriorities';

export type ReactSchedulerOptions = PrioritySchedulerOptions<priorityLevel> & CoalescingSchedulingOptions;
