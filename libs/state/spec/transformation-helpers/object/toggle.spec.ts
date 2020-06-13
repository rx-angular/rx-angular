import { toggle } from "@rx-angular/state";
import { initialPrimitiveState, PrimitiveState } from '../../fixtures';

let primitiveState: PrimitiveState;

beforeEach(() => {
  primitiveState = initialPrimitiveState;
});


describe('toggle', () => {

  describe('general', () => {
    it('should be defined', () => {
      const fn = toggle;
      expect(fn).toBeDefined();
    });

    it('should not mutate object', () => {
      const simpleState = {...primitiveState};
      toggle(simpleState, 'bol');

      expect(simpleState).toEqual(primitiveState);
    });
  });

  describe('functionality', () => {
    it('should toggle boolean property', () => {
      const result = toggle(primitiveState, 'bol');

      expect(result).toEqual({num: 42, bol: false, str: 'str'});
    });
  });

  describe('edge cases', () => {
    it('should return initial object if property not found', () => {
      const nonExistingKeyResult = toggle(primitiveState, 'fake' as any);
      const noKeyResult = toggle(primitiveState, null as any);

      expect(nonExistingKeyResult).toEqual(primitiveState);
      expect(noKeyResult).toEqual(primitiveState);
    });

    it('should throw error first argument is not and object', () => {
      expect(() => toggle('' as any, 'fake')).toThrow(Error);
    });

    it('should throw error no arguments provided', () => {
      expect(() => toggle(null as any, null as any)).toThrow(Error);
    });

    it('should throw error if key value is not a boolean', () => {
      expect(() => toggle(primitiveState, 'str' as any)).toThrow(Error);
    });
  });
});
