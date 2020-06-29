import { patch } from "@rx-angular/state";
import { initialPrimitiveState, PrimitiveState, NestedState, initialNestedState } from '../../fixtures';

let primitiveState: PrimitiveState;
let nestedState: NestedState;

beforeEach(() => {
  primitiveState = initialPrimitiveState;
  nestedState = initialNestedState;
});

describe('patch', () => {

  describe('general', () => {
    it('should be defined', () => {
      const fn = patch;
      expect(fn).toBeDefined();
    });

    it('should not return same reference', () => {
      const simpleState = {...primitiveState};
      const result = patch(simpleState, {num: 43});
      const result2 = patch(null as any, simpleState);
      const result3 = patch([] as any, simpleState);

      simpleState.bol = false;

      expect(simpleState).toEqual({num: 42, bol: false, str: 'str'});
      expect(result).toEqual({...primitiveState, num: 43});
      expect(result2).toEqual(primitiveState);
      expect(result3).toEqual(primitiveState);
    });
  });

  describe('functionality', () => {
    it('should merge 2 objects of the same type', () => {
      const result = patch(primitiveState, primitiveState);

      expect(result).toEqual(primitiveState);
    });

    it('should override original values with updates', () => {
      const result = patch(primitiveState, {...primitiveState, str: 'str2'});

      expect(result).toEqual({num: 42, bol: true, str: 'str2'});
    });

    it('should work with partial updates', () => {
      const result = patch(primitiveState, {str: 'str2'});

      expect(result).toEqual({num: 42, bol: true, str: 'str2'});
    });

    it('should return original object if updates are empty object', () => {
      const result = patch(primitiveState, {});

      expect(result).toEqual(primitiveState);
    });

  });

  describe('edge cases', () => {
    it('should work with empty initial object', () => {
      const result = patch({}, primitiveState);

      expect(result).toEqual(primitiveState);
    });

    it('should work if at least one argument not provided', () => {
      expect(patch(null as any, primitiveState)).toEqual(primitiveState);
      expect(patch(primitiveState, null as any)).toEqual(primitiveState);
      expect(patch(null as any, null as any)).toEqual({});
    });

    it('should work if at least one of inputs is not an object', () => {
      expect(patch(primitiveState, '' as any)).toEqual(primitiveState);
      expect(patch('' as any, primitiveState)).toEqual(primitiveState);
      expect(patch('' as any, '' as any)).toEqual({});
    });

    it('should work if at least one of objects is array', () => {
      expect(patch(primitiveState, [primitiveState] as any)).toEqual(primitiveState);
      expect(patch([primitiveState] as any, primitiveState)).toEqual(primitiveState);
      expect(patch([primitiveState] as any, [primitiveState] as any)).toEqual({});
    });
  })
});
