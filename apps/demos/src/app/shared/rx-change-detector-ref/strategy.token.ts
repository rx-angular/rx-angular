import { InjectionToken } from '@angular/core';
import { RenderStrategyFactory } from '@rx-angular/template';

export interface StrategyTokenProviderMap {
 name: string,
  factory: RenderStrategyFactory
}

export const StrategyTokenProvider = new InjectionToken<StrategyTokenProviderMap>(
  'strategies token'
);
