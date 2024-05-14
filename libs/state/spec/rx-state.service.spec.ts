import { Injector, runInInjectionContext } from '@angular/core';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { select } from '@rx-angular/state/selections';
import {
  initialNestedState,
  initialPrimitiveState,
  jestMatcher,
  PrimitiveState,
} from '@test-helpers/rx-angular';
import { of, scheduled, Subject } from 'rxjs';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { map, switchMap, take, takeUntil } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';
import { RxState } from '../src/lib/rx-state.service';
import { ReadOnly } from '../src/lib/rx-state.service';
import { createStateChecker } from './fixtures';

type ReadOnlyPrimitiveState = Pick<RxState<PrimitiveState>, ReadOnly>;

function setupState<T extends object>(cfg: { initialState?: T } = {}) {
  const { initialState } = { ...cfg };
  const state = TestBed.inject(RxState);
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
  let injector: Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      teardown: { destroyAfterEach: true },
      providers: [RxState],
    });
    service = setupState();
    injector = TestBed.inject(Injector);
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
      const state = setupState();
      expect(state).toBeDefined();
    });
  });

  describe('$', () => {
    it('should return NO empty state after init when subscribing late', () => {
      testScheduler.run(({ expectObservable }) => {
        expectObservable(service.$).toBe('');
      });
    });

    it('should return No changes when subscribing late', () => {
      testScheduler.run(({ expectObservable }) => {
        runInInjectionContext(injector, () => {
          const state = service;
          state.subscribe();

          state.set({ num: 42 });
          expectObservable(state.$.pipe(map((s) => s.num))).toBe('');
        });
      });
    });

    it('should return new changes', () => {
      const state = service;
      state.set({ num: 42 });
      const slice$ = state.$.pipe(select('num'));
      let i = -1;
      const valuesInOrder = ['', { num: 777 }];
      slice$.subscribe((next) => expect(next).toBe(valuesInOrder[++i]));
      state.set({ num: 777 });
    });
  });

  describe('stateful with select', () => {
    it('should return empty state after init when subscribing late', () => {
      testScheduler.run(({ expectObservable }) => {
        expectObservable(service.select()).toBe('');
      });
    });

    it('should return changes when subscribing late', () => {
      testScheduler.run(({ expectObservable }) => {
        runInInjectionContext(injector, () => {
          const state = new RxState<PrimitiveState>();
          state.subscribe();

          state.set({ num: 42 });
          expectObservable(state.select('num')).toBe('n', { n: 42 });
        });
      });
    });

    it('should return new changes', () => {
      testScheduler.run(({ expectObservable }) => {
        runInInjectionContext(injector, () => {
          const state = new RxState<PrimitiveState>();
          state.subscribe();
          state.set({ num: 42 });
          const slice$ = state.select('num');
          let i = -1;
          const valuesInOrder = [42, 777];
          slice$.subscribe((next) => expect(next).toBe(valuesInOrder[++i]));
          state.set({ num: 777 });
        });
      });
    });
  });

  describe('get', () => {
    it('should return undefined as initial value', () => {
      const state = setupState({ initialState: undefined });
      const val = state.get();
      const readOnlyVal = state.asReadOnly().get();
      expect(val).toEqual(undefined);
      expect(readOnlyVal).toEqual(undefined);
    });

    it('should return undefined for an undefined property', () => {
      const state = setupState<{ num: number }>({ initialState: undefined });
      const val = state.get('num');
      const readOnlyVal = state.asReadOnly().get('num');
      expect(val).toEqual(undefined);
      expect(readOnlyVal).toEqual(undefined);
    });

    it('should return value when keys are provided as params', () => {
      const state = setupState({ initialState: initialPrimitiveState });
      const val = state.get('num');
      const readOnlyVal = state.asReadOnly().get('num');
      expect(val).toEqual(initialPrimitiveState.num);
      expect(readOnlyVal).toEqual(initialPrimitiveState.num);
    });

    it('should return whole state object when no keys provided', () => {
      const state = setupState({ initialState: initialPrimitiveState });
      const val = state.get();
      const readOnlyVal = state.asReadOnly().get();
      expect(val.num).toEqual(initialPrimitiveState.num);
      expect(readOnlyVal.num).toEqual(initialPrimitiveState.num);
    });
  });

  describe('select', () => {
    it('should return undefined as initial value', () => {
      testScheduler.run(({ expectObservable }) => {
        const state = setupState({ initialState: undefined });
        expectObservable(state.select()).toBe('-');
        expectObservable(state.asReadOnly().select()).toBe('-');
      });
    });

    it('should return initial state', () => {
      testScheduler.run(({ expectObservable }) => {
        const state = setupState({ initialState: initialPrimitiveState });
        expectObservable(state.select()).toBe('s', {
          s: initialPrimitiveState,
        });
        expectObservable(state.asReadOnly().select()).toBe('s', {
          s: initialPrimitiveState,
        });
      });
    });

    it('should throw with wrong params', () => {
      const state = setupState({ initialState: initialPrimitiveState });
      const errorMessage = 'wrong params passed to select';
      expect(() => state.select(true as any)).toThrowError(errorMessage);
      expect(() => state.asReadOnly().select(true as any)).toThrowError(
        errorMessage,
      );
    });

    describe('slice by key', () => {
      it('should return empty state after init', () => {
        testScheduler.run(({ expectObservable }) => {
          const state = setupState({});
          expectObservable(state.select()).toBe('');
          expectObservable(state.asReadOnly().select()).toBe('');
        });
      });

      it('should return initial state', () => {
        testScheduler.run(({ expectObservable }) => {
          runInInjectionContext(injector, () => {
            const state = new RxState<PrimitiveState>();
            state.subscribe();

            state.set({ num: 42 });
            expectObservable(state.select('num')).toBe('s', { s: 42 });
            expectObservable(state.asReadOnly().select('num')).toBe('s', {
              s: 42,
            });
          });
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
            s: initialPrimitiveState,
          });
        });
      });

      it('should return slice on select with prop', () => {
        testScheduler.run(({ expectObservable }) => {
          const state = setupState({ initialState: initialPrimitiveState });
          expectObservable(state.select('num')).toBe('s', {
            s: initialPrimitiveState.num,
          });
        });
      });

      it('should return slice on select with operator', () => {
        testScheduler.run(({ expectObservable }) => {
          const state = setupState({ initialState: initialPrimitiveState });
          expectObservable(state.select(map((s) => s.num))).toBe('s', {
            s: initialPrimitiveState.num,
          });
        });
      });

      it('should return mapped slice on select with key and function', () => {
        testScheduler.run(({ expectObservable }) => {
          const state = setupState({ initialState: initialPrimitiveState });
          expectObservable(state.select('num', (x) => x * 2)).toBe('s', {
            s: initialPrimitiveState.num * 2,
          });
        });
      });

      it('should return mapped slice on select with keys and function', () => {
        testScheduler.run(({ expectObservable }) => {
          const state = setupState({ initialState: initialPrimitiveState });
          expectObservable(
            state.select(['num', 'str'], ({ num, str }) => `${str}: ${num}`),
          ).toBe('s', {
            s: `${initialPrimitiveState.str}: ${initialPrimitiveState.num}`,
          });
        });
      });

      it('should return mapped slice with default function if no one provided', () => {
        testScheduler.run(({ expectObservable }) => {
          const state = setupState({ initialState: initialPrimitiveState });
          expectObservable(state.select(['num', 'str'])).toBe('s', {
            s: {
              num: 42,
              str: 'str',
            },
          });
        });
      });

      it('should return mapped slice on select with keys, function and key compare map', () => {
        testScheduler.run(({ expectObservable }) => {
          const state = setupState({
            initialState: { ...initialPrimitiveState, ...initialNestedState },
          });
          expectObservable(
            state.select(
              ['num', 'obj'],
              ({ num, obj }) => `${num}: ${obj.key1.key11.key111}`,
              { obj: (a, b) => a.key1.key11.key111 === b.key1.key11.key111 },
            ),
          ).toBe('s', {
            s: `${initialPrimitiveState.num}: ${initialNestedState.obj.key1.key11.key111}`,
          });
        });
      });
    });
  });

  describe('set', () => {
    describe('with state partial', () => {
      it('should add new slices', () => {
        const state = setupState({});
        state.select().subscribe((s) => {
          throw Error('should never emit');
        });
        state.set(initialPrimitiveState);
        state.select().subscribe((s) => expect(s).toBe(initialPrimitiveState));
      });
      it('should override previous state slices', () => {
        const state = setupState({ initialState: initialPrimitiveState });
        state.select().subscribe((s) => {
          throw Error('should never emit');
        });
        state.set(initialPrimitiveState);
        state.select().subscribe((s) => expect(s).toBe(initialPrimitiveState));
        state.set({ num: 1 });
        state.select().subscribe((s) => expect(s).toBe({ num: 1 }));
      });

      it('should throw with wrong params', () => {
        const state = setupState({ initialState: initialPrimitiveState });

        expect(() =>
          state.set('wrong params passed to set' as any),
        ).toThrowError('wrong param');
      });
    });
    describe('with state project partial', () => {
      it('should add new slices', () => {
        const state = setupState({});
        state.select().subscribe((s) => {
          throw Error('should never emit');
        });
        state.set((s) => initialPrimitiveState);
        state.select().subscribe((s) => expect(s).toBe(initialPrimitiveState));
      });
      it('should override previous state slices', () => {
        const state = setupState({ initialState: initialPrimitiveState });
        state
          .select()
          .subscribe((s) => expect(state).toBe(initialPrimitiveState));
        state.set((s) => ({ num: s.num + 1 }));
        state.select().subscribe((s) => expect(state).toBe({ num: 43 }));
      });
    });
    describe('with state key and value partial', () => {
      it('should add new slices', () => {
        const state = setupState<PrimitiveState>({});
        state.select().subscribe((s) => {
          // throw Error('should never emit');
        });
        state.set('num', (s) => 1);
        state.select().subscribe((s) => expect(s).toBe(initialPrimitiveState));
      });
      it('should override previous state slices', () => {
        const state = setupState({ initialState: initialPrimitiveState });
        state.select().subscribe((s) => expect(s).toBe(initialPrimitiveState));
        state.set('num', (s) => s.num + 1);
        state.select().subscribe((s) => expect(s).toBe({ num: 43 }));
      });
    });
    describe('with read only state', () => {
      it('should throw error when trying to call set from readOnlyState', () => {
        const readOnlyState: ReadOnlyPrimitiveState = setupState({
          initialState: initialPrimitiveState,
        }).asReadOnly();
        expect((): void => {
          readOnlyState['set']('num', (state: PrimitiveState) => state.num + 1);
        }).toThrowError('readOnlyState.set is not a function');
      });
    });
  });

  describe('connect', () => {
    it('should work with observables directly', () => {
      testScheduler.run(({ expectObservable }) => {
        const state = setupState({ initialState: initialPrimitiveState });
        expectObservable(state.select('num')).toBe('(abc)', {
          a: 42,
          b: 43,
          c: 44,
        });

        state.connect(
          scheduled([{ num: 42 }, { num: 43 }, { num: 44 }], testScheduler),
        );
      });
    });

    it('should work with prop name and observable', () => {
      testScheduler.run(({ expectObservable }) => {
        const state = setupState({ initialState: initialPrimitiveState });
        expectObservable(state.select('num')).toBe('(abc)', {
          a: 42,
          b: 43,
          c: 44,
        });

        state.connect(
          'num',
          scheduled(
            [{ num: 42 }, { num: 43 }, { num: 44 }],
            testScheduler,
          ).pipe(map((s) => s.num)),
        );
      });
    });

    it('should work with observable and project', () => {
      testScheduler.run(({ expectObservable }) => {
        const state = setupState({ initialState: initialPrimitiveState });
        expectObservable(state.select('num')).toBe('(abc)', {
          a: 42,
          b: 43,
          c: 44,
        });

        state.connect(
          scheduled([{ num: 42 }, { num: 43 }, { num: 44 }], testScheduler),
          (s, n) => ({ num: n.num }),
        );
      });
    });

    it('should work with prop name and observable and reducer', () => {
      testScheduler.run(({ expectObservable }) => {
        const state = setupState({ initialState: initialPrimitiveState });
        expectObservable(state.select('num')).toBe('(abc)', {
          a: 42,
          b: 43,
          c: 44,
        });

        state.connect(
          'num',
          scheduled([{ num: 42 }, { num: 43 }, { num: 44 }], testScheduler),
          (s, v) => v.num,
        );
      });
    });

    it('should pass undefined for observable', () => {
      testScheduler.run(({ expectObservable }) => {
        const s: { num: number | undefined } = { num: 0 };
        const state = setupState({ initialState: s });

        expectObservable(state.$.pipe(map((st) => st.num))).toBe('(abc)', {
          a: undefined,
          b: 43,
          c: undefined,
        });

        state.connect(
          scheduled(
            [{ num: undefined }, { num: 43 }, { num: undefined }],
            testScheduler,
          ),
          (o, n) => n,
        );
      });
    });

    it('should pass undefined for projectFn', () => {
      testScheduler.run(({ expectObservable }) => {
        const s: { num: number | undefined } = { num: 0 };
        const state = setupState({ initialState: s });

        expectObservable(state.$.pipe(map((st) => st.num))).toBe('(abc)', {
          a: undefined,
          b: 43,
          c: undefined,
        });

        state.connect(
          'num',
          scheduled([undefined, 43, undefined], testScheduler),
          (o, n) => n,
        );
      });
    });

    it('should pass undefined for key observable', () => {
      testScheduler.run(({ expectObservable }) => {
        const s: { num: number | undefined } = { num: 0 };
        const state = setupState({ initialState: s });

        expectObservable(state.$.pipe(map((st) => st.num))).toBe('(abc)', {
          a: undefined,
          b: 43,
          c: undefined,
        });

        state.connect(
          'num',
          scheduled([undefined, 43, undefined], testScheduler),
        );
      });
    });

    it('should pass undefined for observable projectFn', () => {
      testScheduler.run(({ expectObservable }) => {
        const s: { num: number | undefined } = { num: 5 };
        const state = setupState({ initialState: s });

        expectObservable(state.$.pipe(map((st) => st.num))).toBe('(abc)', {
          a: undefined,
          b: 43,
          c: undefined,
        });

        state.connect(
          scheduled(
            [{ num: undefined }, { num: 43 }, { num: undefined }],
            testScheduler,
          ),
          (sta, newVal) => newVal,
        );
      });
    });

    it('should throw with wrong params', () => {
      const state = setupState({ initialState: initialPrimitiveState });

      expect(() => state.connect('some string' as any)).toThrowError(
        'wrong params passed to connect',
      );
    });

    it('should stop from connect observable', () => {
      testScheduler.run(({ expectObservable, hot, expectSubscriptions }) => {
        const state = setupState({});
        const tick$ = hot('aaaaaaaaaaaaaaa|', { a: 1 });
        const subs = '(^!)';
        state.connect(tick$.pipe(map((num) => ({ num }))));
        state.ngOnDestroy();
        expectObservable(state.select()).toBe('');
        expectSubscriptions(tick$.subscriptions).toBe(subs);
      });
    });

    it('should stop from connect key & observable', () => {
      testScheduler.run(({ expectObservable, hot, expectSubscriptions }) => {
        const state = setupState<any>({});
        const tick$ = hot('aaaaaaaaaaaaaaa|', { a: 1 });
        const subs = '(^!)';
        state.connect('num' as any, tick$);
        state.ngOnDestroy();
        expectSubscriptions(tick$.subscriptions).toBe(subs);
        expectObservable(state.select()).toBe('');
      });
    });

    it('should stop from connect observable & projectFn', () => {
      testScheduler.run(({ expectObservable, hot, expectSubscriptions }) => {
        const state = setupState({});
        const tick$ = hot('aaaaaaaaaaaaaaa|', { a: 1 });
        const subs = '(^!)';
        state.connect(tick$, (s, v) => ({ num: v * 42 }));
        state.ngOnDestroy();
        expectObservable(state.select()).toBe('');
        expectSubscriptions(tick$.subscriptions).toBe(subs);
      });
    });

    it('should stop from connect key & observable & projectFn', () => {
      testScheduler.run(({ expectObservable, hot, expectSubscriptions }) => {
        const state = setupState<any>({});
        const tick$ = hot('aaaaaaaaaaaaaaa|', { a: 1 });
        const subs = '(^!)';
        state.connect('num', tick$, (s, v) => v * 42);
        state.ngOnDestroy();
        expectObservable(state.select()).toBe('');
        expectSubscriptions(tick$.subscriptions).toBe(subs);
      });
    });

    it('should stop in selects with HOOs', () => {
      testScheduler.run(({ expectObservable, hot, expectSubscriptions }) => {
        const state = setupState({});
        const interval$ = hot('aaaaaaaaaaaaaaa|', { a: 1 });
        const subs = '';
        expectObservable(
          state.select(
            switchMap(() =>
              interval$.pipe(
                map((num) => ({ num })),
                take(3),
              ),
            ),
          ),
        ).toBe('');
        expectSubscriptions(interval$.subscriptions).toBe(subs);
        state.ngOnDestroy();
      });
    });

    it('should throw error when trying to call connect from readOnlyState', () => {
      testScheduler.run(() => {
        const s: { num: number | undefined } = { num: 0 };
        const readOnlyState: ReadOnlyPrimitiveState = setupState({
          initialState: s,
        }).asReadOnly();
        expect((): void => {
          readOnlyState['connect'](
            scheduled(
              [{ num: undefined }, { num: 43 }, { num: undefined }],
              testScheduler,
            ),
            (o, n) => n,
          );
        }).toThrowError('readOnlyState.connect is not a function');
      });
    });
  });

  describe('setAccumulator', () => {
    it('should work before a value was emitted', () => {
      let numAccCalls = 0;
      const customAcc = <T>(s: T, sl: Partial<T>) => {
        ++numAccCalls;
        return {
          ...s,
          ...sl,
        };
      };
      const state = setupState({ initialState: initialPrimitiveState });
      testScheduler.run(({ expectObservable }) => {
        expectObservable(state.select('num')).toBe('(a)', {
          a: 44,
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
          ...s,
          ...sl,
        };
      };
      let numAcc2Calls = 0;
      const customAcc2 = <T>(s: T, sl: Partial<T>) => {
        ++numAcc2Calls;
        return {
          ...s,
          ...sl,
        };
      };
      const state = setupState({ initialState: initialPrimitiveState });
      testScheduler.run(({ expectObservable }) => {
        expectObservable(state.select('num')).toBe('(a)', {
          a: 44,
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
    it('should throw error when trying to call setAccumulator from readOnlyState', () => {
      let numAccCalls = 0;
      const customAcc = <T>(s: T, sl: Partial<T>) => {
        ++numAccCalls;
        return {
          ...s,
          ...sl,
        };
      };
      const readOnlyState: ReadOnlyPrimitiveState = setupState({
        initialState: initialPrimitiveState,
      }).asReadOnly();
      expect((): void => {
        readOnlyState['setAccumulator'](customAcc);
      }).toThrowError('readOnlyState.setAccumulator is not a function');
    });
  });

  describe('hold', () => {
    it('should work with effect-observable', () => {
      testScheduler.run(({ cold, expectSubscriptions }) => {
        const state = setupState({ initialState: initialPrimitiveState });

        const test$ = cold('(abc)', { a: 1, b: 2, c: 3 });
        const sub = '(^!)';
        const stop = new Subject();
        state.hold(test$.pipe(takeUntil(stop)));
        stop.next(1);
        expectSubscriptions(test$.subscriptions).toBe(sub);
      });
    });

    it('should work with observable and effect', fakeAsync(() => {
      let calls = 0;
      const effect = (v: number) => {
        calls = calls + 1;
      };
      const state = setupState({ initialState: initialPrimitiveState });
      state.hold(of(1, 2, 3), effect);
      expect(calls).toBe(3);
    }));

    it('should throw error when trying to call hold from readOnlyState', () => {
      testScheduler.run(({ cold, expectSubscriptions }) => {
        const readOnlyState: ReadOnlyPrimitiveState = setupState({
          initialState: initialPrimitiveState,
        }).asReadOnly();
        const test$: ColdObservable<number> = cold('(abc)', {
          a: 1,
          b: 2,
          c: 3,
        });
        const stop: Subject<void> = new Subject();
        expect((): void => {
          readOnlyState['hold'](test$.pipe(takeUntil(stop)));
        }).toThrowError('readOnlyState.hold is not a function');
      });
    });
  });
});
