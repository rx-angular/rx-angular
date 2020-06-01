import { Subscribable } from 'rxjs';
import { CoalesceConfig } from './operator/coalesceWith';
import { createCoalesceManager } from '../core/coalescing/coalescing-context-properties-map';

export function schedule(
  durationSelector: Subscribable<any>,
  config: CoalesceConfig,
  callback: () => void
): void {
  const _scope = config.scope || {};
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
