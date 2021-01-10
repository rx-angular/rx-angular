import { RxaAction } from './RxaAction';
import { RxaScheduler } from './RxaScheduler';
import { GlobalTaskPriority } from './model';

export const rxaScheduler = (priority: GlobalTaskPriority, scope: any) =>
  new RxaScheduler(RxaAction, { priority, scope, delay: 0 });
