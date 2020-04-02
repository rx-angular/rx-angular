import { createSideEffectObservable } from '@rxjs-state';
import { TestScheduler } from 'rxjs/testing';
import { jestMatcher } from '@test-helpers';

interface PrimitiveState {
  test: string;
  bar: number;
}

interface ArrayState {
  items: number[];
}


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
