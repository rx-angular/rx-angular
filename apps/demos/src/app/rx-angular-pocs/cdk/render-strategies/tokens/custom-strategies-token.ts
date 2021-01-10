import { InjectionToken } from '@angular/core';
import { StrategyCredentials } from '../model';

export const RX_CUSTOM_STRATEGIES = new InjectionToken<StrategyCredentials>(
  'strategies token'
);
