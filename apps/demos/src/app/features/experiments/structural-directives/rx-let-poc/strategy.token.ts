import { InjectionToken } from '@angular/core';
import { RenderStrategy } from '@rx-angular/template';

export const StrategyTokenProvider = new InjectionToken<RenderStrategy>(
  'strategies token'
);

export interface CustomStrategyConfig {
  name: string;
  renderMethod: string;
  schedulingPrio: string;
}
