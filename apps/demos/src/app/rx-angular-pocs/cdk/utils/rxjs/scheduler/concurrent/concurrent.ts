import { ConcurrentAction } from './ConcurrentAction';
import { ConcurrentScheduler } from './ConcurrentScheduler';
import { priorityLevel } from '../../../../render-strategies/model';

export const concurrent = (priority?: priorityLevel) =>
  new ConcurrentScheduler(ConcurrentAction, { priority, context: {}, delay: 0 });
