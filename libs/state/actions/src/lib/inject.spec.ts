import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expectType } from 'tsd';

import { RxActionFactory } from './actions.factory';
import { injectRxActionFactory } from './inject';
import { RxActions } from './types';

@Component({})
class TestComponent {
  actionFactory = injectRxActionFactory<{ doSomething: void }>();
  actions = this.actionFactory.create();
}

describe(injectRxActionFactory, () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component.actionFactory).toBeInstanceOf(RxActionFactory);
  });

  it('should create actions with correct type', () => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    expectType<RxActions<{ doSomething: void }, {}>>(component.actions);
  });

  it('should call ngOnDestroy', () => {
    const spy = jest.spyOn(component.actionFactory, 'ngOnDestroy');
    expect(spy).not.toHaveBeenCalled();
    fixture.destroy();
    expect(spy).toHaveBeenCalled();
  });
});
