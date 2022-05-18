import {
  cancelCallback,
  scheduleCallback,
} from '../../../internals/scheduler/src/lib/scheduler';
import { SchedulerTaskZone } from '../../../internals/scheduler/src/lib/schedulerMinHeap';
import { PriorityLevel } from '../../../internals/scheduler/src/lib/schedulerPriorities';
import { RxConcurrentStrategyNames } from './model';

type StrategiesPriorityRecord = Record<
  RxConcurrentStrategyNames,
  PriorityLevel
>;

const strategiesPrio: StrategiesPriorityRecord = {
  immediate: PriorityLevel.ImmediatePriority,
  userBlocking: PriorityLevel.UserBlockingPriority,
  normal: PriorityLevel.NormalPriority,
  low: PriorityLevel.LowPriority,
  idle: PriorityLevel.IdlePriority,
};

/**
 * @description
 * This function is used to schedule a task with a certain priority.
 * It is useful for tasks that can be done asynchronously.
 *
 * ```ts
 * const task = rxScheduleTask(() => localStorage.setItem(state, JSON.stringify(state));
 * ```
 */
export const rxScheduleTask = (
  work: (...args: any[]) => void,
  strategy: keyof StrategiesPriorityRecord = 'normal',
  options?: {
    delay?: number;
    ngZone?: SchedulerTaskZone;
  }
) => {
  const task = scheduleCallback(
    strategiesPrio[strategy],
    () => work(),
    options
  );
  return () => {
    cancelCallback(task);
  };
};
