import { createAccumulationObservable } from '@rxjs-state';
import { pluck } from 'rxjs/operators';
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { jestMatcher } from '@test-helpers';

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

    it('should return initial state', () => {
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

    it('should return initial state', () => {
      const acc = setupAccumulationObservable<PrimitiveState>({
        initialState: initialPrimitiveState
      });
      expect(acc.state).toEqual(initialPrimitiveState);
    });
  });

  describe('nextSlice', () => {
    it('should add new state by partial', () => {
      testScheduler.run(({ expectObservable }) => {
        const acc = setupAccumulationObservable<PrimitiveState>({});
        acc.nextSlice({ num: 42 });
        expectObservable(acc.state$.pipe(pluck('num'))).toBe('s', { s: 42 });
      });
    });

    it('should override previous state by partial', () => {
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

    it('should override previous state slices', () => {
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
});
