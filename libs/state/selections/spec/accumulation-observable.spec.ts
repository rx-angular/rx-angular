import { TestBed } from '@angular/core/testing';
import {
  RX_ACCUMULATOR_FN,
  createAccumulationObservable,
  select,
} from '@rx-angular/state/selections';
import {
  PrimitiveState,
  initialPrimitiveState,
  jestMatcher,
} from '@test-helpers/rx-angular';
import { of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';

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

let testBed: TestBed;
let testScheduler: TestScheduler;

beforeEach(() => {
  testBed = TestBed.configureTestingModule({});
  testScheduler = new TestScheduler(jestMatcher);
});

describe('createAccumulationObservable', () => {
  it('should return object', () => {
    testBed.runInInjectionContext(() => {
      const acc = createAccumulationObservable();
      expect(acc).toBeDefined();
    });
  });

  it('should use custom accumulator function', () => {
    const accumulatorSpy = jest.fn((s, sl) => ({ ...s, ...sl }));
    testBed.overrideProvider(RX_ACCUMULATOR_FN, {
      useValue: accumulatorSpy,
    });
    testBed.runInInjectionContext(() => {
      const state = createAccumulationObservable<PrimitiveState>();
      state.subscribe();

      state.nextSlice({ num: 42 });
      expect(accumulatorSpy).toHaveBeenCalled();
    });
  });

  describe('signal$', () => {
    it('should return NO empty base-state after init when subscribing late', () => {
      testScheduler.run(({ expectObservable }) => {
        testBed.runInInjectionContext(() => {
          const state = setupAccumulationObservable({});
          expectObservable(state.signal$).toBe('');
        });
      });
    });

    it('should return No changes when subscribing late', () => {
      testScheduler.run(({ expectObservable }) => {
        testBed.runInInjectionContext(() => {
          const state = setupAccumulationObservable<PrimitiveState>({});
          state.subscribe();

          state.nextSlice({ num: 42 });
          expectObservable(state.signal$.pipe(map((s) => s.num))).toBe('');
        });
      });
    });

    it('should return changes after subscription', () => {
      testBed.runInInjectionContext(() => {
        const state = setupAccumulationObservable<PrimitiveState>({});
        state.subscribe();
        state.nextSlice({ num: 42 });
        const slice$ = state.signal$.pipe(select('num'));

        let i = -1;
        const valuesInOrder = ['', { num: 777 }];
        slice$.subscribe((next) => expect(next).toBe(valuesInOrder[++i]));
        state.nextSlice({ num: 777 });
      });
    });

    it('should log error if getting error', () => {
      testBed.runInInjectionContext(() => {
        const spy = jest.spyOn(console, 'error').mockImplementation();
        const state = setupAccumulationObservable<PrimitiveState>({});
        state.nextSliceObservable(throwError('test') as any);
        state.subscribe();

        expect(spy).toBeCalled();
      });
    });
  });

  describe('state$', () => {
    it('should return nothing without subscriber', () => {
      testScheduler.run(({ expectObservable }) => {
        testBed.runInInjectionContext(() => {
          const acc = setupAccumulationObservable<PrimitiveState>({
            initialState: initialPrimitiveState,
            initialize: false,
          });
          expectObservable(acc.state$).toBe('');
        });
      });
    });

    it('should return nothing after init', () => {
      testScheduler.run(({ expectObservable }) => {
        testBed.runInInjectionContext(() => {
          const acc = setupAccumulationObservable<PrimitiveState>({
            initialize: true,
          });
          expectObservable(acc.state$).toBe('');
        });
      });
    });

    it('should return initial base-state', () => {
      testScheduler.run(({ expectObservable }) => {
        testBed.runInInjectionContext(() => {
          const acc = setupAccumulationObservable<PrimitiveState>({
            initialState: initialPrimitiveState,
          });
          expectObservable(acc.state$).toBe('s', { s: initialPrimitiveState });
        });
      });
    });
  });

  describe('state', () => {
    it('should return {} without subscriber', () => {
      testBed.runInInjectionContext(() => {
        const acc = setupAccumulationObservable<PrimitiveState>({
          initialize: false,
        });
        expect(acc.state).toStrictEqual({});
      });
    });

    it('should return {} with subscriber', () => {
      testBed.runInInjectionContext(() => {
        const acc = setupAccumulationObservable<PrimitiveState>({
          initialize: true,
        });
        expect(acc.state).toStrictEqual({});
      });
    });

    it('should return {} after init', () => {
      testBed.runInInjectionContext(() => {
        const acc = setupAccumulationObservable<PrimitiveState>({
          initialize: true,
        });
        expect(acc.state).toStrictEqual({});
      });
    });

    it('should return initial base-state', () => {
      testBed.runInInjectionContext(() => {
        const acc = setupAccumulationObservable<PrimitiveState>({
          initialState: initialPrimitiveState,
        });
        expect(acc.state).toEqual(initialPrimitiveState);
      });
    });
  });

  describe('nextSlice', () => {
    it('should add new base-state by partial', () => {
      testScheduler.run(({ expectObservable }) => {
        testBed.runInInjectionContext(() => {
          const acc = setupAccumulationObservable<PrimitiveState>({});
          acc.nextSlice({ num: 42 });
          expectObservable(acc.state$.pipe(map((s) => s.num))).toBe('s', {
            s: 42,
          });
        });
      });
    });

    it('should override previous base-state by partial', () => {
      testBed.runInInjectionContext(() => {
        const acc = setupAccumulationObservable<PrimitiveState>({
          initialState: initialPrimitiveState,
        });
        acc.state$
          .pipe(map((s) => s.num))
          .subscribe((res) => expect(res).toBe({ s: 42 }));
        acc.nextSlice({ num: 43 });
        acc.state$
          .pipe(map((s) => s.num))
          .subscribe((res) => expect(res).toBe({ s: 43 }));
      });
    });
  });

  describe('connectState', () => {
    it('should add new slices', () => {
      testScheduler.run(({ expectObservable }) => {
        testBed.runInInjectionContext(() => {
          const acc = setupAccumulationObservable<PrimitiveState>({});
          acc.nextSliceObservable(of({ num: 42 }));
          expectObservable(acc.state$.pipe(map((s) => s.num))).toBe('s', {
            s: 42,
          });
        });
      });
    });

    it('should override previous base-state slices', () => {
      testBed.runInInjectionContext(() => {
        const acc = setupAccumulationObservable<PrimitiveState>({
          initialState: initialPrimitiveState,
        });
        acc.state$
          .pipe(map((s) => s.num))
          .subscribe((res) => expect(res).toBe({ s: 42 }));
        acc.nextSliceObservable(of({ num: 43 }));
        acc.state$
          .pipe(map((s) => s.num))
          .subscribe((res) => expect(res).toBe({ s: 42 }));
      });
    });
  });

  describe('nextAccumulator', () => {
    it('should accept new accumulator functions while running', () => {
      let numAccCalls = 0;
      const customAcc = <T>(s: T, sl: Partial<T>) => {
        ++numAccCalls;
        return {
          ...s,
          ...sl,
        };
      };
      testBed.runInInjectionContext(() => {
        const acc = setupAccumulationObservable<PrimitiveState>({});
        testScheduler.run(({ expectObservable }) => {
          acc.nextSlice({ num: 42 });
          expectObservable(acc.state$.pipe(map((s) => s.num))).toBe('(a)', {
            a: 44,
          });

          acc.nextAccumulator(customAcc);
          acc.nextSlice({ num: 43 });
          acc.nextSlice({ num: 44 });
        });

        expect(numAccCalls).toBe(2);
      });
    });
  });

  describe('emissions', () => {
    // this test makes no sense since state$ won't reset itself after unsubscribing. re-subscribing would result in
    // the latest value emitted
    xit('should stop on unsubscribe from state', () => {
      testScheduler.run(({ expectObservable }) => {
        testBed.runInInjectionContext(() => {
          const acc = createAccumulationObservable<PrimitiveState>();
          const sub = acc.subscribe();
          acc.nextSlice(initialPrimitiveState);
          sub.unsubscribe();
          expectObservable(acc.state$).toBe('');
        });
      });
    });

    it('should stop from connect observable', () => {
      testScheduler.run(({ expectObservable, hot, expectSubscriptions }) => {
        testBed.runInInjectionContext(() => {
          const acc = createAccumulationObservable<PrimitiveState>();
          const sub = acc.subscribe();
          const tick$ = hot('aaaaaaaaaaaaaaa|', { a: 1 });
          const interval$ = tick$.pipe(map((num) => ({ num })));
          const subs = '(^!)';
          acc.nextSliceObservable(interval$);
          sub.unsubscribe();
          expectObservable(acc.state$).toBe('');
          expectSubscriptions(tick$.subscriptions).toBe(subs);
        });
      });
    });
  });
});
