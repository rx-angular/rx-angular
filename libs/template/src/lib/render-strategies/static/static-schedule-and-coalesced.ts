import { from } from 'rxjs';
import { staticCoalesce } from './static-coalesce';
import { staticSchedule } from './static-schedule';
import { SchedulingPriority } from '../rxjs/scheduling';
import { getUnpatchedResolvedPromise } from '../../core/utils';

export function coalesceAndSchedule(
  work: () => void,
  priority: false | SchedulingPriority,
  scope: object = {},
  abC: AbortController = new AbortController()
): AbortController {
  const durationSelector = from(getUnpatchedResolvedPromise());
  const scheduledWork = () => staticSchedule(work, priority, abC);

  const coalesceAbC = staticCoalesce(
    scheduledWork,
    durationSelector,
    scope,
    abC
  );

  const abortHandler = function () {
    coalesceAbC.abort();
    abC.signal.removeEventListener('abort', abortHandler, false);
  };
  abC.signal.addEventListener('abort', abortHandler, false);

  return abC;
}
