import { InjectionToken } from '@angular/core';
import { ExtendedStrategies } from '../interfaces/extended-strategy';

export const RX_ANGULAR_DEFAULT_INVISIBLE_STRATEGY = new InjectionToken<
  keyof ExtendedStrategies
>('Default strategy when element is invisible');
