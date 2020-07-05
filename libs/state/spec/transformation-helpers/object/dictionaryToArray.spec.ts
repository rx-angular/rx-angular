import { initialPrimitiveState } from '../../fixtures';
import { dictionaryToArray } from '@rx-angular/state';


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

    it('should return undefined or null if dictionary null or undefined', () => {
      expect(dictionaryToArray(null as any)).toEqual(null);
      expect(dictionaryToArray(undefined as any)).toEqual(undefined);
    });

    it('should return empty array if dictionary is not an object', () => {
      expect(dictionaryToArray('' as any)).toEqual([]);
      expect(dictionaryToArray(1 as any)).toEqual([]);
      expect(dictionaryToArray(false as any)).toEqual([]);
      expect(dictionaryToArray({} as any)).toEqual([]);
    });
  })
});
