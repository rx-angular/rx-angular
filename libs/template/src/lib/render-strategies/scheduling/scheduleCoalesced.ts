import { Subscription } from 'rxjs';
import { createCoalesceManager } from '../../core/render-aware';

export function scheduleCoalesced(
  work: () => void,
  // We want to provide a way to stop (unsubscribe) from a scheduled event
  schedule: (work: () => void) => Subscription,
  scope: object = {}
): void {
  const coalescingManager = createCoalesceManager(scope);
  const renderWorkCoalesced = () => {
    coalescingManager.remove();
    if (!coalescingManager.isCoalescing()) {
      work();
    }
  };
  if (!coalescingManager.isCoalescing()) {
    schedule(renderWorkCoalesced);
    coalescingManager.add();
  }
}
