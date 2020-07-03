import { Observable } from 'rxjs';
import { createCoalesceManager } from '../../core/render-aware/coalescing-manager';

export function staticCoalesce<T>(
  work: () => T,
  durationSelector: Observable<any>,
  scope: object = {}
): AbortController {
  const coalescingManager = createCoalesceManager(scope);
  if (!coalescingManager.isCoalescing()) {
    coalescingManager.add();
    durationSelector.subscribe(() => {
      tryExecuteWork();
    });
  }

  // @TODO
  return new AbortController();

  // =====

  function tryExecuteWork() {
    coalescingManager.remove();
    if (!coalescingManager.isCoalescing()) {
      return work();
    }
  }
}
