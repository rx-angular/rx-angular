import { JsonPipe } from '@angular/common';
import { Component, ElementRef, viewChild, viewChildren } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RxStrategyProvider } from '@rx-angular/cdk/render-strategies';
import { asapScheduler, delay, ReplaySubject, Subject } from 'rxjs';
import { RxLet } from '../let.directive';

@Component({
  template: `
    <div
      #letChild
      *rxLet="value$; let value; strategy: strategy; parent: false"
    >
      {{ (value | json) || 'undefined' }}
    </div>

    <div
      *rxLet="
        value$;
        let value;
        strategy: strategy;
        renderCallback: rendered$;
        parent: false
      "
    >
      {{ (value | json) || 'undefined' }}
    </div>
  `,
  standalone: true,
  imports: [RxLet, JsonPipe],
})
class LetDirectiveTestStrategyComponent {
  letChild = viewChild<ElementRef>('letChild');
  letChildren = viewChildren(RxLet);
  strategy: string;
  value$ = new ReplaySubject(1);
  rendered$ = new Subject();
}

describe('LetDirective signal parent notification', () => {
  let fixture: ComponentFixture<LetDirectiveTestStrategyComponent>;
  let componentInstance: LetDirectiveTestStrategyComponent;
  let strategyProvider: RxStrategyProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LetDirectiveTestStrategyComponent],
      teardown: { destroyAfterEach: true },
    });
    fixture = TestBed.createComponent(LetDirectiveTestStrategyComponent);
    componentInstance = fixture.componentInstance;
    strategyProvider = TestBed.inject(RxStrategyProvider);
  });

  describe.each([
    ['immediate'],
    ['userBlocking'],
    ['normal'],
    ['low'],
    ['idle'],
  ])('Strategy: %p', (strategy) => {
    describe('parent: false', () => {
      beforeEach(() => {
        componentInstance.strategy = strategy;
        componentInstance.value$.next(42);
      });

      it('should update ViewChild', (done) => {
        const behavior = strategyProvider.strategies[strategy].behavior;
        componentInstance.rendered$
          .pipe(
            behavior({
              work: () => {},
            }),
            delay(0, asapScheduler),
          )
          .subscribe(() => {
            expect(componentInstance.letChild()).toBeDefined();
            done();
          });
        fixture.detectChanges();
      });

      it('should not update parent', (done) => {
        fixture.detectChanges();
        const cdRef = (componentInstance.letChildren()[0] as any).cdRef;
        cdRef.detectChanges = jest.fn();
        const behavior = strategyProvider.strategies[strategy].behavior;
        componentInstance.rendered$
          .pipe(
            behavior({
              work: () => {},
            }),
            delay(0, asapScheduler),
          )
          .subscribe(() => {
            expect(cdRef.detectChanges).not.toHaveBeenCalled();
            done();
          });
      });
    });
  });
});
