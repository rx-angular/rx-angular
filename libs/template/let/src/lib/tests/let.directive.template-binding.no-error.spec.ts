import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RX_RENDER_STRATEGIES_CONFIG } from '@rx-angular/cdk/render-strategies';
import { mockConsole } from '@test-helpers';
import { Observable, of, Subject } from 'rxjs';
import { LetDirective } from '../let.directive';

@Component({
  template: `
    <ng-container
      *rxLet="value$; let value; suspense: suspense; complete: complete"
      >{{
        value === undefined
          ? 'undefined'
          : value === null
          ? 'null'
          : (value | json)
      }}</ng-container
    >

    <ng-template #complete>complete</ng-template>
    <ng-template #suspense>suspense</ng-template>
  `,
})
class LetDirectiveNoErrorTemplateTestComponent {
  value$: Observable<number> = of(1);
}

let fixture: ComponentFixture<LetDirectiveNoErrorTemplateTestComponent>;
let component: LetDirectiveNoErrorTemplateTestComponent;
let nativeElement: HTMLElement;

const setupTestComponent = () => {
  TestBed.configureTestingModule({
    providers: [
      {
        provide: RX_RENDER_STRATEGIES_CONFIG,
        useValue: {
          primaryStrategy: 'native',
        },
      },
    ],
    declarations: [LetDirectiveNoErrorTemplateTestComponent, LetDirective],
    teardown: { destroyAfterEach: true },
  });
};

const setUpFixture = () => {
  fixture = TestBed.createComponent(LetDirectiveNoErrorTemplateTestComponent);
  component = fixture.componentInstance;
  nativeElement = fixture.nativeElement;
};

describe('LetDirective when template binding without "error" template', () => {
  beforeAll(() => mockConsole());
  beforeEach(setupTestComponent);
  beforeEach(() => {
    setUpFixture();
  });

  it('should be initiated', () => {
    expect(component).toBeDefined();
  });

  it('should fallback to and render "next" template when observable errors', () => {
    component.value$ = new Subject();
    fixture.detectChanges();

    (component.value$ as Subject<number>).next(1);
    fixture.detectChanges();

    (component.value$ as Subject<number>).error(new Error('test'));
    fixture.detectChanges();

    expectContentToBe('1');
  });

  it('should render undefined when observable errors immediately', () => {
    component.value$ = new Subject();
    fixture.detectChanges();

    (component.value$ as Subject<number>).error(new Error('test'));
    fixture.detectChanges();

    expectContentToBe('undefined');
  });

  it('should render complete when observable completes', () => {
    component.value$ = new Subject();
    (component.value$ as Subject<number>).complete();
    fixture.detectChanges();

    expectContentToBe('complete');
  });

  it('should render suspense when observable has not emitted yet', () => {
    component.value$ = new Subject();
    fixture.detectChanges();

    expectContentToBe('suspense');
  });
});

function expectContentToBe(content: string): void {
  expect(nativeElement.textContent).toBe(content);
}
