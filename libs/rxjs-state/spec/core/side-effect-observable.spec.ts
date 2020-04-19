import { createSideEffectObservable } from '../../src';
import { TestScheduler } from 'rxjs/testing';
import { jestMatcher } from 'test-helpers';

let testScheduler: TestScheduler;

beforeEach(() => {
  testScheduler = new TestScheduler(jestMatcher);
});

// tslint:disable: no-duplicate-string
fdescribe('createSideEffectObservable', () => {
  it('should return object', () => {
    testScheduler.run(() => {
      const ef = createSideEffectObservable();
      expect(ef).toBeDefined();
    });
  });
});
