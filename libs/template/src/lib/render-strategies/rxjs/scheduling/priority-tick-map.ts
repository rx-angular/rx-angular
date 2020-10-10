import {
  idleCallbackTick,
  PostTaskSchedulerPriority,
  postTaskTick,
  timeoutTick
} from '../../../experimental/render-strategies/rxjs/scheduling';
import { animationFrameTick } from './animationFrameTick';
import { promiseTick } from './promiseTick';
import { SchedulingPriority } from './interfaces';

export const priorityTickMap = {
  [SchedulingPriority.animationFrame]: animationFrameTick(),
  [SchedulingPriority.Promise]: promiseTick(),
  // @deprecated This is still experimental
  [SchedulingPriority.setInterval]: timeoutTick(),
  // @deprecated This is still experimental
  [SchedulingPriority.idleCallback]: idleCallbackTick(),
  // @deprecated This is still experimental
  [SchedulingPriority.userBlocking]: postTaskTick({
    priority: PostTaskSchedulerPriority.userBlocking
  }),
  // @deprecated This is still experimental
  [SchedulingPriority.userVisible]: postTaskTick({
    priority: PostTaskSchedulerPriority.userVisible
  }),
  // @deprecated This is still experimental
  [SchedulingPriority.background]: postTaskTick({ priority: PostTaskSchedulerPriority.background })
};
