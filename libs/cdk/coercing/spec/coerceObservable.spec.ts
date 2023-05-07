import { coerceObservable } from '@rx-angular/cdk/coercing';
import { jestMatcher } from '@test-helpers';
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

describe(coerceObservable.name, () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler(jestMatcher);
  });

  it('should coerce static values', () => {
    testScheduler.run(({ expectObservable }) => {
      expectObservable(coerceObservable('a')).toBe('(a|)', { a: 'a' });
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

      const result = coerceObservable(src);

      expectObservable(result).toBe(expected, expectedValues);
      expectSubscriptions(src.subscriptions).toBe(subs);
    });
  });
});
