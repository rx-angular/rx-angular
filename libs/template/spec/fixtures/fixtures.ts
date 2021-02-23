import createSpy = jasmine.createSpy;
import { ChangeDetectorRef, ElementRef } from '@angular/core';

export class MockChangeDetectorRef extends ChangeDetectorRef {
  markForCheck = createSpy('markForCheck');
  detectChanges = createSpy('detectChanges');
  detach = createSpy('detach');
  reattach = createSpy('reattach');
  checkNoChanges = createSpy('checkNoChanges');
  context = { a: 'context' };
}

export class MockElementRef<T> extends ElementRef<T> {
  nativeElement = {} as any;
}

export const mockPromise = {
  then: () => {},
};
