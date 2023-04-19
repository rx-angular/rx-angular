import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { expectType } from 'tsd';

import { InjectRxStateParams, injectRxState } from './inject';
import { RxState } from './rx-state.service';

describe(injectRxState, () => {
  it('should create', () => {
    const { component } = setupTestComponent();
    expect(component.state).toBeInstanceOf(RxState);
  });

  it('should create state with correct type', () => {
    const { component } = setupTestComponent<{ count: number }>();
    expectType<RxState<{ count: number }>>(component.state);
  });

  it('should create state with correct initial state', () => {
    const { component } = setupTestComponent({ initialState: { count: 0 } });
    expect(component.state.get()).toEqual({ count: 0 });
  });

  it('should create state with correct accumulator', () => {
    const { component } = setupTestComponent<{ count: number }>({
      accumulatorFn: (state, action) => {
        return {
          ...state,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          count: (action as any).count + 10,
        };
      },
    });
    component.state.set({ count: 10 });
    expect(component.state.get()).toEqual({ count: 20 });
  });

  it('should call ngOnDestroy', () => {
    const { fixture, component } = setupTestComponent();
    const spy = jest.spyOn(component.state, 'ngOnDestroy');
    expect(spy).not.toHaveBeenCalled();
    fixture.destroy();
    expect(spy).toHaveBeenCalled();
  });
});

function setupTestComponent<State extends object>(
  params?: InjectRxStateParams<State>
) {
  @Component({})
  class TestComponent {
    state = injectRxState<State>(params);
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
