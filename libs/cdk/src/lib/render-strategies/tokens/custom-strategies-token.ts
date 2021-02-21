import { InjectionToken } from '@angular/core';
import { CustomStrategyCredentialsMap } from '../../model';
// @TODO type tokens generic
export const RX_CUSTOM_STRATEGIES = new InjectionToken<
  CustomStrategyCredentialsMap<string>
>('RX_CUSTOM_STRATEGIES');
