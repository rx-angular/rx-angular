// tslint:disable:nx-enforce-module-boundaries
// eslint:disable:nx-enforce-module-boundaries
import { concatAll, exhaustAll, mergeAll, Observable, ObservableInput, Subject, take } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { jestMatcher } from '@test-helpers';

import { coerceDistinctWith } from '../src/lib/coerceDistinctObservableWith';

function createInputStream(
  cold: typeof TestScheduler.prototype.createColdObservable,
  marble: string,
  values: Record<string, any>,
  inputHandler: Subject<string | Observable<string>>
) {
  cold(marble, values)
    .pipe(take(Object.keys(values).length))
    .subscribe(value => inputHandler.next(value));
}

/** @test {coerceDistinctWith} */
describe('coerceDistinctWith', () => {
  let coercePipeline$: Observable<string | Observable<string>>;
  let inputHandler$: Subject<string | Observable<string>>;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler(jestMatcher);
    inputHandler$ = new Subject<string | Observable<string>>();
  });

  afterEach(() => {
    inputHandler$.complete();
  });

  describe('default flattening - switchAll', () => {
    beforeEach(() => {
      coercePipeline$ = inputHandler$.asObservable().pipe(coerceDistinctWith<string>());
    });

    it('should coerce non-observable values', () => {
      testScheduler.run(({ cold, expectObservable }) => {
        const source =   '-a|';
        const expected = '-a-';

        const values = {
          a: 'hello dear contributor'
        };
        const expectedValues = {
          a: 'hello dear contributor',
        };

        createInputStream(cold, source, values, inputHandler$);

        expectObservable(coercePipeline$).toBe(expected, expectedValues);
      });
    });

    it('should emit unique values', () => {
      testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
        const source =       '-a-bc|';
        const expected =     '-a--c-';
        const valueSubs = {
          b:                 '---(^!)----',
          c:                 '----(^!)---',
        };

        const values = {
          a: 'hello dear contributor',
          b: cold('(a|)', { a: 'hello dear contributor' }),
          c: cold('(a|)', { a: 'hello world' }),
        };
        const expectedValues = {
          a: 'hello dear contributor',
          c: 'hello world'
        };

        createInputStream(cold, source, values, inputHandler$);

        expectObservable(coercePipeline$).toBe(expected, expectedValues);
        expectSubscriptions(values.b.subscriptions).toBe(valueSubs.b);
        expectSubscriptions(values.c.subscriptions).toBe(valueSubs.c);
      });
    });

    it('should coerce both observable and non-observable values', () => {
      testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
        const source =       '-a-b-----c-d|';
        const expected =     '-a-(bc)---de-';
        const valueSubs = {
          b:                 '---(^!)----',
          c:                 '---------^-!',
          d:                 '-----------(^!)',
        };

        const values = {
          a: 'hello dear contributor',
          b: cold('(ab|)', { a: 'hello', b: 'world' }),
          c: cold('-a-b-c-d|', { a: 'hello', b: 'world', c: 'with', d: 'delay' }),
          d: cold('(a|)', { a: 'the quick brown fox jumps over the lazy dog' }),
        };
        const expectedValues = {
          a: 'hello dear contributor',
          b: 'hello',
          c: 'world',
          d: 'hello',
          e: 'the quick brown fox jumps over the lazy dog',
        };

        createInputStream(cold, source, values, inputHandler$);

        expectObservable(coercePipeline$).toBe(expected, expectedValues);
        expectSubscriptions(values.b.subscriptions).toBe(valueSubs.b);
        expectSubscriptions(values.c.subscriptions).toBe(valueSubs.c);
        expectSubscriptions(values.d.subscriptions).toBe(valueSubs.d);
      });
    });
  });

  describe('flattening via concatAll', () => {
    beforeEach(() => {
      coercePipeline$ = inputHandler$.asObservable().pipe(
        coerceDistinctWith<string>(concatAll())
      );
    });

    it('should coerce non-observable values', () => {
      testScheduler.run(({ cold, expectObservable }) => {
        const source = '-a|';
        const expected = '-a-';

        const values = {
          a: 'hello dear contributor'
        };
        const expectedValues = {
          a: 'hello dear contributor',
        };

        createInputStream(cold, source, values, inputHandler$);

        expectObservable(coercePipeline$).toBe(expected, expectedValues);
      });
    });

    it('should emit unique values', () => {
      testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
        const source =       '-a-bc|';
        const expected =     '-a--c-';
        const valueSubs = {
          b:                 '---(^!)----',
          c:                 '----(^!)---',
        };

        const values = {
          a: 'hello dear contributor',
          b: cold('(a|)', { a: 'hello dear contributor' }),
          c: cold('(a|)', { a: 'hello world' }),
        };
        const expectedValues = {
          a: 'hello dear contributor',
          c: 'hello world'
        };

        createInputStream(cold, source, values, inputHandler$);

        expectObservable(coercePipeline$).toBe(expected, expectedValues);
        expectSubscriptions(values.b.subscriptions).toBe(valueSubs.b);
        expectSubscriptions(values.c.subscriptions).toBe(valueSubs.c);
      });
    });

    it('should coerce both observable and non-observable values', () => {
      testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
        const source =     '-a-b----c-d--------|'
        const expected =   '-a-(bc)--d-e-f-gh';
        const valueSubs = {
          b:               '---(^!)',
          c:               '--------^-------!',
          d:               '----------------(^!)',
        };

        const values = {
          a: 'hello dear contributor',
          b: cold('(ab|)', { a: 'hello', b: 'world' }),
          c: cold('-a-b-c-d|', { a: 'hello', b: 'world', c: 'with', d: 'delay' }),
          d: cold('(a|)', { a: 'the quick brown fox jumps over the lazy dog' }),
        };
        const expectedValues = {
          a: 'hello dear contributor',
          b: 'hello',
          c: 'world',
          d: 'hello',
          e: 'world',
          f: 'with',
          g: 'delay',
          h: 'the quick brown fox jumps over the lazy dog',
        };

        createInputStream(cold, source, values, inputHandler$);

        expectObservable(coercePipeline$).toBe(expected, expectedValues);
        expectSubscriptions(values.b.subscriptions).toBe(valueSubs.b);
        expectSubscriptions(values.c.subscriptions).toBe(valueSubs.c);
        expectSubscriptions(values.d.subscriptions).toBe(valueSubs.d);
      });
    });
  });

  describe('flattening via mergeAll', () => {
    beforeEach(() => {
      coercePipeline$ = inputHandler$.asObservable().pipe(
        coerceDistinctWith<string>(mergeAll())
      );
    });

    it('should coerce non-observable values', () => {
      testScheduler.run(({ cold, expectObservable }) => {
        const source = '-a|';
        const expected = '-a-';

        const values = {
          a: 'hello dear contributor'
        };
        const expectedValues = {
          a: 'hello dear contributor',
        };

        createInputStream(cold, source, values, inputHandler$);

        expectObservable(coercePipeline$).toBe(expected, expectedValues);
      });
    });

    it('should emit unique values', () => {
      testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
        const source =       '-a-bc|';
        const expected =     '-a--c-';
        const valueSubs = {
          b:                 '---(^!)----',
          c:                 '----(^!)---',
        };

        const values = {
          a: 'hello dear contributor',
          b: cold('(a|)', { a: 'hello dear contributor' }),
          c: cold('(a|)', { a: 'hello world' }),
        };
        const expectedValues = {
          a: 'hello dear contributor',
          c: 'hello world'
        };

        createInputStream(cold, source, values, inputHandler$);

        expectObservable(coercePipeline$).toBe(expected, expectedValues);
        expectSubscriptions(values.b.subscriptions).toBe(valueSubs.b);
        expectSubscriptions(values.c.subscriptions).toBe(valueSubs.c);
      });
    });

    it('should coerce both observable and non-observable values', () => {
      testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
        const source =     '-a-b----c-d-------|';
          const expected =   '-a-(bc)--dhe-f-g---';
          const valueSubs = {
            b:               '---(^!)',
            c:               '--------^-------!',
            d:               '----------(^!)',
          };

        const values = {
          a: 'hello dear contributor',
          b: cold('(ab|)', { a: 'hello', b: 'world' }),
          c: cold('-a-b-c-d|', { a: 'hello', b: 'world', c: 'with', d: 'delay' }),
          d: cold('(a|)', { a: 'the quick brown fox jumps over the lazy dog' }),
        };
        const expectedValues = {
          a: 'hello dear contributor',
          b: 'hello',
          c: 'world',
          d: 'hello',
          e: 'world',
          f: 'with',
          g: 'delay',
          h: 'the quick brown fox jumps over the lazy dog',
        };

        createInputStream(cold, source, values, inputHandler$);

        expectObservable(coercePipeline$).toBe(expected, expectedValues);
        expectSubscriptions(values.b.subscriptions).toBe(valueSubs.b);
        expectSubscriptions(values.c.subscriptions).toBe(valueSubs.c);
        expectSubscriptions(values.d.subscriptions).toBe(valueSubs.d);
      });
    });
  });

  describe('flattening via exhaustAll', () => {
    beforeEach(() => {
      coercePipeline$ = inputHandler$.asObservable().pipe(
        coerceDistinctWith<string>(exhaustAll())
      );
    });

    it('should coerce non-observable values', () => {
      testScheduler.run(({ cold, expectObservable }) => {
        const source = '-a|';
        const expected = '-a-';

        const values = {
          a: 'hello dear contributor'
        };
        const expectedValues = {
          a: 'hello dear contributor',
        };

        createInputStream(cold, source, values, inputHandler$);

        expectObservable(coercePipeline$).toBe(expected, expectedValues);
      });
    });

    it('should only emit 1 value since the coerced value for the first emission never completes', () => {
      testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
        const source =     '-a-b----c-d--------|'
        const expected =   '-a------------------';
        const valueSubs = {
          b:               '-----',
          c:               '-----',
          d:               '-----',
        };

        const values = {
          a: 'hello dear contributor',
          b: cold('(ab|)', { a: 'hello', b: 'world' }),
          c: cold('-a-b-c-d|', { a: 'hello', b: 'world', c: 'with', d: 'delay' }),
          d: cold('(a|)', { a: 'the quick brown fox jumps over the lazy dog' }),
        };
        const expectedValues = {
          a: 'hello dear contributor',
        };

        createInputStream(cold, source, values, inputHandler$);

        expectObservable(coercePipeline$).toBe(expected, expectedValues);
        expectSubscriptions(values.b.subscriptions).toBe(valueSubs.b);
        expectSubscriptions(values.c.subscriptions).toBe(valueSubs.c);
        expectSubscriptions(values.d.subscriptions).toBe(valueSubs.d);
      });
    });
  });

});
