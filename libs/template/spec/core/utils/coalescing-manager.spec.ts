import { coalescingManager } from '../../../src/lib/core/utils';

// tslint:disable-next-line:nx-enforce-module-boundaries
import { mockConsole } from '@test-helpers';

let scope;

describe('coalescingManager', () => {
  beforeAll(() => mockConsole());

  beforeEach(() => {
    scope = { foo: 'bar' };
  });

  it('should be defined', () => {
    expect(coalescingManager).toBeDefined();
  });

  it('should add work', () => {
    coalescingManager.add(scope);
    expect(coalescingManager.isCoalescing(scope)).toBeTruthy();
  });

  it('should add work with function as scope', () => {
    const fnScope = () => {};
    coalescingManager.add(fnScope);
    expect(coalescingManager.isCoalescing(fnScope)).toBeTruthy();
    coalescingManager.remove(fnScope);
    expect(coalescingManager.isCoalescing(fnScope)).toBeFalsy();
  });

  it('should add work with array as scope', () => {
    const arrScope = [];
    coalescingManager.add(arrScope);
    expect(coalescingManager.isCoalescing(arrScope)).toBeTruthy();
    coalescingManager.remove(arrScope);
    expect(coalescingManager.isCoalescing(arrScope)).toBeFalsy();
  });

  it('should remove work', () => {
    coalescingManager.add(scope);
    expect(coalescingManager.isCoalescing(scope)).toBeTruthy();
    coalescingManager.remove(scope);
    expect(coalescingManager.isCoalescing(scope)).toBeFalsy();
  });

  it('should not have less than zero numCoalescing', () => {
    coalescingManager.add(scope);
    expect(coalescingManager.isCoalescing(scope)).toBeTruthy();
    coalescingManager.remove(scope);
    expect(coalescingManager.isCoalescing(scope)).toBeFalsy();
    coalescingManager.remove(scope);
    expect(coalescingManager.isCoalescing(scope)).toBeFalsy();
    coalescingManager.add(scope);
    expect(coalescingManager.isCoalescing(scope)).toBeTruthy();
  });

});
