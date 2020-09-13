import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LetDirective } from '@rx-angular/template';
import { EMPTY, Observable, of } from 'rxjs';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { mockConsole } from '@test-helpers';

@Component({
  template: `
    <ng-container *rxLet="value$; let value; suspense: suspense; error: error">{{
      value === undefined
        ? 'undefined'
        : value === null
        ? 'null'
        : (value | json)
    }}</ng-container>

    <ng-template #error>error</ng-template>
    <ng-template #suspense>suspense</ng-template>
  `
})
class LetDirectiveNoCompleteTemplateTestComponent {
  value$: Observable<number> = of(1);
}

let fixture: ComponentFixture<LetDirectiveNoCompleteTemplateTestComponent>;
let component: LetDirectiveNoCompleteTemplateTestComponent;
let nativeElement: HTMLElement;

const setupTestComponent = () => {
  TestBed.configureTestingModule({
    declarations: [LetDirectiveNoCompleteTemplateTestComponent, LetDirective]
  }).compileComponents();
};

const setUpFixture = () => {
  fixture = TestBed.createComponent(LetDirectiveNoCompleteTemplateTestComponent);
  component = fixture.componentInstance;
  nativeElement = fixture.nativeElement;
};

describe('LetDirective when template binding without "complete" template', () => {
  beforeAll(() => mockConsole());
  beforeEach(async(setupTestComponent));
  beforeEach(setUpFixture);

  it('should be initiated', () => {
    expect(component).toBeDefined();
  });

  it('should fallback to and render "next" template when observable completes', () => {
    component.value$ = of(1);
    fixture.detectChanges();
    expectContentToBe('1');
  });

  it('should render undefined when observable completes immediately (by passing EMPTY)', () => {
    component.value$ = EMPTY;
    fixture.detectChanges();
    expectContentToBe('undefined');
  });
});

function expectContentToBe(content: string): void {
  expect(nativeElement.textContent).toBe(content);
}
