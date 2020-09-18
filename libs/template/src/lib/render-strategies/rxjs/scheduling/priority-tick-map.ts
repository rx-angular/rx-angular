import { Observable } from 'rxjs';
import { PostTaskSchedulerPriority } from '../../../experimental/render-strategies/rxjs/scheduling/postTask.experimental';
import { timeoutTick } from '../../../experimental/render-strategies/rxjs/scheduling/timeoutTick.experimental';
import { idleCallbackTick } from '../../../experimental/render-strategies/rxjs/scheduling/idleCallbackTick.experimental';
import { postTaskTick } from '../../../experimental/render-strategies/rxjs/scheduling/postTaskTick.experimental';
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
