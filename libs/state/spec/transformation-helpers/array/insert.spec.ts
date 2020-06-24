import { insert } from "@rx-angular/state";

interface Creature {
  id: number;
  type: string;
}

let creatures: Creature[];

const creatureToAdd = {id: 3, type: 'catDog'};

beforeEach(() => {
  creatures = [{id: 1, type: 'cat'}, {id: 2, type: 'dog'}];
});

describe('insert', () => {

  describe('general', () => {
    it('should be defined', () => {
      const fn = insert;
      expect(fn).toBeDefined();
    });

    it('should not mutate array', () => {
      const originalCreatures = [...creatures];
      insert(originalCreatures, creatureToAdd);

      expect(originalCreatures).toEqual(creatures);
    });

    it('should not return same reference', () => {
      const originalCreatures = [...creatures];
      const result = insert(originalCreatures, creatureToAdd);
      const result2 = insert(null as any, originalCreatures);

      originalCreatures[0] = null as any;

      expect(originalCreatures).toEqual([null, {id: 2, type: 'dog'}]);
      expect(result).toEqual([...creatures, creatureToAdd]);
      expect(result2).toEqual(creatures);
    });
  });

  describe('functionality', () => {
    it('should insert single value', () => {
      const creaturesResult = insert(creatures, creatureToAdd);
      const numbersResult = insert([1,2], 42);

      expect(numbersResult).toEqual([1,2,42]);
      expect(creaturesResult).toEqual([...creatures, creatureToAdd]);
    });

    it('should insert multiple values', () => {
      const creaturesResult = insert(creatures, [creatureToAdd, creatureToAdd]);
      const numbersResult = insert([1,2], [42, 84]);

      expect(numbersResult).toEqual([1,2,42,84]);
      expect(creaturesResult).toEqual([...creatures, creatureToAdd, creatureToAdd]);
    });
  });

  describe('edge cases', () => {
    it('should work with empty values', () => {
      const emptyObjectsArray: Creature[]  = [];

      expect(insert(emptyObjectsArray, creatures)).toEqual(creatures);
      expect(insert(creatures, emptyObjectsArray)).toEqual(creatures);
      expect(insert([], [])).toEqual([]);
    });

    it('should work if one or multiple inputs not provided', () => {
      expect(insert(null as any, creatures)).toEqual(creatures);
      expect(insert(creatures, null as any)).toEqual(creatures);
      expect(insert(null as any, null as any)).toEqual([]);
    });

    it('should work when initial array is not array', () => {
      expect(insert('' as any, creatures)).toEqual(creatures);
      expect(insert(1 as any, creatures)).toEqual(creatures);
      expect(insert({} as any, creatures)).toEqual(creatures);
      expect(insert(false as any, creatures)).toEqual(creatures);
    });

  });
});
