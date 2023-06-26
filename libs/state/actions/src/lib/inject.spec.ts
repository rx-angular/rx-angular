import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { expectType } from 'tsd';

import { Observable } from 'rxjs';
import { RxActionFactory } from './actions.factory';
import { rxActions, withTransforms } from './inject';
import { ActionTransforms, RxActions } from './types';

describe(rxActions, () => {
  it('should create actions', () => {
    const { component } = setupComponent<{ doThing: void }>();

    expect(component.actions.doThing).toEqual(expect.any(Function));
    expect(component.actions.doThing$).toBeInstanceOf(Observable);
  });

  it('should infer actions with generic', () => {
    const { component } = setupComponent<{ doThing: void }>();

    expectType<RxActions<{ doThing: void }>>(component.actions);
  });

  it('should transform actions', (done) => {
    const { component } = setupComponent<{ doThing: Event }>(
      withTransforms<{ doThing: Event }>({
        doThing: (e) => e.type,
      })
    );

    component.actions.doThing$.subscribe((e) => {
      expect(e).toBe('click');
      done();
    });

    component.actions.doThing(new Event('click'));
  });

  it('should call ngOnDestroy', () => {
    const { fixture } = setupComponent();
    const spy = jest.spyOn(RxActionFactory.prototype, 'ngOnDestroy');

    expect(spy).not.toHaveBeenCalled();
    fixture.destroy();
    expect(spy).toHaveBeenCalled();
  });
});

function setupComponent<
  Actions extends object,
  Transforms extends ActionTransforms<Actions> = {}
>(
  withTransforms?: (
    rxActionFactory: RxActionFactory<Actions>
  ) => RxActions<Actions, Transforms>
) {
  @Component({})
  class TestComponent {
    actions = rxActions<Actions, Transforms>(withTransforms);
  }

  TestBed.configureTestingModule({
    declarations: [TestComponent],
  });

  const fixture = TestBed.createComponent(TestComponent);
  const component = fixture.componentInstance;

  return { component, fixture };
}
