
import { priorityLevel } from '../../../../render-strategies/model';
import { ReactSchedulerTask } from './model';
import { PriorityAction } from '../priority-scheduler';

export class ConcurrentAction<S> extends PriorityAction<S, priorityLevel, ReactSchedulerTask> {

}
