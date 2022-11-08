import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RxNotificationKind } from '@rx-angular/cdk/notifications';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

// eslint-disable-next-line @angular-eslint/component-selector
@Component({ selector: 'test-cmp', template: '' })
export class TestComponent {
  booleanCondition = true;
  booleanCondition$ = new BehaviorSubject(true);
  nestedBooleanCondition = true;
  nestedBooleanCondition$ = new BehaviorSubject(true);
  numberCondition = 1;
  numberCondition$ = new BehaviorSubject(1);
  stringCondition = 'foo';
  renderedValue$ = new Subject();
  strategy: string;
  value$: Observable<unknown>;

  nextTrg$ = new Subject<void>();
  suspenseTrg$ = new Subject<void>();
  errorTrg$ = new Subject<void>();
  completeTrg$ = new Subject<void>();
  templateTrg$ = new Subject<RxNotificationKind>();

  functionCondition: Function = (s: any, n: any): boolean =>
    s == 'foo' && n == 1;
}

export function createTestComponent(
  template: string
): ComponentFixture<TestComponent> {
  return TestBed.overrideComponent(TestComponent, {
    set: { template: template },
  }).createComponent(TestComponent);
}
