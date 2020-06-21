import { deleteProp } from "@rx-angular/state";
import { initialPrimitiveState, PrimitiveState } from '../../fixtures';

let primitiveState: PrimitiveState;

beforeEach(() => {
  primitiveState = initialPrimitiveState;
});


describe('deleteProp', () => {

  describe('general', () => {
    it('should be defined', () => {
      const fn = deleteProp;
      expect(fn).toBeDefined();
    });

    it('should not mutate object', () => {
      const simpleState = {...primitiveState};
      deleteProp(simpleState, 'bol');

      expect(simpleState).toEqual(primitiveState);
    });
  });

  describe('functionality', () => {
    it('should remove property', () => {
      const result = deleteProp(primitiveState, 'str');

      expect(result).toEqual({num: 42, bol: true});
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

    it('should return undefined  if object is null or undefiend', () => {
      expect(deleteProp(null as any, null as any)).toEqual(null);
      expect(deleteProp(undefined as any, 'fake')).toEqual(undefined);
    });

    it('should return empty object if first argument is not an object', () => {
      expect(deleteProp('' as any, 'fake')).toEqual({});
      expect(deleteProp(1 as any, 'fake')).toEqual({});
      expect(deleteProp(false as any, 'fake')).toEqual({});
      expect(deleteProp([], 'concat')).toEqual({});
    });
  })
});
