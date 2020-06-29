import { getScheduler } from '../rxjs/scheduling/priority-scheduler-map';
import { SchedulingPriority } from '../rxjs/scheduling/interfaces';

export function staticSchedule(
  work: () => void,
  priority: false | SchedulingPriority,
  afterScheduling?: () => void
): AbortController {
  const abortController = new AbortController();
  if (priority === false) {
    if (!abortController.signal.aborted) {
      work();
      afterScheduling();
    }
    return abortController;
  }
  getScheduler(priority).schedule(() => {
    if (!abortController.signal.aborted) {
      work();
      afterScheduling();
    }
  });
  return abortController;
}
