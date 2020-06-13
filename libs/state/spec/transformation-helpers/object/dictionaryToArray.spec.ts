import { dictionaryToArray } from "@rx-angular/state";
import { PrimitiveState, initialPrimitiveState } from '../../fixtures';


interface Creature {
  id: number;
  type: string;
  real: boolean;
  breeds: string[];
}

describe('dictionaryToArray', () => {

  describe('general', () => {
    it('should be defined', () => {
      const fn = dictionaryToArray;

      expect(fn).toBeDefined();
    });
  });

  describe('functionality', () => {
    it('should create array from dictionary object', () => {
      const dictionary: {[key: string]: Creature} = {
        cat: {id: 1, type: 'cat', real: true, breeds: ['Persian']},
        dog: {id: 2, type: 'dog', real: true, breeds: ['Doberman']},
        catDog: {id: 3, type: 'catDog', real: false, breeds: []}
      };
      const arrayFromDictionary = [
        {id: 1, type: 'cat', real: true, breeds: ['Persian']},
        {id: 2, type: 'dog', real: true, breeds: ['Doberman']},
        {id: 3, type: 'catDog', real: false, breeds: []}
      ];
      const arrayResult = dictionaryToArray(dictionary);

      expect(arrayResult).toEqual(arrayFromDictionary);
    });
  });

  describe('edge cases', () => {
    it('should create array from mixed object', () => {
      const mixedObject = initialPrimitiveState;
      const arrayFromMixedObject = ['str', 42, true];
      const arrayResult = dictionaryToArray(mixedObject as any);

      expect(arrayResult).toEqual(arrayFromMixedObject);
    });

    it('should work with empty initial object', () => {
      const arrayResult = dictionaryToArray({});

      expect(arrayResult).toEqual([]);
    });

    it('should throw error if dictionary is not provided', () => {
      expect(() => dictionaryToArray(null as any)).toThrow(Error);
    });

    it('should throw error if dictionary is not an object', () => {
      expect(() => dictionaryToArray('' as any)).toThrow(Error);
    });
  })
});
