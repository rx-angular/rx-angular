import { initialPrimitiveState, PrimitiveState } from '../../fixtures';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { deleteProp } from '@rx-angular/state';

let primitiveState: PrimitiveState;

beforeEach(() => {
  primitiveState = initialPrimitiveState;
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

describe('deleteProp', () => {
  describe('general', () => {
    it('should be defined', () => {
      const fn = deleteProp;
      expect(fn).toBeDefined();
    });

    it('should not mutate object', () => {
      const simpleState = { ...primitiveState };
      deleteProp(simpleState, 'bol');

      expect(simpleState).toEqual(primitiveState);
    });

    it('should not return same reference', () => {
      const simpleState = { ...primitiveState };
      const result = deleteProp(simpleState, 'str');
      const result2 = deleteProp(simpleState, null as any);
      simpleState.bol = false;

      expect(result).toEqual({ num: 42, bol: true });
      expect(simpleState).toEqual({ num: 42, bol: false, str: 'str' });
      expect(result2).toEqual(primitiveState);
    });
  });

  describe('functionality', () => {
    it('should remove property', () => {
      const result = deleteProp(primitiveState, 'str');

      expect(result).toEqual({ num: 42, bol: true });
    });
  });

  describe('edge cases', () => {
    it('should return original object if property not found', () => {
      const result = deleteProp(primitiveState, 'arr' as any);

      expect(result).toEqual(primitiveState);
    });

    it('should return original object if property not provided', () => {
      expect(deleteProp(primitiveState, null as any)).toEqual(primitiveState);
    });

    it('should return undefined or null if object is null or undefiend', () => {
      expect(deleteProp(null as any, null as any)).toEqual(null);
      expect(deleteProp(undefined as any, 'fake')).toEqual(undefined);
    });

    it('should return first argument if it is not an object', () => {
      expect(deleteProp('' as any, 'fake')).toEqual('');
      expect(deleteProp(1 as any, 'fake')).toEqual(1);
      expect(deleteProp(false as any, 'fake')).toEqual(false);
      expect(deleteProp([], 'concat')).toEqual([]);
    });
  });
});
