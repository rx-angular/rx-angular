import { Observable } from 'rxjs';
import { PostTaskSchedulerPriority } from './postTask';
import { animationFrameTick } from './animationFrameTick';
import { promiseTick } from './promiseTick';
import { timeoutTick } from './timeoutTick';
import { idleCallbackTick } from '../../../experimental/render-strategies/rxjs/scheduling/idleCallbackTick';
import { postTaskTick } from '../../../experimental/render-strategies/rxjs/scheduling/postTaskTick';

export const priorityTickMap: { [name: string]: Observable<number> } = {
  animationFrame: animationFrameTick(),
  Promise: promiseTick(),
  setInterval: timeoutTick(),
  idleCallback: idleCallbackTick(),
  userBlocking: postTaskTick({
    priority: PostTaskSchedulerPriority.userBlocking,
  }),
  userVisible: postTaskTick({
    priority: PostTaskSchedulerPriority.userVisible,
  }),
  background: postTaskTick({ priority: PostTaskSchedulerPriority.background }),
};
