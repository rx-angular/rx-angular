import { PriorityLevel } from './react-source-code/schedulerPriorities';

export interface ReactSchedulerWorkDefinition {
  work: () => void;
  priority: PriorityLevel;
  scope: any;
}

export type ReactCallBackCredentials = [ReactPriorityLevel, () => void, any?]

export enum ReactPriorityLevel {
  NoPriority = 0,
  ImmediatePriority = 1,
  UserBlockingPriority = 2,
  NormalPriority = 3,
  LowPriority = 4,
  IdlePriority = 5
}
