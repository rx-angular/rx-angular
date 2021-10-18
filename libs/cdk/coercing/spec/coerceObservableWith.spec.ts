// tslint:disable:nx-enforce-module-boundaries
// eslint:disable:nx-enforce-module-boundaries
import { coerceObservableWith } from '@rx-angular/cdk';
import { jestMatcher, mockConsole } from '@test-helpers';
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

describe('coerceObservableWith', () => {
  beforeAll(() => mockConsole());

  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler(jestMatcher);
  });

  it('should coerce non-observable values', () => {
    testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const src = cold('a---b---c|  ');
      const subs = '    ^--------!  ';
      const expected = 'a---b---c|  ';
      const a = cold('  (a|)        ');
      const b = cold('      (b|)    ');
      const c = cold('          (c|)');
      const expectedValues = { a, b, c };

      const result = src.pipe(coerceObservableWith());
      
      expectObservable(result).toBe(expected, expectedValues);
      expectSubscriptions(src.subscriptions).toBe(subs);
    });
  });

  it('should preserve observable values', () => {
    testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const values = { a: of('a'), b: of('b'), c: of('c') };
      const src = cold('a---b---c|  ', values);
      const subs = '    ^--------!  ';
      const expected = 'a---b---c|  ';
      const a = cold('  (a|)        ');
      const b = cold('      (b|)    ');
      const c = cold('          (c|)');
      const expectedValues = { a, b, c };

      const result = src.pipe(coerceObservableWith());
      
      expectObservable(result).toBe(expected, expectedValues);
      expectSubscriptions(src.subscriptions).toBe(subs);
    });
  });

  it('should propagate error', () => {
    testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const values = { a: 'a' };
      const errorValue = 'error';
      const src = cold('a---#', values, errorValue);
      const subs = '    ^---!';
      const expected = 'a---#';
      const a = cold('  (a|)');
      const expectedValues = { a };

      const result = src.pipe(coerceObservableWith());

      expectObservable(result).toBe(expected, expectedValues, errorValue);
      expectSubscriptions(src.subscriptions).toBe(subs);
    });
  });
});
