import {
  animationFrameScheduler,
  asapScheduler,
  asyncScheduler,
  Observable,
  SchedulerLike
} from 'rxjs';
import { SchedulingPriority } from './interfaces';
import { getPostTaskScheduler } from './getPostTaskScheduler';
import { idleScheduler } from './idleCallbackScheduler';
import { PostTaskSchedulerPriority } from './postTask';
import { animationFrameTick } from './animationFrameTick';
import { promiseTick } from './promiseTick';
import { intervalTick } from './intervalTick';
import { idleCallbackTick } from './idleCallbackTick';
import { postTaskTick } from './postTaskTick';

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

export const priorityTickMap: { [name: string]: Observable<any> } = {
  animationFrame: animationFrameTick(),
  Promise: promiseTick(),
  setInterval: intervalTick(),
  idleCallback: idleCallbackTick(),
  userBlocking: postTaskTick({
    priority: PostTaskSchedulerPriority.userBlocking
  }),
  userVisible: postTaskTick({
    priority: PostTaskSchedulerPriority.userVisible
  }),
  background: postTaskTick({ priority: PostTaskSchedulerPriority.background })
};
