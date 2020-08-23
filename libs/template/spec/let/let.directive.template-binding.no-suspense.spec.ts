import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LetDirective } from '@rx-angular/template';
import { Observable, of, Subject } from 'rxjs';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { mockConsole } from '@test-helpers';

@Component({
  template: `
    <ng-container *rxLet="value$; let value; error: error; complete: complete">{{
      value === undefined
        ? 'undefined'
        : value === null
        ? 'null'
        : (value | json)
    }}</ng-container>

    <ng-template #complete>complete</ng-template>
    <ng-template #error>error</ng-template>
  `
})
class LetDirectiveNoSuspenseTemplateTestComponent {
  value$: Observable<number> = of(1);
}

let fixture: ComponentFixture<LetDirectiveNoSuspenseTemplateTestComponent>;
let component: LetDirectiveNoSuspenseTemplateTestComponent;
let nativeElement: HTMLElement;

const setupTestComponent = () => {
  TestBed.configureTestingModule({
    declarations: [LetDirectiveNoSuspenseTemplateTestComponent, LetDirective],
    providers: []
  }).compileComponents();
};

const setUpFixture = () => {
  fixture = TestBed.createComponent(LetDirectiveNoSuspenseTemplateTestComponent);
  component = fixture.componentInstance;
  nativeElement = fixture.nativeElement;
};

describe('LetDirective when template binding without "suspense" template', () => {
  beforeAll(() => mockConsole());
  beforeEach(async(setupTestComponent));
  beforeEach(setUpFixture);

  it('should be initiated', () => {
    expect(component).toBeDefined();
  });

  it('should not render anything when "suspense" template is not provided until a value is emitted', () => {
    component.value$ = new Subject();
    fixture.detectChanges();
    expectContentToBe('');

    (component.value$ as Subject<number>).next(1);
    fixture.detectChanges();
    expectContentToBe('1');
  });
});

function expectContentToBe(content: string): void {
  expect(nativeElement.textContent).toBe(content);
}
