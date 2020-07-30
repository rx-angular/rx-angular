import { InjectionToken } from '@angular/core';
import { DefaultStrategies } from '../interfaces/default-strategies.interface';
import { availableStrategies } from '../constants/default-strategies.constant';

export const RX_AVAILABLE_STRATEGIES = new InjectionToken<DefaultStrategies>(
  'Available strategies',
  {
    providedIn: 'root',
    factory: () => availableStrategies
  }
);
