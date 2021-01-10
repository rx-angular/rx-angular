import { AsyncAction } from './AsyncAction';
import { AsyncScheduler } from 'rxjs/internal/scheduler/AsyncScheduler';

export const asyncScheduler = new AsyncScheduler(AsyncAction);
