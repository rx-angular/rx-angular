import { Subscribable } from 'rxjs';
import { createCoalesceManager } from '../../core/render-aware';

export function staticCoalesce<T>(
  work: () => T,
  durationSelector: () => Subscribable<any>,
  scope: object = {}
): void {
  const coalescingManager = createCoalesceManager(scope);
  if (!coalescingManager.isCoalescing()) {
    coalescingManager.add();
    durationSelector().subscribe(() => {
      tryExecuteWork();
    });
  }

  // =====

  function tryExecuteWork() {
    coalescingManager.remove();
    if (!coalescingManager.isCoalescing()) {
      return work();
    }
  }
}
