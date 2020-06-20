import { animationFrameScheduler, asyncScheduler, SchedulerLike } from 'rxjs';
import { SchedulingPriority } from './interfaces';
import {
  idleScheduler,
  getPostTaskScheduler,
  unpatchedAsapScheduler
} from '../rxjs/scheduling';
import { PostTaskSchedulerPriority } from '../rxjs/scheduling/getPostTaskScheduler';

export const prioritiesMap: { [name: string]: SchedulerLike } = {
  animationFrame: animationFrameScheduler,
  Promise: unpatchedAsapScheduler,
  setInterval: asyncScheduler,
  idleCallback: idleScheduler,
  userBlocking: getPostTaskScheduler(PostTaskSchedulerPriority.userBlocking),
  userVisible: getPostTaskScheduler(PostTaskSchedulerPriority.userVisible),
  background: getPostTaskScheduler(PostTaskSchedulerPriority.background)
};

export function getScheduler(
  priority: SchedulingPriority = SchedulingPriority.animationFrame
): SchedulerLike {
  if (!prioritiesMap.hasOwnProperty(priority)) {
    throw new Error(`priority ${priority} is not present in prioritiesMap`);
  }
  return prioritiesMap[priority];
}
