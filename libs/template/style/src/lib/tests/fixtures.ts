import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

// eslint-disable-next-line @angular-eslint/component-selector
@Component({ selector: 'test-cmp', template: '' })
export class TestComponent {
  expr: any;
}

export function createTestComponent(
  template: string
): ComponentFixture<TestComponent> {
  return TestBed.overrideComponent(TestComponent, {
    set: { template: template },
  }).createComponent(TestComponent);
}
