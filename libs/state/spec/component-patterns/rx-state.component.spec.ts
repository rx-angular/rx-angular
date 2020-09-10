import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AfterViewInit, Component, Input, Output, ViewChild } from '@angular/core';
import { initialPrimitiveState, PrimitiveState } from '../fixtures';
import { Observable, Subject } from 'rxjs';
import { select,RxState } from '@rx-angular/state';

const initialParentState: PrimitiveState = {
  ...initialPrimitiveState,
  str: 'initialParent'
};

const initialChildState = { str: 'initialChildState' };

@Component({
  selector: 'rx-angular-state-glue-test',
  template: `
    <span id="child">{{
      (str$ | async) == null ? 'undefined' : (str$ | async)
      }}</span>
  `
})
export class RxStateGlueComponent extends RxState<{ str: string }>
  implements AfterViewInit {
  afterViewInit = false;
  str$ = this.select('str');

  @Input()
  set str(str: string) {
    if (str !== null && str !== '') {
      this.set({ str });
    }
  }

  @Output()
  strChange: Observable<string> = this.$.pipe(select('str'));

  @Output()
  strChangeWrong: Observable<string> = this.select('str');

  constructor() {
    super();
    this.set(initialChildState);
  }

  ngAfterViewInit(): void {
    this.afterViewInit = true;
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
      (strChangeWrong)="strChangeWrong$.next($event)"
    >
    </rx-angular-state-glue-test>
  `
})
export class RxStateGlueContainerComponent
  extends RxState<PrimitiveState & { strWrong: string }>
  implements AfterViewInit {
  strChange$ = new Subject<string>();
  strChangeWrong$ = new Subject<string>();
  str$ = this.select('str');
  afterViewInit = false;

  @ViewChild(RxStateGlueComponent)
  child: RxStateGlueComponent;

  constructor() {
    super();
    this.connect('str', this.strChange$);
    this.connect('strWrong', this.strChangeWrong$);
  }

  ngAfterViewInit(): void {
    this.afterViewInit = true;
  }
}

describe('GlueTestComponent', () => {
  let parent: RxStateGlueContainerComponent;
  let parentFixture: ComponentFixture<RxStateGlueContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RxStateGlueComponent, RxStateGlueContainerComponent]
    }).compileComponents();
    parentFixture = TestBed.createComponent(RxStateGlueContainerComponent);
    parentFixture.detectChanges();

    parent = parentFixture.componentInstance;
  });

  it('should render values in parent initial', () => {
    parent.set(initialPrimitiveState);
    expect(parent.get()?.str).toBe(initialPrimitiveState.str);
  });

  it('should render values changes in parent', () => {
    parent.set(initialPrimitiveState);
    expect(parent.get()?.str).toBe(initialPrimitiveState.str);
    parent.set({ str: 'changeInParent' });
    // @TODO use state checker
    expect(parent.get()?.str).toBe('changeInParent');
  });

  it('should render values in child initial', () => {
    parent.set(initialPrimitiveState);
    parentFixture.detectChanges();
    expect(parent.child.get()?.str).toBe(initialPrimitiveState.str);
  });

  it('should pass values from parent to child', () => {
    parent.set(initialPrimitiveState);
    parentFixture.detectChanges();
    expect(parent.child.get()?.str).toBe(initialPrimitiveState.str);

    parent.set({ str: 'newParent' });
    parentFixture.detectChanges();
    expect(parent.child.get()?.str).toBe('newParent');
  });

  it('should work with output initialisation', () => {
    expect(parent.afterViewInit).toBeTruthy();
    expect(parent.child.afterViewInit).toBeTruthy();

    expect(parent.get().str).toBe(undefined);
    expect(parent.child.get().str).toBe(initialChildState.str);

    const value1FromParent = 'value1FromParent';
    parent.set({ str: value1FromParent });
    expect(parent.get().str).toBe(value1FromParent);
    expect(parent.child.get().str).toBe(initialChildState.str);

    parentFixture.detectChanges();
    expect(parent.get().str).toBe(value1FromParent);
    expect(parent.child.get().str).toBe(value1FromParent);
  });

  it('should work wrong output initialisation', () => {
    expect(parent.afterViewInit).toBeTruthy();
    expect(parent.child.afterViewInit).toBeTruthy();

    expect(parent.get().str).toBe(undefined);
    expect(parent.get().strWrong).toBe(initialChildState.str);
    expect(parent.child.get().str).toBe(initialChildState.str);
  });
});
