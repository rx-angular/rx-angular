import { fromEvent, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export function afterCoalesceAndSchedule<T>(work: () => void, afterCD?: () => T) {
  work();
  if (afterCD) {
    afterCD();
  }
}

export function afterScheduleCD<R>(
  tick: () => Observable<number>
) {
  let activeAbortController: AbortController;
  return function(afterCD?: () => R) {
    if (activeAbortController) {
      activeAbortController.abort();
    }
    activeAbortController = new AbortController();
    if (afterCD) {
      tick()
        .pipe(takeUntil(fromEvent(activeAbortController.signal, 'abort')))
        .subscribe(() => {
          afterCD();
        });
    }
    return activeAbortController;
  };
}
