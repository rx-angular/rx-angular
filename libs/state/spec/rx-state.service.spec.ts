import { TestBed } from '@angular/core/testing';

import { RxState } from '../src';
import { createStateChecker, initialPrimitiveState, PrimitiveState } from './fixtures';
import { TestScheduler } from 'rxjs/testing';
import { jestMatcher } from '@test-helpers';
import { select } from '../src/lib/rxjs/operators/select';
import { pluck } from 'rxjs/operators';
import { from } from 'rxjs';

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
  });

  describe('$', () => {
    it('should return NO empty state after init when subscribing late', () => {
      testScheduler.run(({ expectObservable }) => {
        const state = setupState({});
        expectObservable(state.$).toBe('');
      });
    });

    it('should return No changes when subscribing late', () => {
      testScheduler.run(({ expectObservable }) => {
        const state = new RxState<PrimitiveState>();
        state.subscribe();

        state.set({ num: 42 });
        expectObservable(state.$.pipe(pluck('num'))).toBe('');
      });
    });

    it('should return new changes', () => {
      const state = new RxState<PrimitiveState>();
      state.subscribe();
      state.set({ num: 42 });
      const slice$ = state.$.pipe(select('num'));
      let i = -1;
      const valuesInOrder = ['', { num: 777 }];
      slice$.subscribe(next => expect(next).toBe(valuesInOrder[++i]));
      state.set({ num: 777 });
    });
  });

  describe('stateful with select', () => {
    it('should return empty state after init when subscribing late', () => {
      testScheduler.run(({ expectObservable }) => {
        const state = setupState({});
        expectObservable(state.select()).toBe('');
      });
    });

    it('should return changes when subscribing late', () => {
      testScheduler.run(({ expectObservable }) => {
        const state = new RxState<PrimitiveState>();
        state.subscribe();

        state.set({ num: 42 });
        expectObservable(state.select('num')).toBe('n', { n: 42 });
      });
    });

    it('should return new changes', () => {
      testScheduler.run(({ expectObservable }) => {
        const state = new RxState<PrimitiveState>();
        state.subscribe();
        state.set({ num: 42 });
        const slice$ = state.select('num');
        let i = -1;
        const valuesInOrder = [{ num: 42 }, { num: 777 }];
        slice$.subscribe(next => expect(next).toBe(valuesInOrder[++i]));
        state.set({ num: 777 });
      });
    });
  });

  describe('select', () => {
    it('should return initial state', () => {
      testScheduler.run(({ expectObservable }) => {
        const state = setupState({ initialState: initialPrimitiveState });
        expectObservable(state.select()).toBe('s', {
          s: initialPrimitiveState
        });
      });
    });

    describe('slice by key', () => {
      it('should return empty state after init', () => {
        testScheduler.run(({ expectObservable }) => {
          const state = setupState({});
          expectObservable(state.select()).toBe('');
        });
      });

      it('should return initial state', () => {
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

      it('should return full state object on select', () => {
        testScheduler.run(({ expectObservable }) => {
          const state = setupState({ initialState: initialPrimitiveState });
          expectObservable(state.select()).toBe('s', {
            s: initialPrimitiveState
          });
        });
      });
    });
  });

  describe('set', () => {
    describe('with state partial', () => {
      it('should add new slices', () => {
        const state = setupState({});
        state.select().subscribe(s => {
          throw Error('should never emit');
        });
        state.set(initialPrimitiveState);
        state.select().subscribe(s => expect(s).toBe(initialPrimitiveState));
      });
      it('should override previous state slices', () => {
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
    describe('with state project partial', () => {
      it('should add new slices', () => {
        const state = setupState({});
        state.select().subscribe(s => {
          throw Error('should never emit');
        });
        state.set(s => initialPrimitiveState);
        state.select().subscribe(s => expect(s).toBe(initialPrimitiveState));
      });
      it('should override previous state slices', () => {
        const state = setupState({ initialState: initialPrimitiveState });
        state
          .select()
          .subscribe(s => expect(state).toBe(initialPrimitiveState));
        state.set(s => ({ num: s.num + 1 }));
        state.select().subscribe(s => expect(state).toBe({ num: 43 }));
      });
    });
    describe('with state key and value partial', () => {
      it('should add new slices', () => {
        const state = setupState<PrimitiveState>({});
        state.select().subscribe(s => {
          // throw Error('should never emit');
        });
        state.set('num', s => 1);
        state.select().subscribe(s => expect(s).toBe(initialPrimitiveState));
      });
      it('should override previous state slices', () => {
        const state = setupState({ initialState: initialPrimitiveState });
        state.select().subscribe(s => expect(s).toBe(initialPrimitiveState));
        state.set('num', s => s.num + 1);
        state.select().subscribe(s => expect(s).toBe({ num: 43 }));
      });
    });
  });

  describe('connect', () => {


    it('should add new slices', () => {
      testScheduler.run(({ expectObservable }) => {
        const state = setupState({ initialState: initialPrimitiveState });
        expectObservable(state.select('num')).toBe('(abc)', {
          a: 42,
          b: 43,
          c: 44
        });

        state.connect(from([{ num: 42 }, { num: 43 }, { num: 44 }]));
      });
    });

    it('should get previous state slices and accumulate', () => {


    });

  });


  describe('setAccumulator', () => {

    it('should work before a value was emitted', () => {
      let numAccCalls = 0;
      const customAcc = <T>(s: T, sl: Partial<T>) => {
        ++numAccCalls;
        return {
          ...s, ...sl
        };
      };
      const state = setupState({ initialState: initialPrimitiveState });
      testScheduler.run(({ expectObservable }) => {

        expectObservable(state.select('num')).toBe('(abc)', {
          a: 42,
          b: 43,
          c: 44
        });

        state.setAccumulator(customAcc);
        state.set({ num: 42 });
        state.set({ num: 43 });
        state.set({ num: 44 });
      });

      expect(numAccCalls).toBe(3);
    });

    it('should work in between emissions', () => {
      let numAcc1Calls = 0;
      const customAcc1 = <T>(s: T, sl: Partial<T>) => {
        ++numAcc1Calls;
        return {
          ...s, ...sl
        };
      };
      let numAcc2Calls = 0;
      const customAcc2 = <T>(s: T, sl: Partial<T>) => {
        ++numAcc2Calls;
        return {
          ...s, ...sl
        };
      };
      const state = setupState({ initialState: initialPrimitiveState });
      testScheduler.run(({ expectObservable }) => {

        expectObservable(state.select('num')).toBe('(abc)', {
          a: 42,
          b: 43,
          c: 44
        });

        state.set({ num: 42 });
        state.setAccumulator(customAcc1);
        state.set({ num: 43 });
        state.setAccumulator(customAcc2);
        state.set({ num: 44 });
      });

      expect(numAcc1Calls).toBe(1);
      expect(numAcc2Calls).toBe(1);
    });

  });
});
