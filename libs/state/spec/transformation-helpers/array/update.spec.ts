import { update } from "@rx-angular/state";

interface Creature {
  id: number;
  type: string;
}

const creaturesForUpdate: Creature[] = [{id: 1, type: 'lion'}, {id: 2, type: 'wolf'}];
let creatures: Creature[];
let creaturesAfterSingleItemUpdate: Creature[];
let creaturesAfterMultipleItemsUpdate: Creature[];

beforeEach(() => {
  creatures = [{id: 1, type: 'cat'}, {id: 2, type: 'dog'}, {id: 3, type: 'catDog'}];
  creaturesAfterMultipleItemsUpdate = [{id: 1, type: 'lion'}, {id: 2, type: 'wolf'}, {id: 3, type: 'catDog'}];
  creaturesAfterSingleItemUpdate = [{id: 1, type: 'lion'}, {id: 2, type: 'dog'}, {id: 3, type: 'catDog'}];
});


describe('update', () => {

  describe('general', () => {
    it('should be defined', () => {
      const fn = update;
      expect(fn).toBeDefined();
    });

    it('should not mutate array', () => {
      const originalCreatures = [...creatures];
      update(originalCreatures, creaturesForUpdate[0], (o, n) => o.id === n.id);

      expect(originalCreatures).toEqual(creatures);
    });
  });

  describe('functionality', () => {
    it('should update single value', () => {
      const creaturesResult = update(creatures, creaturesForUpdate[0], (o, n) => o.id === n.id);

      expect(creaturesResult).toEqual(creaturesAfterSingleItemUpdate);
    });

    it('should update multiple values', () => {
      const updatedCreatures = [{id: 1, type: 'lion'}, {id: 2, type: 'wolf'}];
      const creaturesResult = update(creatures, updatedCreatures, (o, n) => o.id === n.id);

      expect(creaturesResult).toEqual(creaturesAfterMultipleItemsUpdate);
    });
  });

  describe('edge cases', () => {
    it('should work with empty values', () => {
      const emptyCreatures: Creature[] = [];

      expect(update(emptyCreatures, creatures, (a, b) => a.id === b.id)).toEqual([]);
      expect(update(creatures, [], (a, b) => a.id === b.id)).toEqual(creatures);
    });

    it('should work when one or both inputs not provided', () => {
      expect(update(null as any, creatures)).toEqual(creatures);
      expect(update(creatures, null as any)).toEqual(creatures);
      expect(update(null as any, null as any)).toEqual([]);
    });

    it('should work when initial array is not array', () => {
      expect(update('' as any, creatures)).toEqual(creatures);
      expect(update(1 as any, creatures)).toEqual(creatures);
      expect(update({} as any, creatures)).toEqual(creatures);
      expect(update(false as any, creatures)).toEqual(creatures);
    });
  });
});
