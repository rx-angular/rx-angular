import { PriorityNameToLevel } from '../../render-strategies/model/priority';
import { StrategyCredentials, StrategyCredentialsMap } from '../../render-strategies/model/strategy-credentials';
import { tap } from 'rxjs/operators';
import { observeOnPriority } from '../../utils/rxjs/operators/observeOn';
import { concurrent } from '../../utils/rxjs/scheduler/concurrent';

export function getConcurrentSchedulerStrategyCredentialsMap(): StrategyCredentialsMap {
  return {
    noPriority: createNoPriorityStrategyCredentials(),
    immediate: createImmediateStrategyCredentials(),
    userBlocking: createUserBlockingStrategyCredentials(),
    normal: createNormalStrategyCredentials(),
    low: createLowStrategyCredentials(),
    background: createBackgroundStrategyCredentials()
  };
}

export function createNoPriorityStrategyCredentials(): StrategyCredentials {
  return {
    name: 'noPriority',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work: any, context: any) => {
      return o$ => o$.pipe(
        observeOnPriority(concurrent(PriorityNameToLevel.noPriority)),
        tap(work)
      );
    }
  };
}

export function createImmediateStrategyCredentials(): StrategyCredentials {
  return {
    name: 'immediate',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work: any, context: any) => {
      return o$ => o$.pipe(
        observeOnPriority(concurrent(PriorityNameToLevel.immediate)),
        tap(work)
      );
    }
  };
}

export function createUserBlockingStrategyCredentials(): StrategyCredentials {
  return {
    name: 'userBlocking',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work: any, context: any) => {
      return o$ => o$.pipe(
        observeOnPriority(concurrent(PriorityNameToLevel.userBlocking)),
        tap(work)
      );
    }
  };
}

export function createNormalStrategyCredentials(): StrategyCredentials {
  return {
    name: 'normal',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work: any, context: any) => {
      return o$ => o$.pipe(
        observeOnPriority(concurrent(PriorityNameToLevel.normal)),
        tap(work)
      );
    }
  };
}

export function createLowStrategyCredentials(): StrategyCredentials {
  return {
    name: 'low',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work: any, context: any) => {
      return o$ => o$.pipe(
        observeOnPriority(concurrent(PriorityNameToLevel.low)),
        tap(work)
      );
    }
  };
}

export function createBackgroundStrategyCredentials(): StrategyCredentials {
  return {
    name: 'background',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work: any, context: any) => {
      return o$ => o$.pipe(
        observeOnPriority(concurrent(PriorityNameToLevel.idle)),
        tap(work)
      );
    }
  };
}
