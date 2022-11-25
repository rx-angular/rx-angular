import { ErrorHandler } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RxStrategyProvider } from '@rx-angular/cdk/render-strategies';
import { IfModule } from '../if.module';
import { createTestComponent, TestComponent } from './fixtures';

const customErrorHandler: ErrorHandler = {
  handleError: jest.fn(),
};

describe('rxIf strategies', () => {
  let fixture: ComponentFixture<TestComponent>;
  let errorHandler: ErrorHandler;
  let nativeElement: HTMLElement;
  let primaryStrategy: string;
  let strategyProvider: RxStrategyProvider;
  let component: TestComponent;

  afterEach(() => {
    fixture = null as any;
    errorHandler = null as any;
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [IfModule],
    });
    fixture = createTestComponent(
      `<div><span *rxIf="booleanCondition$; let v; strategy: strategy; renderCallback: renderedValue$">{{v}}</span></div>`
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
        expect(v).toEqual(true);
        expect(nativeElement.textContent).toBe('true');
        done();
      });
      fixture.detectChanges();
    });
    it('should not affect primary strategy', (done) => {
      component.strategy = strategy;
      component.renderedValue$.subscribe((v) => {
        expect(v).toEqual(true);
        expect(nativeElement.textContent).toBe('true');
        expect(strategyProvider.primaryStrategy).toBe(primaryStrategy);
        done();
      });
      fixture.detectChanges();
    });
  });
});
