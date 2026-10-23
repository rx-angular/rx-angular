/**
 * Shared, swappable `IntersectionObserver` / `ResizeObserver` mocks for the
 * Virtual View test suite.
 *
 * The Virtual View library observes many elements through a single observer
 * instance, so a single static callback is insufficient for multi-element
 * control-flow scenarios (e.g. an `@for` of `rxVirtualView` elements). These
 * mocks therefore keep an **instance registry** and route manual emissions by
 * `target`, while retaining a `static cb` for backward compatibility with the
 * simple single-element pattern used in `virtual-view.directive.spec.ts`.
 */

/**
 * Mock replacement for the global `IntersectionObserver`.
 *
 * Tracks every constructed instance on {@link IntersectionObserverMock.instances}
 * and the set of currently observed elements per instance so that
 * {@link emitIntersection} can route an emission to exactly the observers
 * watching a given target.
 */
export class IntersectionObserverMock implements IntersectionObserver {
  /** Registry of all live mock instances (cleared by `installObserverMocks`). */
  static instances: IntersectionObserverMock[] = [];

  /** Last-created callback, for back-compat with simple single-element tests. */
  static cb: (entries: IntersectionObserverEntry[]) => void;

  readonly root: Element | Document | null = null;
  readonly rootMargin: string = '0px';
  readonly thresholds: ReadonlyArray<number> = [];

  /** Elements currently observed by this instance. */
  readonly observed = new Set<Element>();

  constructor(
    public cb: (entries: IntersectionObserverEntry[]) => void,
    init?: IntersectionObserverInit,
  ) {
    this.root = (init?.root as Element | Document | null) ?? null;
    this.rootMargin = init?.rootMargin ?? '0px';
    IntersectionObserverMock.cb = cb;
    IntersectionObserverMock.instances.push(this);
  }

  observe(element: Element): void {
    this.observed.add(element);
  }

  unobserve(element: Element): void {
    this.observed.delete(element);
  }

  disconnect(): void {
    this.observed.clear();
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

/**
 * Mock replacement for the global `ResizeObserver`.
 *
 * Symmetric to {@link IntersectionObserverMock}: keeps an instance registry and
 * a per-instance `observed` set so {@link emitResize} can route size emissions
 * by target.
 */
export class ResizeObserverMock implements ResizeObserver {
  /** Registry of all live mock instances (cleared by `installObserverMocks`). */
  static instances: ResizeObserverMock[] = [];

  /** Last-created callback, for back-compat with simple single-element tests. */
  static cb: (entries: ResizeObserverEntry[]) => void;

  /** Elements currently observed by this instance. */
  readonly observed = new Set<Element>();

  constructor(public cb: (entries: ResizeObserverEntry[]) => void) {
    ResizeObserverMock.cb = cb;
    ResizeObserverMock.instances.push(this);
  }

  observe(element: Element, options?: ResizeObserverOptions): void {
    this.observed.add(element);
  }

  unobserve(element: Element): void {
    this.observed.delete(element);
  }

  disconnect(): void {
    this.observed.clear();
  }
}

/**
 * Emit an intersection state for a specific element across all live mock
 * instances whose `observed` set contains `target`.
 *
 * Builds a minimal `IntersectionObserverEntry` (`{ target, isIntersecting }`),
 * which is how each `rxVirtualView` element in an `@for` gets its own
 * independent visibility state.
 */
export function emitIntersection(
  target: Element,
  isIntersecting: boolean,
): void {
  const entry = { target, isIntersecting } as IntersectionObserverEntry;
  for (const instance of IntersectionObserverMock.instances) {
    if (instance.observed.has(target)) {
      instance.cb([entry]);
    }
  }
}

/**
 * Emit a border-box size for a specific element across all live mock instances
 * whose `observed` set contains `target`.
 *
 * Builds an entry with `borderBoxSize: [{ inlineSize, blockSize }]` matching the
 * library's `defaultExtractSize`, which reads
 * `entry.borderBoxSize[0].inlineSize` / `.blockSize`.
 */
export function emitResize(
  target: Element,
  size: { inlineSize: number; blockSize: number },
): void {
  const entry = {
    target,
    borderBoxSize: [{ inlineSize: size.inlineSize, blockSize: size.blockSize }],
  } as unknown as ResizeObserverEntry;
  for (const instance of ResizeObserverMock.instances) {
    if (instance.observed.has(target)) {
      instance.cb([entry]);
    }
  }
}

/**
 * Swap `window.IntersectionObserver` and `window.ResizeObserver` with the mocks
 * (also clearing the instance registries) and return a restore function that
 * reinstates the originals.
 *
 * Call in `beforeEach` and invoke the returned function in `afterEach` to avoid
 * cross-test leakage under the shared, `bail: true` `template` suite.
 */
export function installObserverMocks(): () => void {
  const origIntersectionObserver = window.IntersectionObserver;
  const origResizeObserver = window.ResizeObserver;

  IntersectionObserverMock.instances = [];
  ResizeObserverMock.instances = [];

  window.IntersectionObserver =
    IntersectionObserverMock as unknown as typeof IntersectionObserver;
  window.ResizeObserver =
    ResizeObserverMock as unknown as typeof ResizeObserver;

  return () => {
    window.IntersectionObserver = origIntersectionObserver;
    window.ResizeObserver = origResizeObserver;
  };
}
