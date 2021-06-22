import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { LetDirective } from '../let.directive';
import { MockChangeDetectorRef, MockElementRef } from './fixtures';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { mockConsole } from '@test-helpers';
import {
  RxDefaultStrategyNames,
  RX_ANGULAR_CONFIG,
  RxStrategyProvider,
  RxStrategyNames,
} from '@rx-angular/cdk';

@Component({
  template: `
    <ng-container *rxLet="value$; let value; strategy: strategy">{{
      (value | json) || 'undefined'
    }}</ng-container>
  `,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
class LetDirectiveTestComponentStrategy {
  value$: Observable<number> = of(42);
  strategy: string;
}

let fixtureLetDirectiveTestComponent: any;
let letDirectiveTestComponent: LetDirectiveTestComponentStrategy;
let letDirective: LetDirective<number>;
let activeStrategy: RxDefaultStrategyNames;
let componentNativeElement: any;

const setupLetDirectiveTestComponentStrategy = (): void => {
  TestBed.configureTestingModule({
    declarations: [LetDirectiveTestComponentStrategy, LetDirective],
    providers: [
      RxStrategyProvider,
      { provide: ChangeDetectorRef, useClass: MockChangeDetectorRef },
      { provide: ElementRef, useValue: new MockElementRef({}) },
      TemplateRef,
      ViewContainerRef,
      LetDirective,
    ],
  });
  fixtureLetDirectiveTestComponent = TestBed.createComponent(
    LetDirectiveTestComponentStrategy
  );
  letDirectiveTestComponent =
    fixtureLetDirectiveTestComponent.componentInstance;
  letDirective = fixtureLetDirectiveTestComponent.debugElement.injector.get(
    LetDirective
  );
  activeStrategy = letDirective['strategyProvider'].primaryStrategy as any;
  letDirective['strategyHandler'].values$.subscribe((as: any) => {
    activeStrategy = as;
  });
  componentNativeElement = fixtureLetDirectiveTestComponent.nativeElement;
};

async function stratTest(strategy?: RxStrategyNames<any>) {
  if (strategy) {
    letDirectiveTestComponent.strategy = strategy;
  }
  letDirectiveTestComponent.value$ = of(42);
  fixtureLetDirectiveTestComponent.detectChanges();
  await fixtureLetDirectiveTestComponent.whenStable();
  expect(componentNativeElement.textContent).toBe('42');
}

describe('LetDirective when using strategy', () => {
  beforeAll(() => mockConsole());
  beforeEach(setupLetDirectiveTestComponentStrategy);

  it('should work with default strategy', async () => {
    await stratTest();
  });

  it('should work with noPriority strategy', async () => {
    await stratTest('noPriority');
  });

  it('should work with immediate strategy', async () => {
    await stratTest('immediate');
  });

  it('should work with userBlocking strategy', async () => {
    await stratTest('userBlocking');
  });

  it('should work with normal strategy', async () => {
    await stratTest('normal');
  });

  it('should work with low strategy', async () => {
    await stratTest('low');
  });

  it('should work with idle strategy', async () => {
    await stratTest('idle');
  });

  it('should work with native strategy', async () => {
   await stratTest('native')
  });

  it('should apply default strategy if none is declared by the user', () => {
    fixtureLetDirectiveTestComponent.detectChanges();
    expect(activeStrategy).toEqual(
      letDirective['strategyProvider'].primaryStrategy
    );
  });
});
