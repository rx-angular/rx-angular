import { InjectionToken } from '@angular/core';
import { DefaultStrategyName } from '../interfaces/default-strategy-name.type';

export const RX_ANGULAR_DEFAULT_STRATEGY = new InjectionToken<
  DefaultStrategyName
>('Default strategy', {
  providedIn: 'root',
  factory: () => 'local'
});
