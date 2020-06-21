import { asyncScheduler, SchedulerLike } from 'rxjs';
import { SchedulingPriority } from './interfaces';
import {
  getPostTaskScheduler,
  PostTaskSchedulerPriority
} from './getPostTaskScheduler';
import { unpatchedAnimationFrameScheduler } from './animationFrameScheduler';
import { unpatchedAsapScheduler } from './asapScheduler';
import { idleScheduler } from './idleCallbackScheduler';

export const prioritySchedulerMap: { [name: string]: SchedulerLike } = {
  animationFrame: unpatchedAnimationFrameScheduler,
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
  if (!prioritySchedulerMap.hasOwnProperty(priority)) {
    throw new Error(`priority ${priority} is not present in prioritiesMap`);
  }
  return prioritySchedulerMap[priority];
}
