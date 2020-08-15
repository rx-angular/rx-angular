import { Observable } from 'rxjs';
import { PostTaskSchedulerPriority } from '../../../experimental/render-strategies/rxjs/scheduling/postTask';
import { timeoutTick } from '../../../experimental/render-strategies/rxjs/scheduling/timeoutTick';
import { idleCallbackTick } from '../../../experimental/render-strategies/rxjs/scheduling/idleCallbackTick';
import { postTaskTick } from '../../../experimental/render-strategies/rxjs/scheduling/postTaskTick';
import { animationFrameTick } from './animationFrameTick';
import { promiseTick } from './promiseTick';

export const priorityTickMap: { [name: string]: Observable<number> } = {
  animationFrame: animationFrameTick(),
  Promise: promiseTick(),
  // @deprecated This is still experimental
  setInterval: timeoutTick(),
  // @deprecated This is still experimental
  idleCallback: idleCallbackTick(),
  // @deprecated This is still experimental
  userBlocking: postTaskTick({
    priority: PostTaskSchedulerPriority.userBlocking,
  }),
  // @deprecated This is still experimental
  userVisible: postTaskTick({
    priority: PostTaskSchedulerPriority.userVisible,
  }),
  // @deprecated This is still experimental
  background: postTaskTick({ priority: PostTaskSchedulerPriority.background }),
};
