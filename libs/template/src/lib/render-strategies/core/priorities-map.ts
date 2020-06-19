import { animationFrameScheduler, asyncScheduler, SchedulerLike } from 'rxjs';
import { SchedulingPriority } from './interfaces';
import {
  idleScheduler,
  postTaskScheduler,
  unpatchedAsapScheduler
} from '../rxjs/scheduling';
import { PostTaskSchedulerPriority } from '../rxjs/scheduling/postTaskScheduler';

export const prioritiesMap: { [name: string]: SchedulerLike } = {
  animationFrame: animationFrameScheduler,
  Promise: unpatchedAsapScheduler,
  setInterval: asyncScheduler,
  idleCallback: idleScheduler,
  userBlocking: postTaskScheduler(PostTaskSchedulerPriority.userBlocking),
  userVisible: postTaskScheduler(PostTaskSchedulerPriority.userVisible),
  background: postTaskScheduler(PostTaskSchedulerPriority.background)
};

export function getScheduler(
  priority: SchedulingPriority = SchedulingPriority.animationFrame
): SchedulerLike {
  if (!prioritiesMap.hasOwnProperty(priority)) {
    throw new Error(`priority ${priority} is not present in prioritiesMap`);
  }
  return prioritiesMap[priority];
}
