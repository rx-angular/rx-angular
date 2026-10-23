import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RxVirtualView } from '../virtual-view.directive';
import { RxVirtualViewContent } from '../virtual-view-content.directive';
import { RxVirtualViewObserver } from '../virtual-view-observer.directive';
import { RxVirtualViewPlaceholder } from '../virtual-view-placeholder.directive';
import {
  NoObserverHost,
  SimpleHost,
  SwitchHost,
} from './test-utils/host-components';
import {
  emitIntersection,
  installObserverMocks,
} from './test-utils/observer-mocks';
import { configureBrowser } from './test-utils/testbed';

/**
 * R9 — SSR and hydration disabled-state coverage.
 *
 * These examples exercise the disabled (server / pre-hydration) path of
 * `RxVirtualView`: synchronous content rendering while `enabled: false`, the
 * absence of every layout-affecting host style in that state, safety when no
 * `RxVirtualViewObserver` ancestor is present, the `enabled` false→true
 * re-registration governed by `enableAfterHydration`, and deferred content
 * that lives behind an inactive control-flow branch.
 *
 * All specs run synchronously (`placeholderStrategy: 'sync'`,
 * `contentStrategy: 'sync'`) and restore the swapped global observers in
 * `afterEach` so the shared, `bail: true` `template` suite stays deterministic.
 */

/**
 * Host whose `*rxVirtualViewContent` lives inside an `@if` branch that is
 * initially inactive. Used for R9.6: while disabled, the directive must defer
 * setup without error and render the content once the branch activates and the
 * content template registers.
 */
@Component({
  selector: 'rx-deferred-content-host',
  standalone: true,
  imports: [
    RxVirtualViewObserver,
    RxVirtualView,
    RxVirtualViewContent,
    RxVirtualViewPlaceholder,
  ],
  template: `
    <div class="container" rxVirtualViewObserver [root]="null">
      <div rxVirtualView #vv="rxVirtualView" class="widget">
        @if (branchActive()) {
          <div *rxVirtualViewContent class="template">deferred-content</div>
        }
        <div *rxVirtualViewPlaceholder class="placeholder">ze-placeholder</div>
      </div>
    </div>
  `,
})
class DeferredContentHost {
  readonly branchActive = signal(false);
}

describe('RxVirtualView SSR / hydration disabled state (R9)', () => {
  let restoreObservers: () => void;

  beforeEach(() => {
    restoreObservers = installObserverMocks();
  });

  afterEach(() => {
    restoreObservers();
  });

  /* ---------------------------------------------------------------------- */
  /*  R9.1 — synchronous content rendering while disabled                    */
  /* ---------------------------------------------------------------------- */

  describe('while enabled is false (R9.1)', () => {
    let fixture: ComponentFixture<SimpleHost>;

    beforeEach(() => {
      configureBrowser({
        host: SimpleHost,
        config: {
          enabled: false,
          placeholderStrategy: 'sync',
          contentStrategy: 'sync',
        },
      });
      fixture = TestBed.createComponent(SimpleHost);
    });

    it('renders content synchronously without requiring an IntersectionObserver', () => {
      fixture.detectChanges();

      const view = fixture.debugElement.query(By.css('.widget')).nativeElement;
      // Content is shown on the first change-detection pass; no observer
      // callback (emitIntersection) is needed to reveal it.
      expect(view.textContent.trim()).toBe('ze-template');
    });
  });

  /* ---------------------------------------------------------------------- */
  /*  R9.2 — no layout-affecting styles while disabled                       */
  /* ---------------------------------------------------------------------- */

  describe('layout styles while enabled is false (R9.2)', () => {
    let fixture: ComponentFixture<SimpleHost>;

    beforeEach(() => {
      configureBrowser({
        host: SimpleHost,
        config: {
          enabled: false,
          placeholderStrategy: 'sync',
          contentStrategy: 'sync',
          // keepLastKnownSize on to prove min-* is still suppressed by disabled.
          keepLastKnownSize: true,
          // NOTE: `useContentVisibility` is left at its default (false). The
          // `content-visibility` host binding is `useContentVisibility() ? "auto"
          // : null` and — unlike width/height/containment/intrinsic — does NOT
          // gate on `enabled`. Keeping it false guarantees no `content-visibility`
          // style is applied, satisfying R9.2 for the disabled state.
        },
      });
      fixture = TestBed.createComponent(SimpleHost);
    });

    it('applies none of the enabled-gated layout styles (width/height/containment/min/intrinsic)', () => {
      fixture.detectChanges();

      const debugEl = fixture.debugElement.query(By.css('.widget'));
      const directive = debugEl.injector.get(RxVirtualView);

      // Even with a known size, the directive reports null for every
      // enabled-gated computed while disabled.
      directive.size.set({ width: 100, height: 200 });
      fixture.detectChanges();

      expect(directive.width()).toBeNull();
      expect(directive.height()).toBeNull();
      expect(directive.containment()).toBeNull();
      expect(directive.minWidth()).toBeNull();
      expect(directive.minHeight()).toBeNull();
      expect(directive.intrinsicWidth()).toBeNull();
      expect(directive.intrinsicHeight()).toBeNull();
    });

    it('leaves every layout-affecting host style prop empty', () => {
      fixture.detectChanges();

      const view = fixture.debugElement.query(By.css('.widget')).nativeElement;
      directiveSetSize(fixture);

      const style = view.style as CSSStyleDeclaration;
      expect(style.getPropertyValue('--rx-vw-w')).toBe('');
      expect(style.getPropertyValue('--rx-vw-h')).toBe('');
      expect(style.minWidth).toBe('');
      expect(style.minHeight).toBe('');
      expect(style.contain).toBe('');
      expect(style.getPropertyValue('contain-intrinsic-width')).toBe('');
      expect(style.getPropertyValue('contain-intrinsic-height')).toBe('');
      // content-visibility stays unset because useContentVisibility is false.
      expect(style.getPropertyValue('content-visibility')).toBe('');
    });
  });

  /* ---------------------------------------------------------------------- */
  /*  R9.3 — no observer ancestor, disabled → renders without throwing       */
  /* ---------------------------------------------------------------------- */

  describe('no observer ancestor while enabled is false (R9.3)', () => {
    let fixture: ComponentFixture<NoObserverHost>;

    beforeEach(() => {
      configureBrowser({
        host: NoObserverHost,
        config: {
          enabled: false,
          placeholderStrategy: 'sync',
          contentStrategy: 'sync',
        },
      });
      fixture = TestBed.createComponent(NoObserverHost);
    });

    it('renders content without raising the missing-observer error', () => {
      // The directive throws "expects a RxVirtualViewObserver" only when
      // enabled && isBrowser; disabled must not throw despite no ancestor.
      expect(() => fixture.detectChanges()).not.toThrow();

      const view = fixture.debugElement.query(
        By.css('.widget-no-observer'),
      ).nativeElement;
      expect(view.textContent.trim()).toBe('ze-template');
    });
  });

  /* ---------------------------------------------------------------------- */
  /*  R9.4 — false→true re-registers visibility rendering (enableAfterHydration) */
  /* ---------------------------------------------------------------------- */

  describe('enabled false→true with enableAfterHydration true (R9.4)', () => {
    it('registers visibility-based rendering after enabled becomes true', () => {
      const enabled = signal(false);
      configureBrowser({
        host: SimpleHost,
        config: {
          enabled,
          placeholderStrategy: 'sync',
          contentStrategy: 'sync',
          enableAfterHydration: true,
        },
      });
      const fixture = TestBed.createComponent(SimpleHost);
      fixture.detectChanges();

      const view = fixture.debugElement.query(By.css('.widget')).nativeElement;
      // Disabled: content rendered synchronously.
      expect(view.textContent.trim()).toBe('ze-template');

      // Hydration completes → enabled flips true → the after-hydration effect
      // registers visibility-based rendering.
      enabled.set(true);
      fixture.detectChanges();

      // Now visibility drives rendering: reporting not-intersecting swaps to
      // the placeholder, proving the visibility listener is active.
      emitIntersection(view, false);
      fixture.detectChanges();
      expect(view.textContent.trim()).toBe('ze-placeholder');
    });
  });

  /* ---------------------------------------------------------------------- */
  /*  R9.5 — false→true with enableAfterHydration false does NOT register     */
  /* ---------------------------------------------------------------------- */

  describe('enabled false→true with enableAfterHydration false (R9.5)', () => {
    it('does not register visibility-based rendering after enabled becomes true', () => {
      const enabled = signal(false);
      configureBrowser({
        host: SimpleHost,
        config: {
          enabled,
          placeholderStrategy: 'sync',
          contentStrategy: 'sync',
          enableAfterHydration: false,
        },
      });
      const fixture = TestBed.createComponent(SimpleHost);
      fixture.detectChanges();

      const view = fixture.debugElement.query(By.css('.widget')).nativeElement;
      expect(view.textContent.trim()).toBe('ze-template');

      enabled.set(true);
      fixture.detectChanges();

      // No visibility listener was registered, so intersection changes have no
      // effect: content stays rendered instead of swapping to the placeholder.
      emitIntersection(view, false);
      fixture.detectChanges();
      expect(view.textContent.trim()).toBe('ze-template');
    });
  });

  /* ---------------------------------------------------------------------- */
  /*  R9.6 — deferred content behind an inactive branch renders when active   */
  /* ---------------------------------------------------------------------- */

  describe('deferred content behind an inactive branch while disabled (R9.6)', () => {
    let fixture: ComponentFixture<DeferredContentHost>;

    beforeEach(() => {
      configureBrowser({
        host: DeferredContentHost,
        config: {
          enabled: false,
          placeholderStrategy: 'sync',
          contentStrategy: 'sync',
        },
      });
      fixture = TestBed.createComponent(DeferredContentHost);
    });

    it('defers setup without error and renders content once the branch activates', () => {
      // At init the content template is behind an inactive @if branch, so the
      // directive registers an effect to wait for it instead of throwing.
      expect(() => fixture.detectChanges()).not.toThrow();

      const view = fixture.debugElement.query(By.css('.widget')).nativeElement;
      expect(view.textContent.trim()).not.toContain('deferred-content');

      // Activating the branch registers the content template; the deferred
      // effect fires and renders it synchronously while still disabled.
      fixture.componentInstance.branchActive.set(true);
      fixture.detectChanges();

      expect(view.textContent.trim()).toContain('deferred-content');
    });
  });

  /* ---------------------------------------------------------------------- */
  /*  R9 regression — runtime content swap while disabled re-renders          */
  /*  The disabled/SSR path must keep the shown content in sync with a        */
  /*  changing @switch/@if case, not just render the first one.              */
  /* ---------------------------------------------------------------------- */

  describe('runtime content swap while disabled (R9 regression)', () => {
    it('re-renders the newly active @case content on a swap while disabled', () => {
      configureBrowser({
        host: SwitchHost,
        config: {
          enabled: false,
          placeholderStrategy: 'sync',
          contentStrategy: 'sync',
        },
      });
      const fixture = TestBed.createComponent(SwitchHost);
      fixture.componentRef.setInput('kind', 'a');
      fixture.detectChanges();

      const view = fixture.debugElement.query(By.css('.widget')).nativeElement;
      // Disabled: the first case content renders synchronously.
      expect(view.textContent.trim()).toBe('content-a');

      // The active case changes while disabled (server / pre-hydration). The
      // one-shot render in the original directive stopped listening after the
      // first content, leaving the card blank on a swap.
      fixture.componentRef.setInput('kind', 'b');
      fixture.detectChanges();

      expect(view.textContent.trim()).toBe('content-b');
    });
  });
});

/**
 * Sets a non-zero size on the widget's `RxVirtualView` so style assertions
 * prove the disabled state suppresses reservation styles even when a size is
 * known.
 */
function directiveSetSize(fixture: ComponentFixture<SimpleHost>): void {
  const directive = fixture.debugElement
    .query(By.css('.widget'))
    .injector.get(RxVirtualView);
  directive.size.set({ width: 100, height: 200 });
  fixture.detectChanges();
}
