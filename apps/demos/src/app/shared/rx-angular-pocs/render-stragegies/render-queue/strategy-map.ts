import { StrategyCredentials, StrategyCredentialsMap } from '../model';
import { scheduleOnGlobalTick } from './utils/globalAnimationFrameTick';


export function getChunkStrategyCredentialsMap(): StrategyCredentialsMap {
  return {
    chunk: createRenderQueueStrategyCredentials()
  };
}

export function createRenderQueueStrategyCredentials(): StrategyCredentials {
  return {
    name: 'chunk',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work: () => void, context: any) => o$ => o$.pipe(
      scheduleOnGlobalTick({
        priority: 0,
        work: work,
        scope: context
      })
    )
  };
}
