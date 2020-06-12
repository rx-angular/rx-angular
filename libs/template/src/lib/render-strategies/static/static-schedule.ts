import {
  animationFrameScheduler,
  of,
  scheduled,
  SchedulerLike,
  Subscription
} from 'rxjs';
import { prioritiesMap } from '../core/priorities-map';
import { SchedulingPriority } from '../core/interfaces';

export function schedule(
  work: () => void,
  priority?: SchedulingPriority
): Subscription {
  return getScheduler(priority).schedule(() => work());
}

function getScheduler(priority?: SchedulingPriority): SchedulerLike {
  return prioritiesMap[priority] || animationFrameScheduler;
}
