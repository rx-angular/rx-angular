import { CustomStrategyCredentialsMap, StrategyCredentials } from '../model';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';
import {
  unstable_cancelCallback as cancelCallback,
  unstable_scheduleCallback as scheduleCallback,
} from 'scheduler/cjs/scheduler.production.min.js';

type PriorityLevel = 0 | 1 | 2 | 3 | 4 | 5;

const NoPriority = 0;
const ImmediatePriority = 1;
const UserBlockingPriority = 2;
const NormalPriority = 3;
const LowPriority = 4;
const IdlePriority = 5;

const noPriorityStrategy: StrategyCredentials = {
  name: 'noPriority',
  work: (cdRef) => cdRef.detectChanges(),
  behavior: (work: any, scope: any) => {
    return (o$) =>
      o$.pipe(scheduleOnQueue(work, { priority: NoPriority, scope }));
  },
};

const immediateStrategy: StrategyCredentials = {
  name: 'immediate',
  work: (cdRef) => cdRef.detectChanges(),
  behavior: (work: any, scope: any) => {
    return (o$) =>
      o$.pipe(
        scheduleOnQueue(work, {
          priority: ImmediatePriority,
          scope,
        })
      );
  },
};

const userBlockingStrategy: StrategyCredentials = {
  name: 'userBlocking',
  work: (cdRef) => cdRef.detectChanges(),
  behavior: (work: any, scope: any) => {
    return (o$) =>
      o$.pipe(
        scheduleOnQueue(work, {
          priority: UserBlockingPriority,
          scope,
        })
      );
  },
};

const normalStrategy: StrategyCredentials = {
  name: 'normal',
  work: (cdRef) => cdRef.detectChanges(),
  behavior: (work: any, scope: any) => {
    return (o$) =>
      o$.pipe(scheduleOnQueue(work, { priority: NormalPriority, scope }));
  },
};

const lowStrategy: StrategyCredentials = {
  name: 'low',
  work: (cdRef) => cdRef.detectChanges(),
  behavior: (work: any, scope: any) => {
    return (o$) =>
      o$.pipe(scheduleOnQueue(work, { priority: LowPriority, scope }));
  },
};

const idleStrategy: StrategyCredentials = {
  name: 'idle',
  work: (cdRef) => cdRef.detectChanges(),
  behavior: (work: any, scope: any) => {
    return (o$) =>
      o$.pipe(scheduleOnQueue(work, { priority: IdlePriority, scope }));
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
      switchMap((v) =>
        new Observable<T>((subscriber) => {
          const task = scheduleCallback(
            options.priority,
            () => {
              work();
              subscriber.next(v);
            },
            { delay: options.delay }
          );
          return () => {
            cancelCallback(task);
          };
        }).pipe(mapTo(v))
      )
    );
}

export type ConcurrentStrategyNames =
  | 'noPriority'
  | 'immediate'
  | 'userBlocking'
  | 'normal'
  | 'low'
  | 'idle';
export type ConcurrentStrategies = CustomStrategyCredentialsMap<ConcurrentStrategyNames>;
export const CONCURRENT_STRATEGIES: ConcurrentStrategies = {
  noPriority: noPriorityStrategy,
  immediate: immediateStrategy,
  userBlocking: userBlockingStrategy,
  normal: normalStrategy,
  low: lowStrategy,
  idle: idleStrategy,
};
