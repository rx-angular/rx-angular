import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable, of, Subject, tap, timer } from 'rxjs';
import { rxEffects, RxEffectsSetupFn } from './rx-effects';
import { TestScheduler } from 'rxjs/testing';
import { jestMatcher } from '@test-helpers/rx-angular';

describe(rxEffects, () => {
  it('should register an observable', () => {
    const spy = jest.fn();
    setupComponent(({ register }) => register(of('src').pipe(tap(spy))));
    expect(spy).toHaveBeenCalledWith('src');
  });

  it('should unregister a subscription', () => {
    expect.assertions(1);
    const spy = jest.fn();
    const scheduler = new TestScheduler(jestMatcher);

    setupComponent(({ register }) => {
      const unRegister = register(timer(10, scheduler), spy);
      unRegister();
      scheduler.flush();
      expect(spy).not.toHaveBeenCalled();
    });
  });

  it('should register an observable and sideEffect fn', () => {
    const spy = jest.fn();
    setupComponent(({ register }) => register(of('src'), spy));
    expect(spy).toHaveBeenCalledWith('src');
  });

  it('should continuously run sideEffect', () => {
    const spyNext = jest.fn();
    const trigger = new Subject();
    setupComponent(({ register }) => {
      register(trigger, spyNext);
    });

    trigger.next(1);
    expect(spyNext).toHaveBeenCalledWith(1);
    trigger.next(2);
    expect(spyNext).toHaveBeenCalledWith(2);
    expect(spyNext).toHaveBeenCalledTimes(2);
  });

  it('should register multiple observables', () => {
    const spy = jest.fn();
    setupComponent(({ register }) => {
      register(of('src').pipe(tap(spy)));
      register(of('src2'), spy);
    });
    expect(spy.mock.calls[0][0]).toEqual('src');
    expect(spy.mock.calls[1][0]).toEqual('src2');
  });

  it('should handle errors', () => {
    const spyNext = jest.fn();
    const spyError = jest.fn();
    const trigger = new Subject();
    setupComponent(({ register }) => {
      register(trigger, spyNext);
      register(trigger, { next: () => void 0, error: spyError });
    });

    expect(spyNext).toHaveBeenCalledTimes(0);
    trigger.next(1);
    expect(spyNext).toHaveBeenCalledTimes(1);
    trigger.error('E');
    expect(spyNext).toHaveBeenCalledTimes(1);
    expect(spyError).toHaveBeenCalledTimes(1);
  });

  it('should unsubscribe onDestroy', () => {
    const spyInternalOnCleanup = jest.fn();

    const { fixture } = setupComponent(({ register }) => {
      register(
        new Observable(() => {
          return spyInternalOnCleanup;
        })
      );
    });
    fixture.destroy();
    expect(spyInternalOnCleanup).toHaveBeenCalled();
  });

  it('should call onDestroy', () => {
    const spySideEffect = jest.fn();
    const spyInternalOnCleanup = jest.fn();

    const { fixture, component } = setupComponent(({ register, onDestroy }) => {
      register(of('src').pipe(tap(spySideEffect)));
      onDestroy(spyInternalOnCleanup);
    });
    const spyOnCleanup = jest.fn();
    component.effects.onDestroy(spyOnCleanup);

    expect(spySideEffect).toHaveBeenCalled();
    expect(spyInternalOnCleanup).not.toHaveBeenCalled();
    expect(spyOnCleanup).not.toHaveBeenCalled();
    fixture.destroy();
    expect(spyInternalOnCleanup).toHaveBeenCalled();
    expect(spyOnCleanup).toHaveBeenCalled();
  });
});

function setupComponent(setupFn?: RxEffectsSetupFn) {
  @Component({})
  class TestComponent {
    readonly effects = rxEffects(setupFn);
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
