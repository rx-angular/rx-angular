import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { fc, test } from '@fast-check/jest';
import { SizeHost } from './test-utils/host-components';
import {
  emitIntersection,
  emitResize,
  installObserverMocks,
  IntersectionObserverMock,
  ResizeObserverMock,
} from './test-utils/observer-mocks';
import { configureBrowser } from './test-utils/testbed';

/**
 * R7 — CLS size reservation.
 *
 * Validates Property 6 from the design: the `--rx-vw-w` / `--rx-vw-h` custom
 * properties reflect the extracted size while content is visible, and
 * `min-width` / `min-height` reserve that size while the placeholder is visible
 * iff `keepLastKnownSize` is enabled — switching back to content removes them.
 */
describe('RxVirtualView — CLS size reservation (R7)', () => {
  let restore: () => void;

  beforeEach(() => {
    restore = installObserverMocks();
  });

  afterEach(() => {
    restore();
  });

  /**
   * Runs a single size-reservation scenario for the given generated inputs and
   * asserts the `--rx-vw-*` / `min-*` host style bindings across the
   * content-visible → placeholder-visible → content-visible transitions.
   */
  function runScenario(params: {
    width: number;
    height: number;
    keepLastKnownSize: boolean;
    useCustomExtract: boolean;
    multiplier: number;
  }): void {
    const { width, height, keepLastKnownSize, useCustomExtract, multiplier } =
      params;

    // Reset per-iteration state so instance registries do not leak across the
    // 100+ generated runs that share a single `beforeEach`/`afterEach`.
    IntersectionObserverMock.instances = [];
    ResizeObserverMock.instances = [];

    configureBrowser({
      host: SizeHost,
      config: {
        placeholderStrategy: 'sync',
        contentStrategy: 'sync',
        keepLastKnownSize,
      },
    });

    const fixture: ComponentFixture<SizeHost> =
      TestBed.createComponent(SizeHost);

    fixture.componentRef.setInput('keepLastKnownSize', keepLastKnownSize);
    if (useCustomExtract) {
      fixture.componentRef.setInput(
        'extractSize',
        (entry: ResizeObserverEntry) => ({
          width: entry.borderBoxSize[0].inlineSize * multiplier,
          height: entry.borderBoxSize[0].blockSize * multiplier,
        }),
      );
    }

    try {
      fixture.detectChanges();

      const widgetEl = fixture.debugElement.query(By.css('.widget'))
        .nativeElement as HTMLElement;

      // The size the directive should extract from the emitted resize entry.
      const expectedWidth = useCustomExtract ? width * multiplier : width;
      const expectedHeight = useCustomExtract ? height * multiplier : height;
      const wVar = expectedWidth > 0 ? `${expectedWidth}px` : '';
      const hVar = expectedHeight > 0 ? `${expectedHeight}px` : '';

      // 1) Content becomes visible, then a size is reported.
      emitIntersection(widgetEl, true);
      fixture.detectChanges();
      emitResize(widgetEl, { inlineSize: width, blockSize: height });
      fixture.detectChanges();

      // --rx-vw-w / --rx-vw-h reflect the extracted size (empty when 0).
      expect(widgetEl.style.getPropertyValue('--rx-vw-w')).toBe(wVar);
      expect(widgetEl.style.getPropertyValue('--rx-vw-h')).toBe(hVar);
      // While content is visible the placeholder is not, so no reservation.
      expect(widgetEl.style.minWidth).toBe('');
      expect(widgetEl.style.minHeight).toBe('');

      // 2) Placeholder becomes visible: min-* reserve the size iff keepLastKnownSize.
      emitIntersection(widgetEl, false);
      fixture.detectChanges();

      if (keepLastKnownSize) {
        expect(widgetEl.style.minWidth).toBe(wVar);
        expect(widgetEl.style.minHeight).toBe(hVar);
      } else {
        expect(widgetEl.style.minWidth).toBe('');
        expect(widgetEl.style.minHeight).toBe('');
      }
      // The custom properties keep reflecting the last known size.
      expect(widgetEl.style.getPropertyValue('--rx-vw-w')).toBe(wVar);
      expect(widgetEl.style.getPropertyValue('--rx-vw-h')).toBe(hVar);

      // 3) Back to content visible: reservation is removed.
      emitIntersection(widgetEl, true);
      fixture.detectChanges();
      expect(widgetEl.style.minWidth).toBe('');
      expect(widgetEl.style.minHeight).toBe('');
    } finally {
      fixture.destroy();
    }
  }

  // Feature: virtual-view-test-coverage, Property 6: Size reservation reflects extracted size
  test.prop(
    [
      fc.record({
        width: fc.nat({ max: 2000 }),
        height: fc.nat({ max: 2000 }),
        keepLastKnownSize: fc.boolean(),
        useCustomExtract: fc.boolean(),
        multiplier: fc.integer({ min: 1, max: 5 }),
      }),
    ],
    { numRuns: 100 },
  )(
    'reserves extracted size on placeholder iff keepLastKnownSize, and clears it on content',
    (params) => {
      runScenario(params);
    },
  );

  // Supplementary example (Req 7.5): a custom extractSize function transforms the
  // reported border-box size and the reserved custom properties reflect its output.
  it('reflects a custom extractSize transform in the reserved size vars', () => {
    runScenario({
      width: 120,
      height: 40,
      keepLastKnownSize: true,
      useCustomExtract: true,
      multiplier: 3,
    });
  });
});
