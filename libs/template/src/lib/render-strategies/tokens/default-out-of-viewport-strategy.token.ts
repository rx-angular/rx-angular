import { InjectionToken } from '@angular/core';
import { DefaultStrategyName } from '../interfaces/default-strategy-name.type';

export const RX_ANGULAR_DEFAULT_OUT_OF_VIEWPORT_STRATEGY = new InjectionToken<
  DefaultStrategyName
>('Default out of viewport strategy', {
  providedIn: 'root',
  factory: () => 'noop'
});
