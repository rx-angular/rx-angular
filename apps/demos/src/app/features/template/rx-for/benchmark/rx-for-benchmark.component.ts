import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { RxStrategyNames } from '@rx-angular/cdk/render-strategies';
import {
  provideExperimentalRxForReconciliation,
  provideLegacyRxForReconciliation,
  RxFor,
} from '@rx-angular/template/for';
import { filter, firstValueFrom, Subject } from 'rxjs';

/**
 * Deterministic rxFor reconciliation benchmark, see `rx-for-benchmark.md`.
 * Configured through query params, driven through `window.__rxForBench`.
 */
const params = new URLSearchParams(location.search);
const ITEMS = Number(params.get('items') ?? 1000);
const STRATEGY = (params.get('strategy') ?? 'normal') as RxStrategyNames;
const TEMPLATE = params.get('template') ?? 'plain';
const RECONCILER = params.get('reconciler') ?? 'new';

interface Item {
  id: number;
  label: string;
}

function seeded(seed: number) {
  return (n: number) => {
    seed = (seed * 16807) % 2147483647;
    return Math.floor((seed / 2147483647) * n);
  };
}

const item = (id: number): Item => ({ id, label: `item ${id}` });
const range = (n: number, offset = 0) =>
  Array.from({ length: n }, (_, i) => item(i + offset));

function shuffle<T>(arr: T[], rnd: (n: number) => number): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = rnd(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function relocate<T>(arr: T[], count: number, rnd: (n: number) => number) {
  const a = arr.slice();
  for (let k = 0; k < count; k++) {
    a.splice(rnd(a.length), 0, ...a.splice(rnd(a.length), 1));
  }
  return a;
}

interface Scenario {
  /** the rendered list before the measured change */
  base?: (items: Item[], rnd: (n: number) => number) => Item[];
  next: (items: Item[], rnd: (n: number) => number) => Item[];
}

const SCENARIOS: Record<string, Scenario> = {
  append: { next: (a) => [...a, item(1e6)] },
  prepend: { next: (a) => [item(1e6), ...a] },
  insertMiddle: {
    next: (a) => {
      const m = a.length >> 1;
      return [...a.slice(0, m), item(1e6), ...a.slice(m)];
    },
  },
  removeFirst: { next: (a) => a.slice(1) },
  removeMiddle: { next: (a) => a.filter((_, i) => i !== a.length >> 1) },
  slidingWindow: { next: (a) => [...a.slice(1), item(1e6)] },
  swap: {
    next: (a) => {
      const b = a.slice();
      const j = b.length - 10;
      [b[10], b[j]] = [b[j], b[10]];
      return b;
    },
  },
  moveOne: {
    next: (a) => {
      const b = a.slice();
      b.splice(b.length - 10, 0, ...b.splice(10, 1));
      return b;
    },
  },
  relocate10: { next: (a, rnd) => relocate(a, 10, rnd) },
  sortNearlySorted: {
    base: (a, rnd) => relocate(a, Math.ceil(a.length / 20), rnd),
    next: (a) => a.slice().sort((x, y) => x.id - y.id),
  },
  shuffle: { next: (a, rnd) => shuffle(a, rnd) },
  reverse: { next: (a) => a.slice().reverse() },
  updateEvery10th: {
    next: (a) => a.map((x, i) => (i % 10 === 0 ? { ...x } : x)),
  },
  updateAll: { next: (a) => a.map((x) => ({ ...x })) },
  filterHalf: { next: (a) => a.filter((x) => x.id % 2 === 0) },
  replaceAll: { next: (a) => range(a.length, 1e6) },
};

const nextFrame = () =>
  new Promise<void>((resolve) =>
    requestAnimationFrame(() => setTimeout(resolve)),
  );

@Component({
  selector: 'rxa-rx-for-benchmark',
  imports: [RxFor],
  providers: [
    RECONCILER === 'legacy'
      ? provideLegacyRxForReconciliation()
      : provideExperimentalRxForReconciliation(),
  ],
  template: `
    <p class="bench-config">
      items: {{ itemCount }}, strategy: {{ strategy }}, template:
      {{ template }}, reconciler: {{ reconciler }}. Run
      <code>await __rxForBench.runAll()</code> in the console.
    </p>
    <div class="bench-list">
      @if (template === 'index') {
        <div
          class="bench-row"
          *rxFor="
            let item of items;
            let i = index;
            trackBy: 'id';
            strategy: strategy;
            renderCallback: rendered$
          "
        >
          <span>{{ i }}</span
          ><span>{{ item.id }}</span
          ><span>{{ item.label }}</span>
        </div>
      } @else {
        <div
          class="bench-row"
          *rxFor="
            let item of items;
            trackBy: 'id';
            strategy: strategy;
            renderCallback: rendered$
          "
        >
          <span>{{ item.id }}</span
          ><span>{{ item.label }}</span>
        </div>
      }
    </div>
  `,
  styles: `
    .bench-row {
      display: flex;
      gap: 8px;
      height: 20px;
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxForBenchmarkComponent {
  readonly itemCount = ITEMS;
  readonly strategy = STRATEGY;
  readonly template = TEMPLATE;
  readonly reconciler = RECONCILER;
  readonly items = signal<Item[]>([]);
  readonly rendered$ = new Subject<unknown>();
  /** render callbacks that didn't report the latest list */
  private staleCallbacks = 0;

  constructor() {
    (window as any).__rxForBench = {
      scenarios: Object.keys(SCENARIOS),
      run: (name: string, reps?: number) => this.run(name, reps),
      runAll: (reps?: number) => this.runAll(reps),
    };
    this.rendered$.subscribe((rendered) => {
      if (rendered !== this.items()) this.staleCallbacks++;
    });
  }

  private async render(items: Item[]) {
    if (items.length === 0 && this.items().length === 0) {
      // nothing to render, no render callback
      return;
    }
    // the render callback reports the list it rendered
    const rendered = firstValueFrom(
      this.rendered$.pipe(filter((rendered) => rendered === items)),
    );
    this.items.set(items);
    await rendered;
  }

  /**
   * Per rep: render an empty list, render the base list, then measure the change.
   * `render`: wall time until rxFor reported the change as rendered (all scheduled work done,
   * including frames rendered in between when the strategy splits the work).
   * `settled`: wall time until the DOM shows the new list. Later than `render` when the
   * render callback fired before the DOM was up to date (counted in `staleDom`).
   * `layout`: the style recalc + layout of the remaining DOM changes, forced right after.
   */
  async run(name: string, reps = 10) {
    const scenario = SCENARIOS[name];
    const render: number[] = [];
    const settled: number[] = [];
    const layout: number[] = [];
    let staleDom = 0;
    for (let rep = 0; rep < reps; rep++) {
      const rnd = seeded(rep + 1);
      const fresh = range(ITEMS);
      const base = scenario.base ? scenario.base(fresh, rnd) : fresh;
      const next = scenario.next(base, rnd);
      await this.render([]);
      await nextFrame();
      await this.render(base);
      await nextFrame();
      await nextFrame();
      assertRendered(base, `${name} base`);
      performance.mark(`bench:${name}:${rep}:start`);
      const start = performance.now();
      await this.render(next);
      const rendered = performance.now();
      if (!domShows(next)) {
        staleDom++;
        await domSettled(next, name);
      }
      const domReady = performance.now();
      // forced on purpose, measures the layout cost of the DOM changes
      void document.body.offsetHeight;
      const laidOut = performance.now();
      performance.mark(`bench:${name}:${rep}:end`);
      await nextFrame();
      render.push(rendered - start);
      settled.push(domReady - start);
      layout.push(laidOut - domReady);
    }
    const staleCallbacks = this.staleCallbacks;
    this.staleCallbacks = 0;
    return {
      scenario: name,
      render: median(render),
      settled: median(settled),
      layout: median(layout),
      renderSamples: render,
      settledSamples: settled,
      layoutSamples: layout,
      staleDom,
      staleCallbacks,
    };
  }

  async runAll(reps = 10) {
    const results = [];
    for (const name of Object.keys(SCENARIOS)) {
      results.push(await this.run(name, reps));
    }
    return {
      config: {
        items: ITEMS,
        strategy: STRATEGY,
        template: TEMPLATE,
        reconciler: RECONCILER,
        reps,
      },
      results,
    };
  }
}

/** the DOM shows exactly the expected rows (and indices) */
function domShows(items: Item[]): boolean {
  const rows = document.querySelectorAll('.bench-row');
  const withIndex = TEMPLATE === 'index';
  return (
    rows.length === items.length &&
    items.every((item, i) => {
      const cells = rows[i].children;
      return (
        cells[withIndex ? 1 : 0].textContent === `${item.id}` &&
        (!withIndex || cells[0].textContent === `${i}`)
      );
    })
  );
}

function assertRendered(items: Item[], label: string) {
  if (!domShows(items)) {
    throw new Error(`${label}: the DOM doesn't show the expected rows`);
  }
}

/** resolves once the DOM shows the expected rows, fails after 2s */
function domSettled(items: Item[], label: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const observer = new MutationObserver(() => {
      if (domShows(items)) {
        observer.disconnect();
        clearTimeout(timeout);
        resolve();
      }
    });
    const timeout = setTimeout(() => {
      observer.disconnect();
      reject(new Error(`${label}: the DOM didn't settle`));
    }, 2000);
    observer.observe(document.querySelector('.bench-list')!, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  });
}

function median(values: number[]): number {
  const sorted = values.slice().sort((a, b) => a - b);
  const mid = sorted.length >> 1;
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}
