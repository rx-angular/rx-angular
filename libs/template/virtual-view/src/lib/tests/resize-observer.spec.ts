import { Component, inject, PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PLATFORM } from '@rx-angular/cdk/ssr';
import { RxaResizeObserver } from '../resize-observer';
import {
  emitResize,
  installObserverMocks,
  ResizeObserverMock,
} from './test-utils/observer-mocks';

/**
 * Unit coverage for {@link RxaResizeObserver} (Requirement 4).
 *
 * `RxaResizeObserver` is `@Injectable()` (not root-provided), so each block
 * provides it directly in a TestBed and injects it. Browser blocks install the
 * swappable `ResizeObserver` mock first via {@link installObserverMocks} and
 * drive size emissions through {@link emitResize} / the mock instance callback.
 */
describe('RxaResizeObserver', () => {
  let restoreObserverMocks: () => void;

  beforeEach(() => {
    restoreObserverMocks = installObserverMocks();
  });

  afterEach(() => {
    restoreObserverMocks();
    TestBed.resetTestingModule();
  });

  describe('browser platform', () => {
    let service: RxaResizeObserver;

    beforeEach(() => {
      TestBed.configureTestingModule({ providers: [RxaResizeObserver] });
      service = TestBed.inject(RxaResizeObserver);
    });

    it('emits the reported size entry for the observed element (Req 4.1)', () => {
      const el = document.createElement('div');
      const emissions: ResizeObserverEntry[] = [];

      service.observeElement(el).subscribe((entry) => emissions.push(entry));

      emitResize(el, { inlineSize: 100, blockSize: 50 });

      expect(emissions).toHaveLength(1);
      expect(emissions[0].borderBoxSize[0]).toEqual({
        inlineSize: 100,
        blockSize: 50,
      });
    });

    it('emits identical consecutive entries only once (distinctUntilChanged) (Req 4.2)', () => {
      const el = document.createElement('div');
      const emissions: ResizeObserverEntry[] = [];

      service.observeElement(el).subscribe((entry) => emissions.push(entry));

      // The service pipes `distinctUntilChanged()` (reference equality by
      // default) on its ReplaySubject. Push the SAME entry object reference
      // twice through the observer callback so the second emission collapses.
      const instance = ResizeObserverMock.instances[0];
      const entry = {
        target: el,
        borderBoxSize: [{ inlineSize: 10, blockSize: 20 }],
      } as unknown as ResizeObserverEntry;

      instance.cb([entry]);
      instance.cb([entry]);

      expect(emissions).toHaveLength(1);
    });

    it('stops observing and removes the element on unsubscribe (Req 4.3)', () => {
      const el = document.createElement('div');

      const subscription = service.observeElement(el).subscribe();
      const instance = ResizeObserverMock.instances[0];

      expect(instance.observed.has(el)).toBe(true);

      subscription.unsubscribe();

      // `finalize` calls `unobserve(el)`, which removes the element from the
      // mock's `observed` set (and from the service's internal element map).
      expect(instance.observed.has(el)).toBe(false);
    });
  });

  describe('server platform', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          RxaResizeObserver,
          { provide: PLATFORM_ID, useValue: 'server' },
          {
            provide: PLATFORM,
            useValue: {
              isServer: true,
              isBrowser: false,
              isServerRendered: false,
            },
          },
        ],
      });
    });

    it('returns an empty observable and constructs no ResizeObserver (Req 4.4)', () => {
      const service = TestBed.inject(RxaResizeObserver);
      const el = document.createElement('div');

      let emitted = false;
      let completed = false;
      service.observeElement(el).subscribe({
        next: () => (emitted = true),
        complete: () => (completed = true),
      });

      // EMPTY completes immediately without emitting.
      expect(emitted).toBe(false);
      expect(completed).toBe(true);
      // No ResizeObserver is created during initialization or observation.
      expect(ResizeObserverMock.instances).toHaveLength(0);
    });
  });

  describe('injector destroy', () => {
    it('disconnects the ResizeObserver and clears the element map (Req 4.5)', () => {
      TestBed.configureTestingModule({ imports: [ResizeObserverHost] });
      const fixture = TestBed.createComponent(ResizeObserverHost);
      const service = fixture.componentInstance.observer;

      const el = document.createElement('div');
      service.observeElement(el).subscribe();

      const instance = ResizeObserverMock.instances[0];
      const disconnectSpy = jest.spyOn(instance, 'disconnect');

      expect(instance.observed.has(el)).toBe(true);

      // Destroying the owning component triggers `DestroyRef.onDestroy`.
      fixture.destroy();

      expect(disconnectSpy).toHaveBeenCalledTimes(1);
      expect(instance.observed.size).toBe(0);
    });
  });
});

/**
 * Standalone host that provides {@link RxaResizeObserver} in its element
 * injector so destroying the component fixture triggers the service's
 * `DestroyRef.onDestroy` teardown.
 */
@Component({
  standalone: true,
  template: '',
  providers: [RxaResizeObserver],
})
class ResizeObserverHost {
  readonly observer = inject(RxaResizeObserver);
}
