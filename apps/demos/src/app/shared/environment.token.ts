import { ChangeDetectionStrategy, InjectionToken } from '@angular/core';
export interface EnvironmentSettings {
  production: boolean;
  changeDetection: ChangeDetectionStrategy
}
export const ENVIRONMENT_SETTINGS = new InjectionToken<EnvironmentSettings>('ENVIRONMENT_SETTINGS');
