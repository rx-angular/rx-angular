import { from } from 'rxjs';
import { staticCoalesce } from './static-coalesce';
import { schedule } from './static-schedule';
import { SchedulingPriority } from '../core/interfaces';

export function coalesceAndSchedule(
  work: () => void,
  priority: SchedulingPriority,
  scope: object = {}
): void {
  const durationSelector = () => from(Promise.resolve());
  staticCoalesce(() => schedule(work, priority), durationSelector, scope);
}
