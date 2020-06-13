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

    it('should throw error when at least one input not provided', () => {
      expect(() => update(null as any, creatures)).toThrow(Error);
      expect(() => update(creatures, null as any)).toThrow(Error);
      expect(() => update(null as any, null as any)).toThrow(Error);
    });
  });
});
