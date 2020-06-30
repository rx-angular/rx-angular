import { setProp } from "@rx-angular/state";
import { initialPrimitiveState, PrimitiveState, NestedState, initialNestedState } from '../../fixtures';

let primitiveState: PrimitiveState;
let nestedState: NestedState;

beforeEach(() => {
  primitiveState = initialPrimitiveState;
  nestedState = initialNestedState;
});


describe('setProp', () => {

  describe('general', () => {
    it('should be defined', () => {
      const fn = setProp;
      expect(fn).toBeDefined();
    });

    it('should not mutate object', () => {
      const simpleState = {...primitiveState};
      setProp(simpleState, 'bol', false);

      expect(simpleState).toEqual(primitiveState);
    });

    it('should not return same reference', () => {
      const simpleState = {...primitiveState};
      const result = setProp(simpleState, 'num', 43);
      const result2 = setProp(simpleState, null as any, 42);

      simpleState.bol = false;

      expect(simpleState).toEqual({num: 42, bol: false, str: 'str'});
      expect(result).toEqual({...primitiveState, num: 43});
      expect(result2).toEqual(primitiveState);
    });
  });

  describe('functionality', () => {
    it('should set primitive property', () => {
      const result = setProp(primitiveState, 'str', 'str2');

      expect(result).toEqual({num: 42, bol: true, str: 'str2'});
    });

    it('should set non-primitive property', () => {
      const result = setProp(nestedState, 'obj', {key1: {key11: {key111: 'hello'}}});

      expect(result).toEqual({obj: {key1: {key11: {key111: 'hello'}}}});
    });

    it('should set property if value not initialized yet', () => {
      const state: Partial<PrimitiveState> = {str: 'str', num: 42};
      const result = setProp(state, 'bol', true);

      expect(result).toEqual(primitiveState);
    });
  });

  describe('edge cases', () => {
    it('should return object with provided property if first argument is not an object', () => {
      expect(setProp('' as any, 'fake' as any, 42)).toEqual({fake: 42});
      expect(setProp('' as any, 'fake' as any, 42)).toEqual({fake: 42});
      expect(setProp(null as any, 'fake', 42)).toEqual({fake: 42});
      expect(setProp(undefined as any, 'fake', 42)).toEqual({fake: 42});
      expect(setProp(null as any, null as any, 42)).toEqual({});
      expect(setProp([primitiveState], 'concat', 32 as any)).toEqual({concat: 32});
    });

    it('should initialize non-existing key', () => {
      expect(setProp(primitiveState, 'fake' as any, 42)).toEqual({...primitiveState, fake: 42});
    });

    it('should return original object if key not found/not provided', () => {
      expect(setProp(primitiveState, null as any, 42)).toEqual(primitiveState);
    });
  });
});
