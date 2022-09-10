// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  initialNestedState,
  initialPrimitiveState,
  jestMatcher,
  NestedState,
  PrimitiveState,
} from '@test-helpers';
import { EMPTY, NEVER, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';
import { select } from '../src/lib/operators/select';

let testScheduler: TestScheduler;

beforeEach(() => {
  testScheduler = new TestScheduler(jestMatcher);
});

describe('select', () => {
  describe('should mirror the behavior of the stateful and', () => {
    it('should mirror EMPTY', () => {
      testScheduler.run(({ expectObservable }) => {
        const source = EMPTY;
        expectObservable(source.pipe(select())).toBe('|');
      });
    });

    it('should mirror NEVER', () => {
      testScheduler.run(({ expectObservable }) => {
        const source = NEVER;
        expectObservable(source.pipe(select())).toBe('');
      });
    });

    it('should pass values as they are', () => {
      testScheduler.run(({ cold, expectObservable }) => {
        const source = cold('v|');
        expectObservable(source.pipe(select())).toBe('v|');
      });
    });

    it('should pass only distinct values', () => {
      testScheduler.run(({ cold, expectObservable }) => {
        const source = cold('v-v-a-a-v|');
        expectObservable(source.pipe(select())).toBe('v---a---v|');
      });
    });
    it('should pass only values other than undefined', () => {
      testScheduler.run(({ cold, expectObservable }) => {
        const values = { u: undefined, a: null, b: '', c: [], d: {} };
        const source = cold('u-a-b-c-d|', values);
        expectObservable(source.pipe(select())).toBe('--a-b-c-d|', values);
      });
    });

    it('should replay the last emitted value', () => {});

    it('should accept one operator', () => {
      testScheduler.run(({ cold, expectObservable }) => {
        const values = { a: 2, b: 4 };
        const source = cold('a|', values);
        expectObservable(source.pipe(select(map((v) => v * 2)))).toBe(
          'b|',
          values
        );
      });
    });

    it('should accept multiple operators', () => {
      testScheduler.run(({ cold, expectObservable }) => {
        const values = { a: 2, b: 4 };
        const source = cold('a|', values);
        expectObservable(
          source.pipe(
            select(
              map((v) => v * 2),
              map((v) => v / 2),
              map((v) => v * 2),
              map((v) => v / 2),
              map((v) => v * 2)
            )
          )
        ).toBe('b|', values);
      });
    });
  });

  it('should accept one string keyof T', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const primitiveState: PrimitiveState = {
        bol: true,
        str: 'string',
        num: 42,
      };
      const source: Observable<PrimitiveState> = cold('a|', {
        a: primitiveState,
      });
      expectObservable(source.pipe(select('bol'))).toBe('a|', { a: true });
    });
  });

  it('should accept multiple strings keyof T', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const source: Observable<NestedState> = cold('a|', {
        a: initialNestedState,
      });
      expectObservable(
        source.pipe(select('obj', 'key1', 'key11', 'key111'))
      ).toBe('a|', { a: 'test' });
    });
  });

  it('should accept one string keyof T and one map function', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const primitiveState: PrimitiveState = {
        bol: true,
        str: 'string',
        num: 42,
      };
      const source: Observable<PrimitiveState> = cold('a|', {
        a: primitiveState,
      });
      expectObservable(source.pipe(select('num', (x) => x / 2))).toBe('a|', {
        a: 21,
      });
    });
  });

  it('should accept array of strings keyof T and one map function', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const primitiveState: PrimitiveState = {
        bol: true,
        str: 'string',
        num: 42,
      };
      const source: Observable<PrimitiveState> = cold('a|', {
        a: primitiveState,
      });
      expectObservable(
        source.pipe(select(['num', 'str'], ({ num, str }) => `${str} (${num})`))
      ).toBe('a|', {
        a: 'string (42)',
      });
    });
  });

  it('should accept array of strings keyof T, map function and key compare map', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const state: PrimitiveState & NestedState = {
        bol: true,
        str: 'string',
        num: 42,
        obj: {
          key1: {
            key11: {
              key111: 'foo',
            },
          },
        },
      };
      const source: Observable<PrimitiveState & NestedState> = cold('abcde|', {
        a: state,
        b: { ...state, bol: false },
        c: { ...state, num: 69 },
        d: { ...state, num: 69, obj: { key1: { key11: { key111: 'foo' } } } },
        e: { ...state, num: 69, obj: { key1: { key11: { key111: 'bar' } } } },
      });
      expectObservable(
        source.pipe(
          select(
            ['num', 'obj'],
            ({ num, obj }) => `${num}: ${obj.key1.key11.key111}`,
            { obj: (a, b) => a.key1.key11.key111 === b.key1.key11.key111 }
          )
        )
      ).toBe('a-c-e|', {
        a: '42: foo',
        c: '69: foo',
        e: '69: bar',
      });
    });
  });

  it('should accept one operator', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const source: Observable<PrimitiveState> = cold('a|', {
        a: initialPrimitiveState,
      });
      expectObservable(source.pipe(select(map((s) => s.bol)))).toBe('a|', {
        a: true,
      });
    });
  });

  it('should accept multiple operators', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const source: Observable<NestedState> = cold('a|', {
        a: initialNestedState,
      });
      expectObservable(
        source.pipe(
          select(
            map((s) => s.obj),
            map((s) => s.key1),
            map((s) => s.key11),
            map((s) => s.key111)
          )
        )
      ).toBe('a|', { a: 'test' });
    });
  });

  it('should throw with wrong params', () => {
    expect(() => of().pipe(select(true as any))).toThrowError(
      'wrong params passed to select'
    );
  });
});
