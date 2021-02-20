import {
  StrategyCredentials,
  StrategyCredentialsMap,
} from '../strategy-credentials';
import {
  ReactIdlePriority,
  ReactImmediatePriority,
  ReactLowPriority,
  ReactNoPriority,
  ReactNormalPriority,
  ReactUserBlockingPriority,
  scheduleOnReactQueue,
} from './scheduler';

export function getConcurrentSchedulerStrategyCredentialsMap(): StrategyCredentialsMap {
  return {
    noPriority: createNoPriorityStrategyCredentials(),
    immediate: createImmediateStrategyCredentials(),
    userBlocking: createUserBlockingStrategyCredentials(),
    normal: createNormalStrategyCredentials(),
    low: createLowStrategyCredentials(),
    background: createBackgroundStrategyCredentials(),
  };
}

export function createNoPriorityStrategyCredentials(): StrategyCredentials {
  return {
    name: 'noPriority',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work: any, scope: any) => {
      return (o$) =>
        o$.pipe(
          scheduleOnReactQueue(work, { priority: ReactNoPriority, scope })
        );
    },
  };
}

export function createImmediateStrategyCredentials(): StrategyCredentials {
  return {
    name: 'immediate',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work: any, scope: any) => {
      return (o$) =>
        o$.pipe(
          scheduleOnReactQueue(work, {
            priority: ReactImmediatePriority,
            scope,
          })
        );
    },
  };
}

export function createUserBlockingStrategyCredentials(): StrategyCredentials {
  return {
    name: 'userBlocking',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work: any, scope: any) => {
      return (o$) =>
        o$.pipe(
          scheduleOnReactQueue(work, {
            priority: ReactUserBlockingPriority,
            scope,
          })
        );
    },
  };
}

export function createNormalStrategyCredentials(): StrategyCredentials {
  return {
    name: 'normal',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work: any, scope: any) => {
      return (o$) =>
        o$.pipe(
          scheduleOnReactQueue(work, { priority: ReactNormalPriority, scope })
        );
    },
  };
}

export function createLowStrategyCredentials(): StrategyCredentials {
  return {
    name: 'low',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work: any, scope: any) => {
      return (o$) =>
        o$.pipe(
          scheduleOnReactQueue(work, { priority: ReactLowPriority, scope })
        );
    },
  };
}

export function createBackgroundStrategyCredentials(): StrategyCredentials {
  return {
    name: 'background',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work: any, scope: any) => {
      return (o$) =>
        o$.pipe(
          scheduleOnReactQueue(work, { priority: ReactIdlePriority, scope })
        );
    },
  };
}
