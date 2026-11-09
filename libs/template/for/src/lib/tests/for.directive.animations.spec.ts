import { TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRxRenderStrategies } from '@rx-angular/cdk/render-strategies';
import { firstValueFrom } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { provideExperimentalRxForReconciliation } from '../provide-experimental-reconciler';
import { provideLegacyRxForReconciliation } from '../provide-legacy-reconciler';
import { createTestComponent, TestComponent } from './fixtures';

describe('rxFor with the animations renderer', () => {
  describe.each([['legacy'], ['new']])('conciler: %s', (conciler) => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestComponent],
        providers: [
          // its renderer removes elements only when a render pass ends
          provideNoopAnimations(),
          provideRxRenderStrategies({ primaryStrategy: 'normal' }),
          conciler === 'legacy'
            ? provideLegacyRxForReconciliation()
            : provideExperimentalRxForReconciliation(),
        ],
      });
    });

    it('should have removed the elements when the render callback fires', async () => {
      const fixture = createTestComponent(
        '<div><span *rxFor="let item of itemsHot$; renderCallback: renderedValue$">{{item}};</span></div>',
      );
      const component = fixture.componentInstance;
      const renderedText = (items: number[]) =>
        firstValueFrom(
          component.renderedValue$.pipe(
            filter((rendered) => rendered === items),
            map(() => fixture.nativeElement.textContent),
          ),
        );

      const all = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      let rendered = renderedText(all);
      fixture.detectChanges();
      component.itemsHot$.next(all);
      expect(await rendered).toBe('0;1;2;3;4;5;6;7;8;9;');

      const even = [0, 2, 4, 6, 8];
      rendered = renderedText(even);
      component.itemsHot$.next(even);
      expect(await rendered).toBe('0;2;4;6;8;');
    });
  });
});
