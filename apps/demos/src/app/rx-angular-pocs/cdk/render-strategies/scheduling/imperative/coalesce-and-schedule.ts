import { from } from 'rxjs';
import { priorityNames } from '../../../render-strategies/model/priority';
import { getResolvedPromise } from '../../zone-agnostic/get-resolved-promise';
import { coalesce } from './coalesce';
import { schedule } from './schedule';

export function coalesceAndSchedule(
  work: () => void,
  priority: false | priorityNames,
  scope: object = {},
  abC: AbortController = new AbortController()
): AbortController {
  const durationSelector = from(getResolvedPromise());
  const scheduledWork = () => schedule(work, priority, abC);

  const coalesceAbC = coalesce(
    scheduledWork,
    durationSelector,
    scope,
    abC
  );

  const abortHandler = function() {
    coalesceAbC.abort();
    abC.signal.removeEventListener('abort', abortHandler, false);
  };
  abC.signal.addEventListener('abort', abortHandler, false);

  return abC;
}
