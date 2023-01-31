import { TestScheduler } from 'rxjs/testing';
import { jestMatcher } from '@test-helpers';
import {
  onStrategy,
  RX_NATIVE_STRATEGIES,
  RxStrategyCredentials,
} from '@rx-angular/cdk/render-strategies';
import { animationFrameScheduler, observeOn, tap } from 'rxjs';

describe('onStrategy', () => {
  let testScheduler: TestScheduler;
  const animationFrameStrategy: RxStrategyCredentials = {
    name: 'animationFrame',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: ({ work }) => {
      return (o$) =>
        o$.pipe(
          observeOn(animationFrameScheduler),
          tap(() => work())
        );
    },
  };
  beforeEach(() => {
    testScheduler = new TestScheduler(jestMatcher);
  });

  it('should emit 42', () => {
    testScheduler.run(({ expectObservable }) => {
      const work = jest.fn();
      const values = { x: 42 };
      const stream$ = onStrategy(values.x, RX_NATIVE_STRATEGIES.native, work);
      const expected = '(x|)';
      expectObservable(stream$).toBe(expected, values);
    });
  });

  it('should throw error', () => {
    testScheduler.run(({ expectObservable }) => {
      const error = new Error('error');
      const work = () => {
        throw error;
      };
      const value = 42;
      const errorValues = [error, value];
      const expected = '#';
      const stream$ = onStrategy(value, RX_NATIVE_STRATEGIES.native, work);
      expectObservable(stream$).toBe(expected, null, errorValues);
    });
  });

  it('should run on animationFrame', () => {
    testScheduler.run(({ expectObservable, animate }) => {
      const work = jest.fn();
      animate('         --------x');
      const expected = '--------(x|)';
      const values = { x: 42 };
      const stream$ = onStrategy(values.x, animationFrameStrategy, work);
      expectObservable(stream$).toBe(expected, values);
    });
  });

  it('it should call work once when async', () => {
    const work = jest.fn();
    testScheduler.run(({ expectObservable, animate }) => {
      animate('         --------x');
      const expected = '--------(x|)';
      const values = { x: 42 };
      const stream$ = onStrategy(values.x, animationFrameStrategy, work);
      expect(work).not.toHaveBeenCalled();
      expectObservable(stream$).toBe(expected, values);
    });
    expect(work).toHaveBeenCalledTimes(1);
  });

  it('it should call work', () => {
    const work = jest.fn();
    onStrategy(42, RX_NATIVE_STRATEGIES.native, work).subscribe();
    expect(work).toHaveBeenCalledTimes(1);
  });
});
