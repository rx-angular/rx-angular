import { PriorityNameToLevel } from '../../render-strategies/model/priority';
import { StrategyCredentials, StrategyCredentialsMap } from '../../render-strategies/model/strategy-credentials';
import { tap } from 'rxjs/operators';
import { observeOnPriority } from '../../utils/rxjs/operators/observeOnPriority';
import { concurrent } from '../../utils/rxjs/scheduler/concurrent';
import { ConcurrentQueueHandler } from '../../utils/rxjs/scheduler/concurrent/concurrent.queue-handler';
import { scheduleLikeReact } from '../../utils/scheduling/concurrent-scheduler';

export function getConcurrentSchedulerStrategyCredentialsMap(): StrategyCredentialsMap {
  return {
    noPriority: createNoPriorityStrategyCredentials(),
    immediate: createImmediateStrategyCredentials(),
    userBlocking: createUserBlockingStrategyCredentials(),
    normal: createNormalStrategyCredentials(),
    normal2: createNormal2StrategyCredentials(),
    low: createLowStrategyCredentials(),
    background: createBackgroundStrategyCredentials()
  };
}

const qh = new ConcurrentQueueHandler();

export function createNoPriorityStrategyCredentials(): StrategyCredentials {
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

export function createImmediateStrategyCredentials(): StrategyCredentials {
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

export function createUserBlockingStrategyCredentials(): StrategyCredentials {
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

export function createNormalStrategyCredentials(): StrategyCredentials {
  return {
    name: 'normal',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work: any, context: any) => {
      return o$ => o$.pipe(
        scheduleLikeReact(PriorityNameToLevel.userBlocking, work, context)
      );
    }
  };
}

export function createNormal2StrategyCredentials(): StrategyCredentials {
  return {
    name: 'normal2',
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
        observeOnPriority(concurrent(PriorityNameToLevel.background)),
        tap(work)
      );
    }
  };
}
