import { Subscription } from 'rxjs';
import { getScheduler } from '../core/priorities-map';
import { SchedulingPriority } from '../core/interfaces';

export function schedule(
  work: () => void,
  priority?: SchedulingPriority
): Subscription {
  return getScheduler(priority).schedule(() => work());
}
