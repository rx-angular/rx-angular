import {
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RX_RENDER_STRATEGIES_CONFIG } from '@rx-angular/cdk/render-strategies';
import { mockConsole } from '@test-helpers';
import { EMPTY, Observable, of } from 'rxjs';

import { LetDirective } from '../let.directive';
import { MockChangeDetectorRef } from './fixtures';

@Component({
  template: `
    <ng-container *rxLet="value$; complete as complete">{{
      complete
    }}</ng-container>
  `,
})
class LetDirectiveTestCompleteComponent {
  value$: Observable<number> = of(42);
}

let fixtureLetDirectiveTestComponent: any;
let letDirectiveTestComponent: {
  strategy: any;
  value$: Observable<any> | undefined | null;
};
let componentNativeElement: any;

const setupLetDirectiveTestComponentComplete = (): void => {
  TestBed.configureTestingModule({
    declarations: [LetDirectiveTestCompleteComponent, LetDirective],
    providers: [
      { provide: ChangeDetectorRef, useClass: MockChangeDetectorRef },
      TemplateRef,
      ViewContainerRef,
      {
        provide: RX_RENDER_STRATEGIES_CONFIG,
        useValue: {
          primaryStrategy: 'native',
        },
      },
    ],
    teardown: { destroyAfterEach: true },
  });

  fixtureLetDirectiveTestComponent = TestBed.createComponent(
    LetDirectiveTestCompleteComponent
  );
  letDirectiveTestComponent =
    fixtureLetDirectiveTestComponent.componentInstance;
  componentNativeElement = fixtureLetDirectiveTestComponent.nativeElement;
};

describe('LetDirective when complete', () => {
  beforeAll(() => mockConsole());
  beforeEach(setupLetDirectiveTestComponentComplete);

  it('should render true if completed', () => {
    letDirectiveTestComponent.value$ = EMPTY;
    fixtureLetDirectiveTestComponent.detectChanges();
    expect(componentNativeElement.textContent).toBe('true');
  });
});
