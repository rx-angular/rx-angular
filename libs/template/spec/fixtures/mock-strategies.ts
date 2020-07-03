import { ChangeDetectorRef } from '@angular/core';
import { MockChangeDetectorRef } from './fixtures';

export function getMockNoopStrategyConfig() {
  return {
    cdRef: (new MockChangeDetectorRef() as any) as ChangeDetectorRef
  };
}

export function getMockNativeStrategyConfig() {
  return {
    cdRef: (new MockChangeDetectorRef() as any) as ChangeDetectorRef
  };
}
