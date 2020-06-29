import { from } from 'rxjs';
import { staticCoalesce } from './static-coalesce';
import { staticSchedule } from './static-schedule';
import { SchedulingPriority } from '../rxjs/scheduling/interfaces';
import { getUnpatchedResolvedPromise } from '../../core/utils/unpatched-promise';

export function coalesceAndSchedule(
  work: () => void,
  priority: SchedulingPriority,
  scope: object = {}
): void {
  const durationSelector = from(getUnpatchedResolvedPromise());
  const scheduledWork = () => staticSchedule(work, priority);
  staticCoalesce(scheduledWork, durationSelector, scope);
}
