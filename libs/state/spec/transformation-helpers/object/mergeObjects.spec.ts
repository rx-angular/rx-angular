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

    it('should throw error if at least one input not provided', () => {
      expect(() => mergeObjects(null as any, primitiveState)).toThrow(Error);
      expect(() => mergeObjects(primitiveState, null as any)).toThrow(Error);
      expect(() => mergeObjects(null as any, null as any)).toThrow(Error);
    });

    it('should throw error if at least one of inputs is not an object', () => {
      expect(() => mergeObjects(primitiveState, '' as any)).toThrow(Error);
      expect(() => mergeObjects('' as any, primitiveState)).toThrow(Error);
      expect(() => mergeObjects('' as any, '' as any)).toThrow(Error);
    });

    it('should throw error if at least on of objects is array', () => {
      expect(() => mergeObjects(primitiveState, [primitiveState] as any)).toThrow(Error);
      expect(() => mergeObjects([primitiveState] as any, primitiveState)).toThrow(Error);
      expect(() => mergeObjects([primitiveState] as any, [primitiveState] as any)).toThrow(Error);
    });
  })
});
