import { extract } from '@rx-angular/state';

interface Creature {
  id?: number;
  type?: string;
  name?: string;
}

let creatures: Creature[];
let partialCreatures: Creature[];
const creaturesNames = [{ name: 'Emma' }, { name: 'Sparky' }];
const creaturesWithoutType = [
  { id: 1, name: 'Emma' },
  { id: 2, name: 'Sparky' },
];
const partialCreaturesWithNames = [
  { id: 1, type: 'cat', name: 'Emma' },
  { id: 2, type: 'dog', name: undefined },
];
const creaturesFromNotConsistentArray = [
  { id: 1, name: 'Emma' },
  { id: undefined, name: undefined },
  { id: undefined, name: undefined },
];

beforeEach(() => {
  creatures = [
    { id: 1, type: 'cat', name: 'Emma' },
    { id: 2, type: 'dog', name: 'Sparky' },
  ];
  partialCreatures = [
    { id: 1, type: 'cat', name: 'Emma' },
    { id: 2, type: 'dog' },
  ];
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

describe('extract', () => {
  describe('general', () => {
    it('should be defined', () => {
      const fn = extract;
      expect(fn).toBeDefined();
    });

    it('should not mutate array', () => {
      const originalCreatures = [...creatures];
      extract(originalCreatures, ['name']);

      expect(originalCreatures).toEqual(creatures);
    });

    it('should not return same reference', () => {
      const originalCreatures = [...creatures];
      const result = extract(originalCreatures, 'name');
      const result2 = extract(originalCreatures, null as any);

      originalCreatures[0] = {};

      expect(originalCreatures).toEqual([
        {},
        { id: 2, type: 'dog', name: 'Sparky' },
      ]);
      expect(result).toEqual(creaturesNames);
      expect(result2).toEqual(undefined);
    });
  });

  describe('functionality', () => {
    it('should get single key', () => {
      const result = extract(creatures, 'name');

      expect(result).toEqual(creaturesNames);
    });

    it('should get array of keys', () => {
      const result = extract(creatures, ['name', 'id']);

      expect(result).toEqual(creaturesWithoutType);
    });

    it('should extract only existing keys', () => {
      const result = extract(creatures, [
        'name',
        'id',
        'nonExistingProp',
      ] as any);

      expect(result).toEqual(creaturesWithoutType);
    });
    it('should extract only existing keys', () => {
      const result = extract(creatures, [
        'name',
        'id',
        'nonExistingProp',
      ] as any);

      expect(result).toEqual(creaturesWithoutType);
    });

    it('should extract key if it is defined in at least one item', () => {
      const result = extract(partialCreatures, ['name', 'id', 'type'] as any);
      const result2 = extract(
        [{ id: 1, type: 'cat', name: 'Emma' }, 1, 'string'] as any,
        ['id', 'name'] as any
      );

      expect(result).toEqual(partialCreaturesWithNames);
      expect(result2).toEqual(creaturesFromNotConsistentArray);
    });
  });

  describe('edge cases', () => {
    it('should return object with provided property if first argument is not an object', () => {
      expect(extract('' as any, 'fake' as any)).toEqual(undefined);
      expect(extract(null as any, 'fake' as any)).toEqual(undefined);
      expect(extract(undefined as any, 'fake' as any)).toEqual(undefined);
      expect(extract(null as any, null as any)).toEqual(undefined);
      expect(extract(creatures, {} as any)).toEqual(undefined);
      expect(extract(creatures, [] as any)).toEqual(undefined);
      expect(extract(creatures, 1 as any)).toEqual(undefined);
      expect(extract(creatures, null as any)).toEqual(undefined);
      expect(extract(creatures, undefined as any)).toEqual(undefined);
      expect(extract(creatures, (() => null) as any)).toEqual(undefined);
      expect(extract(creatures, ['nonExisting', 1] as any)).toEqual(undefined);
    });
  });
});
