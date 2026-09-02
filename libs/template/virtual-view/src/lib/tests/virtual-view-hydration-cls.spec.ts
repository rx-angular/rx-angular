import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RxVirtualView } from '../virtual-view.directive';
import { SimpleHost } from './test-utils/host-components';
import {
  emitIntersection,
  emitResize,
  installObserverMocks,
  isObservingSize,
} from './test-utils/observer-mocks';
import { configureBrowser } from './test-utils/testbed';

/**
 * Regression coverage for the hydration size-reservation hole.
 *
 * When `enabled` is a signal that starts `false` (the SSR / pre-hydration state)
 * the disabled path renders the content eagerly and sets `#contentIsShown`.
 * Once `enabled` flips to `true` the visibility pipeline registers, but its
 * `visible === true` branch short-circuits to `NEVER` when content is already
 * shown — so `observeElementSize()` is never subscribed and `size` stays
 * `{0, 0}`.
 *
 * Consequence: `--rx-vw-h` / `--rx-vw-w` are never published and
 * `keepLastKnownSize` has nothing to reserve, so the first placeholder swap
 * collapses the element to the template's hardcoded fallback height — a layout
 * shift on every SSR-rendered, above-the-fold virtual view.
 */
describe('RxVirtualView — hydration size reservation', () => {
  let restore: () => void;

  beforeEach(() => {
    restore = installObserverMocks();
  });

  afterEach(() => {
    restore();
  });

  /**
   * Boots `SimpleHost` in the pre-hydration state: `enabled` starts `false`, so
   * the content is rendered synchronously exactly as it is on a hydrated SSR
   * page, then flips to `true` to emulate hydration completing.
   */
  function bootHydrated(keepLastKnownSize: boolean): {
    fixture: ComponentFixture<SimpleHost>;
    widgetEl: HTMLElement;
    directive: RxVirtualView;
  } {
    const enabled = signal(false);

    configureBrowser({
      host: SimpleHost,
      config: {
        enabled,
        placeholderStrategy: 'sync',
        contentStrategy: 'sync',
        enableAfterHydration: true,
        keepLastKnownSize,
      },
    });

    const fixture = TestBed.createComponent(SimpleHost);
    fixture.componentRef.setInput('keepLastKnownSize', keepLastKnownSize);
    fixture.detectChanges();

    const debugEl = fixture.debugElement.query(By.css('.widget'));
    const widgetEl = debugEl.nativeElement as HTMLElement;

    // Pre-hydration: SSR content is in place, no placeholder.
    expect(widgetEl.textContent?.trim()).toBe('ze-template');

    // Hydration completes.
    enabled.set(true);
    fixture.detectChanges();

    return {
      fixture,
      widgetEl,
      directive: debugEl.injector.get(RxVirtualView),
    };
  }

  it('subscribes the ResizeObserver for content claimed before hydration', () => {
    const { fixture, widgetEl } = bootHydrated(true);

    // The element is above the fold, so the IntersectionObserver reports it as
    // intersecting on its first callback.
    emitIntersection(widgetEl, true);
    fixture.detectChanges();

    expect(isObservingSize(widgetEl)).toBe(true);

    fixture.destroy();
  });

  it('publishes no reserved size while the view is still disabled', () => {
    const enabled = signal(false);

    configureBrowser({
      host: SimpleHost,
      config: {
        enabled,
        placeholderStrategy: 'sync',
        contentStrategy: 'sync',
        enableAfterHydration: true,
        keepLastKnownSize: true,
      },
    });

    const fixture = TestBed.createComponent(SimpleHost);
    fixture.componentRef.setInput('keepLastKnownSize', true);
    fixture.detectChanges();

    const widgetEl = fixture.debugElement.query(By.css('.widget'))
      .nativeElement as HTMLElement;

    // `enabled` is never flipped. Measurement is skipped entirely while disabled,
    // and every layout-affecting binding is gated on `enabled` anyway, so nothing
    // may be published pre-hydration.
    emitResize(widgetEl, { inlineSize: 300, blockSize: 200 });
    fixture.detectChanges();

    expect(widgetEl.style.getPropertyValue('--rx-vw-h')).toBe('');
    expect(widgetEl.style.getPropertyValue('--rx-vw-w')).toBe('');
    expect(widgetEl.style.minHeight).toBe('');

    fixture.destroy();
  });

  it('publishes --rx-vw-h for content claimed before hydration', () => {
    const { fixture, widgetEl } = bootHydrated(true);

    emitIntersection(widgetEl, true);
    fixture.detectChanges();
    emitResize(widgetEl, { inlineSize: 300, blockSize: 200 });
    fixture.detectChanges();

    expect(widgetEl.style.getPropertyValue('--rx-vw-h')).toBe('200px');
    expect(widgetEl.style.getPropertyValue('--rx-vw-w')).toBe('300px');

    fixture.destroy();
  });

  it('reserves the measured height when the hydrated content scrolls out', () => {
    const { fixture, widgetEl } = bootHydrated(true);

    emitIntersection(widgetEl, true);
    fixture.detectChanges();
    emitResize(widgetEl, { inlineSize: 300, blockSize: 200 });
    fixture.detectChanges();

    // Scrolling out swaps in the placeholder. With keepLastKnownSize the
    // measured height must be reserved, otherwise the element collapses.
    emitIntersection(widgetEl, false);
    fixture.detectChanges();

    expect(widgetEl.textContent?.trim()).toBe('ze-placeholder');
    expect(widgetEl.style.minHeight).toBe('200px');

    fixture.destroy();
  });

  it('does not re-mount the hydrated content when it is first reported visible', () => {
    const { fixture, widgetEl } = bootHydrated(false);

    const contentBefore = fixture.debugElement.query(By.css('.template'))
      .nativeElement as HTMLElement;

    emitIntersection(widgetEl, true);
    fixture.detectChanges();

    const contentAfter = fixture.debugElement.query(By.css('.template'))
      .nativeElement as HTMLElement;

    // Same DOM node: the claimed view must be measured in place, never
    // destroyed and recreated (that would undo hydration).
    expect(contentAfter).toBe(contentBefore);
    expect(fixture.debugElement.queryAll(By.css('.template')).length).toBe(1);

    fixture.destroy();
  });
});

/**
 * The below-the-fold half of the same problem.
 *
 * On a hydrated SSR page *every* virtual view is server-rendered, not just the
 * ones in the viewport. When the visibility pipeline registers, the elements
 * below the fold are reported non-intersecting on the observer's first callback
 * and swap straight to a placeholder — without ever having been reported
 * visible, so the `visible === true` branch (and therefore any size
 * measurement hung off it) never runs for them.
 */
describe('RxVirtualView — hydration size reservation below the fold', () => {
  let restore: () => void;

  beforeEach(() => {
    restore = installObserverMocks();
  });

  afterEach(() => {
    restore();
  });

  /** Boots pre-hydration, then completes hydration, exactly as above. */
  function bootHydrated() {
    const enabled = signal(false);

    configureBrowser({
      host: SimpleHost,
      config: {
        enabled,
        placeholderStrategy: 'sync',
        contentStrategy: 'sync',
        enableAfterHydration: true,
        keepLastKnownSize: true,
      },
    });

    const fixture = TestBed.createComponent(SimpleHost);
    fixture.componentRef.setInput('keepLastKnownSize', true);
    fixture.detectChanges();

    const widgetEl = fixture.debugElement.query(By.css('.widget'))
      .nativeElement as HTMLElement;

    // Give the server-rendered content a real laid-out height, which is what
    // the browser would have after hydration.
    Object.defineProperty(widgetEl, 'offsetHeight', {
      value: 200,
      configurable: true,
    });
    Object.defineProperty(widgetEl, 'offsetWidth', {
      value: 300,
      configurable: true,
    });

    enabled.set(true);
    fixture.detectChanges();

    return { fixture, widgetEl };
  }

  it('measures mounted SSR content before it is ever reported visible', () => {
    const { fixture, widgetEl } = bootHydrated();

    // The content is mounted, so it is already observed. In a real browser the
    // resize steps run before intersection observations are delivered, so the
    // size lands first.
    emitResize(widgetEl, { inlineSize: 300, blockSize: 200 });
    fixture.detectChanges();

    expect(widgetEl.style.getPropertyValue('--rx-vw-h')).toBe('200px');

    // The element is below the fold: the IntersectionObserver's first callback
    // reports it as not intersecting. It is never reported visible first.
    emitIntersection(widgetEl, false);
    fixture.detectChanges();

    expect(widgetEl.textContent?.trim()).toBe('ze-placeholder');
    expect(widgetEl.style.minHeight).toBe('200px');

    fixture.destroy();
  });

  it('falls back to a synchronous read if it is hidden before any resize lands', () => {
    const { fixture, widgetEl } = bootHydrated();

    // No resize callback has been delivered yet — the element is mounted and
    // hidden within the same frame. Reserving the laid-out height still beats
    // collapsing to zero.
    emitIntersection(widgetEl, false);
    fixture.detectChanges();

    expect(widgetEl.textContent?.trim()).toBe('ze-placeholder');
    expect(widgetEl.style.minHeight).toBe('200px');

    fixture.destroy();
  });

  it('stops measuring while the placeholder is mounted', () => {
    const { fixture, widgetEl } = bootHydrated();

    emitResize(widgetEl, { inlineSize: 300, blockSize: 200 });
    fixture.detectChanges();
    emitIntersection(widgetEl, false);
    fixture.detectChanges();

    // The ResizeObserver watches the host, which now contains the placeholder.
    // If it were still subscribed, the placeholder's own height would be written
    // back into `size` — and with keepLastKnownSize that height is derived from
    // `size`, so it would feed back on itself.
    emitResize(widgetEl, { inlineSize: 300, blockSize: 12 });
    fixture.detectChanges();

    expect(widgetEl.style.minHeight).toBe('200px');

    fixture.destroy();
  });
});
