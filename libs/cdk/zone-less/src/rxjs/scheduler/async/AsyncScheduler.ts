import { AsyncAction } from './AsyncAction';
import { Scheduler } from '../Scheduler';

export interface AsyncScheduler extends Scheduler {
  actions: AsyncAction<any>[];
  active: boolean;
  scheduled: any;
  flush(action: AsyncAction<any>): void;
}
