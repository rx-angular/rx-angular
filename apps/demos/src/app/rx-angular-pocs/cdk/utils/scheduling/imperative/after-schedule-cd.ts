import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fromEvent } from '../../zone-agnostic/rxjs/operators';

/**
 *
 * convenience method to prevent duplicated code.
 * helper for strategies where we have no direct control over the rendering and thus no information about when
 * rendering was finished. used in native & global strategy
 *
 * @internal
 */
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
