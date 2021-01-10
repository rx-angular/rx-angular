import { StrategyCredentials, StrategyCredentialsMap } from '../model';
import { scheduleOnFreQueue } from '../scheduling/scheduler/fre-scheduler/scheduleOnFreQueue';


export function getFreStrategyCredentialsMap(): StrategyCredentialsMap {
  return {
    freNormal: createRenderFreNormalCredentials(),
    freIdle: createFreIdleStrategyCredentials(),
  };
}

export function createRenderFreNormalCredentials(): StrategyCredentials {
  return {
    name: 'freNormal',
    work: (cdRef) => {
      cdRef.reattach();
      cdRef.detectChanges();
    },
    behavior: (work: () => void, scope: any) => (o$) =>
      o$.pipe(
        scheduleOnFreQueue(work, { scope, priority: 2})
      ),
  };
}

export function createFreIdleStrategyCredentials(): StrategyCredentials {
  return {
    name: 'freIdle',
    work: (cdRef) => {
      cdRef.reattach();
      cdRef.detectChanges();
    },
    behavior: (work: () => void, scope: any) => (o$) =>
      o$.pipe(
        scheduleOnFreQueue(work, { scope, priority: 1337})
      ),
  };
}
