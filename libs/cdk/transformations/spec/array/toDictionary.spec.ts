import { toDictionary } from '../../src/lib/array/toDictionary';

interface Creature {
  id: number;
  type: string;
  real: boolean;
  breeds: string[];
}

interface NestedCreature {
  id: number;
  meta: { code: string };
}

let creatures: Creature[];
let nestedCreatures: NestedCreature[];

const genus = Symbol('genus');

const dictionaryByNumber = {
  1: { id: 1, type: 'cat', real: true, breeds: ['Persian'] },
  2: { id: 2, type: 'dog', real: true, breeds: ['Doberman'] },
  3: { id: 3, type: 'catDog', real: false, breeds: [] },
};

const dictionaryByString = {
  cat: { id: 1, type: 'cat', real: true, breeds: ['Persian'] },
  dog: { id: 2, type: 'dog', real: true, breeds: ['Doberman'] },
  catDog: { id: 3, type: 'catDog', real: false, breeds: [] },
};

const dictionaryBySymbol = {
  felis: {
    id: 1,
    type: 'cat',
    real: true,
    breeds: ['Persian'],
    [genus]: 'felis',
  },
  canis: {
    id: 2,
    type: 'dog',
    real: true,
    breeds: ['Doberman'],
    [genus]: 'canis',
  },
  fake: { id: 3, type: 'catDog', real: false, breeds: [], [genus]: 'fake' },
};

const dictionaryByNestedKey = {
  A: { id: 1, meta: { code: 'A' } },
  B: { id: 2, meta: { code: 'B' } },
  C: { id: 3, meta: { code: 'C' } },
};

beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  creatures = [
    { id: 1, type: 'cat', real: true, breeds: ['Persian'] },
    { id: 2, type: 'dog', real: true, breeds: ['Doberman'] },
    { id: 3, type: 'catDog', real: false, breeds: [] },
  ];
  nestedCreatures = [
    { id: 1, meta: { code: 'A' } },
    { id: 2, meta: { code: 'B' } },
    { id: 3, meta: { code: 'C' } },
  ];
});

describe('toDictionary', () => {
  describe('general', () => {
    it('should be defined', () => {
      const fn = toDictionary;

      expect(fn).toBeDefined();
    });
  });

  describe('functionality', () => {
    it('should create dictionary by number', () => {
      const dictionaryResult = toDictionary(creatures, 'id');

      expect(dictionaryResult).toEqual(dictionaryByNumber);
    });

    it('should change the reference', () => {
      const dictionaryResult = toDictionary(creatures, 'id');

      expect(Object.values(dictionaryResult)[0] === creatures[0]).toBeFalsy();
    });

    it('should create dictionary by string', () => {
      const dictionaryResult = toDictionary(creatures, 'type');

      expect(dictionaryResult).toEqual(dictionaryByString);
    });

    it('should create dictionary by symbol', () => {
      const dictionaryResult = toDictionary(
        Object.values(dictionaryBySymbol),
        genus,
      );

      expect(dictionaryResult).toEqual(dictionaryBySymbol);
    });

    it('should create dictionary by nested property', () => {
      const dictionaryResult = toDictionary(
        nestedCreatures,
        (creature) => creature.meta.code,
      );

      expect(dictionaryResult).toEqual(dictionaryByNestedKey);
    });

    it('should create dictionary by computed key', () => {
      const dictionaryResult = toDictionary(
        creatures,
        (creature) => `${creature.id}-${creature.type}`,
      );

      expect(Object.keys(dictionaryResult)).toEqual([
        '1-cat',
        '2-dog',
        '3-catDog',
      ]);
      expect(dictionaryResult['1-cat']).toEqual(creatures[0]);
    });
  });

  describe('edge cases', () => {
    it('should work with empty initial array', () => {
      // @ts-ignore
      const dictionaryResult = toDictionary([] as any, 'fakeKey');

      expect(dictionaryResult).toEqual({});
    });

    it('should not call console.warn when key not found and source is empty', () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation();
      // @ts-ignore
      toDictionary([] as any, 'fakeKey');

      expect(spy).not.toHaveBeenCalled();
    });

    it('should call console.warn when key not found and source not empty', () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation();
      // @ts-ignore
      toDictionary([{ notFake: 1 }] as any, 'fakeKey');

      expect(spy).toHaveBeenCalled();
    });

    it('should return empty object if key does not exist', () => {
      expect(toDictionary(creatures, 'fake' as any)).toEqual({});
    });

    it('should return empty object when key value is not string, number or symbol', () => {
      expect(toDictionary(creatures, 'breeds' as any)).toEqual({});
    });

    it('should return empty object when selector returns not string, number or symbol', () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation();

      expect(
        toDictionary(creatures, (creature) => creature.breeds as any),
      ).toEqual({});
      expect(spy).toHaveBeenCalled();
    });

    it('should return empty object when key is not provided', () => {
      expect(toDictionary(creatures, null as any)).toEqual({});
    });

    it('should return empty object when first argument is not array', () => {
      // @ts-ignore
      expect(toDictionary('' as any, '')).toEqual({});
      // @ts-ignore
      expect(toDictionary({} as any, '')).toEqual({});
      // @ts-ignore
      expect(toDictionary(1 as any, '')).toEqual({});
      // @ts-ignore
      expect(toDictionary(false as any, '')).toEqual({});
    });

    it('should return null or undefined when array is not provided', () => {
      const arr: any[] = null as any;
      const arr2: any[] = undefined as any;
      expect(toDictionary(arr, '')).toEqual(null);
      expect(toDictionary(arr2, '')).toEqual(undefined);
    });
  });

  describe('prototype preservation', () => {
    class TestClass {
      constructor(
        public id: number,
        public value: string,
      ) {}

      getDescription(): string {
        return `${this.id}: ${this.value}`;
      }
    }

    it('should preserve prototype chain when converting class instances to dictionary', () => {
      const instances = [new TestClass(1, 'first'), new TestClass(2, 'second')];

      const result = toDictionary(instances, 'id');

      expect(result['1']).toBeInstanceOf(TestClass);
      expect(result['2']).toBeInstanceOf(TestClass);

      expect(result['1'].getDescription()).toBe('1: first');
      expect(result['2'].getDescription()).toBe('2: second');
    });

    it('should preserve prototype chain with string keys', () => {
      const instances = [new TestClass(1, 'cat'), new TestClass(2, 'dog')];

      const result = toDictionary(instances, 'value');

      expect(result['cat']).toBeInstanceOf(TestClass);
      expect(result['dog']).toBeInstanceOf(TestClass);

      expect(result['cat'].getDescription()).toBe('1: cat');
      expect(result['dog'].getDescription()).toBe('2: dog');
    });

    it('should preserve prototype chain with a key selector', () => {
      const instances = [new TestClass(1, 'cat'), new TestClass(2, 'dog')];

      const result = toDictionary(
        instances,
        (instance) => `${instance.id}-${instance.value}`,
      );

      expect(result['1-cat']).toBeInstanceOf(TestClass);
      expect(result['2-dog']).toBeInstanceOf(TestClass);

      expect(result['1-cat'].getDescription()).toBe('1: cat');
      expect(result['2-dog'].getDescription()).toBe('2: dog');
    });

    it('should preserve prototype chain with symbol keys', () => {
      const testSymbol = Symbol('test');

      class SymbolClass {
        [testSymbol]: string;

        constructor(
          public id: number,
          symbolValue: string,
        ) {
          this[testSymbol] = symbolValue;
        }

        getSymbolValue(): string {
          return this[testSymbol];
        }
      }

      const instances = [
        new SymbolClass(1, 'first'),
        new SymbolClass(2, 'second'),
      ];

      const result = toDictionary(instances, testSymbol);

      expect(result['first']).toBeInstanceOf(SymbolClass);
      expect(result['second']).toBeInstanceOf(SymbolClass);

      expect(result['first'].getSymbolValue()).toBe('first');
      expect(result['second'].getSymbolValue()).toBe('second');
    });
  });
});
