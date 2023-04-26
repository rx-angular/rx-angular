import {
  Component,
  ErrorHandler,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RxState } from '@rx-angular/state';
import { select } from '@rx-angular/state/selections';
import { PrimitiveState } from '@test-helpers';
import { Observable, Subject, throwError } from 'rxjs';
import { createStateChecker } from './fixtures';

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
  template: ` <span>{{ value$ }}</span> `,
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
  providers: [RxState],
})
export class RxStateInjectionComponent {
  num$ = this.state.select();

  constructor(public state: RxState<PrimitiveState>) {}
}

@Component({
  selector: 'rx-angular-state-glue-test',
  template: `
    <span id="child">{{
      (str$ | async) == null ? 'undefined' : (str$ | async)
    }}</span>
  `,
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
  `,
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
  let errorHandlerSpy: any;

  beforeEach(() => {
    const testBed = TestBed.configureTestingModule({
      declarations: [RxStateInjectionComponent],
      providers: [
        { provide: ErrorHandler, useValue: { handleError: jest.fn() } },
      ],
      teardown: { destroyAfterEach: true },
    });
    fixture = TestBed.createComponent(RxStateInjectionComponent);
    component = fixture.componentInstance;
    errorHandlerSpy = testBed.inject(ErrorHandler).handleError;
    fixture.detectChanges();
  });

  it('should create', () => {
    stateChecker.checkSubscriptions(component.state, 1);
  });

  describe('state.connect', () => {
    it('should handle error through global ErrorHandler', () => {
      const error$ = throwError(() => new Error('whoops'));
      component.state.connect(error$);
      expect(errorHandlerSpy).toHaveBeenCalledWith(new Error('whoops'));
    });
  });
});

describe('InheritanceTestComponent', () => {
  let component: RxStateInheritanceComponent;
  let fixture: ComponentFixture<RxStateInheritanceComponent>;
  let errorHandlerSpy: any;

  beforeEach(() => {
    const testBed = TestBed.configureTestingModule({
      declarations: [RxStateInheritanceComponent],
      teardown: { destroyAfterEach: true },
      providers: [
        { provide: ErrorHandler, useValue: { handleError: jest.fn() } },
      ],
    });
    fixture = TestBed.createComponent(RxStateInheritanceComponent);
    component = fixture.componentInstance;
    errorHandlerSpy = testBed.inject(ErrorHandler).handleError;
    fixture.detectChanges();
  });

  it('should create', () => {
    stateChecker.checkSubscriptions(component, 1);
    component.ngOnDestroy();
    stateChecker.checkSubscriptions(component, 0);
  });

  describe('state.connect', () => {
    it('should handle error through global ErrorHandler', () => {
      const error$ = throwError(() => new Error('whoops'));
      component.connect(error$);
      expect(errorHandlerSpy).toHaveBeenCalledWith(new Error('whoops'));
    });
  });
});
