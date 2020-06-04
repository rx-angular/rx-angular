import { SchedulerLike, Subscribable } from 'rxjs';
import { createCoalesceManager } from '../../core/render-aware';

export function schedule(
  work: () => void,
  // We want to provide a way to stop (unsubscribe) from a scheduled event
  scheduler: SchedulerLike,
  scope: object = {}
): void {
  const coalescingManager = createCoalesceManager(scope);

  if (!coalescingManager.isCoalescing()) {
    scheduler.schedule(() => {
      coalescingManager.remove();
      if (!coalescingManager.isCoalescing()) {
        work();
      }
    });
    coalescingManager.add();
  }
}
