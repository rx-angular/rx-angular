import { NgZone } from '@angular/core';
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
} from './model';
import { coalescingManager, coalescingObj } from '@rx-angular/cdk/coalescing';

forceFrameRate(60);

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
          const task = scheduleCallback(
            options.priority,
            () => {
              work();
              coalescingManager.remove(scope);
              subscriber.next(v);
            },
            { delay: options.delay, ngZone: options.ngZone }
          );
          return () => {
            coalescingManager.remove(scope);
            cancelCallback(task);
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
