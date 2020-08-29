import { ChangeDetectorRef } from '@angular/core';
import { MockChangeDetectorRef } from './fixtures';

export function getMockStrategyConfig() {
  return {
    cdRef: new MockChangeDetectorRef()
  };
}
