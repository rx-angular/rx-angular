import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RxStrategyProvider } from '@rx-angular/cdk/render-strategies';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { LetDirective } from '../let.directive';

@Component({
  template: `
    <ng-container
      *rxLet="
        value$;
        let value;
        strategy: strategy;
        renderCallback: renderedValue$
      "
      >{{ (value | json) || 'undefined' }}</ng-container
    >
  `,
})
class LetDirectiveTestStrategyComponent {
  value$: Observable<number> = new BehaviorSubject<number>(42);
  renderedValue$ = new Subject<number>();
  strategy: string;
}

let fixture: ComponentFixture<LetDirectiveTestStrategyComponent>;
let componentInstance: LetDirectiveTestStrategyComponent;
let componentNativeElement: HTMLElement;
let primaryStrategy: string;
let strategyProvider: RxStrategyProvider;

describe('LetDirective strategies', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LetDirectiveTestStrategyComponent, LetDirective],
      teardown: { destroyAfterEach: true },
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LetDirectiveTestStrategyComponent);
    componentInstance = fixture.componentInstance;
    componentNativeElement = fixture.nativeElement;
    strategyProvider = TestBed.inject(RxStrategyProvider);
    primaryStrategy = strategyProvider.primaryStrategy;
  });

  describe.each([
    [''] /* <- Invalid strategy should fallback. */,
    ['invalid'] /* <- Same here. */,

    ['immediate'],
    ['userBlocking'],
    ['normal'],
    ['low'],
    ['idle'],
    ['native'],
  ])('Strategy: %p', (strategy) => {
    it('should render with given strategy', (done) => {
      componentInstance.strategy = strategy;
      componentInstance.renderedValue$.subscribe((v) => {
        expect(v).toBe(42);
        done();
      });
      fixture.detectChanges();
    });
    it('should not affect primary strategy', (done) => {
      componentInstance.strategy = strategy;
      componentInstance.renderedValue$.subscribe((v) => {
        expect(v).toBe(42);
        expect(strategyProvider.primaryStrategy).toBe(primaryStrategy);
        done();
      });
      fixture.detectChanges();
    });
  });
});
