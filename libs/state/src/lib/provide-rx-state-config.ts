import { InjectionToken, Provider } from '@angular/core';
import { AccumulationFn, RX_ACCUMULATOR_FN } from '../../selections/src';

export const enum RX_STATE_CONFIGS {
  Scheduler,
  Accumulator,
}

interface RxStateConfigFn {
  kind: RX_STATE_CONFIGS;
  providers: Provider[];
}

/**
 * Injection token for the default accumulator function.
 * @param fn
 */
export function withAccumulatorFn(fn: AccumulationFn): RxStateConfigFn {
  return {
    kind: RX_STATE_CONFIGS.Accumulator,
    providers: [{ provide: RX_ACCUMULATOR_FN, useValue: fn }],
  };
}

export const RX_STATE_SCHEDULER = new InjectionToken<any>(
  'RX_STATE_SCHEDULER',
  {
    providedIn: 'root',
    factory: () => undefined,
  },
);

/**
 * Injection token for the default scheduler for rxState.
 * @param fn
 */
export function withScheduler(
  scheduler: any /* TODO: add type here*/,
): RxStateConfigFn {
  return {
    kind: RX_STATE_CONFIGS.Scheduler,
    providers: [{ provide: RX_STATE_SCHEDULER, useValue: scheduler }],
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
