import { InjectionToken } from '@angular/core';
import { AvailableStrategies } from '../interfaces/available-strategies.interface';
import { availableStrategies } from '../constants/default-strategies.constant';

export const RX_AVAILABLE_STRATEGIES = new InjectionToken<AvailableStrategies>(
  'Available strategies',
  {
    providedIn: 'root',
    factory: () => availableStrategies
  }
);
