import { remove } from "@rx-angular/state";

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
    it('should remove single value', () => {
      const creaturesResult = remove(creatures, creaturesForRemove[0], (o, n) => o.id === n.id);
      const numbersResult = remove([1,2], 2);

      expect(numbersResult).toEqual([1]);
      expect(creaturesResult).toEqual(creaturesAfterSingleItemRemove);
    });

    it('should remove multiple values', () => {
      const creaturesResult = remove(creatures, creaturesForRemove, (o, n) => o.id === n.id);
      const numbersResult = remove([1, 2, 3], [1, 2]);

      expect(numbersResult).toEqual([3]);
      expect(creaturesResult).toEqual(creaturesAfterMultipleItemsRemove);
    });

    it('should remove non-primitive values which has the same reference without compareFn', () => {
      const creaturesResult = remove(creatures, creatures);

      expect(creaturesResult).toEqual([]);
    });

    it('should NOT remove non-primitive values which has different reference without compareFn', () => {
      const creaturesResult = remove(creatures, creaturesForRemove[0]);

      expect(creaturesResult).toEqual(creatures);
    });

    it('should work with partials', () => {
      const creaturesResult = remove(creatures, {id: 1}, (o, n) => o.id === n.id);

      expect(creaturesResult).toEqual(creaturesAfterSingleItemRemove);
    });
  });

  describe('edge cases', () => {
    it('should work with empty values', () => {
      const emptyCreatures: Creature[] = [];

      expect(remove(emptyCreatures, creatures, (a, b) => a.id === b.id)).toEqual([]);
      expect(remove(creatures, [], (a, b) => a.id === b.id)).toEqual(creatures);
      expect(remove([], [])).toEqual([]);
    });

    it('should work if one or both arguments are null', () => {
      expect(remove(null as any, creatures)).toEqual(null);
      expect(remove(creatures, null as any)).toEqual(creatures);
      expect(remove(null as any, null as any)).toEqual(null);
    });

    it('should work when initial array is not array', () => {
      expect(remove('' as any, creatures)).toEqual([]);
      expect(remove(1 as any, creatures)).toEqual([]);
      expect(remove({} as any, creatures)).toEqual([]);
      expect(remove(false as any, creatures)).toEqual([]);
    });
  })
});
