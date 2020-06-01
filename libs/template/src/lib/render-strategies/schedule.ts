import { Subscribable } from 'rxjs';
import { createCoalesceManager } from '../core/render-aware';

export function schedule(
  durationSelector: Subscribable<any>,
  scope: object,
  callback: () => void
): void {
  const _scope = scope || {};
  const coa = createCoalesceManager(_scope);

  if (!coa.isCoalescing()) {
    durationSelector.subscribe(() => {
      coa.remove();
      if (!coa.isCoalescing()) {
        callback();
      }
    });
    coa.add();
  }
}
