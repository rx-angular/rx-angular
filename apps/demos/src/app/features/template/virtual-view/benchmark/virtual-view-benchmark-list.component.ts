import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  provideVirtualViewConfig,
  RxVirtualView,
  RxVirtualViewContent,
  RxVirtualViewObserver,
  RxVirtualViewPlaceholder,
} from '@rx-angular/template/virtual-view';
import {
  benchmarkStats,
  createBenchmarkItems,
  readBenchmarkParams,
  SwapStats,
} from './benchmark.model';
import { BenchmarkCard } from './benchmark-card.component';
import { provideBenchmarkStrategies } from './benchmark-strategies';

type Metric = number | '-';

interface BenchmarkResult {
  scenario: string;
  mode: string;
  cacheSize: Metric;
  /** navigation: click → content settled; scroll: test duration; show visible: click → content settled */
  timeMs: Metric;
  /** navigation only: click (or page load) → first paint */
  firstPaintMs: Metric;
  /** placeholder → content swaps: summed main-thread time and average per swap */
  swapInMs: Metric;
  swapInAvgMs: Metric;
  /** content → placeholder swaps: summed main-thread time and average per swap */
  swapOutMs: Metric;
  swapOutAvgMs: Metric;
  /** scroll only: frame intervals during the scripted scroll */
  avgFrameMs: Metric;
  p95FrameMs: Metric;
  maxFrameMs: Metric;
  /** scroll only: frames longer than 1.5× the median frame interval */
  droppedFrames: Metric;
  domNodes: Metric;
  heapMb: Metric;
}

/** Scroll test: 3 cycles of scrolling down 3 viewports and back up, 40px per frame. */
const SCROLL_CYCLES = 3;
const SCROLL_VIEWPORTS = 3;
const SCROLL_STEP_PX = 40;

@Component({
  selector: 'vv-benchmark-list',
  template: `
    <div class="vv-bench">
      <div class="rxa-demo-toolbar">
        <a
          class="rxa-demo-controls"
          routerLink=".."
          [queryParams]="route.snapshot.queryParams"
          >← Back</a
        >
        <span class="rxa-demo-label">
          mode <strong>{{ params.mode }}</strong> · items
          <strong>{{ params.items }}</strong> · nodes/card
          <strong>{{ params.nodes }}</strong>
          @if (params.mode === 'vv-cache') {
            · cache <strong>{{ params.cacheSize }}</strong>
          }
        </span>
        <button type="button" [disabled]="busy()" (click)="runScrollTest()">
          Scroll test
        </button>
        @if (params.mode !== 'plain') {
          <button type="button" [disabled]="busy()" (click)="toggleHidden()">
            {{ hidden() ? 'Show visible' : 'Hide all' }}
          </button>
        }
        <button type="button" [disabled]="busy()" (click)="snapshot('manual')">
          Snapshot
        </button>
      </div>

      @if (results().length) {
        <table class="vv-bench-results">
          <thead>
            <tr>
              @for (col of columns; track col) {
                <th>{{ col }}</th>
              }
            </tr>
          </thead>
          <tbody>
            @for (row of results(); track $index) {
              <tr>
                @for (col of columns; track col) {
                  <td>{{ $any(row)[col] }}</td>
                }
              </tr>
            }
          </tbody>
        </table>
      }

      <div class="vv-bench-container" #container rxVirtualViewObserver>
        <div class="vv-bench-grid">
          @if (params.mode === 'plain') {
            @for (item of items; track item.id) {
              <div class="vv-bench-item">
                <vv-benchmark-card [item]="item" [nodes]="params.nodes" />
              </div>
            }
          } @else {
            @for (item of items; track item.id) {
              <div class="vv-bench-item" rxVirtualView>
                <vv-benchmark-card
                  *rxVirtualViewContent
                  [item]="item"
                  [nodes]="params.nodes"
                />
                <div
                  *rxVirtualViewPlaceholder
                  class="vv-bench-placeholder"
                ></div>
              </div>
            }
          }
        </div>
      </div>
    </div>
  `,
  styles: `
    .vv-bench {
      display: flex;
      flex-direction: column;
      height: 100%;
      gap: 8px;
    }
    .vv-bench-results {
      font-size: 12px;
      border-collapse: collapse;
    }
    .vv-bench-results th,
    .vv-bench-results td {
      padding: 2px 8px;
      border: 1px solid var(--rxa-border);
      text-align: right;
      white-space: nowrap;
    }
    .vv-bench-container {
      flex: 1;
      min-height: 0;
      overflow-y: scroll;
    }
    .vv-bench-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 12px;
    }
    .vv-bench-item {
      display: block;
      height: 260px;
      overflow: hidden;
      border: 1px solid var(--rxa-border);
      border-radius: var(--rxa-radius-sm);
      background: var(--rxa-surface);
    }
    .vv-bench-placeholder {
      height: 100%;
      background: var(--rxa-border);
      opacity: 0.4;
    }
    vv-benchmark-card {
      display: block;
      padding: 8px 12px;
      font-size: 12px;
    }
    vv-benchmark-card .card-title {
      margin: 0 0 4px;
    }
    vv-benchmark-card .card-description {
      margin: 0 0 4px;
    }
    vv-benchmark-card .card-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin: 0 0 4px;
      padding: 0;
      list-style: none;
    }
    vv-benchmark-card .card-tags li {
      padding: 0 6px;
      border-radius: 8px;
      background: rgba(var(--rxa-brand-rgb), 0.15);
    }
    vv-benchmark-card .card-stats {
      width: 100%;
    }
    vv-benchmark-card .card-nodes {
      display: flex;
      flex-wrap: wrap;
      gap: 1px;
      margin-top: 4px;
    }
    vv-benchmark-card .card-nodes > div {
      width: 5px;
      height: 5px;
      background: rgba(var(--rxa-brand-rgb), 0.25);
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideBenchmarkStrategies(),
    provideVirtualViewConfig(() => {
      const { mode, cacheSize } = readBenchmarkParams(
        inject(ActivatedRoute).snapshot.queryParamMap,
      );
      return {
        cacheEnabled: mode === 'vv-cache',
        cache: { contentCacheSize: cacheSize, placeholderCacheSize: cacheSize },
      };
    }),
  ],
  imports: [
    RouterLink,
    RxVirtualViewObserver,
    RxVirtualView,
    RxVirtualViewContent,
    RxVirtualViewPlaceholder,
    BenchmarkCard,
  ],
})
export class VirtualViewBenchmarkListComponent {
  readonly route = inject(ActivatedRoute);
  readonly params = readBenchmarkParams(this.route.snapshot.queryParamMap);
  readonly items = createBenchmarkItems(this.params.items);

  readonly columns: (keyof BenchmarkResult)[] = [
    'scenario',
    'mode',
    'cacheSize',
    'timeMs',
    'firstPaintMs',
    'swapInMs',
    'swapInAvgMs',
    'swapOutMs',
    'swapOutAvgMs',
    'avgFrameMs',
    'p95FrameMs',
    'maxFrameMs',
    'droppedFrames',
    'domNodes',
    'heapMb',
  ];
  readonly results = signal<BenchmarkResult[]>([]);
  readonly busy = signal(true);
  readonly hidden = signal(false);

  private readonly container =
    viewChild.required<ElementRef<HTMLElement>>('container');
  private readonly observer = viewChild.required(RxVirtualViewObserver);
  private destroyed = false;

  constructor() {
    // the click on "Open list" sets navStart, a direct page load measures from time origin
    const navStart = benchmarkStats.navStart;
    const source = navStart ? 'navigation' : 'page load';
    benchmarkStats.navStart = 0;
    benchmarkStats.reset();
    const navBase = this.swapBase();

    let firstPaint = 0;
    afterNextRender(() =>
      requestAnimationFrame(() =>
        setTimeout(() => (firstPaint = performance.now() - navStart)),
      ),
    );

    inject(DestroyRef).onDestroy(() => (this.destroyed = true));

    this.whenSettled().then(() => {
      this.snapshot(source, {
        timeMs:
          Math.max(
            benchmarkStats.lastCreatedAt,
            benchmarkStats.swapIn.lastEndAt,
          ) - navStart,
        firstPaintMs: firstPaint || '-',
        ...this.swapMetrics(navBase),
      });
      this.busy.set(false);
    });
  }

  async runScrollTest() {
    this.busy.set(true);
    const el = this.container().nativeElement;
    el.scrollTop = 0;
    await this.whenSettled();

    const base = this.swapBase();
    const distance = el.clientHeight * SCROLL_VIEWPORTS;
    const frames: number[] = [];
    const start = performance.now();
    let last = start;

    // fixed list of scroll positions, one per frame, so every run is identical
    const down: number[] = [];
    for (let top = SCROLL_STEP_PX; top < distance; top += SCROLL_STEP_PX) {
      down.push(top);
    }
    down.push(distance);
    const cycle = [...down, ...down.slice(0, -1).reverse(), 0];
    const positions = Array.from({ length: SCROLL_CYCLES }, () => cycle).flat();

    await new Promise<void>((resolve) => {
      let i = 0;
      const step = (now: number) => {
        frames.push(now - last);
        last = now;
        el.scrollTop = positions[i++];
        if (i < positions.length && !this.destroyed) {
          requestAnimationFrame(step);
        } else {
          resolve();
        }
      };
      requestAnimationFrame(step);
    });
    const duration = performance.now() - start;

    await this.whenSettled();
    // first frame delta is the wait for the first rAF, not a scroll frame
    const scrollFrames = frames.slice(1).sort((a, b) => a - b);
    const median = scrollFrames[Math.floor(scrollFrames.length / 2)];
    this.snapshot('scroll', {
      timeMs: duration,
      ...this.swapMetrics(base),
      avgFrameMs:
        scrollFrames.reduce((sum, f) => sum + f, 0) / scrollFrames.length,
      p95FrameMs: scrollFrames[Math.floor(scrollFrames.length * 0.95)],
      maxFrameMs: scrollFrames[scrollFrames.length - 1],
      droppedFrames: scrollFrames.filter((f) => f > median * 1.5).length,
    });
    this.busy.set(false);
  }

  async toggleHidden() {
    this.busy.set(true);
    if (!this.hidden()) {
      this.observer().hideAll();
      this.hidden.set(true);
      await this.whenSettled();
      this.busy.set(false);
      return;
    }

    const base = this.swapBase();
    const start = performance.now();
    this.observer().showAllVisible();
    this.hidden.set(false);
    await this.whenSettled();
    this.snapshot('show visible', {
      timeMs: benchmarkStats.swapIn.lastEndAt - start,
      ...this.swapMetrics(base),
    });
    this.busy.set(false);
  }

  snapshot(scenario: string, partial: Partial<BenchmarkResult> = {}) {
    // only available with --js-flags=--expose-gc, keeps heapMb comparable
    (window as { gc?: () => void }).gc?.();
    const heap = (performance as { memory?: { usedJSHeapSize: number } }).memory
      ?.usedJSHeapSize;
    const row: BenchmarkResult = {
      scenario,
      mode: this.params.mode,
      cacheSize: this.params.mode === 'vv-cache' ? this.params.cacheSize : '-',
      timeMs: '-',
      firstPaintMs: '-',
      swapInMs: '-',
      swapInAvgMs: '-',
      swapOutMs: '-',
      swapOutAvgMs: '-',
      avgFrameMs: '-',
      p95FrameMs: '-',
      maxFrameMs: '-',
      droppedFrames: '-',
      domNodes: this.container().nativeElement.getElementsByTagName('*').length,
      heapMb: heap ? heap / 1024 / 1024 : '-',
      ...partial,
    };
    for (const [key, value] of Object.entries(row)) {
      if (typeof value === 'number' && !Number.isInteger(value)) {
        (row as unknown as Record<string, number>)[key] =
          Math.round(value * 100) / 100;
      }
    }
    console.table([row]);
    this.results.update((rows) => [...rows, row]);
  }

  private swapBase() {
    return {
      in: { ...benchmarkStats.swapIn },
      out: { ...benchmarkStats.swapOut },
    };
  }

  /** Swap cost since `base`; '-' in plain mode, where nothing is swapped. */
  private swapMetrics(base: {
    in: SwapStats;
    out: SwapStats;
  }): Partial<BenchmarkResult> {
    if (this.params.mode === 'plain') {
      return {};
    }
    const delta = (current: SwapStats, before: SwapStats) => {
      const count = current.count - before.count;
      const ms = current.ms - before.ms;
      return { ms, avg: count ? ms / count : ('-' as const) };
    };
    const swapIn = delta(benchmarkStats.swapIn, base.in);
    const swapOut = delta(benchmarkStats.swapOut, base.out);
    return {
      swapInMs: swapIn.ms,
      swapInAvgMs: swapIn.avg,
      swapOutMs: swapOut.ms,
      swapOutAvgMs: swapOut.avg,
    };
  }

  /** Resolves once no card was created or destroyed and no view swapped for `quietMs`. */
  private whenSettled(quietMs = 500): Promise<void> {
    const activity = () =>
      benchmarkStats.created +
      benchmarkStats.destroyed +
      benchmarkStats.swapIn.count +
      benchmarkStats.swapOut.count;
    return new Promise((resolve) => {
      let last = activity();
      let lastChange = performance.now();
      const check = () => {
        const now = performance.now();
        const current = activity();
        if (current !== last) {
          last = current;
          lastChange = now;
        }
        if (now - lastChange >= quietMs || this.destroyed) {
          resolve();
        } else {
          setTimeout(check, 50);
        }
      };
      setTimeout(check, 50);
    });
  }
}
