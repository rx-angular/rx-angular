import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, OnDestroy } from '@angular/core';
import { RxState } from '../src';
import { createStateChecker, PrimitiveState } from './fixtures';

const stateChecker = createStateChecker((actual, expected) => {
  if (typeof expected === 'object') {
    expect(actual).toEqual(expected);
  } else {
    expect(actual).toBe(expected);
  }
});

@Component({
  selector: 'rx-angular-state-inheritance-test',
  template: `
    <span>{{ value$ }}</span>
  `
})
export class RxStateInheritanceComponent extends RxState<PrimitiveState> {
  value$ = this.select();
  constructor() {
    super();
  }
}

@Component({
  selector: 'rx-angular-state-local-provider-test',
  template: `
    <span>{{ value$ }}</span>
  `,
  providers: [RxState]
})
export class RxStateInjectionComponent implements OnDestroy {
  value$ = this.state.select();
  constructor(public state: RxState<PrimitiveState>) {}
  ngOnDestroy(): void {}
}

describe('LocalProviderTestComponent', () => {
  let component: RxStateInjectionComponent;
  let fixture: ComponentFixture<RxStateInjectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RxStateInjectionComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(RxStateInjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', async () => {
    stateChecker.checkSubscriptions(component.state, 1);
    (component as any).ngOnDestroy();
  });
});

describe('InheritanceTestComponent', () => {
  let component: RxStateInheritanceComponent;
  let fixture: ComponentFixture<RxStateInheritanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RxStateInheritanceComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RxStateInheritanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    stateChecker.checkSubscriptions(component, 1);
    component.ngOnDestroy();
    stateChecker.checkSubscriptions(component, 0);
  });
});
