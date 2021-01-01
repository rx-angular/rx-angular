import { AsyncAction } from './AsyncAction';
import { AsyncScheduler } from 'rxjs/internal/scheduler/AsyncScheduler';

export const async = new AsyncScheduler(AsyncAction);
