import { NgZone } from '@angular/core';
import {
  cancelCallback,
  scheduleCallback,
  PriorityLevel,
} from '@rx-angular/cdk/internals/scheduler';
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

const defaultStrategy: keyof StrategiesPriorityRecord = 'normal';

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
  options?: {
    strategy?: keyof StrategiesPriorityRecord;
    delay?: number;
    ngZone?: NgZone;
  }
) => {
  const task = scheduleCallback(
    strategiesPrio[options?.strategy || defaultStrategy],
    () => work(),
    {
      delay: options?.delay,
      ngZone: options?.ngZone,
    }
  );
  return () => {
    cancelCallback(task);
  };
};
