import {
  animationFrameScheduler,
  asapScheduler,
  asyncScheduler,
  SchedulerLike
} from 'rxjs';

export const prioritiesMap: { [name: string]: SchedulerLike } = {
  animationFrame: animationFrameScheduler,
  Promise: asapScheduler,
  setInterval: asyncScheduler
  // 'idleCallback': 'idleCallback',
  //  'user-blocking': 'user-blocking',
  // 'user-visible': 'user-visible',
  // 'background': 'background'
};
