import { Component, isSignal, signal } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { selectSlice } from '@rx-angular/state/selections';
import {
  asapScheduler,
  delay,
  of,
  pipe,
  queueScheduler,
  startWith,
} from 'rxjs';
import { filter, map } from 'rxjs/operators';
import {
  provideRxStateConfig,
  withAccumulatorFn,
  withScheduler,
  withSyncScheduler,
} from '../src/lib/provide-rx-state-config';
import {
  RxState as FnState,
  rxState,
  RxStateSetupFn,
} from '../src/lib/rx-state';
import { RxState } from '../src/lib/rx-state.service';

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
        })),
    );
    component.state.set({ count: 10 });
    expect(component.state.get()).toEqual({ count: 20 });
  });

  it('should connect with slice$', () => {
    const { component } = setupComponent<{ count: number }>(({ connect }) =>
      connect(of({ count: 10 })),
    );
    expect(component.state.get()).toEqual({ count: 10 });
  });

  it('should connect with key and value', () => {
    const { component } = setupComponent<{ count: number }>(({ connect }) =>
      connect('count', of(10)),
    );
    expect(component.state.get()).toEqual({ count: 10 });
  });

  it('should connect with key and slice$ and projectFn', () => {
    const { component } = setupComponent<{ count: number }>(({ connect }) =>
      connect('count', of({ count: 10 }), (state, { count }) => {
        return count + 10;
      }),
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

  it('should select state inside setup', () => {
    const { component } = setupComponent<{
      isAuth: boolean;
      messages: string[];
      count: number;
    }>(({ set, connect, select }) => {
      set({ isAuth: false, messages: [] });
      connect('messages', select('isAuth').pipe(filter((x) => !x)), () => []);
      connect('messages', select('isAuth').pipe(filter((x) => x)), () => [
        'Hi',
      ]);
    });

    expect(component.state.get()).toEqual({
      isAuth: false,
      messages: [],
    });
    component.state.set({ isAuth: true });
    expect(component.state.get()).toEqual({
      isAuth: true,
      messages: ['Hi'],
    });
    component.state.set({ isAuth: false });
    expect(component.state.get()).toEqual({
      isAuth: false,
      messages: [],
    });
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
        `{{ count() }}`,
      );
      const state = component.state;

      fixture.detectChanges();
      // TODO @edbzn: Remove detecting changes twice when we have a better solution
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
        `{{ count() }}`,
      );
      const state = component.state;

      fixture.detectChanges();
      // TODO @edbzn: Remove detecting changes twice when we have a better solution
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
        `{{ count() }}`,
      );
      const state = component.state;

      fixture.detectChanges();
      // TODO @edbzn: Remove detecting changes twice when we have a better solution
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
        ({ count, multiplier }) => count() * multiplier(),
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
          map(({ count, multiplier }) => count * multiplier),
        ),
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
        startWith(10),
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

  describe('configuration', () => {
    const setupConfig = (...cfg) => {
      TestBed.configureTestingModule({
        providers: [provideRxStateConfig(...cfg)],
      });
    };

    it('should return empty array', () => {
      expect(provideRxStateConfig()).toEqual([]);
    });

    it('should use custom scheduler', async () => {
      const scheduler = asapScheduler;
      const scheduled = jest.spyOn(scheduler, 'schedule');
      setupConfig(withScheduler(scheduler));
      let state: FnState<{ foo: string }>;
      TestBed.runInInjectionContext(() => {
        state = rxState<{ foo: string }>();
        state.set({ foo: 'bar' });
      });
      expect(scheduled).toBeCalled();
      expect(state.get('foo')).not.toBeDefined();
      await Promise.resolve();
      expect(state.get('foo')).toEqual('bar');
      scheduled.mockClear();
    });

    it('should not use queueScheduler scheduler', () => {
      const scheduler = queueScheduler;
      const scheduled = jest.spyOn(scheduler, 'schedule');
      setupConfig(withSyncScheduler());
      TestBed.runInInjectionContext(() => {
        const state = rxState<{ foo: string }>();
        state.set({ foo: 'bar' });
        expect(state.get('foo')).toEqual('bar');
      });
      expect(scheduled).not.toBeCalled();
      expect(scheduled).not.toHaveBeenCalled();
      scheduled.mockClear();
    });

    it('should use custom accumulator', () => {
      const accumulator = jest.fn().mockImplementation((state, slice) => ({
        ...state,
        ...slice,
      }));
      setupConfig(withAccumulatorFn(accumulator));
      TestBed.runInInjectionContext(() => {
        const state = rxState<{ foo: string }>();
        state.set({ foo: 'bar' });
        expect(state.get('foo')).toEqual('bar');
      });
      expect(accumulator).toHaveBeenCalled();
    });
  });

  describe('asReadOnly', () => {
    it('should throw error when trying to call set from readOnlystate', () => {
      const { component } = setupComponent<{ count: number }>();

      const readOnlyState = component.state.asReadOnly();

      expect((): void => {
        readOnlyState['set'](
          'count',
          (state: { count: number }) => state.count + 1,
        );
      }).toThrowError('readOnlyState.set is not a function');
    });

    it('should throw error when trying to call connect from readOnlystate', () => {
      const { component } = setupComponent<{ count: number }>();

      const readOnlyState = component.state.asReadOnly();

      expect((): void => {
        readOnlyState['connect']('count', of(10));
      }).toThrowError('readOnlyState.connect is not a function');
    });
  });
});

type ITestComponent<State extends object> = {
  state: ReturnType<typeof rxState<State>>;
};

function setupComponent<State extends { count: number }>(
  setupFn?: RxStateSetupFn<State>,
  template?: string,
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
