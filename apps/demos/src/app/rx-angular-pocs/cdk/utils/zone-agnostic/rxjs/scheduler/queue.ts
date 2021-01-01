import { QueueAction } from './QueueAction';
import { QueueScheduler } from 'rxjs/internal/scheduler/QueueScheduler';

export const queue = new QueueScheduler(QueueAction);
