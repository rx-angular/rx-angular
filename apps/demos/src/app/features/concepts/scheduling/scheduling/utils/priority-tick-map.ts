import { animationFrameTick } from './animationFrameTick';
import { promiseTick } from './promiseTick';
import { SchedulingPriority } from './interfaces';
import { intervalTick, timeoutTick } from '../../../../../rx-angular-pocs/cdk/utils/rxjs/observable';

export const priorityTickMap = {
  [SchedulingPriority.animationFrame]: animationFrameTick(),
  [SchedulingPriority.Promise]: promiseTick(),
  [SchedulingPriority.setInterval]: intervalTick(),
  [SchedulingPriority.setTimeout]: timeoutTick(),
};
