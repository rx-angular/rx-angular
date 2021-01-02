import { PriorityAction } from '../priority/PriorityAction';
import { priorityLevel } from '../../../../render-strategies/model';
import { ReactSchedulerTask } from '../../../scheduling/concurrent-scheduler/react-source-code/schedulerMinHeap';

export class ConcurrentAction<S> extends PriorityAction<S, priorityLevel, ReactSchedulerTask> {

}
