import {
  Component,
  ErrorHandler,
  Input,
  Output,
  Type,
  ViewChild,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
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
  let errorHandlerSpy: jest.Mock;

  beforeEach(() => {
    const { component: c, errorHandler: e } = setupTestComponent({
      testComponent: RxStateInjectionComponent,
      providers: [
        { provide: ErrorHandler, useValue: { handleError: jest.fn() } },
      ],
    });
    component = c;
    errorHandlerSpy = e.handleError as jest.Mock;
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
  let errorHandlerSpy: jest.Mock;

  beforeEach(() => {
    const { component: c, errorHandler: e } = setupTestComponent({
      testComponent: RxStateInheritanceComponent,
      providers: [
        { provide: ErrorHandler, useValue: { handleError: jest.fn() } },
      ],
    });
    component = c;
    errorHandlerSpy = e.handleError as jest.Mock;
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

describe('CustomErrorHandler', () => {
  let component: RxStateInheritanceComponent;
  let errorHandlerSpy: jest.SpyInstance;

  class CustomErrorHandler implements ErrorHandler {
    private prod = true;
    handleError() {
      if (this.prod) {
        throw new Error('Prod error');
      }
      throw new Error('Dev error');
    }
  }

  beforeEach(() => {
    const { component: c, errorHandler: e } = setupTestComponent({
      testComponent: RxStateInheritanceComponent,
      providers: [
        {
          provide: ErrorHandler,
          useClass: CustomErrorHandler,
        },
      ],
    });
    component = c;
    errorHandlerSpy = jest.spyOn(e, 'handleError');
  });

  describe('state.connect', () => {
    it('should handle error through CustomErrorHandler', () => {
      const error$ = throwError(() => new Error('whoops'));
      component.connect('str', error$);
      expect(errorHandlerSpy).toThrow(new Error('Prod error'));
    });
  });
});

function setupTestComponent({
  testComponent,
  providers,
}: {
  testComponent: Type<any>;
  providers: any[];
}) {
  const testBed = TestBed.configureTestingModule({
    declarations: [testComponent],
    providers: [...providers],
    teardown: { destroyAfterEach: true },
  });
  const fixture = TestBed.createComponent(testComponent);
  const component = fixture.componentInstance;
  const errorHandler = testBed.inject(ErrorHandler);

  return { fixture, component, errorHandler };
}
