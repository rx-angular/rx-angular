import { getGlobalThis } from '../../../src/lib/core';
import { mockConsole } from '@test-helpers';


describe('getGlobalThis', () => {
  beforeAll(() => mockConsole());

  it('should return global this', () => {
    getGlobalThis().prop = 42;
    const globalThis = getGlobalThis();

    expect(globalThis).toBeDefined();
    expect(globalThis.prop).toBe(42);
  });
});
