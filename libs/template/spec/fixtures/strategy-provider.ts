import { StaticProvider } from '@angular/core';
import { RX_PRIMARY_STRATEGY } from '@rx-angular/cdk';

export const defaultStrategyProvider: StaticProvider = {
  provide: RX_PRIMARY_STRATEGY,
  useValue: 'local',
};
