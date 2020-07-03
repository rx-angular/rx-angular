import { priorityTickMap } from '../rxjs/scheduling/priority-tick-map';
import { SchedulingPriority } from '../rxjs/scheduling/interfaces';

export function staticSchedule(
  work: () => void,
  priority: false | SchedulingPriority
): AbortController {
  const abortController = new AbortController();
  if (priority === false) {
    if (!abortController.signal.aborted) {
      work();
    }
    return abortController;
  }
  priorityTickMap[priority].subscribe(
    () => {
      if (!abortController.signal.aborted) {
        work();
      }
    },
    error => {
      console.error(error);
    }
  );
  return abortController;
}
