import { StrategyCredentials, StrategyCredentialsMap } from '../model';
import { scheduleOnGlobalTick } from './utils/globalAnimationFrameTick';
import { coalesceWith, priorityTickMap, SchedulingPriority } from '@rx-angular/template';


export function getChunkStrategyCredentialsMap(): StrategyCredentialsMap {
  return {
    chunk: createRenderQueueStrategyCredentials()
  };
}

export function createRenderQueueStrategyCredentials(): StrategyCredentials {
  return {
    name: 'chunk',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work: () => void, scope: any) => o$ => o$.pipe(
      coalesceWith(priorityTickMap[SchedulingPriority.Promise], scope),
      scheduleOnGlobalTick({
        priority: 0,
        work: work,
        scope
      })
    )
  };
}
