import { ChangeDetectorRef, ElementRef } from '@angular/core';

export class MockChangeDetectorRef extends ChangeDetectorRef {
  markForCheck = jest.fn();
  detectChanges = jest.fn();
  detach = jest.fn();
  reattach = jest.fn();
  checkNoChanges = jest.fn();
  context = { a: 'context' };
}

export class MockElementRef<T> extends ElementRef<T> {
  nativeElement = {} as any;
}
