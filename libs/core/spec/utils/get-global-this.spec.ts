import { getGlobalThis } from '@ngx-rx/core';

describe('getGlobalThis', () => {
  it('should return global this', () => {
    getGlobalThis().prop = 42;
    const globalThis = getGlobalThis();

    expect(globalThis).toBeDefined();
    expect(globalThis.prop).toBe(42);
  });
});
