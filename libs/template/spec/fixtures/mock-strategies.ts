import { ChangeDetectorRef } from '@angular/core';
import { MockChangeDetectorRef } from './fixtures';

export function getMockNoopStrategyConfig() {
  return {
    component: {},
    scope: (new MockChangeDetectorRef() as any) as ChangeDetectorRef
  };
}

export function getMockNativeStrategyConfig() {
  return {
    component: {},
    scope: (new MockChangeDetectorRef() as any) as ChangeDetectorRef
  };
}
