import { InjectionToken } from '@angular/core';
import { StrategyNameType } from '../interfaces/strategy-name.type';

export const RX_ANGULAR_DEFAULT_STRATEGY = new InjectionToken<StrategyNameType>(
  'Default strategy',
  {
    providedIn: 'root',
    factory: () => 'local'
  }
);
