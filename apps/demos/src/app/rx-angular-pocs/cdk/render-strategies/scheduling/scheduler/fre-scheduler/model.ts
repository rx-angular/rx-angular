import { priorityLevel } from '../../../model/priority';
import {
  CoalescingSchedulingOptions,
  PrioritySchedulingOptions,
} from '../priority-scheduler/model';

export type ITaskCallback = ((time: boolean) => boolean) | null;

export interface ITask {
  callback?: ITaskCallback;
  time: number;
}

export interface FreSchedulerOptions
  extends CoalescingSchedulingOptions,
    PrioritySchedulingOptions<number> {
  noop?: any;
}

export type FreCallBackCredentials = [priorityLevel, () => any, any?];
