import { Component, isSignal, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RxStateSetupFn, rxState } from './rx-state';
import { RxState } from './rx-state.service';

describe(rxState, () => {
  it('should create rxState', () => {
    const { component } = setupComponent();
    expect(component.state).toBeDefined();
  });

  it('should compose state with initial state', () => {
    const { component } = setupComponent(({ set }) => set({ count: 0 }));
    expect(component.state.get()).toEqual({ count: 0 });
  });

  it('should compose state with accumulator', () => {
    const { component } = setupComponent<{ count: number }>(
      ({ setAccumulator }) =>
        setAccumulator((state, slice) => ({
          ...state,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          count: (slice as any).count + 10,
        }))
    );
    component.state.set({ count: 10 });
    expect(component.state.get()).toEqual({ count: 20 });
  });

  it('should connect with slice$', () => {
    const { component } = setupComponent<{ count: number }>(({ connect }) =>
      connect(of({ count: 10 }))
    );
    expect(component.state.get()).toEqual({ count: 10 });
  });

  it('should connect with key and value', () => {
    const { component } = setupComponent<{ count: number }>(({ connect }) =>
      connect('count', of(10))
    );
    expect(component.state.get()).toEqual({ count: 10 });
  });

  it('should connect with key and slice$ and projectFn', () => {
    const { component } = setupComponent<{ count: number }>(({ connect }) =>
      connect('count', of({ count: 10 }), (state, { count }) => {
        return count + 10;
      })
    );
    expect(component.state.get()).toEqual({ count: 20 });
  });

  it('should connect multiple observables with connect', () => {
    const { component } = setupComponent<{
      count: number;
      count2: number;
    }>(({ connect }) => {
      connect('count', of(10));
      connect('count2', of(20));
    });
    expect(component.state.get()).toEqual({ count: 10, count2: 20 });
  });

  it('should connect multiple observables with connect', () => {
    const { component } = setupComponent<{
      count: number;
      count2: number;
    }>(({ connect }) => connect(of({ count: 10, count2: 20 })));
    expect(component.state.get()).toEqual({ count: 10, count2: 20 });
  });

  it('should throw a TSC error when returned record has incorrect type', () => {
    setupComponent<{
      count: number;
    }>(({ set }) => {
      /// @ts-expect-error { fail: Observable<boolean> } is not assignable to { count: number }
      set({ fail: true });
    });
  });

  it('should throw a TSC error when returned observable has incorrect type', () => {
    setupComponent<{
      count: number;
    }>(({ connect }) => {
      /// @ts-expect-error Observable<{ fail: boolean }> is not assignable to Observable<{ count: number }>
      connect(of({ fail: true }));
    });
  });

  it('should call ngOnDestroy', () => {
    RxState.prototype.ngOnDestroy = jest.fn();
    const { fixture } = setupComponent();
    expect(RxState.prototype.ngOnDestroy).not.toHaveBeenCalled();
    fixture.destroy();
    expect(RxState.prototype.ngOnDestroy).toHaveBeenCalled();
  });

  describe('signals', () => {
    it('should be undefined when key is undefined', () => {
      const { component } = setupComponent<{ count: number }>();
      const state = component.state;
      const count = state.signal('count');

      expect(count()).toBe(undefined);
    });

    it('should create one signal per key', () => {
      const { component } = setupComponent<{ count: number }>(({ set }) => {
        set({ count: 1337 });
      });
      const state = component.state;
      const count = state.signal('count');
      const count2 = state.signal('count');

      expect(isSignal(count)).toBe(true);
      expect(count === count2).toBe(true);
    });

    it('signal should get updated', () => {
      const { component } = setupComponent<{ count: number }>(({ set }) => {
        set({ count: 1337 });
      });
      const state = component.state;
      const count = state.signal('count');
      expect(count()).toBe(1337);

      state.set({ count: 1 });
      expect(count()).toBe(1);

      state.connect(of({ count: 2 }));
      expect(count()).toBe(2);
    });

    xit('should connect a signal', () => {
      // TODO: we need TestBed flushEffect for it
      const counterInput = signal(1337);
      const { component } = setupComponent<{ count: number }>(({ connect }) => {
        connect('count', counterInput);
      });
      const state = component.state;

      expect(state.get('count')).toBe(1337);

      counterInput.set(2);

      expect(state.get('count')).toBe(2);
    });

    it('should create a computed', () => {
      const { component } = setupComponent<{
        count: number;
        multiplier: number;
      }>(({ set }) => {
        set({ count: 1337, multiplier: 1 });
      });
      const state = component.state;
      const multiplied = state.computed(
        ({ count, multiplier }) => count() * multiplier()
      );

      expect(multiplied()).toBe(1337);

      state.set({ multiplier: 10 });

      expect(multiplied()).toBe(13370);
    });
  });
});

type ITestComponent<State extends object> = {
  state: ReturnType<typeof rxState<State>>;
};

function setupComponent<State extends object>(setupFn?: RxStateSetupFn<State>) {
  @Component({})
  class TestComponent implements ITestComponent<State> {
    readonly state = rxState<State>(setupFn);
  }

  TestBed.configureTestingModule({
    declarations: [TestComponent],
  });

  const fixture = TestBed.createComponent(TestComponent);

  return {
    fixture,
    component: fixture.componentInstance,
  };
}
