import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RxEffects } from '@rx-angular/state/effects';
import { of, tap } from 'rxjs';
import { rxEffects, RxEffectsSetupFn } from '../src/lib/effects';

describe(rxEffects, () => {
  it('should create RxEffects instance', () => {
    const { component } = setupComponent();
    expect(component.effects).toBeInstanceOf(RxEffects);
  });

  it('should register an observable', () => {
    const spy = jest.fn();
    setupComponent(({ register }) => register(of('src').pipe(tap(spy))));
    expect(spy).toHaveBeenCalledWith('src');
  });

  it('should register an observable and sideEffect fn', () => {
    const spy = jest.fn();
    setupComponent(({ register }) => register(of('src'), spy));
    expect(spy).toHaveBeenCalledWith('src');
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

  it('should register a sideEffect fn on destroy', () => {
    const spy = jest.fn();
    const { fixture } = setupComponent(({ registerOnDestroy }) =>
      registerOnDestroy(spy)
    );
    fixture.destroy();
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should call ngOnDestroy', () => {
    const { fixture, component } = setupComponent();
    const spy = jest.spyOn(component.effects, 'ngOnDestroy');
    expect(spy).not.toHaveBeenCalled();
    fixture.destroy();
    expect(spy).toHaveBeenCalled();
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
