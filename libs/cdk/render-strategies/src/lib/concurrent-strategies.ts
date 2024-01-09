import { NgZone } from '@angular/core';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter, mapTo, switchMap } from 'rxjs/operators';
import {
  unstable_cancelCallback,
  unstable_scheduleCallback,
  PriorityLevel,
} from '@rx-angular/cdk/internals/scheduler';

import {
  RxCustomStrategyCredentials,
  RxConcurrentStrategyNames,
  RxStrategyCredentials,
} from './model';
import { coalescingManager, coalescingObj } from '@rx-angular/cdk/coalescing';

const immediateStrategy: RxStrategyCredentials = {
  name: 'immediate',
  work: (cdRef) => cdRef.detectChanges(),
  behavior: ({ work, scope, ngZone }) => {
    return (o$) =>
      o$.pipe(
        scheduleOnQueue(work, {
          ngZone,
          priority: PriorityLevel.ImmediatePriority,
          scope,
        })
      );
  },
};

const userBlockingStrategy: RxStrategyCredentials = {
  name: 'userBlocking',
  work: (cdRef) => cdRef.detectChanges(),
  behavior: ({ work, scope, ngZone }) => {
    return (o$) =>
      o$.pipe(
        scheduleOnQueue(work, {
          ngZone,
          priority: PriorityLevel.UserBlockingPriority,
          scope,
        })
      );
  },
};

const normalStrategy: RxStrategyCredentials = {
  name: 'normal',
  work: (cdRef) => cdRef.detectChanges(),
  behavior: ({ work, scope, ngZone }) => {
    return (o$) =>
      o$.pipe(
        scheduleOnQueue(work, {
          ngZone,
          priority: PriorityLevel.NormalPriority,
          scope,
        })
      );
  },
};

const lowStrategy: RxStrategyCredentials = {
  name: 'low',
  work: (cdRef) => cdRef.detectChanges(),
  behavior: ({ work, scope, ngZone }) => {
    return (o$) =>
      o$.pipe(
        scheduleOnQueue(work, {
          ngZone,
          priority: PriorityLevel.LowPriority,
          scope,
        })
      );
  },
};

const idleStrategy: RxStrategyCredentials = {
  name: 'idle',
  work: (cdRef) => cdRef.detectChanges(),
  behavior: ({ work, scope, ngZone }) => {
    return (o$) =>
      o$.pipe(
        scheduleOnQueue(work, {
          ngZone,
          priority: PriorityLevel.IdlePriority,
          scope,
        })
      );
  },
};

function scheduleOnQueue<T>(
  work: (...args: any[]) => void,
  options: {
    priority: PriorityLevel;
    scope: coalescingObj;
    delay?: number;
    ngZone: NgZone;
  }
): MonoTypeOperatorFunction<T> {
  const scope = (options.scope as Record<string, unknown>) || {};
  return (o$: Observable<T>): Observable<T> =>
    o$.pipe(
      filter(() => !coalescingManager.isCoalescing(scope)),
      switchMap((v) =>
        new Observable<T>((subscriber) => {
          coalescingManager.add(scope);
          const task = unstable_scheduleCallback(
            options.priority,
            () => {
              work();
              coalescingManager.remove(scope);
              subscriber.next(v);
            },
            { delay: options.delay }
          );
          return () => {
            coalescingManager.remove(scope);
            unstable_cancelCallback(task);
          };
        }).pipe(mapTo(v))
      )
    );
}

export type RxConcurrentStrategies =
  RxCustomStrategyCredentials<RxConcurrentStrategyNames>;
export const RX_CONCURRENT_STRATEGIES: RxConcurrentStrategies = {
  immediate: immediateStrategy,
  userBlocking: userBlockingStrategy,
  normal: normalStrategy,
  low: lowStrategy,
  idle: idleStrategy,
};
