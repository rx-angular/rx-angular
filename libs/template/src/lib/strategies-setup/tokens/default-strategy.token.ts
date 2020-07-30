import { InjectionToken } from '@angular/core';
import { ExtendedStrategies } from '../interfaces/extended-strategy';

export const RX_ANGULAR_DEFAULT_STRATEGY = new InjectionToken<
  keyof ExtendedStrategies
>('Default strategy when element is visible');
