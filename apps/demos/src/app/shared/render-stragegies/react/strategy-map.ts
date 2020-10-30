import { StrategyCredentials, StrategyCredentialsMap } from '../model';
import { scheduleLikeReact } from './utils/react-scheduler';

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
    reactNoPrio: createReactNoPrioStrategyCredentials(),
    reactImmediate: createReactImmediateStrategyCredentials(),
    reactUserBlocking: createReactUserBlockingStrategyCredentials(),
    reactNormal: createReactNormalStrategyCredentials(),
    reactLow: createReactLowStrategyCredentials(),
    reactIdle: createReactIdleStrategyCredentials(),
  };
}

export function createReactNoPrioStrategyCredentials(): StrategyCredentials {
  return {
    name: 'reactNoPrioBehavior',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work: any, context: any) => {
      return o$ => o$.pipe(
        scheduleLikeReact(() => ({
          priority: 0,
          work: work,
          scope: context
        }))
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
        scheduleLikeReact(() => ({
          priority: 1,
          work: work,
          scope: context
        }))
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
        scheduleLikeReact(() => ({
          priority: 2,
          work: work,
          scope: context
        }))
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
        scheduleLikeReact(() => ({
          priority: 3,
          work: work,
          scope: context
        }))
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
        scheduleLikeReact(() => ({
          priority: 4,
          work: work,
          scope: context
        }))
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
        scheduleLikeReact(() => ({
          priority: 5,
          work: work,
          scope: context
        }))
      );
    }
  };
}
