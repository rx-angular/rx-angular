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

    it('should throw error when at least one of inputs not provided', () => {
      expect(() => insert(null as any, 1)).toThrow(Error);
      expect(() => insert(creatures, null as any)).toThrow(Error);
      expect(() => insert(null as any, null as any)).toThrow(Error);
    });
  })
});
