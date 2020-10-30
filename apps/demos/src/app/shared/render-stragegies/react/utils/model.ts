import { PriorityLevel } from './react-source-code/schedulerPriorities';

export interface ReactSchedulerWorkDefinition {
  work: () => void;
  priority: PriorityLevel;
  scope: any;
}
