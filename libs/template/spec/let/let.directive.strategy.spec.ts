import { ChangeDetectorRef, Component, TemplateRef, ViewContainerRef } from '@angular/core';
import { RenderStrategy } from '../../src/lib/core/render-aware/interfaces';
import { Observable, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { LetDirective } from '../../src/lib/let';
import { DEFAULT_STRATEGY_NAME } from '../../src/lib/render-strategies/strategies/strategies-map';
import { MockChangeDetectorRef } from '../fixtures';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { mockConsole } from '@test-helpers';

@Component({
  template: `
    <ng-container
      *rxLet="value$; let value; strategy: strategy; $error as error; $complete as complete"
    >{{ (value | json) || 'undefined' }}</ng-container
    >
  `
})
class LetDirectiveTestComponentStrategy {
  value$: Observable<number> = of(42);
  strategy: string;
}

let fixtureLetDirectiveTestComponent: any;
let letDirectiveTestComponent: LetDirectiveTestComponentStrategy;
let letDirective: LetDirective<number>;
let activeStrategy: RenderStrategy;
let componentNativeElement: any;

const setupLetDirectiveTestComponentStrategy = (): void => {
  TestBed.configureTestingModule({
    declarations: [LetDirectiveTestComponentStrategy, LetDirective],
    providers: [
      { provide: ChangeDetectorRef, useClass: MockChangeDetectorRef },
      TemplateRef,
      ViewContainerRef,
      LetDirective
    ]
  });
  fixtureLetDirectiveTestComponent = TestBed.createComponent(
    LetDirectiveTestComponentStrategy
  );
  letDirectiveTestComponent =
    fixtureLetDirectiveTestComponent.componentInstance;
  letDirective = fixtureLetDirectiveTestComponent.debugElement.injector.get(LetDirective);
  letDirective.renderAware.activeStrategy$.subscribe(as => activeStrategy = as);
  componentNativeElement = fixtureLetDirectiveTestComponent.nativeElement;
};

describe('LetDirective when using strategy', () => {
  beforeAll(() => mockConsole());
  beforeEach(setupLetDirectiveTestComponentStrategy);

  it('should work with different if a strategy other than the default', () => {
    letDirectiveTestComponent.value$ = of(1, 2, 3, 4, 5);
    letDirectiveTestComponent.strategy = 'detach';
    fixtureLetDirectiveTestComponent.detectChanges();
    expect(componentNativeElement.textContent).toBe('5');
  });

  it('should apply default strategy if none is declared by the user', () => {
    fixtureLetDirectiveTestComponent.detectChanges();
    expect(activeStrategy.name).toEqual(DEFAULT_STRATEGY_NAME);
  });
});
