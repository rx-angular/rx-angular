import { BehaviorSubject, delay, from, Observable, ObservableInput, of, ReplaySubject, Subject, take } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { jestMatcher } from '@test-helpers';

import { coerceAllFactory } from '../src/lib/coerce-all-factory';

describe('coerceAllFactory', () => {
  let testScheduler: TestScheduler;
  let inputHandler: {
    values$: Observable<string | string[]>,
    next(observable: ObservableInput<string | string[]> | string): void
  };

  beforeEach(() => {
    testScheduler = new TestScheduler(jestMatcher);
  });

  describe('Subject', () => {
    describe('default flattening (switchAll)', () => {
      beforeEach(() => {
        inputHandler = coerceAllFactory<string>(() => new Subject<string>());
      });

      it('should emit value from the observable passed to the input handler', () => {
        testScheduler.run(({ cold, expectObservable }) => {
          const source =   '-a-b----c-d';
          const expected = '-a-(bc)---d';

          const values = {
            a: of('hello dear contributor'),
            b: from(['hello', 'world']),
            c: from(['hello', 'world', 'with', 'delay']).pipe(delay(20)),
            d: of('the quick brown fox jumps over the lazy dog')
          };
          const expectedValues = {
            a: 'hello dear contributor',
            b: 'hello',
            c: 'world',
            d: 'the quick brown fox jumps over the lazy dog',
          };

          cold(source, values)
            .pipe(take(Object.keys(values).length))
            .subscribe(value => inputHandler.next(value));

          expectObservable(inputHandler.values$).toBe(expected, expectedValues);
        });
      });
    });
  });

  describe('ReplaySubject', () => {
    describe('default flattening (switchAll)', () => {
      beforeEach(() => {
        inputHandler = coerceAllFactory<string>(() => new ReplaySubject<string>(1));
      });

      it('should emit value from the observable passed to the input handler', () => {
        testScheduler.run(({ cold, expectObservable }) => {
          const source =   '-a-b----c-d';
          const expected = '-a-(bc)---d';

          const values = {
            a: of('hello dear contributor'),
            b: from(['hello', 'world']),
            c: from(['hello', 'world', 'with', 'delay']).pipe(delay(20)),
            d: of('the quick brown fox jumps over the lazy dog')
          };
          const expectedValues = {
            a: 'hello dear contributor',
            b: 'hello',
            c: 'world',
            d: 'the quick brown fox jumps over the lazy dog',
          };

          cold(source, values)
            .pipe(take(Object.keys(values).length))
            .subscribe(value => inputHandler.next(value));

          expectObservable(inputHandler.values$).toBe(expected, expectedValues);
        });
      });
    });
  });

  describe('BehaviorSubject', () => {
    const initialValue = 'invisible initial value';

    describe('default flattening (switchAll)', () => {
      beforeEach(() => {
        inputHandler = coerceAllFactory<string>(() => new BehaviorSubject<string>(initialValue));
      });

      it('should emit value from the observable passed to the input handler', () => {
        testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
          const source =   '-a-b----c-d';
          const expected = 'ab-(cd)---e';

          const values = {
            a: of('hello dear contributor'),
            b: from(['hello', 'world']),
            c: from(['hello', 'world', 'with', 'delay']).pipe(delay(20)),
            d: of('the quick brown fox jumps over the lazy dog')
          };
          const expectedValues = {
            a: initialValue,
            b: 'hello dear contributor',
            c: 'hello',
            d: 'world',
            e: 'the quick brown fox jumps over the lazy dog',
          };

          cold(source, values)
            .pipe(take(Object.keys(values).length))
            .subscribe(value => inputHandler.next(value));

          expectObservable(inputHandler.values$).toBe(expected, expectedValues);
        });
      });
    });
  });
});
