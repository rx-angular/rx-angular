import { mergeObjects } from "@rx-angular/state";
import { initialPrimitiveState, PrimitiveState, NestedState, initialNestedState } from '../../fixtures';

let primitiveState: PrimitiveState;
let nestedState: NestedState;

beforeEach(() => {
  primitiveState = initialPrimitiveState;
  nestedState = initialNestedState;
});

describe('mergeObjects', () => {

  describe('general', () => {
    it('should be defined', () => {
      const fn = mergeObjects;
      expect(fn).toBeDefined();
    });

    it('should not return same reference', () => {
      const simpleState = {...primitiveState};
      const result = mergeObjects(simpleState, {num: 43});
      const result2 = mergeObjects(null as any, simpleState);
      const result3 = mergeObjects([] as any, simpleState);

      simpleState.bol = false;

      expect(simpleState).toEqual({num: 42, bol: false, str: 'str'});
      expect(result).toEqual({...primitiveState, num: 43});
      expect(result2).toEqual(primitiveState);
      expect(result3).toEqual(primitiveState);
    });
  });

  describe('functionality', () => {
    it('should merge 2 objects of the same type', () => {
      const result = mergeObjects(primitiveState, primitiveState);

      expect(result).toEqual(primitiveState);
    });

    it('should override original values with updates', () => {
      const result = mergeObjects(primitiveState, {...primitiveState, str: 'str2'});

      expect(result).toEqual({num: 42, bol: true, str: 'str2'});
    });

    it('should work with partial updates', () => {
      const result = mergeObjects(primitiveState, {str: 'str2'});

      expect(result).toEqual({num: 42, bol: true, str: 'str2'});
    });

    it('should return original object if updates are empty object', () => {
      const result = mergeObjects(primitiveState, {});

      expect(result).toEqual(primitiveState);
    });

  });

  describe('edge cases', () => {
    it('should work with empty initial object', () => {
      const result = mergeObjects({}, primitiveState);

      expect(result).toEqual(primitiveState);
    });

    it('should work if at least one argument not provided', () => {
      expect(mergeObjects(null as any, primitiveState)).toEqual(primitiveState);
      expect(mergeObjects(primitiveState, null as any)).toEqual(primitiveState);
      expect(mergeObjects(null as any, null as any)).toEqual({});
    });

    it('should work if at least one of inputs is not an object', () => {
      expect(mergeObjects(primitiveState, '' as any)).toEqual(primitiveState);
      expect(mergeObjects('' as any, primitiveState)).toEqual(primitiveState);
      expect(mergeObjects('' as any, '' as any)).toEqual({});
    });

    it('should work if at least on of objects is array', () => {
      expect(mergeObjects(primitiveState, [primitiveState] as any)).toEqual(primitiveState);
      expect(mergeObjects([primitiveState] as any, primitiveState)).toEqual(primitiveState);
      expect(mergeObjects([primitiveState] as any, [primitiveState] as any)).toEqual({});
    });
  })
});
