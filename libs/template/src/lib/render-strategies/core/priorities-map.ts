import {
  animationFrameScheduler,
  asapScheduler,
  asyncScheduler,
  SchedulerLike
} from 'rxjs';
import { SchedulingPriority } from './interfaces';

export const prioritiesMap: { [name: string]: SchedulerLike } = {
  animationFrame: animationFrameScheduler,
  Promise: asapScheduler,
  setInterval: asyncScheduler
  // 'idleCallback': 'idleCallback',
  //  'user-blocking': 'user-blocking',
  // 'user-visible': 'user-visible',
  // 'background': 'background'
};

export function getScheduler(
  priority: SchedulingPriority = SchedulingPriority.animationFrame
): SchedulerLike {
  return prioritiesMap[priority];
}
