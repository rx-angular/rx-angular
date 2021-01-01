import { ConcurrentAction } from './ConcurrentAction';
import { ConcurrentScheduler } from './ConcurrentScheduler';

export const concurrent = new ConcurrentScheduler(ConcurrentAction);
