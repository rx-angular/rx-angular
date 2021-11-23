import { update } from '@rx-angular/state';

interface Creature {
  id: number;
  type: string;
  name: string;
}

const creaturesForUpdate: Creature[] = [
  { id: 1, type: 'lion', name: 'Bella' },
  {
    id: 2,
    type: 'wolf',
    name: 'Sparky',
  },
];
let creatures: Creature[];
let creaturesAfterSingleItemUpdate: Creature[];
let creaturesAfterMultipleItemsUpdate: Creature[];

beforeEach(() => {
  creatures = [
    { id: 1, type: 'cat', name: 'Bella' },
    { id: 2, type: 'dog', name: 'Sparky' },
    {
      id: 3,
      type: 'catDog',
      name: 'Cat-Dog',
    },
  ];
  creaturesAfterMultipleItemsUpdate = [
    { id: 1, type: 'lion', name: 'Bella' },
    {
      id: 2,
      type: 'wolf',
      name: 'Sparky',
    },
    { id: 3, type: 'catDog', name: 'Cat-Dog' },
  ];
  creaturesAfterSingleItemUpdate = [
    { id: 1, type: 'lion', name: 'Bella' },
    {
      id: 2,
      type: 'dog',
      name: 'Sparky',
    },
    { id: 3, type: 'catDog', name: 'Cat-Dog' },
  ];
  jest.spyOn(console, 'warn').mockImplementation(() => {});
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

    it('should not return same reference', () => {
      const originalCreatures = [...creatures];
      const result = update(
        originalCreatures,
        creaturesForUpdate[0],
        (o, n) => o.id === n.id
      );

      originalCreatures[0] = null as any;

      expect(originalCreatures).toEqual([
        null,
        { id: 2, type: 'dog', name: 'Sparky' },
        {
          id: 3,
          type: 'catDog',
          name: 'Cat-Dog',
        },
      ]);
      expect(result).toEqual(creaturesAfterSingleItemUpdate);
    });
  });

  describe('functionality', () => {
    it('should update value if matching by compareFn', () => {
      expect(
        update(creatures, creaturesForUpdate, (a, b) => a.id === b.id)
      ).toEqual(creaturesAfterMultipleItemsUpdate);
    });

    it('should update value if matching by key', () => {
      expect(update(creatures, creaturesForUpdate, 'id')).toEqual(
        creaturesAfterMultipleItemsUpdate
      );
    });

    it('should update value if matching by array of keys', () => {
      expect(update(creatures, creaturesForUpdate, ['id'])).toEqual(
        creaturesAfterMultipleItemsUpdate
      );
    });

    it('should update partials', () => {
      expect(update(creatures, { id: 1, type: 'lion' }, 'id')).toEqual(
        creaturesAfterSingleItemUpdate
      );
    });
  });

  describe('edge cases', () => {
    describe('empty values', () => {
      it('should leave original array empty if calling update on empty array', () => {
        const emptyObjectsArray: Creature[] = [];
        expect(update(emptyObjectsArray, creatures)).toEqual(emptyObjectsArray);
      });

      it('should return original array if updates array is empty', () => {
        const emptyObjectsArray: Creature[] = [];
        expect(update(creatures, emptyObjectsArray)).toEqual(creatures);
      });

      it('should return empty array if both original array and updates are empty', () => {
        expect(update([], [])).toEqual([]);
      });
    });

    describe('undefined values', () => {
      it('should return source if source is undefined', () => {
        expect(update(undefined as any, creatures)).toEqual(undefined);
      });

      it('should return original array if updates are undefined', () => {
        expect(update(creatures, undefined as any)).toEqual(creatures);
      });

      it('should return undefined if both values are undefined', () => {
        expect(update(undefined as any, undefined as any)).toEqual(undefined);
      });

      it('should return undefined if original array is null and updates are undefined', () => {
        expect(update(undefined as any, null as any)).toEqual(undefined);
      });
    });

    describe('null values', () => {
      it('should return source if source is null', () => {
        expect(update(null as any, creatures)).toEqual(null);
      });

      it('should return original array if updates are null', () => {
        expect(update(creatures, null as any)).toEqual(creatures);
      });

      it('should return null if both values are null', () => {
        expect(update(null as any, null as any)).toEqual(null);
      });

      it('should return null if original array is null and updates are undefined', () => {
        expect(update(null as any, undefined as any)).toEqual(null);
      });
    });

    describe('unexpected value types', () => {
      it('should return source if source not an array', () => {
        expect(update(1 as any, creatures)).toEqual(1);
      });

      it('should return original array if updates not matching expected type', () => {
        expect(update(creatures, {} as any)).toEqual(creatures);
      });

      it('should return original value if original value is not an array and updates not provided', () => {
        expect(update(1 as any, undefined as any)).toEqual(1);
      });
    });
  });
});
