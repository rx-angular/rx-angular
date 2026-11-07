import { ViewRef } from '@angular/core';
import type { Mock } from 'vitest';

/**
 * Creates a minimal {@link ViewRef} double for use in {@link VirtualViewCache}
 * tests. The cache only ever calls `.destroy()` on stored views, so the double
 * exposes a `destroy` mock and casts the remaining `ViewRef` surface.
 *
 * @returns A `ViewRef` whose `destroy` is a `vi.fn()` for assertions.
 */
export function fakeViewRef(): ViewRef & { destroy: Mock } {
  const view = {
    destroyed: false,
    destroy: vi.fn(),
    onDestroy: vi.fn(),
    markForCheck: vi.fn(),
    detach: vi.fn(),
    detectChanges: vi.fn(),
    checkNoChanges: vi.fn(),
    reattach: vi.fn(),
  };
  return view as unknown as ViewRef & { destroy: Mock };
}
