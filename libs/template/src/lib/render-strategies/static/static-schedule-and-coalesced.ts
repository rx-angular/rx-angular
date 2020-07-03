import { from } from 'rxjs';
import { staticCoalesce } from './static-coalesce';
import { staticSchedule } from './static-schedule';
import { SchedulingPriority } from '../rxjs/scheduling/interfaces';
import { getUnpatchedResolvedPromise } from '../../core/utils/unpatched-resolved-promise';

export function coalesceAndSchedule(
  work: () => void,
  priority: SchedulingPriority,
  scope: object = {}
): AbortController {
  const durationSelector = from(getUnpatchedResolvedPromise());
  const scheduledWork = () => staticSchedule(work, priority);
  staticCoalesce(scheduledWork, durationSelector, scope);
  // @TODO
  return new AbortController();
}
