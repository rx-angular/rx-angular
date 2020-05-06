import { ChangeDetectorRef } from '@angular/core';
import { MockChangeDetectorRef } from './fixtures';

export function getMockNoopStrategyConfig() {
  return {
    component: {},
    cdRef: (new MockChangeDetectorRef() as any) as ChangeDetectorRef
  };
}

export function getMockNativeStrategyConfig() {
  return {
    component: {},
    cdRef: (new MockChangeDetectorRef() as any) as ChangeDetectorRef
  };
}
