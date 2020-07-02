import { Subscription } from 'rxjs';
import { getScheduler } from '../rxjs/scheduling/priority-scheduler-map';
import { SchedulingPriority } from '../rxjs/scheduling/interfaces';

export function schedule(
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
  // push work to global work queue
  // check if already scheduling on global scope
  // if not -> start observing tick and mark global scope as scheduling
  // if yes -> do nothing
  // addToQueue(work: () => void): Subscription
  getScheduler(priority).schedule(() => {
    if (!abortController.signal.aborted) {
      work();
      afterScheduling();
    }
  });
  return abortController;
}
