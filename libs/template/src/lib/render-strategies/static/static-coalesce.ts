import { Observable, Subscription } from 'rxjs';
import { coalescingManager } from '../../core/utils';


export function staticCoalesce<T>(
  work: () => T,
  durationSelector: Observable<any>,
  scope: object = {},
  abC: AbortController = new AbortController()
): AbortController {
  let sub: Subscription;

  if (!coalescingManager.isCoalescing(scope)) {
    coalescingManager.add(scope);
    sub = durationSelector.subscribe(() => {
      tryExecuteWork();
    });
    const abortHandler = function () {
      sub.unsubscribe();
      abC.signal.removeEventListener('abort', abortHandler, false);
    };
    abC.signal.addEventListener('abort', abortHandler, false);
  }

  return abC;

  // =====

  function tryExecuteWork(): T | void {
    coalescingManager.remove(scope);
    if (!coalescingManager.isCoalescing(scope)) {
      return work();
    } else {
      return void 0;
    }
  }
}
