import { priorityLevel } from '../../../render-strategies/model';

export interface ReactSchedulerWorkDefinition {
  work: () => void;
  priority: priorityLevel;
  scope: any;
}

export type ReactCallBackCredentials = [priorityLevel, () => any, any?]

