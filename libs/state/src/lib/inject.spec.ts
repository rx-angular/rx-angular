import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of, tap } from 'rxjs';
import { RxStateSetupFn, rxState } from './inject';
import { RxState } from './rx-state.service';

describe(rxState, () => {
  it('should create RxState instance', () => {
    const { component } = setupComponent();
    expect(component.state).toBeInstanceOf(RxState);
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

  it('should hold an observable', () => {
    const spy = jest.fn();
    setupComponent<{ count: number }>(({ hold }) =>
      hold(of('src').pipe(tap(spy)))
    );
    expect(spy).toHaveBeenCalledWith('src');
  });

  it('should hold an observable and sideEffect fn', () => {
    const spy = jest.fn();
    setupComponent<{ count: number }>(({ hold }) => hold(of('src'), spy));
    expect(spy).toHaveBeenCalledWith('src');
  });

  it('should hold multiple observables', () => {
    const spy = jest.fn();
    setupComponent<{ count: number }>(({ hold }) => {
      hold(of('src').pipe(tap(spy)));
      hold(of('src2'), spy);
    });
    expect(spy.mock.calls[0][0]).toEqual('src');
    expect(spy.mock.calls[1][0]).toEqual('src2');
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
    const { fixture, component } = setupComponent();
    const spy = jest.spyOn(component.state, 'ngOnDestroy');
    expect(spy).not.toHaveBeenCalled();
    fixture.destroy();
    expect(spy).toHaveBeenCalled();
  });
});

function setupComponent<State extends object>(setupFn?: RxStateSetupFn<State>) {
  @Component({})
  class TestComponent {
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
