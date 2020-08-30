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

  it('should add work without scope', () => {
    coalescingManager.add(undefined as any);
    expect(coalescingManager.isCoalescing(undefined as any)).toBeFalsy();
  });

  it('should remove work', () => {
    coalescingManager.add(scope);
    expect(coalescingManager.isCoalescing(scope)).toBeTruthy();
    coalescingManager.remove(scope);
    expect(coalescingManager.isCoalescing(scope)).toBeFalsy();
  });

  it('should remove work without context', () => {
    coalescingManager.remove(undefined as any);
    expect(coalescingManager.isCoalescing(undefined as any)).toBeFalsy();
  });

});
