
// tslint:disable-next-line:nx-enforce-module-boundaries
import { jestMatcher } from '@test-helpers';
import { interval, of, throwError } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';
import { createAccumulationObservable } from '../../src/lib/cdk';
import { select } from '@rx-angular/state';
import { initialPrimitiveState, PrimitiveState } from '../fixtures';


function setupAccumulationObservable<T extends object>(cfg: {
  initialState?: T;
  initialize?: boolean;
}) {
  const { initialState, initialize } = { initialize: true, ...cfg };
  const acc = createAccumulationObservable<T>();
  if (initialize) {
    acc.subscribe();
  }
  if (initialState) {
    acc.nextSlice(initialState);
  }
  return acc;
}

let testScheduler: TestScheduler;

beforeEach(() => {
  testScheduler = new TestScheduler(jestMatcher);
});

// tslint:disable: no-duplicate-string
describe('createAccumulationObservable', () => {
  it('should return object', () => {
    const acc = createAccumulationObservable();
    expect(acc).toBeDefined();
  });

  describe('signal$', () => {
    it('should return NO empty base-state after init when subscribing late', () => {
      testScheduler.run(({ expectObservable }) => {
        const state = setupAccumulationObservable({});
        expectObservable(state.signal$).toBe('');
      });
    });

    it('should return No changes when subscribing late', () => {
      testScheduler.run(({ expectObservable }) => {
        const state = setupAccumulationObservable<PrimitiveState>({});
        state.subscribe();

        state.nextSlice({ num: 42 });
        expectObservable(state.signal$.pipe(pluck('num'))).toBe('');
      });
    });

    it('should return changes after subscription', () => {
      const state = setupAccumulationObservable<PrimitiveState>({});
      state.subscribe();
      state.nextSlice({ num: 42 });
      const slice$ = state.signal$.pipe(select('num'));

      let i = -1;
      const valuesInOrder = ['', { num: 777 }];
      slice$.subscribe(next => expect(next).toBe(valuesInOrder[++i]));
      state.nextSlice({ num: 777 });
    });

    it('should log error if getting error', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation();
      const state = setupAccumulationObservable<PrimitiveState>({});
      state.nextSliceObservable(throwError('test') as any);
      state.subscribe();

      expect(spy).toBeCalled();
    });
  });

  describe('state$', () => {
    it('should return nothing without subscriber', () => {
      testScheduler.run(({ expectObservable }) => {
        const acc = setupAccumulationObservable<PrimitiveState>({
          initialState: initialPrimitiveState,
          initialize: false
        });
        expectObservable(acc.state$).toBe('');
      });
    });

    it('should return nothing after init', () => {
      testScheduler.run(({ expectObservable }) => {
        const acc = setupAccumulationObservable<PrimitiveState>({
          initialize: true
        });
        expectObservable(acc.state$).toBe('');
      });
    });

    it('should return initial base-state', () => {
      testScheduler.run(({ expectObservable }) => {
        const acc = setupAccumulationObservable<PrimitiveState>({
          initialState: initialPrimitiveState
        });
        expectObservable(acc.state$).toBe('s', { s: initialPrimitiveState });
      });
    });
  });

  describe('state', () => {
    it('should return {} without subscriber', () => {
      const acc = setupAccumulationObservable<PrimitiveState>({
        initialize: false
      });
      expect(acc.state).toStrictEqual({});
    });

    it('should return {} with subscriber', () => {
      const acc = setupAccumulationObservable<PrimitiveState>({
        initialize: true
      });
      expect(acc.state).toStrictEqual({});
    });

    it('should return {} after init', () => {
      const acc = setupAccumulationObservable<PrimitiveState>({
        initialize: true
      });
      expect(acc.state).toStrictEqual({});
    });

    it('should return initial base-state', () => {
      const acc = setupAccumulationObservable<PrimitiveState>({
        initialState: initialPrimitiveState
      });
      expect(acc.state).toEqual(initialPrimitiveState);
    });
  });

  describe('nextSlice', () => {
    it('should add new base-state by partial', () => {
      testScheduler.run(({ expectObservable }) => {
        const acc = setupAccumulationObservable<PrimitiveState>({});
        acc.nextSlice({ num: 42 });
        expectObservable(acc.state$.pipe(pluck('num'))).toBe('s', { s: 42 });
      });
    });

    it('should override previous base-state by partial', () => {
      const acc = setupAccumulationObservable<PrimitiveState>({
        initialState: initialPrimitiveState
      });
      acc.state$
        .pipe(pluck('num'))
        .subscribe(res => expect(res).toBe({ s: 42 }));
      acc.nextSlice({ num: 43 });
      acc.state$
        .pipe(pluck('num'))
        .subscribe(res => expect(res).toBe({ s: 43 }));
    });
  });

  describe('connectState', () => {
    it('should add new slices', () => {
      testScheduler.run(({ expectObservable }) => {
        const acc = setupAccumulationObservable<PrimitiveState>({});
        acc.nextSliceObservable(of({ num: 42 }));
        expectObservable(acc.state$.pipe(pluck('num'))).toBe('s', { s: 42 });
      });
    });

    it('should override previous base-state slices', () => {
      const acc = setupAccumulationObservable<PrimitiveState>({
        initialState: initialPrimitiveState
      });
      acc.state$
        .pipe(pluck('num'))
        .subscribe(res => expect(res).toBe({ s: 42 }));
      acc.nextSliceObservable(of({ num: 43 }));
      acc.state$
        .pipe(pluck('num'))
        .subscribe(res => expect(res).toBe({ s: 42 }));
    });
  });

  describe('nextAccumulator', () => {
    it('should accept new accumulator functions while running', () => {
      let numAccCalls = 0;
      const customAcc = <T>(s: T, sl: Partial<T>) => {
        ++numAccCalls;
        return {
          ...s, ...sl
        };
      };
      const acc = setupAccumulationObservable<PrimitiveState>({});
      testScheduler.run(({ expectObservable }) => {
        acc.nextSlice({ num: 42 });
        expectObservable(acc.state$.pipe(pluck('num'))).toBe('(abc)', {
          a: 42,
          b: 43,
          c: 44
        });

        acc.nextAccumulator(customAcc);
        acc.nextSlice({ num: 43 });
        acc.nextSlice({ num: 44 });
      });

      expect(numAccCalls).toBe(2)
    });
  });

  describe('emissions', () => {

    it('should stop on unsubscribe from state', () => {
      testScheduler.run(({ expectObservable }) => {
        const acc = createAccumulationObservable<PrimitiveState>();
        const sub = acc.subscribe();
        acc.nextSlice(initialPrimitiveState);
        sub.unsubscribe();
        expectObservable(acc.state$).toBe('');
      });
    });

    it('should stop from connect observable', () => {
      testScheduler.run(({ expectObservable }) => {
        const acc = createAccumulationObservable<PrimitiveState>();
        const sub = acc.subscribe();
        acc.nextSlice(initialPrimitiveState);
        const tick$ = interval(1000).pipe(map(num => ({num})));
        acc.nextSliceObservable(tick$)
        sub.unsubscribe();
        expectObservable(acc.state$).toBe('');
      });
    });

  })
});
