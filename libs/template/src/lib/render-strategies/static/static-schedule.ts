import { priorityTickMap } from '../rxjs/scheduling/priority-tick-map';
import { SchedulingPriority } from '../rxjs/scheduling/interfaces';

export function staticSchedule(
  work: () => void,
  priority: false | SchedulingPriority,
  abC: AbortController = new AbortController()
): AbortController {
  // immediately execute work
  if (priority === false) {
    tryExecuteWork();
    return abC;
  }

  // schedule work
  const sub = priorityTickMap[priority].subscribe(
    {
     // on complete abort further executions
     complete: () => abC.abort(),
     next: () => tryExecuteWork()
    }
  );
  const abortHandler = function () {
    sub.unsubscribe();
    abC.signal.removeEventListener('abort', abortHandler, false);
  };
  abC.signal.addEventListener('abort', abortHandler, false);

  return abC;

  // execute work and abort further executions
  function tryExecuteWork() {
    if (!abC.signal.aborted) {
      work();
      abC.abort();
    }
  }
}
