import { jestMatcher } from '@test-helpers';
import { of } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';
import { createAccumulationObservable, select } from '../../src/lib/core';
import createSpy = jasmine.createSpy;

interface PrimitiveState {
  bol: boolean;
  str: string;
  num: number;
}

interface NestedState {
  obj: {
    key1: {
      key11: {
        key111: string;
      };
    };
  };
}

const initialPrimitiveState: PrimitiveState = {
  str: 'string',
  num: 42,
  bol: true
};

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
});
