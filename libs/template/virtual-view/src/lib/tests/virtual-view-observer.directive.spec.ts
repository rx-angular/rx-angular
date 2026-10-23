import { Component, ElementRef, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RxVirtualView } from '../virtual-view.directive';
import { RxVirtualViewContent } from '../virtual-view-content.directive';
import { RxVirtualViewObserver } from '../virtual-view-observer.directive';
import { RxVirtualViewPlaceholder } from '../virtual-view-placeholder.directive';
import { SimpleHost } from './test-utils/host-components';
import {
  emitIntersection,
  emitResize,
  installObserverMocks,
  IntersectionObserverMock,
} from './test-utils/observer-mocks';
import { configureBrowser, configureServer } from './test-utils/testbed';

/**
 * Host that forwards a `root` input to the observer so specs can validate the
 * `root` → IntersectionObserver wiring for both `ElementRef` and `null` values.
 */
@Component({
  selector: 'rx-root-host',
  standalone: true,
  imports: [
    RxVirtualViewObserver,
    RxVirtualView,
    RxVirtualViewContent,
    RxVirtualViewPlaceholder,
  ],
  template: `
    <div class="container" rxVirtualViewObserver [root]="root()">
      <div rxVirtualView class="widget">
        <div *rxVirtualViewContent class="template">ze-template</div>
        <div *rxVirtualViewPlaceholder class="placeholder">ze-placeholder</div>
      </div>
    </div>
  `,
})
class RootHost {
  readonly root = input<ElementRef | HTMLElement | null>();
}

describe('RxVirtualViewObserver', () => {
  describe('browser platform', () => {
    let restoreObserverMocks: () => void;
    let fixture: ComponentFixture<SimpleHost>;
    let observer: RxVirtualViewObserver;

    beforeEach(() => {
      restoreObserverMocks = installObserverMocks();
      configureBrowser({ host: SimpleHost });
      fixture = TestBed.createComponent(SimpleHost);
      // Trigger ngOnInit so the IntersectionObserver is constructed.
      fixture.detectChanges();
      observer = fixture.debugElement
        .query(By.directive(RxVirtualViewObserver))
        .injector.get(RxVirtualViewObserver);
    });

    afterEach(() => {
      restoreObserverMocks();
    });

    it('emits true when the element is reported intersecting (Req 2.1)', () => {
      const el = document.createElement('div');
      const emissions: boolean[] = [];
      observer.observeElementVisibility(el).subscribe((v) => emissions.push(v));

      emitIntersection(el, true);

      expect(emissions).toEqual([true]);
    });

    it('emits false when the element is reported not intersecting (Req 2.2)', () => {
      const el = document.createElement('div');
      const emissions: boolean[] = [];
      observer.observeElementVisibility(el).subscribe((v) => emissions.push(v));

      emitIntersection(el, true);
      emitIntersection(el, false);

      expect(emissions).toEqual([true, false]);
    });

    it('emits false when hideAll is called while intersecting (Req 2.3)', () => {
      const el = document.createElement('div');
      const emissions: boolean[] = [];
      observer.observeElementVisibility(el).subscribe((v) => emissions.push(v));

      emitIntersection(el, true);
      observer.hideAll();

      expect(emissions).toEqual([true, false]);
    });

    it('restores the underlying intersection state when showAllVisible is called after hideAll (Req 2.4)', () => {
      const el = document.createElement('div');
      const emissions: boolean[] = [];
      observer.observeElementVisibility(el).subscribe((v) => emissions.push(v));

      emitIntersection(el, true);
      observer.hideAll();
      observer.showAllVisible();

      // true (intersecting) -> false (forced hidden) -> true (restored)
      expect(emissions).toEqual([true, false, true]);
    });

    it('constructs the IntersectionObserver with the ElementRef native element as root (Req 2.5)', () => {
      const rootEl = document.createElement('div');
      const rootRef = new ElementRef(rootEl);

      restoreObserverMocks();
      restoreObserverMocks = installObserverMocks();
      configureBrowser({ host: RootHost });
      const rootFixture = TestBed.createComponent(RootHost);
      rootFixture.componentRef.setInput('root', rootRef);
      rootFixture.detectChanges();

      const mock = IntersectionObserverMock.instances[0];
      expect(mock.root).toBe(rootEl);
    });

    it('constructs the IntersectionObserver with a null root when root is null (Req 2.6)', () => {
      restoreObserverMocks();
      restoreObserverMocks = installObserverMocks();
      configureBrowser({ host: RootHost });
      const rootFixture = TestBed.createComponent(RootHost);
      rootFixture.componentRef.setInput('root', null);
      rootFixture.detectChanges();

      const mock = IntersectionObserverMock.instances[0];
      expect(mock.root).toBeNull();
    });

    it('stops observing the element and removes it from the map on unsubscribe (Req 2.7)', () => {
      const el = document.createElement('div');
      const sub = observer.observeElementVisibility(el).subscribe();

      const mock = IntersectionObserverMock.instances[0];
      expect(mock.observed.has(el)).toBe(true);

      sub.unsubscribe();

      expect(mock.observed.has(el)).toBe(false);
    });

    it('returns size entries produced by RxaResizeObserver via observeElementSize (Req 2.8)', () => {
      const el = document.createElement('div');
      const entries: ResizeObserverEntry[] = [];
      observer.observeElementSize(el).subscribe((entry) => entries.push(entry));

      emitResize(el, { inlineSize: 100, blockSize: 200 });

      expect(entries).toHaveLength(1);
      expect(entries[0].borderBoxSize[0].inlineSize).toBe(100);
      expect(entries[0].borderBoxSize[0].blockSize).toBe(200);
    });

    it('disconnects the observer and clears the element map on destroy (Req 2.10)', () => {
      const el = document.createElement('div');
      observer.observeElementVisibility(el).subscribe();

      const mock = IntersectionObserverMock.instances[0];
      const disconnectSpy = jest.spyOn(mock, 'disconnect');
      expect(mock.observed.has(el)).toBe(true);

      fixture.destroy();

      expect(disconnectSpy).toHaveBeenCalled();
      // disconnect clears the mock's observed set; the directive also clears its
      // internal element map so no further emissions are routed to `el`.
      expect(mock.observed.has(el)).toBe(false);
    });
  });

  describe('server platform', () => {
    let restoreObserverMocks: () => void;
    let fixture: ComponentFixture<SimpleHost>;
    let observer: RxVirtualViewObserver;

    beforeEach(() => {
      restoreObserverMocks = installObserverMocks();
      // Separate server-platform configuration (Req 2.11): the server behavior
      // is exercised through its own TestBed built by `configureServer`, which
      // sets `PLATFORM_ID: 'server'` and overrides the `PLATFORM` token to the
      // server value — never toggled inside the browser-platform module above.
      configureServer({ host: SimpleHost });
      fixture = TestBed.createComponent(SimpleHost);
      // Trigger ngOnInit; on the server platform this must NOT construct an
      // IntersectionObserver (the directive guards creation with `isBrowser`).
      fixture.detectChanges();
      observer = fixture.debugElement
        .query(By.directive(RxVirtualViewObserver))
        .injector.get(RxVirtualViewObserver);
    });

    afterEach(() => {
      restoreObserverMocks();
    });

    it('emits true for every observed element regardless of intersection state (Req 2.9)', () => {
      const el = document.createElement('div');
      const emissions: boolean[] = [];
      observer.observeElementVisibility(el).subscribe((v) => emissions.push(v));

      // On the server the visibility stream is a synchronous `of(true)`, so the
      // emission arrives immediately without any intersection input.
      expect(emissions).toEqual([true]);

      const otherEl = document.createElement('div');
      const otherEmissions: boolean[] = [];
      observer
        .observeElementVisibility(otherEl)
        .subscribe((v) => otherEmissions.push(v));

      expect(otherEmissions).toEqual([true]);
    });

    it('does not construct an IntersectionObserver on the server (Req 2.9)', () => {
      // ngOnInit ran in beforeEach; the browser-only guard means no observer
      // instance should have been created.
      expect(IntersectionObserverMock.instances).toHaveLength(0);

      // Observing an element must also not lazily create one on the server.
      observer
        .observeElementVisibility(document.createElement('div'))
        .subscribe();

      expect(IntersectionObserverMock.instances).toHaveLength(0);
    });
  });
});
