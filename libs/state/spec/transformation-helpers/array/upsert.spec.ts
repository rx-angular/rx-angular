// tslint:disable-next-line:nx-enforce-module-boundaries
import { insert, upsert } from '@rx-angular/state';

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
const creatureToAdd = { id: 3, type: 'catDog' };

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

describe('upsert', () => {
  describe('general', () => {
    it('should be defined', () => {
      const fn = upsert;
      expect(fn).toBeDefined();
    });
  });

  describe('update', () => {
    describe('general', () => {
      it('should not mutate array', () => {
        const originalCreatures = [...creatures];
        upsert(
          originalCreatures,
          creaturesForUpdate[0],
          (o, n) => o.id === n.id
        );

        expect(originalCreatures).toEqual(creatures);
      });

      it('should not return same reference', () => {
        const originalCreatures = [...creatures];
        const result = upsert(
          originalCreatures,
          creaturesForUpdate[0],
          (o, n) => o.id === n.id
        );
        const result2 = upsert(null as any, originalCreatures);

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
        expect(result2).toEqual(creatures);
      });
    });
    describe('functionality', () => {
      it('should update value if matching by compareFn', () => {
        expect(
          upsert(creatures, creaturesForUpdate, (a, b) => a.id === b.id)
        ).toEqual(creaturesAfterMultipleItemsUpdate);
      });

      it('should update value if matching by key', () => {
        expect(upsert(creatures, creaturesForUpdate, 'id')).toEqual(
          creaturesAfterMultipleItemsUpdate
        );
      });

      it('should update value if matching by array of keys', () => {
        expect(upsert(creatures, creaturesForUpdate, ['id'])).toEqual(
          creaturesAfterMultipleItemsUpdate
        );
      });

      it('should update partials', () => {
        expect(upsert(creatures, { id: 1, type: 'lion' }, 'id')).toEqual(
          creaturesAfterSingleItemUpdate
        );
      });
    });

    describe('edge cases', () => {
      describe('emtpy values', () => {
        it('should return updates if original array is empty', () => {
          const emptyObjectsArray: Creature[] = [];
          expect(upsert(emptyObjectsArray, creatures)).toEqual(creatures);
        });

        it('should return original array if updates array is empty', () => {
          const emptyObjectsArray: Creature[] = [];
          expect(upsert(creatures, emptyObjectsArray)).toEqual(creatures);
        });

        it('should return empty array if both original array and updates are empty', () => {
          expect(upsert([], [])).toEqual([]);
        });
      });

      describe('undefined values', () => {
        it('should return updates if original array is undefined', () => {
          expect(upsert(undefined as any, creatures)).toEqual(creatures);
        });

        it('should return original array if updates are undefined', () => {
          expect(upsert(creatures, undefined as any)).toEqual(creatures);
        });

        it('should return undefined if both values are undefined', () => {
          expect(upsert(undefined as any, undefined as any)).toEqual(undefined);
        });

        it('should return undefined if original array is null and updates are undefined', () => {
          expect(upsert(undefined as any, null as any)).toEqual(undefined);
        });
      });

      describe('null values', () => {
        it('should return updates if original array is null', () => {
          expect(upsert(null as any, creatures)).toEqual(creatures);
        });

        it('should return original array if updates are null', () => {
          expect(upsert(creatures, null as any)).toEqual(creatures);
        });

        it('should return null if both values are null', () => {
          expect(upsert(null as any, null as any)).toEqual(null);
        });

        it('should return null if original array is null and updates are undefined', () => {
          expect(upsert(null as any, undefined as any)).toEqual(null);
        });
      });

      describe('unexpected value types', () => {
        it('should return updates if original array not an array', () => {
          expect(upsert(1 as any, creatures)).toEqual(creatures);
        });

        it('should return original value if original value is not an array and updates not provided', () => {
          expect(upsert(1 as any, undefined as any)).toEqual(1);
        });
      });
    });
  });

  describe('insert', () => {
    describe('general', () => {
      it('should not mutate array', () => {
        const originalCreatures = [...creatures];
        upsert(originalCreatures, creatureToAdd);

        expect(originalCreatures).toEqual(creatures);
      });

      it('should not return same reference', () => {
        const originalCreatures = [...creatures];
        const result = upsert(originalCreatures, creatureToAdd);
        const result2 = upsert(null as any, originalCreatures);

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
        expect(result).toEqual([...creatures, creatureToAdd]);
        expect(result2).toEqual(creatures);
      });
    });

    describe('functionality', () => {
      it('should insert single value', () => {
        const creaturesResult = upsert(creatures, creatureToAdd);
        const numbersResult = upsert([1, 2], 42);

        expect(numbersResult).toEqual([1, 2, 42]);
        expect(creaturesResult).toEqual([...creatures, creatureToAdd]);
      });

      it('should insert multiple values', () => {
        const creaturesResult = upsert(creatures, [
          creatureToAdd,
          creatureToAdd,
        ]);
        const numbersResult = upsert([1, 2], [42, 84]);

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
          expect(upsert(emptyObjectsArray, creatures)).toEqual(creatures);
        });

        it('should return original array if updates array is empty', () => {
          const emptyObjectsArray: Creature[] = [];
          expect(upsert(creatures, emptyObjectsArray)).toEqual(creatures);
        });

        it('should return empty array if both original array and updates are empty', () => {
          expect(upsert([], [])).toEqual([]);
        });
      });

      describe('undefined values', () => {
        it('should return updates if original array is undefined', () => {
          expect(upsert(undefined as any, creatures)).toEqual(creatures);
        });

        it('should return original array if updates are undefined', () => {
          expect(upsert(creatures, undefined as any)).toEqual(creatures);
        });

        it('should return undefined if both values are undefined', () => {
          expect(upsert(undefined as any, undefined as any)).toEqual(undefined);
        });

        it('should return undefined if original array is null and updates are undefined', () => {
          expect(upsert(undefined as any, null as any)).toEqual(undefined);
        });
      });

      describe('null values', () => {
        it('should return updates if original array is null', () => {
          expect(upsert(null as any, creatures)).toEqual(creatures);
        });

        it('should return original array if updates are null', () => {
          expect(upsert(creatures, null as any)).toEqual(creatures);
        });

        it('should return null if both values are null', () => {
          expect(upsert(null as any, null as any)).toEqual(null);
        });

        it('should return null if original array is null and updates are undefined', () => {
          expect(upsert(null as any, undefined as any)).toEqual(null);
        });
      });

      describe('unexpected value types', () => {
        it('should return updates if original array not an array', () => {
          expect(upsert('' as any, creatures)).toEqual(creatures);
          expect(upsert(1 as any, creatures)).toEqual(creatures);
          expect(upsert({} as any, creatures)).toEqual(creatures);
          expect(upsert(false as any, creatures)).toEqual(creatures);
        });

        it('should return array with updates if updates not matching expected type', () => {
          expect(upsert(creatures, '' as any)).toEqual([...creatures, '']);
          expect(upsert(creatures, 1 as any)).toEqual([...creatures, 1]);
          expect(upsert(creatures, {} as any)).toEqual([...creatures, {}]);
          expect(upsert(creatures, false as any)).toEqual([
            ...creatures,
            false,
          ]);
        });

        it('should return original value if original value is not an array and updates not provided', () => {
          expect(upsert(1 as any, undefined as any)).toEqual(1);
        });
      });
    });
  });
});
