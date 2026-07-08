import {
  intervalTick,
  timeoutTick,
} from '../../../../../rx-angular-pocs/cdk/utils/rxjs/observable';
import { animationFrameTick } from './animationFrameTick';
import { SchedulingPriority } from './interfaces';
import { promiseTick } from './promiseTick';

export const priorityTickMap = {
  [SchedulingPriority.animationFrame]: animationFrameTick(),
  [SchedulingPriority.Promise]: promiseTick(),
  [SchedulingPriority.setInterval]: intervalTick(),
  [SchedulingPriority.setTimeout]: timeoutTick(),
};
