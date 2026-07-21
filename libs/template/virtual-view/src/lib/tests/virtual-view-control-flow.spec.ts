import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RxVirtualView } from '../virtual-view.directive';
import { VirtualViewCache } from '../virtual-view-cache';
import { RxVirtualViewObserver } from '../virtual-view-observer.directive';
import { ForHost, IfHost, SwitchHost } from './test-utils/host-components';
import {
  emitIntersection,
  installObserverMocks,
} from './test-utils/observer-mocks';
import { configureBrowser } from './test-utils/testbed';

/**
 * R6 — Control-flow interaction coverage for `RxVirtualView`.
 *
 * These examples verify that content/placeholder pairs behind `@if`, `@for`,
 * and `@switch` blocks behave correctly. Each `rxVirtualView` element is
 * observed through the shared, target-routed `IntersectionObserver` mock, so
 * `emitIntersection(element, isIntersecting)` drives per-element visibility
 * independently (essential for the `@for` scenario where every list item has
 * its own visibility state).
 *
 * The synchronous render strategy (default in `configureBrowser`) makes
 * content/placeholder rendering deterministic within a single tick, so no
 * `fakeAsync`/timers are needed.
 */
describe('RxVirtualView control-flow interactions (R6)', () => {
  let restoreObservers: () => void;

  beforeEach(() => {
    restoreObservers = installObserverMocks();
  });

  afterEach(() => {
    restoreObservers();
  });

  /* ---------------------------------------------------------------------- */
  /*  @if activation (R6.1)                                                 */
  /* ---------------------------------------------------------------------- */

  it('renders content once the @if block becomes active and the element is visible (R6.1)', () => {
    configureBrowser({ host: IfHost });
    const fixture: ComponentFixture<IfHost> = TestBed.createComponent(IfHost);

    // Start with the @if inactive: the rxVirtualView does not exist yet.
    fixture.componentInstance.show.set(false);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.widget'))).toBeNull();

    // Activate the branch: the rxVirtualView is created and starts observing.
    fixture.componentInstance.show.set(true);
    fixture.detectChanges();

    const widget = fixture.debugElement.query(By.css('.widget'));
    expect(widget).not.toBeNull();

    // Nothing is rendered until the element becomes visible.
    emitIntersection(widget.nativeElement, true);

    expect(widget.nativeElement.textContent.trim()).toBe('ze-template');
  });

  /* ---------------------------------------------------------------------- */
  /*  @for per-item content / placeholder (R6.2)                            */
  /* ---------------------------------------------------------------------- */

  it('renders each @for item content when visible and its placeholder when not (R6.2)', () => {
    configureBrowser({ host: ForHost });
    const fixture: ComponentFixture<ForHost> = TestBed.createComponent(ForHost);
    fixture.detectChanges();

    const items = fixture.componentInstance.items();
    const widgetsById = new Map<string, HTMLElement>();
    for (const el of fixture.debugElement.queryAll(By.css('.widget'))) {
      const native = el.nativeElement as HTMLElement;
      widgetsById.set(native.getAttribute('data-id')!, native);
    }
    expect(widgetsById.size).toBe(items.length);

    // Drive each element's visibility independently: item 1 visible, item 2
    // not visible, item 3 visible.
    const first = widgetsById.get(String(items[0].id))!;
    const second = widgetsById.get(String(items[1].id))!;
    const third = widgetsById.get(String(items[2].id))!;

    emitIntersection(first, true);
    emitIntersection(second, false);
    emitIntersection(third, true);

    // Visible items render their own content (the item label).
    expect(first.textContent.trim()).toBe(items[0].label);
    expect(third.textContent.trim()).toBe(items[2].label);

    // The non-visible item renders its placeholder (empty text) instead of
    // its label, and exposes the placeholder element.
    expect(second.textContent.trim()).not.toContain(items[1].label);
    expect(second.querySelector('.placeholder')).not.toBeNull();
    expect(second.querySelector('.template')).toBeNull();

    // Flipping the middle item to visible swaps in its content.
    emitIntersection(second, true);
    expect(second.textContent.trim()).toBe(items[1].label);
  });

  /* ---------------------------------------------------------------------- */
  /*  @for item removal clears the cache (R6.3)                             */
  /* ---------------------------------------------------------------------- */

  it('destroys the RxVirtualView and clears its cached views when a @for item is removed (R6.3)', () => {
    configureBrowser({ host: ForHost });
    const fixture: ComponentFixture<ForHost> = TestBed.createComponent(ForHost);
    fixture.detectChanges();

    // The cache is provided by the RxVirtualViewObserver directive.
    const cache = fixture.debugElement
      .query(By.directive(RxVirtualViewObserver))
      .injector.get(VirtualViewCache);
    const clearSpy = jest.spyOn(cache, 'clear');

    // Capture the directive instance for the item we are about to remove so
    // we can assert clear is called with its key.
    const initialItems = fixture.componentInstance.items();
    const removedId = initialItems[0].id;
    const removedWidget = fixture.debugElement
      .queryAll(By.css('.widget'))
      .find(
        (el) =>
          (el.nativeElement as HTMLElement).getAttribute('data-id') ===
          String(removedId),
      )!;
    const removedDirective = removedWidget.injector.get(RxVirtualView);

    // Render some content so there is something cached for the element.
    emitIntersection(removedWidget.nativeElement, true);

    // Remove the first item.
    fixture.componentInstance.items.set(
      initialItems.filter((item) => item.id !== removedId),
    );
    fixture.detectChanges();

    // The corresponding RxVirtualView is destroyed and its cached content /
    // placeholder are cleared via `#viewCache?.clear(this)` in ngOnDestroy.
    expect(clearSpy).toHaveBeenCalledWith(removedDirective);

    // The removed widget is gone from the DOM.
    const remaining = fixture.debugElement
      .queryAll(By.css('.widget'))
      .map((el) => (el.nativeElement as HTMLElement).getAttribute('data-id'));
    expect(remaining).not.toContain(String(removedId));
  });

  /* ---------------------------------------------------------------------- */
  /*  @switch case selection (R6.4)                                         */
  /* ---------------------------------------------------------------------- */

  it('renders the content for the active @switch case when visible (R6.4)', () => {
    configureBrowser({ host: SwitchHost });
    const fixture: ComponentFixture<SwitchHost> =
      TestBed.createComponent(SwitchHost);
    fixture.componentRef.setInput('kind', 'a');
    fixture.detectChanges();

    const widget = fixture.debugElement.query(By.css('.widget'));
    emitIntersection(widget.nativeElement, true);

    expect(widget.nativeElement.textContent.trim()).toBe('content-a');
  });

  /* ---------------------------------------------------------------------- */
  /*  @switch case change (R6.5)                                            */
  /* ---------------------------------------------------------------------- */

  it('uses the content for the newly active case when the @switch changes (R6.5)', () => {
    configureBrowser({ host: SwitchHost });
    const fixture: ComponentFixture<SwitchHost> =
      TestBed.createComponent(SwitchHost);
    fixture.componentRef.setInput('kind', 'a');
    fixture.detectChanges();

    const widget = fixture.debugElement.query(By.css('.widget'));
    emitIntersection(widget.nativeElement, true);
    expect(widget.nativeElement.textContent.trim()).toBe('content-a');

    // Switch to case 'b'. The previously active case's views are torn down and
    // the new case registers its own content/placeholder pair.
    fixture.componentRef.setInput('kind', 'b');
    fixture.detectChanges();

    // Toggle visibility so the directive re-renders for the newly active case:
    // hidden -> the new case's placeholder is used, visible -> its content.
    emitIntersection(widget.nativeElement, false);
    expect(widget.nativeElement.textContent.trim()).toBe('placeholder-b');

    emitIntersection(widget.nativeElement, true);
    expect(widget.nativeElement.textContent.trim()).toBe('content-b');
  });

  /* ---------------------------------------------------------------------- */
  /*  @switch case change on an ALREADY-VISIBLE, mounted card (R6.5)         */
  /*  Regression: a runtime content-template swap must render the new        */
  /*  content immediately, without needing a visibility toggle.             */
  /* ---------------------------------------------------------------------- */

  it('renders the new case content immediately when the @switch changes on an already-visible card (R6.5 regression)', () => {
    configureBrowser({ host: SwitchHost });
    const fixture: ComponentFixture<SwitchHost> =
      TestBed.createComponent(SwitchHost);
    fixture.componentRef.setInput('kind', 'a');
    fixture.detectChanges();

    const widget = fixture.debugElement.query(By.css('.widget'));
    // The card is visible and its content is rendered.
    emitIntersection(widget.nativeElement, true);
    expect(widget.nativeElement.textContent.trim()).toBe('content-a');

    // The active @case changes while the host element stays mounted AND
    // visible (e.g. a sports tile's marketType fallback firing). Angular
    // destroys the old *rxVirtualViewContent and instantiates the new one,
    // which re-registers content on the same RxVirtualView.
    fixture.componentRef.setInput('kind', 'b');
    fixture.detectChanges();

    // The new case's content must appear without any visibility transition.
    // Before the fix this left the card blank because the visibility pipeline
    // only reacts to visibility changes and NEVER re-renders once shown.
    expect(widget.nativeElement.textContent.trim()).toBe('content-b');
  });

  /* ---------------------------------------------------------------------- */
  /*  Deferred setup behind an inactive branch (R6.6)                       */
  /* ---------------------------------------------------------------------- */

  it('sets up an RxVirtualView behind an inactive branch without error and defers rendering (R6.6)', () => {
    configureBrowser({ host: IfHost });
    const fixture: ComponentFixture<IfHost> = TestBed.createComponent(IfHost);

    // Branch inactive: setup must not throw and nothing is rendered yet.
    fixture.componentInstance.show.set(false);
    expect(() => fixture.detectChanges()).not.toThrow();
    expect(fixture.debugElement.query(By.css('.widget'))).toBeNull();

    // Activating the branch sets up the directive and renders on visibility.
    fixture.componentInstance.show.set(true);
    expect(() => fixture.detectChanges()).not.toThrow();

    const widget = fixture.debugElement.query(By.css('.widget'));
    expect(widget).not.toBeNull();
    // Rendering is deferred until the element becomes visible.
    emitIntersection(widget.nativeElement, true);
    expect(widget.nativeElement.textContent.trim()).toBe('ze-template');
  });
});
