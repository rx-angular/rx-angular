import { initialPrimitiveState, PrimitiveState } from '../../fixtures';
import { slice } from '../../../src';

let primitiveState: PrimitiveState;

beforeEach(() => {
  primitiveState = initialPrimitiveState;
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

describe('slice', () => {
  describe('general', () => {
    it('should be defined', () => {
      const fn = slice;
      expect(fn).toBeDefined();
    });

    it('should not mutate object', () => {
      const simpleState = { ...primitiveState };
      slice(simpleState, 'bol');

      expect(simpleState).toEqual(primitiveState);
    });

    it('should not return same reference', () => {
      const simpleState = { ...primitiveState };
      const result = slice(simpleState, 'num');
      const result2 = slice(simpleState, null as any);

      simpleState.bol = false;

      expect(simpleState).toEqual({ num: 42, bol: false, str: 'str' });
      expect(result).toEqual({ num: 42 });
      expect(result2).toEqual(undefined);
    });
  });

  describe('functionality', () => {
    it('should get single key', () => {
      const result = slice(primitiveState, 'str');

      expect(result).toEqual({ str: 'str' });
    });

    it('should get array of keys', () => {
      const result = slice(primitiveState, ['bol', 'num']);

      expect(result).toEqual({ bol: true, num: 42 });
    });

    it('should slice only existing keys', () => {
      const result = slice(primitiveState, ['bol', 'num', 'obj'] as any);

      expect(result).toEqual({ bol: true, num: 42 });
    });
  });

  describe('edge cases', () => {
    it('should return object with provided property if first argument is not an object', () => {
      expect(slice('' as any, 'fake' as any)).toEqual(undefined);
      expect(slice(null as any, 'fake')).toEqual(undefined);
      expect(slice(undefined as any, 'fake')).toEqual(undefined);
      expect(slice(null as any, null as any)).toEqual(undefined);
      expect(slice([primitiveState], 'concat')).toEqual(undefined);
      expect(slice(primitiveState, 'concat' as any)).toEqual(undefined);
      expect(slice(primitiveState, {} as any)).toEqual(undefined);
      expect(slice(primitiveState, [] as any)).toEqual(undefined);
      expect(slice(primitiveState, 1 as any)).toEqual(undefined);
      expect(slice(primitiveState, null as any)).toEqual(undefined);
      expect(slice(primitiveState, undefined as any)).toEqual(undefined);
      expect(slice(primitiveState, (() => null) as any)).toEqual(undefined);
      expect(slice(primitiveState, ['nonExisting', 1] as any)).toEqual(
        undefined
      );
    });
  });
});
