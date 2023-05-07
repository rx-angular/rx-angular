import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { expectType } from 'tsd';

import { of, tap } from 'rxjs';
import {
  RxStateFeature,
  rxState,
  withAccumulator,
  withConnect,
  withHold,
  withInitialState,
} from './inject';
import { RxState } from './rx-state.service';

describe(rxState, () => {
  it('should create RxState instance', () => {
    const { component } = setupStatefulComponent();
    expect(component.state).toBeInstanceOf(RxState);
  });

  it('should infer state from initial state', () => {
    const { component } = setupStatefulComponent(
      withInitialState({ count: 0 })
    );
    expectType<RxState<{ count: number }>>(component.state);
  });

  it('should infer state from generic type', () => {
    const { component } = setupStatefulComponent<{ count: number }>();
    expectType<RxState<{ count: number }>>(component.state);
  });

  it('should compose state with initial state', () => {
    const { component } = setupStatefulComponent(
      withInitialState({ count: 0 })
    );
    expect(component.state.get()).toEqual({ count: 0 });
  });

  it('should compose state with accumulator', () => {
    const { component } = setupStatefulComponent<{ count: number }>(
      withInitialState({ count: 0 }),
      withAccumulator((state, slice) => {
        return {
          ...state,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          count: (slice as any).count + 10,
        };
      })
    );
    component.state.set({ count: 10 });
    expect(component.state.get()).toEqual({ count: 20 });
  });

  describe(withHold, () => {
    it('should hold an observable', () => {
      const spy = jest.fn();
      setupStatefulComponent<{ count: number }>(
        withHold(of('src').pipe(tap(spy)))
      );
      expect(spy).toHaveBeenCalledWith('src');
    });

    it('should hold an observable and sideEffect fn', () => {
      const spy = jest.fn();
      setupStatefulComponent<{ count: number }>(withHold(of('src'), spy));
      expect(spy).toHaveBeenCalledWith('src');
    });

    it('should hold multiple observables', () => {
      const spy = jest.fn();
      setupStatefulComponent<{ count: number }>(
        withHold((hold) => {
          hold(of('src').pipe(tap(spy)));
          hold(of('src2'), spy);
        })
      );
      expect(spy.mock.calls[0][0]).toEqual('src');
      expect(spy.mock.calls[1][0]).toEqual('src2');
    });
  });

  describe(withConnect, () => {
    it('should connect with slice$', () => {
      const { component } = setupStatefulComponent<{ count: number }>(
        withConnect(of({ count: 10 }))
      );
      expect(component.state.get()).toEqual({ count: 10 });
    });

    it('should connect with key and value', () => {
      const { component } = setupStatefulComponent<{ count: number }>(
        withConnect('count', of(10))
      );
      expect(component.state.get()).toEqual({ count: 10 });
    });

    it('should connect with key and slice$ and projectFn', () => {
      const { component } = setupStatefulComponent<{ count: number }>(
        withConnect('count', of({ count: 10 }), (state, { count }) => {
          return count + 10;
        })
      );
      expect(component.state.get()).toEqual({ count: 20 });
    });

    it('should connect multiple observables with an object', () => {
      const { component } = setupStatefulComponent<{
        count: number;
        count2: number;
      }>(
        withConnect(() => {
          return {
            count: of(10),
            count2: of(20),
          };
        })
      );
      expect(component.state.get()).toEqual({ count: 10, count2: 20 });
    });

    it('should connect multiple observables with connect', () => {
      const { component } = setupStatefulComponent<{
        count: number;
        count2: number;
      }>(
        withConnect((connect) => {
          connect('count', of(10));
          connect('count2', of(20));
        })
      );
      expect(component.state.get()).toEqual({ count: 10, count2: 20 });
    });

    it('should connect multiple observables with connect', () => {
      const { component } = setupStatefulComponent<{
        count: number;
        count2: number;
      }>(
        withConnect(() => {
          return of({ count: 10, count2: 20 });
        })
      );
      expect(component.state.get()).toEqual({ count: 10, count2: 20 });
    });

    it('should throw a TSC error when returned record has incorrect type', () => {
      setupStatefulComponent<{
        count: number;
      }>(
        /// @ts-expect-error { fail: Observable<boolean> } is not assignable to { count: number }
        withConnect(() => {
          return {
            fail: of({ fail: true }),
          };
        })
      );
    });

    it('should throw a TSC error when returned observable has incorrect type', () => {
      setupStatefulComponent<{
        count: number;
      }>(
        /// @ts-expect-error Observable<{ fail: boolean }> is not assignable to Observable<{ count: number }>
        withConnect(() => {
          return of({ fail: true });
        })
      );
    });
  });

  it('should call ngOnDestroy', () => {
    const { fixture, component } = setupStatefulComponent();
    const spy = jest.spyOn(component.state, 'ngOnDestroy');
    expect(spy).not.toHaveBeenCalled();
    fixture.destroy();
    expect(spy).toHaveBeenCalled();
  });
});

function setupStatefulComponent<State extends object>(
  ...params: RxStateFeature<State>[]
) {
  @Component({})
  class StatefulComponent {
    state = rxState<State>(...params);
  }

  TestBed.configureTestingModule({
    declarations: [StatefulComponent],
  });

  const fixture = TestBed.createComponent(StatefulComponent);

  return {
    fixture,
    component: fixture.componentInstance,
  };
}
