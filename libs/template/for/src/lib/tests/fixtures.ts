import { Component, ErrorHandler, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, Subject } from 'rxjs';

export let thisArg: any;

export function setThis(arg: any) {
  thisArg = arg;
}

@Component({ selector: 'rx-test-cmp', template: '' })
export class TestComponent {
  value: any;
  items: any[] = [1, 2];
  itemsCold$ = new Subject<any[]>();
  itemsHot$ = new BehaviorSubject<any[]>([1, 2]);
  itemsHotSignal = signal<any[]>([1, 2]);
  parent: boolean;

  renderedValue$ = new Subject<number[]>();
  strategy: string;

  trackById(index: number, item: any): string {
    return item['id'];
  }
  trackByIndex(index: number, item: any): number {
    return index;
  }
  trackByContext(): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    thisArg = this;
  }
}

const TEMPLATE =
  '<div><span *rxFor="let item of items">{{item.toString()}};</span></div>';

export function createTestComponent(
  template: string = TEMPLATE,
): ComponentFixture<TestComponent> {
  return TestBed.overrideComponent(TestComponent, {
    set: { template: template },
  }).createComponent(TestComponent);
}

export function createErrorHandler() {
  return TestBed.inject(ErrorHandler);
}
