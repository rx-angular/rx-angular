import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { expectType } from 'tsd';

import { of } from 'rxjs';
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

  it('should compose state with hold', () => {
    const spy = jest.fn();
    setupStatefulComponent<{ count: number }>(withHold(of('src'), spy));
    expect(spy).toHaveBeenCalledWith('src');
  });

  it('should compose state with connect', () => {
    const { component } = setupStatefulComponent<{ count: number }>(
      withConnect(of({ count: 10 }))
    );
    expect(component.state.get()).toEqual({ count: 10 });
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
