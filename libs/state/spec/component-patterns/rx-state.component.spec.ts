import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { RxState } from '../../src';
import {
  createStateChecker,
  initialPrimitiveState,
  PrimitiveState
} from './../fixtures';
import { Observable, Subject } from 'rxjs';
import { select } from '../../src/lib/core/operators/select';

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
export class RxStateGlueComponent extends RxState<{ str: string }> {
  str$ = this.select('str');
  @Input()
  set str(str: string) {
    this.set({ str });
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
  child;

  constructor() {
    super();
    this.connect('str', this.strChange$);
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
    parent.set(initialParentState);
    parent.child.set(initialParentState);
    expect(parent.get().str).toBe(initialParentState.str);
    expect(parent.child.get().str).toBe(initialChildState.str);
  });
});
