import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RxStrategyProvider } from '@rx-angular/cdk/render-strategies';
import { delay, Subject } from 'rxjs';
import { ChunkModule } from '../chunk.module';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'chunk-test',
  template: `
    <div
      *rxChunk="
        strategy;
        renderCallback: renderCallback;
        suspenseTpl: withSuspense ? suspense : null
      "
    >
      chunked
    </div>
    <div>not-chunked</div>
    <ng-template #suspense>suspended</ng-template>
  `,
})
class ChunkTestComponent {
  strategy? = undefined;
  renderCallback = new Subject<void>();
  withSuspense = false;
}

describe('ChunkDirective', () => {
  let fixture: ComponentFixture<ChunkTestComponent>;
  let componentInstance: ChunkTestComponent;
  let nativeElement: HTMLElement;
  let strategyProvider: RxStrategyProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChunkModule],
      declarations: [ChunkTestComponent],
    });
    fixture = TestBed.createComponent(ChunkTestComponent);
    componentInstance = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    strategyProvider = TestBed.inject(RxStrategyProvider);
  });

  describe.each([
    [undefined, true] /* <- Invalid strategy should fallback. */,
    ['', true] /* <- Same here. */,
    ['invalid', true] /* <- Same here. */,
    ['immediate', true],
    ['userBlocking', true],
    ['normal', true],
    ['low', true],
    ['idle', true],
    ['local', true],
    ['global', false],
    ['native', false],
  ])('Strategy: %s', (strategy: string, scheduled: boolean) => {
    it('should render with given strategy', (done) => {
      componentInstance.strategy = strategy;
      const expectedInitialTemplate = scheduled
        ? 'not-chunked'
        : 'chunked not-chunked';
      componentInstance.renderCallback.subscribe(() => {
        try {
          expect(nativeElement.textContent.trim()).toBe('chunked not-chunked');
          done();
        } catch (e) {
          done(e.message);
        }
      });
      fixture.detectChanges();
      expect(nativeElement.textContent.trim()).toBe(expectedInitialTemplate);
    });
    it('should render the suspense template sync', (done) => {
      componentInstance.strategy = strategy;
      componentInstance.withSuspense = true;
      const expectedInitialTemplate = scheduled
        ? 'suspendednot-chunked'
        : 'chunked not-chunked';
      componentInstance.renderCallback.subscribe(() => {
        try {
          expect(nativeElement.textContent.trim()).toBe('chunked not-chunked');
          done();
        } catch (e) {
          done(e.message);
        }
      });
      fixture.detectChanges();
      expect(nativeElement.textContent.trim()).toBe(expectedInitialTemplate);
    });
  });

  it('should not render with noop strategy', (done) => {
    componentInstance.strategy = 'noop';
    fixture.detectChanges();
    expect(nativeElement.textContent).toBe('not-chunked');
    strategyProvider
      .schedule(() => {})
      .pipe(delay(10)) // let's just wait a tiny bit to be sure nothing happens :)
      .subscribe(() => {
        try {
          expect(nativeElement.textContent.trim()).toBe('not-chunked');
          done();
        } catch (e) {
          done(e.message);
        }
      });
  });
});
