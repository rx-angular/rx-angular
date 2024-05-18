import { InjectionToken, Provider } from '@angular/core';
import {
  AccumulationFn,
  defaultAccumulator,
} from '@rx-angular/state/selections';
import { queueScheduler, SchedulerLike } from 'rxjs';

export type RX_STATE_CONFIGS = 'Accumulator' | 'Scheduler';

interface RxStateConfigFn {
  kind: RX_STATE_CONFIGS;
  providers: Provider[];
}

/**
 * Injection token for the default accumulator function.
 *
 * @example
 * providers: [
 *  {
 *   provide: RX_ACCUMULATOR_FN,
 *   useValue: (state, slice) => ({ ...state, ...slice })
 *  }
 * ]
 */
export const RX_ACCUMULATOR_FN = new InjectionToken<AccumulationFn>(
  'RX_ACCUMULATOR_FN',
  {
    providedIn: 'root',
    factory: () => defaultAccumulator,
  },
);

/**
 * Provider function to specify a custom `AccumulationFn` for `RxState` to use.
 * @param fn
 */
export function withAccumulatorFn(fn: AccumulationFn): RxStateConfigFn {
  return {
    kind: 'Accumulator',
    providers: [{ provide: RX_ACCUMULATOR_FN, useValue: fn }],
  };
}

/**
 * Injection token for the default state scheduler
 *
 * @example
 * providers: [
 *  {
 *   provide: RX_STATE_SCHEDULER,
 *   useValue: asapScheduler
 *  }
 * ]
 */
export const RX_STATE_SCHEDULER = new InjectionToken<SchedulerLike | 'sync'>(
  'RX_STATE_SCHEDULER',
  {
    providedIn: 'root',
    factory: () => queueScheduler,
  },
);

/**
 * Provider function to specify a scheduler for `RxState` to perform state updates & emit new values.
 * @param scheduler
 */
export function withScheduler(
  scheduler: SchedulerLike | 'sync',
): RxStateConfigFn {
  return {
    kind: 'Scheduler',
    providers: [{ provide: RX_STATE_SCHEDULER, useValue: scheduler }],
  };
}

/**
 * Provider function to specify synchronous (no) scheduling for `RxState`. The state computations
 * will be fully synchronous instead of using the default `queueScheduler`
 */
export function withSyncScheduler(): RxStateConfigFn {
  return {
    kind: 'Scheduler',
    providers: [{ provide: RX_STATE_SCHEDULER, useValue: 'sync' }],
  };
}

/**
 * This function is used to provide the configuration for the rxState function.
 *
 * You can provide multiple configurations at once.
 *
 * You can use these functions to provide the configuration:
 * - withAccumulatorFn - to provide a custom accumulator function
 * - withScheduler - to provide a custom scheduler
 *
 */
export function provideRxStateConfig(
  ...configs: RxStateConfigFn[]
): Provider[] {
  return flatten(configs.map((c) => c.providers));
}

function flatten<T>(arr: T[][]): T[] {
  return arr.reduce((acc, val) => acc.concat(val), []);
}
