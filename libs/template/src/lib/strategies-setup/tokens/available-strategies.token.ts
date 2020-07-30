import { InjectionToken } from '@angular/core';
import { DefaultStrategies } from '../interfaces/default-strategies.interface';

export const RX_AVAILABLE_STRATEGIES = new InjectionToken<DefaultStrategies>(
  'Available strategies'
);
