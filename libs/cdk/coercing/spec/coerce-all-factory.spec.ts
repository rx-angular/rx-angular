import {
  BehaviorSubject,
  concatAll,
  exhaustAll,
  mergeAll,
  Observable,
  ObservableInput,
  of,
  ReplaySubject,
  Subject,
  take
} from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { jestMatcher } from '@test-helpers';

import { coerceAllFactory } from '../src/lib/coerce-all-factory';

function createInputStream(
  cold: typeof TestScheduler.prototype.createColdObservable,
  marble: string,
  values: Record<string, any>,
  inputHandler: {
    values$: Observable<string | string[]>;
    next(observable: ObservableInput<string | string[]> | string): void;
  }
) {
  cold(marble, values)
    .pipe(take(Object.keys(values).length))
    .subscribe(value => inputHandler.next(value));
}

function createNoCompletionValueStreams(
  cold: typeof TestScheduler.prototype.createColdObservable
): Record<string, ReturnType<typeof TestScheduler.prototype.createColdObservable>> {
  return {
    a: cold('a', { a: 'hello dear contributor' }),
    b: cold('ab', { a: 'hello', b: 'world' }),
    c: cold('-a-b-c-d', { a: 'hello', b: 'world', c: 'with', d: 'delay' }),
    d: cold('a', { a: 'the quick brown fox jumps over the lazy dog' }),
  };
}

function createWithCompletionValueStreams(
  cold: typeof TestScheduler.prototype.createColdObservable
): Record<string, ReturnType<typeof TestScheduler.prototype.createColdObservable>> {
  return {
    a: cold('a|', { a: 'hello dear contributor' }),
    b: cold('(ab|)', { a: 'hello', b: 'world' }),
    c: cold('-a-b-c-d|', { a: 'hello', b: 'world', c: 'with', d: 'delay' }),
    d: cold('(a|)', { a: 'the quick brown fox jumps over the lazy dog' }),
  };
}

/** @test {coerceAllFactory} */
describe('coerceAllFactory', () => {
  let testScheduler: TestScheduler;
  let inputHandler: {
    values$: Observable<string | string[]>;
    next(observable: ObservableInput<string | string[]> | string): void;
  };

  beforeEach(() => {
    testScheduler = new TestScheduler(jestMatcher);
  });

  describe('Subject', () => {
    describe('default flattening (switchAll)', () => {
      beforeEach(() => {
        inputHandler = coerceAllFactory<string>(() => new Subject<string>());
      });

      it('should emit value/s from the observable passed to the input handler (no completion value inputs)', () => {
        testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
          const source =     '-a-b-----c-d|';
          const expected =   '-a-bc-----de';
          const valueSubs = {
            a:               '-^-!',
            b:               '---^-----!',
            c:               '---------^-!',
            d:               '-----------^',
          };

          const values = createNoCompletionValueStreams(cold);
          const expectedValues = {
            a: 'hello dear contributor',
            b: 'hello',
            c: 'world',
            d: 'hello',
            e: 'the quick brown fox jumps over the lazy dog',
          };

          createInputStream(cold, source, values, inputHandler);

          expectObservable(inputHandler.values$).toBe(expected, expectedValues);
          expectSubscriptions(values.a.subscriptions).toBe(valueSubs.a);
          expectSubscriptions(values.b.subscriptions).toBe(valueSubs.b);
          expectSubscriptions(values.c.subscriptions).toBe(valueSubs.c);
          expectSubscriptions(values.d.subscriptions).toBe(valueSubs.d);
        });
      });

      it('should emit value/s from the observable passed to the input handler (with completion value inputs)', () => {
        testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
          const source =     '-a-b-----c-d|';
          const expected =   '-a-(bc)---de-';
          const valueSubs = {
            a:               '-^!',
            b:               '---(^!)',
            c:               '---------^-!',
            d:               '-----------(^!)',
          };

          const values = createWithCompletionValueStreams(cold);
          const expectedValues = {
            a: 'hello dear contributor',
            b: 'hello',
            c: 'world',
            d: 'hello',
            e: 'the quick brown fox jumps over the lazy dog',
          };

          createInputStream(cold, source, values, inputHandler);

          expectObservable(inputHandler.values$).toBe(expected, expectedValues);
          expectSubscriptions(values.a.subscriptions).toBe(valueSubs.a);
          expectSubscriptions(values.b.subscriptions).toBe(valueSubs.b);
          expectSubscriptions(values.c.subscriptions).toBe(valueSubs.c);
          expectSubscriptions(values.d.subscriptions).toBe(valueSubs.d);
        });
      });
    });

    describe('flattening via concatAll', () => {
      beforeEach(() => {
        inputHandler = coerceAllFactory<string>(
          () => new Subject<string>(),
          concatAll()
        );
      });

      it('should emit value/s from the observable passed to the input handler (no completion value inputs)', () => {
        testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
          const source =     '-a-b----c-d--------|';
          const expected =   '-a-----------------';
          const valueSubs = {
            a:               '-^',
            b:               '------------',
            c:               '------------',
            d:               '------------',
          };

          const values = createNoCompletionValueStreams(cold);
          const expectedValues = {
            a: 'hello dear contributor',
          };

          createInputStream(cold, source, values, inputHandler);

          expectObservable(inputHandler.values$).toBe(expected, expectedValues);
          expectSubscriptions(values.a.subscriptions).toBe(valueSubs.a);
          expectSubscriptions(values.b.subscriptions).toBe(valueSubs.b);
          expectSubscriptions(values.c.subscriptions).toBe(valueSubs.c);
          expectSubscriptions(values.d.subscriptions).toBe(valueSubs.d);
        });
      });

      it('should emit value/s from the observable passed to the input handler (with completion value inputs)', () => {
        testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
          const source =     '-a-b----c-d--------|'
          const expected =   '-a-(bc)--d-e-f-gh';
          const valueSubs = {
            a:               '-^!',
            b:               '---(^!)',
            c:               '--------^-------!',
            d:               '----------------(^!)',
          };

          const values = createWithCompletionValueStreams(cold);
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

          createInputStream(cold, source, values, inputHandler);

          expectObservable(inputHandler.values$).toBe(expected, expectedValues);
          expectSubscriptions(values.a.subscriptions).toBe(valueSubs.a);
          expectSubscriptions(values.b.subscriptions).toBe(valueSubs.b);
          expectSubscriptions(values.c.subscriptions).toBe(valueSubs.c);
          expectSubscriptions(values.d.subscriptions).toBe(valueSubs.d);
        });
      });
    });

    describe('flattening via mergeAll', () => {
      beforeEach(() => {
        inputHandler = coerceAllFactory<string>(
          () => new Subject<string>(),
          mergeAll()
        );
      });

      it('should emit value/s from the observable passed to the input handler (no completion value inputs)', () => {
        testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
          const source =     '-a-b----c-d-------|';
          const expected =   '-a-bc----dhe-f-g---';
          const valueSubs = {
            a:               '-^',
            b:               '---^',
            c:               '--------^--',
            d:               '----------^',
          };

          const values = createNoCompletionValueStreams(cold);
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

          createInputStream(cold, source, values, inputHandler);

          expectObservable(inputHandler.values$).toBe(expected, expectedValues);
          expectSubscriptions(values.a.subscriptions).toBe(valueSubs.a);
          expectSubscriptions(values.b.subscriptions).toBe(valueSubs.b);
          expectSubscriptions(values.c.subscriptions).toBe(valueSubs.c);
          expectSubscriptions(values.d.subscriptions).toBe(valueSubs.d);
        });
      });

      it('should emit value/s from the observable passed to the input handler (with completion value inputs)', () => {
        testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
          const source =     '-a-b----c-d-------|';
          const expected =   '-a-(bc)--dhe-f-g---';
          const valueSubs = {
            a:               '-^!',
            b:               '---(^!)',
            c:               '--------^-------!',
            d:               '----------(^!)',
          };

          const values = createWithCompletionValueStreams(cold);
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

          createInputStream(cold, source, values, inputHandler);

          expectObservable(inputHandler.values$).toBe(expected, expectedValues);
          expectSubscriptions(values.a.subscriptions).toBe(valueSubs.a);
          expectSubscriptions(values.b.subscriptions).toBe(valueSubs.b);
          expectSubscriptions(values.c.subscriptions).toBe(valueSubs.c);
          expectSubscriptions(values.d.subscriptions).toBe(valueSubs.d);
        });
      });
    });

    describe('flattening via exhaustAll', () => {
      beforeEach(() => {
        inputHandler = coerceAllFactory<string>(
          () => new Subject<string>(),
          exhaustAll()
        );
      });

      it('should only emit 1 value from the first observable passed to the input handler since the first observable never completes', () => {
        testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
          const source =     '-a-b----c-d--------|';
          const expected =   '-a-----------------';
          const valueSubs = {
            a:               '-^',
            b:               '------------',
            c:               '------------',
            d:               '------------',
          };

          const values = createNoCompletionValueStreams(cold);
          const expectedValues = {
            a: 'hello dear contributor',
          };

          createInputStream(cold, source, values, inputHandler);

          expectObservable(inputHandler.values$).toBe(expected, expectedValues);
          expectSubscriptions(values.a.subscriptions).toBe(valueSubs.a);
          expectSubscriptions(values.b.subscriptions).toBe(valueSubs.b);
          expectSubscriptions(values.c.subscriptions).toBe(valueSubs.c);
          expectSubscriptions(values.d.subscriptions).toBe(valueSubs.d);
        });
      });

      it('should emit the values of the first 3 observables and ignore the value for the last observable', () => {
        testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
          const source =     '-a-b----c-d--------|'
          const expected =   '-a-(bc)--d-e-f-g';
          const valueSubs = {
            a:               '-^!',
            b:               '---(^!)',
            c:               '--------^-------!',
            d:               '--------------------',
          };

          const values = createWithCompletionValueStreams(cold);
          const expectedValues = {
            a: 'hello dear contributor',
            b: 'hello',
            c: 'world',
            d: 'hello',
            e: 'world',
            f: 'with',
            g: 'delay'
          };

          createInputStream(cold, source, values, inputHandler);

          expectObservable(inputHandler.values$).toBe(expected, expectedValues);
          expectSubscriptions(values.a.subscriptions).toBe(valueSubs.a);
          expectSubscriptions(values.b.subscriptions).toBe(valueSubs.b);
          expectSubscriptions(values.c.subscriptions).toBe(valueSubs.c);
          expectSubscriptions(values.d.subscriptions).toBe(valueSubs.d);
        });
      });
    });
  });

  describe('ReplaySubject', () => {
    describe('default flattening (switchAll)', () => {
      beforeEach(() => {
        inputHandler = coerceAllFactory<string>(() => new ReplaySubject<string>(1));
      });

      it('should emit value/s from the observable passed to the input handler (no completion value inputs)', () => {
        testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
          const source =     '-a-b-----c-d|';
          const expected =   '-a-bc-----de';
          const valueSubs = {
            a:               '-^-!',
            b:               '---^-----!',
            c:               '---------^-!',
            d:               '-----------^',
          };

          const values = createNoCompletionValueStreams(cold);
          const expectedValues = {
            a: 'hello dear contributor',
            b: 'hello',
            c: 'world',
            d: 'hello',
            e: 'the quick brown fox jumps over the lazy dog',
          };

          createInputStream(cold, source, values, inputHandler);

          expectObservable(inputHandler.values$).toBe(expected, expectedValues);
          expectSubscriptions(values.a.subscriptions).toBe(valueSubs.a);
          expectSubscriptions(values.b.subscriptions).toBe(valueSubs.b);
          expectSubscriptions(values.c.subscriptions).toBe(valueSubs.c);
          expectSubscriptions(values.d.subscriptions).toBe(valueSubs.d);
        });
      });

      it('should emit value/s from the observable passed to the input handler (with completion value inputs)', () => {
        testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
          const source =     '-a-b-----c-d|';
          const expected =   '-a-(bc)---de-';
          const valueSubs = {
            a:               '-^!',
            b:               '---(^!)',
            c:               '---------^-!',
            d:               '-----------(^!)',
          };

          const values = createWithCompletionValueStreams(cold);
          const expectedValues = {
            a: 'hello dear contributor',
            b: 'hello',
            c: 'world',
            d: 'hello',
            e: 'the quick brown fox jumps over the lazy dog',
          };

          createInputStream(cold, source, values, inputHandler);

          expectObservable(inputHandler.values$).toBe(expected, expectedValues);
          expectSubscriptions(values.a.subscriptions).toBe(valueSubs.a);
          expectSubscriptions(values.b.subscriptions).toBe(valueSubs.b);
          expectSubscriptions(values.c.subscriptions).toBe(valueSubs.c);
          expectSubscriptions(values.d.subscriptions).toBe(valueSubs.d);
        });
      });
    });

    describe('flattening via concatAll', () => {
      beforeEach(() => {
        inputHandler = coerceAllFactory<string>(
          () => new ReplaySubject<string>(1),
          concatAll()
        );
      });

      it('should emit value/s from the observable passed to the input handler (no completion value inputs)', () => {
        testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
          const source =     '-a-b----c-d--------|';
          const expected =   '-a-----------------';
          const valueSubs = {
            a:               '-^',
            b:               '------------',
            c:               '------------',
            d:               '------------',
          };

          const values = createNoCompletionValueStreams(cold);
          const expectedValues = {
            a: 'hello dear contributor',
          };

          createInputStream(cold, source, values, inputHandler);

          expectObservable(inputHandler.values$).toBe(expected, expectedValues);
          expectSubscriptions(values.a.subscriptions).toBe(valueSubs.a);
          expectSubscriptions(values.b.subscriptions).toBe(valueSubs.b);
          expectSubscriptions(values.c.subscriptions).toBe(valueSubs.c);
          expectSubscriptions(values.d.subscriptions).toBe(valueSubs.d);
        });
      });

      it('should emit value/s from the observable passed to the input handler (with completion value inputs)', () => {
        testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
          const source =     '-a-b----c-d--------|'
          const expected =   '-a-(bc)--d-e-f-gh';
          const valueSubs = {
            a:               '-^!',
            b:               '---(^!)',
            c:               '--------^-------!',
            d:               '----------------(^!)',
          };

          const values = createWithCompletionValueStreams(cold);
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

          createInputStream(cold, source, values, inputHandler);

          expectObservable(inputHandler.values$).toBe(expected, expectedValues);
          expectSubscriptions(values.a.subscriptions).toBe(valueSubs.a);
          expectSubscriptions(values.b.subscriptions).toBe(valueSubs.b);
          expectSubscriptions(values.c.subscriptions).toBe(valueSubs.c);
          expectSubscriptions(values.d.subscriptions).toBe(valueSubs.d);
        });
      });
    });

    describe('flattening via mergeAll', () => {
      beforeEach(() => {
        inputHandler = coerceAllFactory<string>(
          () => new ReplaySubject<string>(1),
          mergeAll()
        );
      });

      it('should emit value/s from the observable passed to the input handler (no completion value inputs)', () => {
        testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
          const source =     '-a-b----c-d-------|';
          const expected =   '-a-bc----dhe-f-g---';
          const valueSubs = {
            a:               '-^',
            b:               '---^',
            c:               '--------^--',
            d:               '----------^',
          };

          const values = createNoCompletionValueStreams(cold);
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

          createInputStream(cold, source, values, inputHandler);

          expectObservable(inputHandler.values$).toBe(expected, expectedValues);
          expectSubscriptions(values.a.subscriptions).toBe(valueSubs.a);
          expectSubscriptions(values.b.subscriptions).toBe(valueSubs.b);
          expectSubscriptions(values.c.subscriptions).toBe(valueSubs.c);
          expectSubscriptions(values.d.subscriptions).toBe(valueSubs.d);
        });
      });

      it('should emit value/s from the observable passed to the input handler (with completion value inputs)', () => {
        testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
          const source =     '-a-b----c-d-------|';
          const expected =   '-a-(bc)--dhe-f-g---';
          const valueSubs = {
            a:               '-^!',
            b:               '---(^!)',
            c:               '--------^-------!',
            d:               '----------(^!)',
          };

          const values = createWithCompletionValueStreams(cold);
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

          createInputStream(cold, source, values, inputHandler);

          expectObservable(inputHandler.values$).toBe(expected, expectedValues);
          expectSubscriptions(values.a.subscriptions).toBe(valueSubs.a);
          expectSubscriptions(values.b.subscriptions).toBe(valueSubs.b);
          expectSubscriptions(values.c.subscriptions).toBe(valueSubs.c);
          expectSubscriptions(values.d.subscriptions).toBe(valueSubs.d);
        });
      });
    });

    describe('flattening via exhaustAll', () => {
      beforeEach(() => {
        inputHandler = coerceAllFactory<string>(
          () => new ReplaySubject<string>(1),
          exhaustAll()
        );
      });

      it('should only emit 1 value from the first observable passed to the input handler since the first observable never completes', () => {
        testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
          const source =     '-a-b----c-d--------|';
          const expected =   '-a-----------------';
          const valueSubs = {
            a:               '-^',
            b:               '------------',
            c:               '------------',
            d:               '------------',
          };

          const values = createNoCompletionValueStreams(cold);
          const expectedValues = {
            a: 'hello dear contributor',
          };

          createInputStream(cold, source, values, inputHandler);

          expectObservable(inputHandler.values$).toBe(expected, expectedValues);
          expectSubscriptions(values.a.subscriptions).toBe(valueSubs.a);
          expectSubscriptions(values.b.subscriptions).toBe(valueSubs.b);
          expectSubscriptions(values.c.subscriptions).toBe(valueSubs.c);
          expectSubscriptions(values.d.subscriptions).toBe(valueSubs.d);
        });
      });

      it('should emit the values of the first 3 observables and ignore the value for the last observable', () => {
        testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
          const source =     '-a-b----c-d--------|'
          const expected =   '-a-(bc)--d-e-f-g';
          const valueSubs = {
            a:               '-^!',
            b:               '---(^!)',
            c:               '--------^-------!',
            d:               '--------------------',
          };

          const values = createWithCompletionValueStreams(cold);
          const expectedValues = {
            a: 'hello dear contributor',
            b: 'hello',
            c: 'world',
            d: 'hello',
            e: 'world',
            f: 'with',
            g: 'delay'
          };

          createInputStream(cold, source, values, inputHandler);

          expectObservable(inputHandler.values$).toBe(expected, expectedValues);
          expectSubscriptions(values.a.subscriptions).toBe(valueSubs.a);
          expectSubscriptions(values.b.subscriptions).toBe(valueSubs.b);
          expectSubscriptions(values.c.subscriptions).toBe(valueSubs.c);
          expectSubscriptions(values.d.subscriptions).toBe(valueSubs.d);
        });
      });
    });
  });

  describe('BehaviorSubject', () => {
    const initialValue = 'initial value';

    describe('default flattening (switchAll)', () => {
      beforeEach(() => {
        inputHandler = coerceAllFactory<string>(() => new BehaviorSubject<Observable<string>>(of(initialValue)));
      });

      it('should emit value/s from the observable passed to the input handler (no completion value inputs)', () => {
        testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
          const source =     '-a-b-----c-d|';
          const expected =   'ab-cd-----ef';
          const valueSubs = {
            a:               '-^-!',
            b:               '---^-----!',
            c:               '---------^-!',
            d:               '-----------^',
          };

          const values = createNoCompletionValueStreams(cold);
          const expectedValues = {
            a: initialValue,
            b: 'hello dear contributor',
            c: 'hello',
            d: 'world',
            e: 'hello',
            f: 'the quick brown fox jumps over the lazy dog',
          };

          createInputStream(cold, source, values, inputHandler);

          expectObservable(inputHandler.values$).toBe(expected, expectedValues);
          expectSubscriptions(values.a.subscriptions).toBe(valueSubs.a);
          expectSubscriptions(values.b.subscriptions).toBe(valueSubs.b);
          expectSubscriptions(values.c.subscriptions).toBe(valueSubs.c);
          expectSubscriptions(values.d.subscriptions).toBe(valueSubs.d);
        });
      });

      it('should emit value/s from the observable passed to the input handler (with completion value inputs)', () => {
        testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
          const source =     '-a-b-----c-d|';
          const expected =   'ab-(cd)---ef-';
          const valueSubs = {
            a:               '-^!',
            b:               '---(^!)',
            c:               '---------^-!',
            d:               '-----------(^!)',
          };

          const values = createWithCompletionValueStreams(cold);
          const expectedValues = {
            a: initialValue,
            b: 'hello dear contributor',
            c: 'hello',
            d: 'world',
            e: 'hello',
            f: 'the quick brown fox jumps over the lazy dog',
          };

          createInputStream(cold, source, values, inputHandler);

          expectObservable(inputHandler.values$).toBe(expected, expectedValues);
          expectSubscriptions(values.a.subscriptions).toBe(valueSubs.a);
          expectSubscriptions(values.b.subscriptions).toBe(valueSubs.b);
          expectSubscriptions(values.c.subscriptions).toBe(valueSubs.c);
          expectSubscriptions(values.d.subscriptions).toBe(valueSubs.d);
        });
      });
    });

    describe('flattening via concatAll', () => {
      beforeEach(() => {
        inputHandler = coerceAllFactory<string>(
          () => new BehaviorSubject<Observable<string>>(of(initialValue)),
          concatAll()
        );
      });

      it('should emit value/s from the observable passed to the input handler (no completion value inputs)', () => {
        testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
          const source =     '-a-b----c-d--------|';
          const expected =   'ab-----------------';
          const valueSubs = {
            a:               '-^',
            b:               '------------',
            c:               '------------',
            d:               '------------',
          };

          const values = createNoCompletionValueStreams(cold);
          const expectedValues = {
            a: initialValue,
            b: 'hello dear contributor',
          };

          createInputStream(cold, source, values, inputHandler);

          expectObservable(inputHandler.values$).toBe(expected, expectedValues);
          expectSubscriptions(values.a.subscriptions).toBe(valueSubs.a);
          expectSubscriptions(values.b.subscriptions).toBe(valueSubs.b);
          expectSubscriptions(values.c.subscriptions).toBe(valueSubs.c);
          expectSubscriptions(values.d.subscriptions).toBe(valueSubs.d);
        });
      });

      it('should emit value/s from the observable passed to the input handler (with completion value inputs)', () => {
        testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
          const source =     '-a-b----c-d--------|'
          const expected =   'ab-(cd)--e-f-g-hi';
          const valueSubs = {
            a:               '-^!',
            b:               '---(^!)',
            c:               '--------^-------!',
            d:               '----------------(^!)',
          };

          const values = createWithCompletionValueStreams(cold);
          const expectedValues = {
            a: initialValue,
            b: 'hello dear contributor',
            c: 'hello',
            d: 'world',
            e: 'hello',
            f: 'world',
            g: 'with',
            h: 'delay',
            i: 'the quick brown fox jumps over the lazy dog',
          };

          createInputStream(cold, source, values, inputHandler);

          expectObservable(inputHandler.values$).toBe(expected, expectedValues);
          expectSubscriptions(values.a.subscriptions).toBe(valueSubs.a);
          expectSubscriptions(values.b.subscriptions).toBe(valueSubs.b);
          expectSubscriptions(values.c.subscriptions).toBe(valueSubs.c);
          expectSubscriptions(values.d.subscriptions).toBe(valueSubs.d);
        });
      });
    });

    describe('flattening via mergeAll', () => {
      beforeEach(() => {
        inputHandler = coerceAllFactory<string>(
          () => new BehaviorSubject<Observable<string>>(of(initialValue)),
          mergeAll()
        );
      });

      it('should emit value/s from the observable passed to the input handler (no completion value inputs)', () => {
        testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
          const source =     '-a-b----c-d-------|';
          const expected =   'ab-cd----eif-g-h---';
          const valueSubs = {
            a:               '-^',
            b:               '---^',
            c:               '--------^--',
            d:               '----------^',
          };

          const values = createNoCompletionValueStreams(cold);
          const expectedValues = {
            a: initialValue,
            b: 'hello dear contributor',
            c: 'hello',
            d: 'world',
            e: 'hello',
            f: 'world',
            g: 'with',
            h: 'delay',
            i: 'the quick brown fox jumps over the lazy dog',
          };

          createInputStream(cold, source, values, inputHandler);

          expectObservable(inputHandler.values$).toBe(expected, expectedValues);
          expectSubscriptions(values.a.subscriptions).toBe(valueSubs.a);
          expectSubscriptions(values.b.subscriptions).toBe(valueSubs.b);
          expectSubscriptions(values.c.subscriptions).toBe(valueSubs.c);
          expectSubscriptions(values.d.subscriptions).toBe(valueSubs.d);
        });
      });

      it('should emit value/s from the observable passed to the input handler (with completion value inputs)', () => {
        testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
          const source =     '-a-b----c-d-------|';
          const expected =   'ab-(cd)--eif-g-h---';
          const valueSubs = {
            a:               '-^!',
            b:               '---(^!)',
            c:               '--------^-------!',
            d:               '----------(^!)',
          };

          const values = createWithCompletionValueStreams(cold);
          const expectedValues = {
            a: initialValue,
            b: 'hello dear contributor',
            c: 'hello',
            d: 'world',
            e: 'hello',
            f: 'world',
            g: 'with',
            h: 'delay',
            i: 'the quick brown fox jumps over the lazy dog',
          };

          createInputStream(cold, source, values, inputHandler);

          expectObservable(inputHandler.values$).toBe(expected, expectedValues);
          expectSubscriptions(values.a.subscriptions).toBe(valueSubs.a);
          expectSubscriptions(values.b.subscriptions).toBe(valueSubs.b);
          expectSubscriptions(values.c.subscriptions).toBe(valueSubs.c);
          expectSubscriptions(values.d.subscriptions).toBe(valueSubs.d);
        });
      });
    });

    describe('flattening via exhaustAll', () => {
      beforeEach(() => {
        inputHandler = coerceAllFactory<string>(
          () => new BehaviorSubject<Observable<string>>(of(initialValue)),
          exhaustAll()
        );
      });

      it('should NOT emit value/s from the observable passed to the input handler (no completion value inputs)', () => {
        testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
          const source =     '-a-b----c-d--------|';
          const expected =   'a------------------';
          const valueSubs = {
            a:               '------------',
            b:               '------------',
            c:               '------------',
            d:               '------------',
          };

          const values = createNoCompletionValueStreams(cold);
          const expectedValues = {
            a: initialValue,
          };

          createInputStream(cold, source, values, inputHandler);

          expectObservable(inputHandler.values$).toBe(expected, expectedValues);
          expectSubscriptions(values.a.subscriptions).toBe(valueSubs.a);
          expectSubscriptions(values.b.subscriptions).toBe(valueSubs.b);
          expectSubscriptions(values.c.subscriptions).toBe(valueSubs.c);
          expectSubscriptions(values.d.subscriptions).toBe(valueSubs.d);
        });
      });

      it('should NOT emit value/s from the observable passed to the input handler (with completion value inputs)', () => {
        testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
          const source =     '-a-b----c-d--------|';
          const expected =   'a------------------';
          const valueSubs = {
            a:               '------------',
            b:               '------------',
            c:               '------------',
            d:               '------------',
          };

          const values = createWithCompletionValueStreams(cold);
          const expectedValues = {
            a: initialValue,
          };

          createInputStream(cold, source, values, inputHandler);

          expectObservable(inputHandler.values$).toBe(expected, expectedValues);
          expectSubscriptions(values.a.subscriptions).toBe(valueSubs.a);
          expectSubscriptions(values.b.subscriptions).toBe(valueSubs.b);
          expectSubscriptions(values.c.subscriptions).toBe(valueSubs.c);
          expectSubscriptions(values.d.subscriptions).toBe(valueSubs.d);
        });
      });
    });
  });
});
