import { StrategyCredentials, StrategyCredentialsMap } from '../model';
import { scheduleLikeReact } from './utils/react-scheduler';
import { ReactPriorityLevel } from './utils/model';

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

export function getReactStrategyCredentialsMap(): StrategyCredentialsMap {
  return {
    reactIdle: createReactIdleStrategyCredentials(),
    reactLow: createReactLowStrategyCredentials(),
    reactNormal: createReactNormalStrategyCredentials(),
    reactUserBlocking: createReactUserBlockingStrategyCredentials(),
    reactImmediate: createReactImmediateStrategyCredentials(),
    reactNoPrio: createReactNoPrioStrategyCredentials(),
  };
}

export function createReactNoPrioStrategyCredentials(): StrategyCredentials {
  return {
    name: 'reactNoPrioBehavior',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work: any, context: any) => {
      return o$ => o$.pipe(
        scheduleLikeReact(ReactPriorityLevel.NoPriority, work, context)
      );
    }
  };
}

export function createReactImmediateStrategyCredentials(): StrategyCredentials {
  return {
    name: 'reactImmediate',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work: any, context: any) => {
      return o$ => o$.pipe(
        scheduleLikeReact(ReactPriorityLevel.ImmediatePriority, work, context)
      );
    }
  };
}

export function createReactUserBlockingStrategyCredentials(): StrategyCredentials {
  return {
    name: 'reactUserBlocking',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work: any, context: any) => {
      return o$ => o$.pipe(
        scheduleLikeReact(ReactPriorityLevel.UserBlockingPriority, work, context)
      );
    }
  };
}

export function createReactNormalStrategyCredentials(): StrategyCredentials {
  return {
    name: 'reactNormal',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work: any, context: any) => {
      return o$ => o$.pipe(
        scheduleLikeReact(ReactPriorityLevel.NormalPriority, work, context)
      );
    }
  };
}

export function createReactLowStrategyCredentials(): StrategyCredentials {
  return {
    name: 'reactLow',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work: any, context: any) => {
      return o$ => o$.pipe(
        scheduleLikeReact(ReactPriorityLevel.LowPriority, work, context)
      );
    }
  };
}

export function createReactIdleStrategyCredentials(): StrategyCredentials {
  return {
    name: 'reactIdle',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work: any, context: any) => {
      return o$ => o$.pipe(
        scheduleLikeReact(ReactPriorityLevel.IdlePriority, work, context)
      );
    }
  };
}
