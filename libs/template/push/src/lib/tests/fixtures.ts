import { ChangeDetectorRef } from '@angular/core';

export class MockChangeDetectorRef extends ChangeDetectorRef {
  markForCheck = vi.fn();
  detectChanges = vi.fn();
  detach = vi.fn();
  reattach = vi.fn();
  checkNoChanges = vi.fn();
  context = { a: 'context' };
}
