import { scheduleLikeReact } from '../../utils/scheduling/concurrent-scheduler/react-scheduler';
import { PriorityNameToLevel } from '../../render-strategies/model/priority';
import { StrategyCredentials, StrategyCredentialsMap } from '../../render-strategies/model/strategy-credentials';

/**
 * Strategies
 *
 * - ɵDC - `ɵdetectChanges`
 * - C - `Component`
 * - iC - `idleCallback`
 *
 * | Name                       | ZoneLess | Render Method | ScopedCoalescing | Scheduling | Chunked |
 * |--------------------------- | ---------| --------------| ---------------- | ---------- |-------- |
 * | `idleCallback`             | ✔        | ɵDC           | C + Pr          | iC         | ❌       |
 *
 */

export function getConcurrentSchedulerStrategyCredentialsMap(): StrategyCredentialsMap {
  return {
    background: createReactIdleStrategyCredentials(),
    low: createReactLowStrategyCredentials(),
    normal: createReactNormalStrategyCredentials(),
    userBlocking: createReactUserBlockingStrategyCredentials(),
    immediate: createReactImmediateStrategyCredentials(),
    noPriority: createReactNoPriorityStrategyCredentials(),
  };
}

export function createReactNoPriorityStrategyCredentials(): StrategyCredentials {
  return {
    name: 'noPriority',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work: any, context: any) => {
      return o$ => o$.pipe(
        scheduleLikeReact(PriorityNameToLevel.noPriority, work, context)
      );
    }
  };
}

export function createReactImmediateStrategyCredentials(): StrategyCredentials {
  return {
    name: 'immediate',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work: any, context: any) => {
      return o$ => o$.pipe(
        scheduleLikeReact(PriorityNameToLevel.immediate, work, context)
      );
    }
  };
}

export function createReactUserBlockingStrategyCredentials(): StrategyCredentials {
  return {
    name: 'userBlocking',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work: any, context: any) => {
      return o$ => o$.pipe(
        scheduleLikeReact(PriorityNameToLevel.userBlocking, work, context)
      );
    }
  };
}

export function createReactNormalStrategyCredentials(): StrategyCredentials {
  return {
    name: 'normal',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work: any, context: any) => {
      return o$ => o$.pipe(
        scheduleLikeReact(PriorityNameToLevel.normal, work, context)
      );
    }
  };
}

export function createReactLowStrategyCredentials(): StrategyCredentials {
  return {
    name: 'low',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work: any, context: any) => {
      return o$ => o$.pipe(
        scheduleLikeReact(PriorityNameToLevel.low, work, context)
      );
    }
  };
}

export function createReactIdleStrategyCredentials(): StrategyCredentials {
  return {
    name: 'idle',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work: any, context: any) => {
      return o$ => o$.pipe(
        scheduleLikeReact(PriorityNameToLevel.background, work, context)
      );
    }
  };
}
