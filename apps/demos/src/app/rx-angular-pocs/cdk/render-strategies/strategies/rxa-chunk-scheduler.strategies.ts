import { StrategyCredentials, StrategyCredentialsMap } from '../model';
import {
  GlobalTaskPriority,
  scheduleOnRxaQueue,
} from '../scheduling/scheduler/rxa-chunked-scheduler';

export function getChunkStrategyCredentialsMap(): StrategyCredentialsMap {
  return {
    chunk: createRenderQueueStrategyCredentials(),
    blocking: createBlockingStrategyCredentials(),
  };
}

export function createRenderQueueStrategyCredentials(): StrategyCredentials {
  return {
    name: 'chunk',
    work: (cdRef) => {
      cdRef.reattach();
      cdRef.detectChanges();
    },
    behavior: (work: () => void, scope: any) => (o$) =>
      o$.pipe(
        /*observeOnPriority(rxaScheduler(GlobalTaskPriority.blocking, scope)),
        tap(work)*/
        scheduleOnRxaQueue(work, {
          priority: GlobalTaskPriority.chunk,
          scope,
        })
      ),
  };
}

export function createBlockingStrategyCredentials(): StrategyCredentials {
  return {
    name: 'blocking',
    work: (cdRef) => {
      cdRef.reattach();
      cdRef.detectChanges();
    },
    behavior: (work: () => void, scope: any) => (o$) =>
      o$.pipe(
        scheduleOnRxaQueue(work, {
          priority: GlobalTaskPriority.blocking,
          scope,
        })
      ),
  };
}
