import { InjectionToken } from '@angular/core';
import { StrategyCredentials } from './rx-let-poc.directive';

export const RX_CUSTOM_STRATEGIES = new InjectionToken<StrategyCredentials>(
  'strategies token'
);
