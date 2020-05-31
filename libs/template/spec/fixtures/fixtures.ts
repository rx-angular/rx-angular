import createSpy = jasmine.createSpy;
import { ChangeDetectorRef } from '@angular/core';

export class MockChangeDetectorRef {
  markForCheck = createSpy('markForCheck');
  detectChanges = createSpy('detectChanges');
}

export const mockPromise = {
  then: () => {}
};
