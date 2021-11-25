import { ɵglobal } from '@angular/core';
import { TestScheduler } from 'rxjs/testing';
import { jestMatcher } from '@test-helpers';
import { onStrategy, RX_NATIVE_STRATEGIES } from '@rx-angular/cdk/render-strategies';
import { animationFrameScheduler, observeOn, of } from 'rxjs';

describe('onStrategy', () => {

  let testScheduler: TestScheduler;
  let handles = [];
  let animationRuns = 0;
  function _animate() {
    handles.forEach(handle => handle());
  }
  let _animationFrameRestore;
  let _cancelAnimationFrameRestore;
  beforeEach(() => {
    testScheduler = new TestScheduler(jestMatcher);
    _animationFrameRestore = ɵglobal.requestAnimationFrame;
    _cancelAnimationFrameRestore = ɵglobal.cancelAnimationFrame;
    ɵglobal.requestAnimationFrame = (cb?) => {
      handles[animationRuns] = cb;
      animationRuns++;
      return animationRuns;
    }
    ɵglobal.cancelAnimationFrame = (id: number) => {
      handles = handles.splice(id, 1);
    }
  });


  afterEach(() => {
    ɵglobal.requestAnimationFrame = _animationFrameRestore;
    ɵglobal.cancelAnimationFrame = _cancelAnimationFrameRestore;
    animationRuns = 0;
    handles = [];
  });

  it('should emit 42', () => {
    testScheduler.run(({expectObservable}) => {
      const work = jest.fn();
      const values = { x: 42 };
      const stream$ = onStrategy(values.x, RX_NATIVE_STRATEGIES.native, work);
      const expected = '(x|)';
      expectObservable(stream$).toBe(expected, values)
    });
  });

  it('should throw error', () => {
    testScheduler.run(({expectObservable}) => {
      const error = new Error('error');
      const work = () => {
        throw error;
      }
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
      of(null).pipe(observeOn(animationFrameScheduler)).subscribe(() => {
        _animate();
      });
      const values = { x: 42 };
      const stream$ = onStrategy(values.x, RX_NATIVE_STRATEGIES.local, work);
      expectObservable(stream$).toBe(expected, values);
    });
  });

  it('it should call work once when async', () => {
    const work = jest.fn();
    onStrategy(42, RX_NATIVE_STRATEGIES.local, work).subscribe();
    expect(work).not.toHaveBeenCalled();
    _animate();
    expect(work).toHaveBeenCalledTimes(1);
  });

  it('it should call work', () => {
    const work = jest.fn();
    onStrategy(42, RX_NATIVE_STRATEGIES.native, work).subscribe();
    expect(work).toHaveBeenCalledTimes(1);
  });
});
