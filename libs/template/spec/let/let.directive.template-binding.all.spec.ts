import { Component } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LetDirective } from '@rx-angular/template';
import { EMPTY, interval, Observable, of, Subject, NEVER, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { mockConsole } from '@test-helpers';

@Component({
  template: `
    <ng-container *rxLet="value$; let value; suspense: suspense; complete: complete; error: error">{{
      value === undefined
        ? 'undefined'
        : value === null
        ? 'null'
        : (value | json)
    }}</ng-container>

    <ng-template #complete>complete</ng-template>
    <ng-template #error>error</ng-template>
    <ng-template #suspense>suspense</ng-template>
  `
})
class LetDirectiveAllTemplatesTestComponent {
  value$: Observable<number> = of(1);
}

let fixture: ComponentFixture<LetDirectiveAllTemplatesTestComponent>;
let component: LetDirectiveAllTemplatesTestComponent;
let nativeElement: HTMLElement;

const setupTestComponent = () => {
  TestBed.configureTestingModule({
    declarations: [LetDirectiveAllTemplatesTestComponent, LetDirective]
  }).compileComponents();
};

const setUpFixture = () => {
  fixture = TestBed.createComponent(LetDirectiveAllTemplatesTestComponent);
  component = fixture.componentInstance;
  nativeElement = fixture.nativeElement;
};

describe('LetDirective when template binding with all templates', () => {
  beforeAll(() => mockConsole());
  beforeEach(async(setupTestComponent));
  beforeEach(setUpFixture);

  it('should be initiated', () => {
    expect(component).toBeDefined();
  });

  it('should render "suspense" template before the first value is emitted', () => {
    component.value$ = new Subject();
    fixture.detectChanges();
    expectContentToBe('suspense');
  });

  it('should render "complete" template on the observable completion', () => {
    // The resulting synchronous notification sequence is: 1,2,3,complete
    component.value$ = of(1, 2, 3);
    fixture.detectChanges();
    expectContentToBe('complete');
  });

  it('should render "error" template on observable error', () => {
    component.value$ = throwError(new Error('test error'));
    fixture.detectChanges();
    expectContentToBe('error');
  });

  it('should render "suspense"->"next"->"complete" templates and update view context for the full observable lifecycle', fakeAsync(() => {
    component.value$ = interval(1000).pipe(take(3));
    fixture.detectChanges();
    expectContentToBe('suspense');

    tick(1000);
    fixture.detectChanges();
    expectContentToBe('0');

    tick(1000);
    fixture.detectChanges();
    expectContentToBe('1');

    tick(1000);
    fixture.detectChanges();
    // the last emitted value ('2') and complete notification are in sync
    // so we expect "complete" here
    expectContentToBe('complete');
  }));

  it('should render "complete" template when observable completes immediately (by passing EMPTY)', () => {
    component.value$ = EMPTY;
    fixture.detectChanges();
    expectContentToBe('complete');
  });

  it('should render "suspense" template when observable never emits (by passing NEVER)', () => {
    component.value$ = NEVER;
    fixture.detectChanges();
    expectContentToBe('suspense');
  });

  it('should have `ngTemplateContextGuard` defined', () => {
    expect(LetDirective.ngTemplateContextGuard).toBeDefined();
    expect(LetDirective.ngTemplateContextGuard({} as LetDirective<any>, {})).toBe(true);
  });
});

function expectContentToBe(content: string): void {
  expect(nativeElement.textContent).toBe(content);
}
