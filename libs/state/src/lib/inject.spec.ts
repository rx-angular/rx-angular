import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { expectType } from 'tsd';

import { of } from 'rxjs';
import {
  RxStateFeatures,
  accumulator,
  connect,
  hold,
  initialState,
  rxState,
} from './inject';
import { RxState } from './rx-state.service';

describe(rxState, () => {
  it('should create', () => {
    const { component } = setupTestComponent();
    expect(component.state).toBeInstanceOf(RxState);
  });

  it('should create state with correct type', () => {
    const { component } = setupTestComponent<{ count: number }>();
    expectType<RxState<{ count: number }>>(component.state);
  });

  it('should compose state with initial state', () => {
    const { component } = setupTestComponent(initialState({ count: 0 }));
    expect(component.state.get()).toEqual({ count: 0 });
  });

  it('should compose state with accumulator', () => {
    const { component } = setupTestComponent<{ count: number }>(
      initialState({ count: 0 }),
      accumulator((state, slice) => {
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

  it('should compose state with hold', () => {
    const spy = jest.fn();
    setupTestComponent<{ count: number }>(hold(of('src'), spy));
    expect(spy).toHaveBeenCalledWith('src');
  });

  it('should compose state with connect', () => {
    const { component } = setupTestComponent<{ count: number }>(
      connect(of({ count: 10 }))
    );
    expect(component.state.get()).toEqual({ count: 10 });
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
  ...params: RxStateFeatures<State>
) {
  @Component({})
  class TestComponent {
    state = rxState<State>(...params);
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
