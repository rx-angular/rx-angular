import { insert } from '../../../src';

interface Creature {
  id: number;
  type: string;
}

let creatures: Creature[];

const creatureToAdd = { id: 3, type: 'catDog' };

beforeEach(() => {
  creatures = [
    { id: 1, type: 'cat' },
    { id: 2, type: 'dog' },
  ];
  jest.spyOn(console, 'warn').mockImplementation(() => {});
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

      expect(originalCreatures).toEqual([null, { id: 2, type: 'dog' }]);
      expect(result).toEqual([...creatures, creatureToAdd]);
      expect(result2).toEqual(creatures);
    });
  });

  describe('functionality', () => {
    it('should insert single value', () => {
      const creaturesResult = insert(creatures, creatureToAdd);
      const numbersResult = insert([1, 2], 42);

      expect(numbersResult).toEqual([1, 2, 42]);
      expect(creaturesResult).toEqual([...creatures, creatureToAdd]);
    });

    it('should insert multiple values', () => {
      const creaturesResult = insert(creatures, [creatureToAdd, creatureToAdd]);
      const numbersResult = insert([1, 2], [42, 84]);

      expect(numbersResult).toEqual([1, 2, 42, 84]);
      expect(creaturesResult).toEqual([
        ...creatures,
        creatureToAdd,
        creatureToAdd,
      ]);
    });
  });

  describe('edge cases', () => {
    describe('emtpy values', () => {
      it('should return updates if original array is empty', () => {
        const emptyObjectsArray: Creature[] = [];
        expect(insert(emptyObjectsArray, creatures)).toEqual(creatures);
      });

      it('should return original array if updates array is empty', () => {
        const emptyObjectsArray: Creature[] = [];
        expect(insert(creatures, emptyObjectsArray)).toEqual(creatures);
      });

      it('should return empty array if both original array and updates are empty', () => {
        expect(insert([], [])).toEqual([]);
      });
    });

    describe('undefined values', () => {
      it('should return updates if original array is undefined', () => {
        expect(insert(undefined as any, creatures)).toEqual(creatures);
      });

      it('should return original array if updates are undefined', () => {
        expect(insert(creatures, undefined as any)).toEqual(creatures);
      });

      it('should return undefined if both values are undefined', () => {
        expect(insert(undefined as any, undefined as any)).toEqual(undefined);
      });

      it('should return undefined if original array is null and updates are undefined', () => {
        expect(insert(undefined as any, null as any)).toEqual(undefined);
      });
    });

    describe('null values', () => {
      it('should return updates if original array is null', () => {
        expect(insert(null as any, creatures)).toEqual(creatures);
      });

      it('should return original array if updates are null', () => {
        expect(insert(creatures, null as any)).toEqual(creatures);
      });

      it('should return null if both values are null', () => {
        expect(insert(null as any, null as any)).toEqual(null);
      });

      it('should return null if original array is null and updates are undefined', () => {
        expect(insert(null as any, undefined as any)).toEqual(null);
      });
    });

    describe('unexpected value types', () => {
      it('should return updates if original array not an array', () => {
        expect(insert('' as any, creatures)).toEqual(creatures);
        expect(insert(1 as any, creatures)).toEqual(creatures);
        expect(insert({} as any, creatures)).toEqual(creatures);
        expect(insert(false as any, creatures)).toEqual(creatures);
      });

      it('should return array with updates if updates not matching expected type', () => {
        expect(insert(creatures, '' as any)).toEqual([...creatures, '']);
        expect(insert(creatures, 1 as any)).toEqual([...creatures, 1]);
        expect(insert(creatures, {} as any)).toEqual([...creatures, {}]);
        expect(insert(creatures, false as any)).toEqual([...creatures, false]);
      });

      it('should return original value if original value is not an array and updates not provided', () => {
        expect(insert(1 as any, undefined as any)).toEqual(1);
      });
    });
  });
});
