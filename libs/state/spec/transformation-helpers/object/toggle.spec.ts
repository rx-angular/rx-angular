import { initialPrimitiveState, PrimitiveState } from '../../fixtures';
import { toggle } from '@rx-angular/state';

let primitiveState: PrimitiveState;

beforeEach(() => {
  primitiveState = initialPrimitiveState;
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

describe('toggle', () => {
  describe('general', () => {
    it('should be defined', () => {
      const fn = toggle;
      expect(fn).toBeDefined();
    });

    it('should not mutate object', () => {
      const simpleState = { ...primitiveState };
      toggle(simpleState, 'bol');

      expect(simpleState).toEqual(primitiveState);
    });

    it('should not return same reference', () => {
      const simpleState = { ...primitiveState };
      const result = toggle(simpleState, 'bol');
      const result2 = toggle(simpleState, null as any);

      simpleState.num = 24;

      expect(simpleState).toEqual({ num: 24, bol: true, str: 'str' });
      expect(result).toEqual({ ...primitiveState, bol: false });
      expect(result2).toEqual(primitiveState);
    });
  });

  describe('functionality', () => {
    it('should toggle boolean property', () => {
      const result = toggle(primitiveState, 'bol');

      expect(result).toEqual({ num: 42, bol: false, str: 'str' });
    });

    it('should initialize new values in an object', () => {
      expect(toggle(primitiveState, 'newBoolean' as any)).toEqual({
        ...primitiveState,
        newBoolean: true,
      });
    });
  });

  describe('edge cases', () => {
    it('should return initial object if property not provided', () => {
      const noKeyResult = toggle(primitiveState, null as any);

      expect(noKeyResult).toEqual(primitiveState);
    });

    it('should return empty object if no arguments provided', () => {
      expect(toggle(null as any, null as any)).toEqual(null);
    });

    it('should return original object if key value is not a boolean', () => {
      expect(toggle(primitiveState, 'str' as any)).toEqual(primitiveState);
    });
  });
});
