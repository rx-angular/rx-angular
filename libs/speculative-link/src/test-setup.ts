// @ts-expect-error https://thymikee.github.io/jest-preset-angular/docs/getting-started/test-environment
globalThis.ngJest = {
  testEnvironmentOptions: {
    errorOnUnknownElements: true,
    errorOnUnknownProperties: true,
  },
};

import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv();

class IntersectionObserverMock implements IntersectionObserver {
  private callback: IntersectionObserverCallback;
  private options?: IntersectionObserverInit;
  private elements: Element[] = [];

  public root: Element | Document | null = null;
  public rootMargin = '0px';
  public thresholds: ReadonlyArray<number> = [0];

  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit,
  ) {
    this.callback = callback;
    this.options = options;
    this.root = options?.root || null;
    this.rootMargin = options?.rootMargin || '0px';
    this.thresholds = Array.isArray(options?.threshold)
      ? options.threshold
      : [options?.threshold || 0];
  }

  observe(element: Element): void {
    this.elements.push(element);
    // // Simulate an intersection
    // this.callback(
    //   [
    //     {
    //       target: element,
    //       isIntersecting: true,
    //       intersectionRatio: 1,
    //       boundingClientRect: element.getBoundingClientRect(),
    //       intersectionRect: element.getBoundingClientRect(),
    //       rootBounds: null,
    //       time: performance.now(),
    //     } as IntersectionObserverEntry,
    //   ],
    //   this
    // );
  }

  unobserve(element: Element): void {
    this.elements = this.elements.filter((el) => el !== element);
  }

  disconnect(): void {
    this.elements = [];
  }

  takeRecords(): IntersectionObserverEntry[] {
    return this.elements.map((element) => ({
      target: element,
      isIntersecting: true,
      intersectionRatio: 1,
      boundingClientRect: element.getBoundingClientRect(),
      intersectionRect: element.getBoundingClientRect(),
      rootBounds: null,
      time: performance.now(),
    }));
  }
}

// Assign the mock to the global window object
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});
