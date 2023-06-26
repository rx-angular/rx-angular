import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RxEffects } from './effects.service';
import { injectRxEffects } from './inject';

@Component({})
class TestComponent {
  effects = injectRxEffects();
}

describe(injectRxEffects, () => {
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
    expect(component.effects).toBeInstanceOf(RxEffects);
  });

  it('should call ngOnDestroy', () => {
    const spy = jest.spyOn(component.effects, 'ngOnDestroy');
    expect(spy).not.toHaveBeenCalled();
    fixture.destroy();
    expect(spy).toHaveBeenCalled();
  });
});
