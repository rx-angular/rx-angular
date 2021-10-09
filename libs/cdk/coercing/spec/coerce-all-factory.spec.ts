import { BehaviorSubject, Observable, ObservableInput, ReplaySubject, Subject, take } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { jestMatcher } from '@test-helpers';

import { coerceAllFactory } from '../src/lib/coerce-all-factory';

describe('coerceAllFactory', () => {
  let testScheduler: TestScheduler;
  let inputHandler: {
    values$: Observable<string>,
    next(observable: ObservableInput<string> | string): void
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
        testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
          const values = { a: 'hello dear contributor' };
          const s1 = cold( '---a---------|', values);
          const s1Subs =   '-^------------!';
          const expected = '----a---------';

          cold('-a').pipe(take(1)).subscribe(() => inputHandler.next(s1));

          expectObservable(inputHandler.values$).toBe(expected, values);
          expectSubscriptions(s1.subscriptions).toBe(s1Subs);
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
        testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
          const values = { a: 'hello dear contributor' };
          const s1 = cold('---a---------|', values);
          const s1Subs =  '^------------!';
          const expected = '---a--------';

          inputHandler.next(s1);

          expectObservable(inputHandler.values$).toBe(expected, values);
          expectSubscriptions(s1.subscriptions).toBe(s1Subs);
        });
      });
    });
  });

  describe('BehaviorSubject', () => {
    describe('default flattening (switchAll)', () => {
      beforeEach(() => {
        inputHandler = coerceAllFactory<string>(() => new BehaviorSubject<string>('invisible initial value'));
      });

      it('should emit value from the observable passed to the input handler', () => {
        testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
          const values = { a: 'hello dear contributor' };
          const s1 = cold('---a---------|', values);
          const s1Subs = '^------------!';
          const expected = '---a--------';

          inputHandler.next(s1);

          expectObservable(inputHandler.values$).toBe(expected, values);
          expectSubscriptions(s1.subscriptions).toBe(s1Subs);
        });
      });
    });
  });
});
