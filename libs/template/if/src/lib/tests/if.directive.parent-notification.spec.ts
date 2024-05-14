import { Component, ElementRef, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  RxRenderBehavior,
  RxStrategyProvider,
} from '@rx-angular/cdk/render-strategies';
import { asapScheduler, delay, Observable, ReplaySubject, Subject } from 'rxjs';
import { RxIf } from '../if.directive';

@Component({
  selector: 'rx-if-test',
  template: `
    <div
      #ifChild
      *rxIf="
        value$;
        strategy: strategy;
        parent: false;
        renderCallback: rendered$
      "
    >
      hello
    </div>
  `,
  standalone: true,
  imports: [RxIf],
})
class RxIfTestComponent {
  ifChild = viewChild<ElementRef>('ifChild');
  strategy: string;
  value$ = new ReplaySubject(1);
  rendered$ = new Subject();
}

describe('RxIf signal parent notification', () => {
  let fixture: ComponentFixture<RxIfTestComponent>;
  let componentInstance: RxIfTestComponent;
  let strategyProvider: RxStrategyProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RxIfTestComponent],
    });
    fixture = TestBed.createComponent(RxIfTestComponent);
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
        fixture.detectChanges();
        componentInstance.value$.next(true);
      });

      it('should update ViewChild', async () => {
        const behavior = strategyProvider.strategies[strategy].behavior;
        await rendered(componentInstance.rendered$, behavior);
        expect(
          componentInstance.ifChild()?.nativeElement?.textContent?.trim(),
        ).toBe('hello');
      });
    });
  });
});

async function rendered(
  rendered$: Observable<any>,
  behavior: RxRenderBehavior,
) {
  return new Promise<void>((resolve) => {
    rendered$
      .pipe(
        behavior({
          work: () => {},
        }),
        delay(0, asapScheduler),
      )
      .subscribe(() => {
        resolve();
      });
  });
}
