import { intervalTick, timeoutTick } from '../../../experimental/render-strategies/rxjs/scheduling';
import { animationFrameTick } from './animationFrameTick';
import { promiseTick } from './promiseTick';
import { SchedulingPriority } from './interfaces';

export const priorityTickMap = {
  [SchedulingPriority.animationFrame]: animationFrameTick(),
  [SchedulingPriority.Promise]: promiseTick(),
  [SchedulingPriority.setInterval]: intervalTick(),
  [SchedulingPriority.setTimeout]: timeoutTick(),
};
