import {
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRxRenderStrategies } from '@rx-angular/cdk/render-strategies';
import { mockConsole } from '@test-helpers/rx-angular';
import { Subscribable } from 'rxjs';
import { RxLet } from '../let.directive';
import { MockChangeDetectorRef } from './fixtures';

@Component({
  template: `
    <ng-container *rxLet="value$; let value">
      {{ value }}
    </ng-container>
  `,
  imports: [RxLet],
})
class LetDirectiveSubscribableTestComponent {
  value$: Subscribable<number>;
}

let fixtureLetDirectiveTestComponent: any;
let letDirectiveTestComponent: {
  strategy: string;
  value$: Subscribable<unknown> | unknown | undefined | null;
};
let componentNativeElement: any;

const setupLetDirectiveTestComponent = (): void => {
  TestBed.configureTestingModule({
    imports: [LetDirectiveSubscribableTestComponent],
    providers: [
      { provide: ChangeDetectorRef, useClass: MockChangeDetectorRef },
      TemplateRef,
      ViewContainerRef,
      provideRxRenderStrategies({ primaryStrategy: 'native' }),
    ],
    teardown: { destroyAfterEach: true },
  });
  fixtureLetDirectiveTestComponent = TestBed.createComponent(
    LetDirectiveSubscribableTestComponent,
  );
  letDirectiveTestComponent =
    fixtureLetDirectiveTestComponent.componentInstance;
  componentNativeElement = fixtureLetDirectiveTestComponent.nativeElement;
};
describe('RxLet Directive with Subscribable input', () => {
  beforeAll(() => mockConsole());
  beforeEach(setupLetDirectiveTestComponent);

  it('should be instantiable', () => {
    expect(fixtureLetDirectiveTestComponent).toBeDefined();
    expect(letDirectiveTestComponent).toBeDefined();
    expect(componentNativeElement).toBeDefined();
  });

  it('should display value from Subscribable', () => {
    letDirectiveTestComponent.value$ = {
      subscribe: ({ next }) => {
        next(42);
        return {
          unsubscribe() {
            /**EMPTY*/
          },
        };
      },
    };
    fixtureLetDirectiveTestComponent.detectChanges();
    expect(componentNativeElement.textContent.trim()).toBe('42');
  });
});
