import { Subscription } from 'rxjs';
import { getScheduler } from '../rxjs/scheduling/priority-scheduler-map';
import { SchedulingPriority } from '../rxjs/scheduling/interfaces';

export function schedule(
  work: () => void,
  priority?: SchedulingPriority
): Subscription {
  return getScheduler(priority).schedule(() => work());
}
