import { InjectionToken } from '@angular/core';
import { StrategyNameType } from '../interfaces/strategy-name.type';

export const RX_ANGULAR_DEFAULT_OUT_OF_VIEWPORT_STRATEGY = new InjectionToken<
  StrategyNameType
>('Default out of viewport strategy', {
  providedIn: 'root',
  factory: () => 'noop'
});
