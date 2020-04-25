import { TestBed } from '@angular/core/testing';

import { RxState } from '../src';
import {
  createStateChecker,
  initialPrimitiveState,
  PrimitiveState
} from './fixtures';
import { TestScheduler } from 'rxjs/testing';
import { jestMatcher } from '@test-helpers';

function setupState<T extends object>(cfg: { initialState?: T }) {
  const { initialState } = { ...cfg };
  const state = new RxState<T>();
  if (initialState) {
    state.set(initialState);
  }
  return state;
}

const stateChecker = createStateChecker((actual, expected) => {
  if (typeof expected === 'object') {
    expect(actual).toEqual(expected);
  } else {
    expect(actual).toBe(expected);
  }
});

let testScheduler: TestScheduler;

beforeEach(() => {
  testScheduler = new TestScheduler(jestMatcher);
});

describe('RxStateService', () => {
  let service: RxState<PrimitiveState>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = setupState({});
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be hot on instantiation', () => {
    stateChecker.checkSubscriptions(service, 1);
  });

  it('should unsubscribe on ngOnDestroy call', () => {
    stateChecker.checkSubscriptions(service, 1);
    service.ngOnDestroy();
    stateChecker.checkSubscriptions(service, 0);
  });

  describe('State', () => {
    it('should create new instance', () => {
      const state = new RxState<PrimitiveState>();
      expect(state).toBeDefined();
    });

    describe('select', () => {
      it('should return initial base-state', () => {
        testScheduler.run(({ expectObservable }) => {
          const state = setupState({ initialState: initialPrimitiveState });
          expectObservable(state.select()).toBe('s', {
            s: initialPrimitiveState
          });
        });
      });

      describe('slice by key', () => {
        it('should return empty base-state after init', () => {
          testScheduler.run(({ expectObservable }) => {
            const state = setupState({});
            expectObservable(state.select()).toBe('');
          });
        });

        it('should return initial base-state', () => {
          testScheduler.run(({ expectObservable }) => {
            const state = new RxState<PrimitiveState>();
            state.subscribe();

            state.set({ num: 42 });
            expectObservable(state.select('num')).toBe('s', { s: 42 });
          });
        });
      });

      describe('slice by map function', () => {
        it('should return nothing if empty', () => {
          testScheduler.run(({ expectObservable }) => {
            const state = setupState({});
            expectObservable(state.select()).toBe('');
          });
        });

        it('should return full base-state object on select', () => {
          testScheduler.run(({ expectObservable }) => {
            const state = setupState({ initialState: initialPrimitiveState });
            expectObservable(state.select()).toBe('s', {
              s: initialPrimitiveState
            });
          });
        });
      });
    });
  });

  describe('setState', () => {
    describe('with base-state partial', () => {
      it('should add new slices', () => {
        const state = setupState({});
        state.select().subscribe(s => {
          throw Error('should never emit');
        });
        state.set(initialPrimitiveState);
        state.select().subscribe(s => expect(s).toBe(initialPrimitiveState));
      });
      it('should override previous base-state slices', () => {
        const state = setupState({ initialState: initialPrimitiveState });
        state.select().subscribe(s => {
          throw Error('should never emit');
        });
        state.set(initialPrimitiveState);
        state.select().subscribe(s => expect(s).toBe(initialPrimitiveState));
        state.set({ num: 1 });
        state.select().subscribe(s => expect(s).toBe({ num: 1 }));
      });
    });
    describe('with base-state project partial', () => {
      it('should add new slices', () => {
        const state = setupState({});
        state.select().subscribe(s => {
          throw Error('should never emit');
        });
        state.set(s => initialPrimitiveState);
        state.select().subscribe(s => expect(s).toBe(initialPrimitiveState));
      });
      it('should override previous base-state slices', () => {
        const state = setupState({ initialState: initialPrimitiveState });
        state
          .select()
          .subscribe(s => expect(state).toBe(initialPrimitiveState));
        state.set(s => ({ num: s.num + 1 }));
        state.select().subscribe(s => expect(state).toBe({ num: 43 }));
      });
    });
    describe('with base-state key and value partial', () => {
      it('should add new slices', () => {
        const state = setupState<PrimitiveState>({});
        state.select().subscribe(s => {
          // throw Error('should never emit');
        });
        state.set('num', s => 1);
        state.select().subscribe(s => expect(s).toBe(initialPrimitiveState));
      });
      it('should override previous base-state slices', () => {
        const state = setupState({ initialState: initialPrimitiveState });
        state.select().subscribe(s => expect(s).toBe(initialPrimitiveState));
        state.set('num', s => s.num + 1);
        state.select().subscribe(s => expect(s).toBe({ num: 43 }));
      });
    });
  });

  describe('connectState', () => {
    describe('with observable of slices', () => {
      it('should add new slices', () => {});

      it('should override previous base-state slices', () => {});
    });
  });
});
