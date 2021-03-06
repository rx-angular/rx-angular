import { TestScheduler } from 'rxjs/testing';
import { jestMatcher } from '@test-helpers';
import { createAccumulationObservable, stateful } from '@rx-angular/state';
import { accumulateObservables } from '@rx-angular/cdk';
import { of } from 'rxjs';

let testScheduler: TestScheduler;

beforeEach(() => {
  testScheduler = new TestScheduler(jestMatcher);
});

// tslint:disable: no-duplicate-string
describe('createAccumulationObservable', () => {

  it('should return an observable', () => {
    const acc$ = accumulateObservables({
      prop1: of(1),
      prop2: of('42')
    });
    expect(acc$.subscribe).toBeDefined();
    expect(acc$.subscribe().unsubscribe).toBeDefined();
  });

  it('should return observable that emits when all sources emitted at least once', () => {
    testScheduler.run(({ cold, expectObservable }) => {

    });
  });

  it('should return observable that does not emits when not all sources emitted at least once', () => {
    testScheduler.run(({ cold, expectObservable }) => {

    });
  });

  it('should return observable that emits only distinct values', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const source = cold('v-v-a-a-v|');
      expectObservable(accumulateObservables({prop: source})).toBe('v---a---v|');
    });
  });

  it('should pass only values other than undefined', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const values = { u: undefined, a: null, b: '', c: [], d: {} };
      const source = cold('u-a-b-c-d|', values);
      expectObservable(source.pipe(stateful())).toBe('--a-b-c-d|', values);
    });
  });

  it('should return observable that shares the composition', () => {
    testScheduler.run(({ cold, expectObservable }) => {

    });
  });

  it('should replay the last emitted value', () => {
    testScheduler.run(({ cold, expectObservable }) => {

    });
  });

});
