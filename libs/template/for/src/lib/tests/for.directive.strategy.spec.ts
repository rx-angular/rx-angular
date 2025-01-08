import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RxStrategyProvider } from '@rx-angular/cdk/render-strategies';
import { provideExperimentalRxForReconciliation } from '../provide-experimental-reconciler';
import { provideLegacyRxForReconciliation } from '../provide-legacy-reconciler';
import { createTestComponent, TestComponent } from './fixtures';

describe('rxFor strategies', () => {
  describe.each([['legacy'], ['new']])('conciler: %p', (conciler) => {
    let fixture: ComponentFixture<TestComponent>;
    let nativeElement: HTMLElement;
    let primaryStrategy: string;
    let strategyProvider: RxStrategyProvider;
    let component: TestComponent;

    afterEach(() => {
      fixture = null as any;
    });

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestComponent],
        providers: [
          conciler === 'legacy'
            ? provideLegacyRxForReconciliation()
            : provideExperimentalRxForReconciliation(),
        ],
      });
      fixture = createTestComponent(
        `<div><span *rxFor="let item of items; strategy: strategy; renderCallback: renderedValue$">{{item.toString()}};</span></div>`,
      );
      component = fixture.componentInstance;
      nativeElement = fixture.nativeElement;
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
        component.strategy = strategy;
        component.renderedValue$.subscribe((v) => {
          expect(v).toEqual([1, 2]);
          expect(nativeElement.textContent).toBe('1;2;');
          done();
        });
        fixture.detectChanges();
      });
      it('should not affect primary strategy', (done) => {
        component.strategy = strategy;
        component.renderedValue$.subscribe((v) => {
          expect(v).toEqual([1, 2]);
          expect(nativeElement.textContent).toBe('1;2;');
          expect(strategyProvider.primaryStrategy).toBe(primaryStrategy);
          done();
        });
        fixture.detectChanges();
      });
    });
  });
});
