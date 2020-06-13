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

    it('should throw error if first argument is not an object', () => {
      expect(() => deleteProp('' as any, 'fake')).toThrow(Error);
    });

    it('should throw error if at least one input not provied', () => {
      expect(() => deleteProp(null as any, 'fake')).toThrow(Error);
      expect(() => deleteProp(primitiveState, null as any)).toThrow(Error);
      expect(() => deleteProp(null as any, null as any)).toThrow(Error);
    });

    it('should throw error if object is array', () => {
      expect(() => deleteProp([primitiveState], 'concat')).toThrow(Error);
    });
  })
});
