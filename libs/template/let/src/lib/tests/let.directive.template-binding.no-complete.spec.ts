import { JsonPipe } from '@angular/common';
import { ChangeDetectorRef, Component, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRxRenderStrategies } from '@rx-angular/cdk/render-strategies';
import { mockConsole } from '@test-helpers/rx-angular';
import { EMPTY, Observable, of } from 'rxjs';
import { RxLet } from '../let.directive';
import { MockChangeDetectorRef } from './fixtures';

@Component({
  template: `
    <ng-container *rxLet="value$; let value">{{
      value === undefined
        ? 'undefined'
        : value === null
          ? 'null'
          : (value | json)
    }}</ng-container>
  `,
  imports: [RxLet, JsonPipe],
})
class LetDirectiveNoCompleteTemplateTestComponent {
  value$: Observable<number> = of(1);
}

let fixture: ComponentFixture<LetDirectiveNoCompleteTemplateTestComponent>;
let component: LetDirectiveNoCompleteTemplateTestComponent;
let nativeElement: HTMLElement;

const setupTestComponent = () => {
  TestBed.configureTestingModule({
    imports: [LetDirectiveNoCompleteTemplateTestComponent],
    providers: [
      { provide: ChangeDetectorRef, useClass: MockChangeDetectorRef },
      ViewContainerRef,
      provideRxRenderStrategies({ primaryStrategy: 'native' }),
    ],
    teardown: { destroyAfterEach: true },
  });
};

const setUpFixture = () => {
  fixture = TestBed.createComponent(
    LetDirectiveNoCompleteTemplateTestComponent,
  );
  component = fixture.componentInstance;
  nativeElement = fixture.nativeElement;
};

describe('LetDirective when template binding without "complete" template', () => {
  beforeAll(() => mockConsole());
  beforeEach(setupTestComponent);
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
