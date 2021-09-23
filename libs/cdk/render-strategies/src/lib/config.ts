import { InjectionToken } from '@angular/core';
import { RX_CONCURRENT_STRATEGIES } from './concurrent-strategies';
import { RxCustomStrategyCredentials, RxDefaultStrategyNames, RxStrategyNames } from './model';
import { RX_NATIVE_STRATEGIES } from './native-strategies';

export interface RxAngularConfig<T extends string> {
  primaryStrategy?: RxStrategyNames<T>;
  customStrategies?: RxCustomStrategyCredentials<T>;
  patchZone?: boolean;
}

export const RX_ANGULAR_CONFIG = new InjectionToken<RxAngularConfig<string>>(
  'rx-angular-config'
);
export const RX_ANGULAR_DEFAULTS: Required<RxAngularConfig<RxDefaultStrategyNames>> = {
  primaryStrategy: 'normal',
  customStrategies: {
    ...RX_NATIVE_STRATEGIES,
    ...RX_CONCURRENT_STRATEGIES
  },
  patchZone: true
};
export function mergeDefaultConfig<T extends string>(
  cfg?: RxAngularConfig<T>
): Required<RxAngularConfig<T | RxDefaultStrategyNames>> {
  const custom: RxAngularConfig<T> = cfg
                                     ? cfg
                                     : ({
      customStrategies: {}
    } as any);
  return {
    ...RX_ANGULAR_DEFAULTS,
    ...custom,
    customStrategies: {
      ...custom.customStrategies,
      ...RX_ANGULAR_DEFAULTS.customStrategies
    }
  };
}
