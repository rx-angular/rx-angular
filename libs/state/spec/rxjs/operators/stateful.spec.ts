// tslint:disable-next-line:nx-enforce-module-boundaries
import { jestMatcher } from '@test-helpers';
import { EMPTY, NEVER } from 'rxjs';
import { map } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';
import { stateful } from '@rx-angular/state';

let testScheduler: TestScheduler;

beforeEach(() => {
  testScheduler = new TestScheduler(jestMatcher);
});

describe('stateful', () => {
  it('should mirror EMPTY', () => {
    testScheduler.run(({ expectObservable }) => {
      const source = EMPTY;
      expectObservable(source.pipe(stateful())).toBe('|');
    });
  });

  it('should mirror NEVER', () => {
    testScheduler.run(({ expectObservable }) => {
      const source = NEVER;
      expectObservable(source.pipe(stateful())).toBe('');
    });
  });

  it('should pass values as they are', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const source = cold('v|');
      expectObservable(source.pipe(stateful())).toBe('v|');
    });
  });

  it('should pass only distinct values', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const source = cold('v-v-a-a-v|');
      expectObservable(source.pipe(stateful())).toBe('v---a---v|');
    });
  });

  it('should pass only values other than undefined', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const values = { u: undefined, a: null, b: '', c: [], d: {} };
      const source = cold('u-a-b-c-d|', values);
      expectObservable(source.pipe(stateful())).toBe('--a-b-c-d|', values);
    });
  });

  it('should replay the last emitted value', () => {});

  it('should accept one operator', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const values = { a: 2, b: 4 };
      const source = cold('a|', values);
      expectObservable(source.pipe(stateful(map(v => v * 2)))).toBe(
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
          stateful(
            map(v => v * 2),
            map(v => v / 2),
            map(v => v * 2),
            map(v => v / 2),
            map(v => v * 2)
          )
        )
      ).toBe('b|', values);
    });
  });
});
