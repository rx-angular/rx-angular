import {
  BehaviorSubject,
  concatAll,
  delay,
  from,
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

function createValueStreams(
  time: typeof TestScheduler.prototype.createTime,
  timeMarble: string
): Record<string, Observable<string | string[]>> {
  return {
    a: of('hello dear contributor'),
    b: from(['hello', 'world']),
    c: from(['hello', 'world', 'with', 'delay']).pipe(delay(time(timeMarble))),
    d: of('the quick brown fox jumps over the lazy dog')
  };
}

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

      it('should emit value/s from the observable passed to the input handler', () => {
        testScheduler.run(({ cold, expectObservable, time }) => {
          const source =     '-a-b-----c-d|';
          const expected =   '-a-(bc)----d';
          const timeMarble = '    -----|';

          const values = createValueStreams(time, timeMarble);
          const expectedValues = {
            a: 'hello dear contributor',
            b: 'hello',
            c: 'world',
            d: 'the quick brown fox jumps over the lazy dog',
          };

          createInputStream(cold, source, values, inputHandler);

          expectObservable(inputHandler.values$).toBe(expected, expectedValues);
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

      it('should emit value/s from the observable passed to the input handler', () => {
        testScheduler.run(({ cold, expectObservable, time }) => {
          const source =     '-a-b----c-d--------|';
          const expected =   '-a-(bc)------(defgh)';
          const timeMarble = '    -----|';

          const values = createValueStreams(time, timeMarble);
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

      it('should emit value/s from the observable passed to the input handler', () => {
        testScheduler.run(({ cold, expectObservable, time }) => {
          const source =     '-a-b----c-d-------|';
          const expected =   '-a-(bc)---h--(defg)';
          const timeMarble = '    -----|';

          const values = createValueStreams(time, timeMarble);
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
        });
      });
    });
  });

  describe('ReplaySubject', () => {
    describe('default flattening (switchAll)', () => {
      beforeEach(() => {
        inputHandler = coerceAllFactory<string>(() => new ReplaySubject<string>(1));
      });

      it('should emit value/s from the observable passed to the input handler', () => {
        testScheduler.run(({ cold, expectObservable, time }) => {
          const source =     '-a-b-----c-d|';
          const expected =   '-a-(bc)----d';
          const timeMarble = '    -----|';

          const values = createValueStreams(time, timeMarble);
          const expectedValues = {
            a: 'hello dear contributor',
            b: 'hello',
            c: 'world',
            d: 'the quick brown fox jumps over the lazy dog',
          };

          createInputStream(cold, source, values, inputHandler);

          expectObservable(inputHandler.values$).toBe(expected, expectedValues);
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

      it('should emit value/s from the observable passed to the input handler', () => {
        testScheduler.run(({ cold, expectObservable, time }) => {
          const source =     '-a-b----c-d--------|';
          const expected =   '-a-(bc)------(defgh)';
          const timeMarble = '    -----|';

          const values = createValueStreams(time, timeMarble);
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

      it('should emit value/s from the observable passed to the input handler', () => {
        testScheduler.run(({ cold, expectObservable, time }) => {
          const source =     '-a-b----c-d-------|';
          const expected =   '-a-(bc)---h--(defg)';
          const timeMarble = '    -----|';

          const values = createValueStreams(time, timeMarble);
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

      it('should emit value/s from the observable passed to the input handler', () => {
        testScheduler.run(({ cold, expectObservable, time }) => {
          const source =     '-a-b-----c-d';
          const expected =   'ab-(cd)----e';
          const timeMarble = '    -----|';

          const values = createValueStreams(time, timeMarble);
          const expectedValues = {
            a: initialValue,
            b: 'hello dear contributor',
            c: 'hello',
            d: 'world',
            e: 'the quick brown fox jumps over the lazy dog',
          };

          createInputStream(cold, source, values, inputHandler);

          expectObservable(inputHandler.values$).toBe(expected, expectedValues);
        });
      });
    });

    describe('flattening via concatAll', () => {
      beforeEach(() => {
        inputHandler = coerceAllFactory<string>(
          () => new BehaviorSubject<string>(initialValue),
          concatAll()
        );
      });

      it('should emit value/s from the observable passed to the input handler', () => {
        testScheduler.run(({ cold, expectObservable, time }) => {
          const source =     '-a-b----c-d--------|';
          const expected =   'ab-(cd)------(efghi)';
          const timeMarble = '    -----|';

          const values = createValueStreams(time, timeMarble);
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

      it('should emit value/s from the observable passed to the input handler', () => {
        testScheduler.run(({ cold, expectObservable, time }) => {
          const source =     '-a-b----c-d-------|';
          const expected =   '-a-(bc)---h--(defg)';
          const timeMarble = '    -----|';

          const values = createValueStreams(time, timeMarble);
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
        });
      });
    });
  });
});
