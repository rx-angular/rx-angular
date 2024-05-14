import { InjectionToken } from '@angular/core';
import { RX_CONCURRENT_STRATEGIES } from './concurrent-strategies';
import {
  RxCustomStrategyCredentials,
  RxDefaultStrategyNames,
  RxStrategyNames,
} from './model';
import { RX_NATIVE_STRATEGIES } from './native-strategies';

export interface RxRenderStrategiesConfig<T extends string> {
  primaryStrategy?: RxStrategyNames<T>;
  customStrategies?: RxCustomStrategyCredentials<T>;
  patchZone?: boolean;
  /**
   *  @deprecated This flag will be dropped soon, as it is no longer required when using signal based view & content queries
   */
  parent?: boolean;
}

export const RX_RENDER_STRATEGIES_CONFIG = new InjectionToken<
  RxRenderStrategiesConfig<string>
>('rxa-render-strategies-config');

export const RX_RENDER_STRATEGIES_DEFAULTS: Required<
  RxRenderStrategiesConfig<RxDefaultStrategyNames>
> = {
  primaryStrategy: 'normal',
  customStrategies: {
    ...RX_NATIVE_STRATEGIES,
    ...RX_CONCURRENT_STRATEGIES,
  },
  patchZone: true,
  parent: true,
} as const;

export function mergeDefaultConfig<T extends string>(
  cfg?: RxRenderStrategiesConfig<T>,
): Required<RxRenderStrategiesConfig<T | RxDefaultStrategyNames>> {
  const custom: RxRenderStrategiesConfig<T> = cfg
    ? cfg
    : ({
        customStrategies: {},
      } as any);
  return {
    ...RX_RENDER_STRATEGIES_DEFAULTS,
    ...custom,
    customStrategies: {
      ...custom.customStrategies,
      ...RX_RENDER_STRATEGIES_DEFAULTS.customStrategies,
    },
  };
}
