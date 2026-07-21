import { ViewRef } from '@angular/core';

/**
 * Creates a minimal {@link ViewRef} double for use in {@link VirtualViewCache}
 * tests. The cache only ever calls `.destroy()` on stored views, so the double
 * exposes a `destroy` jest mock and casts the remaining `ViewRef` surface.
 *
 * @returns A `ViewRef` whose `destroy` is a `jest.fn()` for assertions.
 */
export function fakeViewRef(): ViewRef & { destroy: jest.Mock } {
  const view = {
    destroyed: false,
    destroy: jest.fn(),
    onDestroy: jest.fn(),
    markForCheck: jest.fn(),
    detach: jest.fn(),
    detectChanges: jest.fn(),
    checkNoChanges: jest.fn(),
    reattach: jest.fn(),
  };
  return view as unknown as ViewRef & { destroy: jest.Mock };
}
