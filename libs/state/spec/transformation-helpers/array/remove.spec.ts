import { remove } from "@rx-angular/state/transformations";

interface Creature {
  id: number;
  type: string;
}

const creaturesForRemove: Creature[] = [{id: 1, type: 'cat'}, {id: 2, type: 'dog'}];
let creatures: Creature[];
let creaturesAfterSingleItemRemove: Creature[];
let creaturesAfterMultipleItemsRemove: Creature[];

beforeEach(() => {
  creatures = [{id: 1, type: 'cat'}, {id: 2, type: 'dog'}, {id: 3, type: 'catDog'}];
  creaturesAfterSingleItemRemove = [{id: 2, type: 'dog'}, {id: 3, type: 'catDog'}];
  creaturesAfterMultipleItemsRemove= [{id: 3, type: 'catDog'}];
});


describe('remove', () => {

  describe('general', () => {
    it('should be defined', () => {
      const fn = remove;
      expect(fn).toBeDefined();
    });

    it('should not mutate array', () => {
      const originalCreatures = [...creatures];
      remove(originalCreatures, creaturesForRemove[0], (o, n) => o.id === n.id);

      expect(originalCreatures.length).toEqual(3);
    });
  });

  describe('functionality', () => {

    describe('primitives', () => {

      it('should remove single value', () => {
        expect(remove([1,2], 2)).toEqual([1]);
      });

      it('should remove multiple values', () => {
        expect(remove([1,2], [1,2])).toEqual([]);
      });

      it('should remove values with compareFn', () => {
        expect(remove([1,2], [1,2], (a, b) => a.toString() === b.toString())).toEqual([]);
      });

    });

    describe('non-primitives', () => {

      it('should remove value if reference is the same', () => {
        expect(remove(creatures, creatures)).toEqual([]);
      });

      it('should remove value if matching by compareFn', () => {
        expect(remove(creatures, creaturesForRemove, (a, b) => a.id === b.id)).toEqual(creaturesAfterMultipleItemsRemove);
      });

      it('should remove value if matching by key', () => {
        expect(remove(creatures, creaturesForRemove, 'id')).toEqual(creaturesAfterMultipleItemsRemove);
      });

      it('should remove value if matching by array of keys', () => {
        expect(remove(creatures, creaturesForRemove, ['id',  'type'])).toEqual(creaturesAfterMultipleItemsRemove);
      });

      it('should remove partials', () => {
        expect(remove(creatures, {id: 1}, (o, n) => o.id === n.id)).toEqual(creaturesAfterSingleItemRemove);
      });

    });
  });

  describe('edge cases', () => {

    describe('empty values', () => {

      it('should return empty array if original array was empty', () => {
        const emptyCreatures: Creature[] = [];
        expect(remove(emptyCreatures, creatures, (a, b) => a.id === b.id)).toEqual([]);
      });

      it('should return original array if items are empty', () => {
        expect(remove(creatures, [], (a, b) => a.id === b.id)).toEqual(creatures);
      });

      it('should return empty array if both arguments are empty arrays', () => {
        expect(remove([], [])).toEqual([]);
      });

    });

    describe('null values', () => {

      it('should return null if original array is null', () => {
        expect(remove(null as any, creatures)).toEqual(null);
      });

      it('should return original array is items are null', () => {
        expect(remove(creatures, null as any)).toEqual(creatures);
      });

      it('should return null if original array is null', () => {
        expect(remove(null as any, null as any)).toEqual(null);
      });

      it('should return null if oriignal array is null and items are undefined', () => {
        expect(remove(null as any, undefined as any)).toEqual(null);
      });

    });

    describe('undefined values', () => {

      it('should return undefined if original array is null', () => {
        expect(remove(undefined as any, creatures)).toEqual(undefined);
      });

      it('should return original array is items are undefined', () => {
        expect(remove(creatures, undefined as any)).toEqual(creatures);
      });

      it('should return undefined if original array is undefined', () => {
        expect(remove(undefined as any, undefined as any)).toEqual(undefined);
      });

      it('should return undefined if oriignal array is null and items are null', () => {
        expect(remove(undefined as any, null as any)).toEqual(undefined);
      });

    });

    describe('unexpected values', () => {
      it('should return original value is original value is not an array', () => {
        expect(remove(false as any, creatures)).toEqual(false);
      });

    });
  })
});
