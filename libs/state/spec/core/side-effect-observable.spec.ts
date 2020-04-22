import { jestMatcher } from '@test-helpers';
import { TestScheduler } from 'rxjs/testing';
import { createSideEffectObservable } from '../../src/lib/core';

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
