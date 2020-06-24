import {
  animationFrameScheduler,
  asapScheduler,
  asyncScheduler,
  SchedulerLike
} from 'rxjs';
import { SchedulingPriority } from './interfaces';
import {
  getPostTaskScheduler,
  PostTaskSchedulerPriority
} from './getPostTaskScheduler';
import { idleScheduler } from './idleCallbackScheduler';

export const prioritySchedulerMap: { [name: string]: SchedulerLike } = {
  animationFrame: animationFrameScheduler,
  Promise: asapScheduler,
  setInterval: asyncScheduler,
  idleCallback: idleScheduler,
  userBlocking: getPostTaskScheduler(PostTaskSchedulerPriority.userBlocking),
  userVisible: getPostTaskScheduler(PostTaskSchedulerPriority.userVisible),
  background: getPostTaskScheduler(PostTaskSchedulerPriority.background)
};

export function getScheduler(priority: SchedulingPriority): SchedulerLike {
  if (!prioritySchedulerMap.hasOwnProperty(priority)) {
    throw new Error(`priority ${priority} is not present in prioritiesMap`);
  }
  return prioritySchedulerMap[priority];
}
