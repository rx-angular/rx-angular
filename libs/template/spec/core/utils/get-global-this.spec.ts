import { getGlobalThis } from '../../../src/lib/core';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { mockConsole } from '@test-helpers';


describe('getGlobalThis', () => {
  beforeAll(() => mockConsole());
  afterEach(() => {
    delete getGlobalThis().prop;
  });

  it('should return global this', () => {
    getGlobalThis().prop = 42;
    const globalThis = getGlobalThis();

    expect(globalThis).toBeDefined();
    expect(globalThis.prop).toBe(42);
  });
});
