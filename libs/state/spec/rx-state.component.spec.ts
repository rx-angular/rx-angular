import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, Output, ViewChild } from '@angular/core';
import { createStateChecker, PrimitiveState } from './fixtures';
import { Observable, Subject } from 'rxjs';
import { select, RxState } from '@rx-angular/state';

const initialChildState = { str: 'initialChildState' };

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
    <span>{{ (num$ | async) == null ? 'undefined' : (num$ | async) }}</span>
  `,
  providers: [RxState]
})
export class RxStateInjectionComponent {
  num$ = this.state.select();

  constructor(public state: RxState<PrimitiveState>) {
  }
}

@Component({
  selector: 'rx-angular-state-glue-test',
  template: `
    <span id="child">{{
      (str$ | async) == null ? 'undefined' : (str$ | async)
      }}</span>
  `
})
export class RxStateGlueComponent extends RxState<{ str: string }> {
  str$ = this.select('str');

  @Input()
  set str(str: string) {
    this.set({ str });
  }

  @Input()
  set strO(str$: Observable<string>) {
    this.connect('str', str$);
  }

  @Output()
  strChange: Observable<string> = this.$.pipe(select('str'));

  constructor() {
    super();
    this.set(initialChildState);
  }
}

@Component({
  selector: 'rx-angular-state-glue-container-test',
  template: `
    <span id="parent">{{
      (str$ | async) == null ? 'undefined' : (str$ | async)
      }}</span>
    <rx-angular-state-glue-test
      [str]="str$ | async"
      (strChange)="strChange$.next($event)"
    >
    </rx-angular-state-glue-test>
  `
})
export class RxStateGlueContainerComponent extends RxState<PrimitiveState> {
  strChange$ = new Subject<string>();
  str$ = this.select('str');

  @ViewChild(RxStateGlueComponent)
  child: RxStateGlueComponent;

  constructor() {
    super();
    this.connect('str', this.strChange$);
  }
}

describe('LocalProviderTestComponent', () => {
  let component: RxStateInjectionComponent;
  let fixture: ComponentFixture<RxStateInjectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RxStateInjectionComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(RxStateInjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    stateChecker.checkSubscriptions(component.state, 1);
  });
});

describe('InheritanceTestComponent', () => {
  let component: RxStateInheritanceComponent;
  let fixture: ComponentFixture<RxStateInheritanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RxStateInheritanceComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(RxStateInheritanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    stateChecker.checkSubscriptions(component, 1);
    component.ngOnDestroy();
    stateChecker.checkSubscriptions(component, 0);
  });
});
