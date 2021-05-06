import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter, mapTo, switchMap } from 'rxjs/operators';
import {
  cancelCallback,
  scheduleCallback,
  forceFrameRate,
  PriorityLevel,
} from '@rx-angular/cdk/internals/scheduler';

import {
  RxCustomStrategyCredentials,
  RxConcurrentStrategyNames,
  RxStrategyCredentials,
} from '../model';
import { coalescingManager } from '../utils/coalescingManager';

forceFrameRate(60);

const noPriorityStrategy: RxStrategyCredentials = {
  name: 'noPriority',
  work: (cdRef) => cdRef.detectChanges(),
  behavior: (work: any, scope: any) => {
    return (o$) =>
      o$.pipe(
        scheduleOnQueue(work, { priority: PriorityLevel.NoPriority, scope })
      );
  },
};

const immediateStrategy: RxStrategyCredentials = {
  name: 'immediate',
  work: (cdRef) => cdRef.detectChanges(),
  behavior: (work: any, scope: any) => {
    return (o$) =>
      o$.pipe(
        scheduleOnQueue(work, {
          priority: PriorityLevel.ImmediatePriority,
          scope,
        })
      );
  },
};

const userBlockingStrategy: RxStrategyCredentials = {
  name: 'userBlocking',
  work: (cdRef) => cdRef.detectChanges(),
  behavior: (work: any, scope: any) => {
    return (o$) =>
      o$.pipe(
        scheduleOnQueue(work, {
          priority: PriorityLevel.UserBlockingPriority,
          scope,
        })
      );
  },
};

const normalStrategy: RxStrategyCredentials = {
  name: 'normal',
  work: (cdRef) => cdRef.detectChanges(),
  behavior: (work: any, scope: any) => {
    return (o$) =>
      o$.pipe(
        scheduleOnQueue(work, { priority: PriorityLevel.NormalPriority, scope })
      );
  },
};

const lowStrategy: RxStrategyCredentials = {
  name: 'low',
  work: (cdRef) => cdRef.detectChanges(),
  behavior: (work: any, scope: any) => {
    return (o$) =>
      o$.pipe(
        scheduleOnQueue(work, { priority: PriorityLevel.LowPriority, scope })
      );
  },
};

const idleStrategy: RxStrategyCredentials = {
  name: 'idle',
  work: (cdRef) => cdRef.detectChanges(),
  behavior: (work: any, scope: any) => {
    return (o$) =>
      o$.pipe(
        scheduleOnQueue(work, { priority: PriorityLevel.IdlePriority, scope })
      );
  },
};

function scheduleOnQueue<T>(
  work: (...args: any[]) => void,
  options: {
    priority: PriorityLevel;
    scope: object;
    delay?: number;
  }
): MonoTypeOperatorFunction<T> {
  return (o$: Observable<T>): Observable<T> =>
    o$.pipe(
      filter(() => !coalescingManager.isCoalescing(options.scope)),
      switchMap((v) =>
        new Observable<T>((subscriber) => {
          coalescingManager.add(options.scope);
          const task = scheduleCallback(
            options.priority,
            () => {
              work();
              coalescingManager.remove(options.scope);
              subscriber.next(v);
            },
            { delay: options.delay }
          );
          return () => {
            coalescingManager.remove(options.scope);
            cancelCallback(task);
          };
        }).pipe(mapTo(v))
      )
    );
}

export type RxConcurrentStrategies = RxCustomStrategyCredentials<RxConcurrentStrategyNames>;
export const RX_CONCURRENT_STRATEGIES: RxConcurrentStrategies = {
  noPriority: noPriorityStrategy,
  immediate: immediateStrategy,
  userBlocking: userBlockingStrategy,
  normal: normalStrategy,
  low: lowStrategy,
  idle: idleStrategy,
};
