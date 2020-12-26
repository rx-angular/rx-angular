
import { fromEvent, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export const toRxErrorNotification = (error) => ({kind: 'rxError', hasValue: true, error});
export const toRxSuspenseNotification = (value) => ({kind: 'rxSuspense', hasValue: true, value});
export const toRxCompleteNotification = () => ({kind: 'rxComplete', hasValue: false, complete: true});



/**
 *
 * convenience method to prevent duplicated code. used in strategies after static coalescing
 *
 * @internal
 */
export function afterCoalesceAndSchedule<T>(work: () => void, afterCD?: () => T) {
    work();
    if (afterCD) {
        afterCD();
    }
}

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
