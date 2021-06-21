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
      LetDirective
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

describe('LetDirective when using strategy', () => {
  beforeAll(() => mockConsole());
  beforeEach(setupLetDirectiveTestComponentStrategy);

  it('should work with default strategy', done => {
    letDirectiveTestComponent.value$ = of(5);
    fixtureLetDirectiveTestComponent.detectChanges();
    setTimeout(() => {
      expect(componentNativeElement.textContent).toBe('5');
      done();
    }, 1);
  });

  it('should work with noPriority strategy', done => {
    letDirectiveTestComponent.value$ = of(5);
    letDirectiveTestComponent.strategy = 'noPriority';
    fixtureLetDirectiveTestComponent.detectChanges();
    setTimeout(() => {
      expect(componentNativeElement.textContent).toBe('5');
      done();
    }, 1);
  });

  it('should work with immediate strategy', done => {
    letDirectiveTestComponent.value$ = of(5);
    letDirectiveTestComponent.strategy = 'immediate';
    fixtureLetDirectiveTestComponent.detectChanges();
    setTimeout(() => {
      expect(componentNativeElement.textContent).toBe('5');
      done();
    }, 1);
  });

  it('should work with userBlocking strategy', done => {
    letDirectiveTestComponent.value$ = of(5);
    letDirectiveTestComponent.strategy = 'userBlocking';
    fixtureLetDirectiveTestComponent.detectChanges();
    setTimeout(() => {
      expect(componentNativeElement.textContent).toBe('5');
      done();
    }, 1);
  });

  it('should work with normal strategy', done => {
    letDirectiveTestComponent.value$ = of(5);
    letDirectiveTestComponent.strategy = 'normal';
    fixtureLetDirectiveTestComponent.detectChanges();
    setTimeout(() => {
      expect(componentNativeElement.textContent).toBe('5');
      done();
    }, 1);
  });

  it('should work with low strategy', done => {
    letDirectiveTestComponent.value$ = of(5);
    letDirectiveTestComponent.strategy = 'low';
    fixtureLetDirectiveTestComponent.detectChanges();
    setTimeout(() => {
      expect(componentNativeElement.textContent).toBe('5');
      done();
    }, 1);
  });

  it('should work with idle strategy', done => {
    letDirectiveTestComponent.value$ = of(5);
    letDirectiveTestComponent.strategy = 'idle';
    fixtureLetDirectiveTestComponent.detectChanges();
    setTimeout(() => {
      expect(componentNativeElement.textContent).toBe('5');
      done();
    }, 1);
  });

  it('should work with native strategy', () => {
    letDirectiveTestComponent.value$ = of(1, 2, 3, 4, 5);
    letDirectiveTestComponent.strategy = 'native';
    fixtureLetDirectiveTestComponent.detectChanges();
    expect(componentNativeElement.textContent).toBe('5');
  });

  it('should apply default strategy if none is declared by the user', () => {
    fixtureLetDirectiveTestComponent.detectChanges();
    expect(activeStrategy).toEqual(
      letDirective['strategyProvider'].primaryStrategy
    );
  });
});
