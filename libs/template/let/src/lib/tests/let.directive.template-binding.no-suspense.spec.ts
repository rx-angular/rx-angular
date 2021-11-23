import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RX_RENDER_STRATEGIES_CONFIG } from '@rx-angular/cdk/render-strategies';
import { mockConsole } from '@test-helpers';
import { Observable, of, Subject } from 'rxjs';

import { LetDirective } from '../let.directive';

@Component({
  template: `
    <ng-container
      *rxLet="value$; let value; rxComplete: complete; rxError: error"
      >{{
        value === undefined
          ? 'undefined'
          : value === null
          ? 'null'
          : (value | json)
      }}</ng-container
    >

    <ng-template #complete>complete</ng-template>
    <ng-template #error>error</ng-template>
  `,
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
    providers: [
      {
        provide: RX_RENDER_STRATEGIES_CONFIG,
        useValue: {
          primaryStrategy: 'native',
        },
      },
    ],
    teardown: { destroyAfterEach: true },
  });
};

const setUpFixture = () => {
  fixture = TestBed.createComponent(
    LetDirectiveNoSuspenseTemplateTestComponent
  );
  component = fixture.componentInstance;
  nativeElement = fixture.nativeElement;
};

describe('LetDirective when template binding without "suspense" template', () => {
  beforeAll(() => mockConsole());
  beforeEach(setupTestComponent);
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
