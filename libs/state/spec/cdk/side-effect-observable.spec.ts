import { jestMatcher } from '@test-helpers';
import { TestScheduler } from 'rxjs/testing';
import { createSideEffectObservable } from '@rx-angular/state';

let testScheduler: TestScheduler;

beforeEach(() => {
  testScheduler = new TestScheduler(jestMatcher);
});

describe('createSideEffectObservable', () => {
  it('should be defined', () => {
    testScheduler.run(() => {
      const ef = createSideEffectObservable();
      expect(ef).toBeDefined();
    });
  });

  it('should subscribe', () => {
    testScheduler.run(({ cold, expectSubscriptions }) => {
      const ef = createSideEffectObservable();
      const subMain = ef.subscribe();

      const test$ = cold('(abc)', { a: 1, b: 2, c: 3 });
      const sub = '(^!)';
      ef.nextEffectObservable(test$);
      subMain.unsubscribe();
      expectSubscriptions(test$.subscriptions).toBe(sub);

    });
  });
});
