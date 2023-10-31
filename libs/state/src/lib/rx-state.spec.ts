import { Component, isSignal, signal } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { delay, of, pipe, startWith } from 'rxjs';
import { rxState, RxStateSetupFn } from './rx-state';
import { RxState } from './rx-state.service';
import { selectSlice } from '@rx-angular/state/selections';
import { map } from 'rxjs/operators';

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

    it('should connect a signal to a key', () => {
      const counterInput = signal(1337);
      const { component, fixture } = setupComponent<{ count: number }>(
        ({ connect }) => {
          connect('count', counterInput);
        },
        `{{ count() }}`
      );
      const state = component.state;

      fixture.detectChanges();

      expect(state.get('count')).toBe(1337);
      expect(fixture.nativeElement.textContent.trim()).toBe('1337');

      counterInput.set(2);

      fixture.detectChanges();

      expect(state.get('count')).toBe(2);
      expect(fixture.nativeElement.textContent.trim()).toBe('2');
    });

    it('should connect a signal to a key with mapping function', () => {
      const counterInput = signal(2);
      const { component, fixture } = setupComponent<{ count: number }>(
        ({ connect }) => {
          connect('count', counterInput, (state, count) => {
            return (state?.count ?? count) * count;
          });
        },
        `{{ count() }}`
      );
      const state = component.state;

      fixture.detectChanges();

      expect(state.get('count')).toBe(4);
      expect(fixture.nativeElement.textContent.trim()).toBe('4');

      counterInput.set(4);

      fixture.detectChanges();

      expect(state.get('count')).toBe(16);
      expect(fixture.nativeElement.textContent.trim()).toBe('16');
    });

    it('should connect a signal slice', () => {
      const counterInput = signal({ count: 1337 });
      const { component, fixture } = setupComponent<{ count: number }>(
        ({ connect }) => {
          connect(counterInput);
        },
        `{{ count() }}`
      );
      const state = component.state;

      fixture.detectChanges();

      expect(state.get('count')).toBe(1337);
      expect(fixture.nativeElement.textContent.trim()).toBe('1337');

      counterInput.set({ count: 2 });

      fixture.detectChanges();

      expect(state.get('count')).toBe(2);
      expect(fixture.nativeElement.textContent.trim()).toBe('2');
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

    it('should create a signal using signals and rxjs operators and emit sync without initial value', fakeAsync(() => {
      const { component } = setupComponent<{
        count: number;
        multiplier: number;
      }>(({ set }) => {
        set({ count: 1337, multiplier: 1 });
      });
      const state = component.state;

      const multiplied = state.computedFrom(
        pipe(
          selectSlice(['count', 'multiplier']),
          map(({ count, multiplier }) => count * multiplier)
        )
      );

      expect(multiplied()).toBe(1337);
      state.set({ multiplier: 10 });
      expect(multiplied()).toBe(13370);
    }));

    it('should create a signal using signals and rxjs operators and emit async with startWith', fakeAsync(() => {
      const { component } = setupComponent<{
        count: number;
        multiplier: number;
      }>(({ set }) => {
        set({ count: 1337, multiplier: 1 });
      });
      const state = component.state;

      const multiplied = state.computedFrom(
        selectSlice(['count', 'multiplier']),
        map(({ count, multiplier }) => count * multiplier),
        delay(1000),
        startWith(10)
      );

      expect(multiplied()).toBe(10);
      tick(1000);
      expect(multiplied()).toBe(1337);
      state.set({ multiplier: 10 });
      tick(500);
      expect(multiplied()).toBe(1337);
      tick(500);
      expect(multiplied()).toBe(13370);
    }));
  });
});

type ITestComponent<State extends object> = {
  state: ReturnType<typeof rxState<State>>;
};

function setupComponent<State extends { count: number }>(
  setupFn?: RxStateSetupFn<State>,
  template?: string
) {
  @Component({
    template,
  })
  class TestComponent implements ITestComponent<State> {
    readonly state = rxState<State>(setupFn);

    readonly count$ = this.state.select('count');
    readonly count = this.state.signal('count');
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
