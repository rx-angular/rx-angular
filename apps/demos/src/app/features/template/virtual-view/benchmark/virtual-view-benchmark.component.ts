import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  BENCHMARK_DEFAULTS,
  BenchmarkMode,
  benchmarkStats,
  NAV_START_MARK,
} from './benchmark.model';

/**
 * Lightweight start page. Steer the parameters here, then click "Open list"
 * to measure the navigation into the list page.
 */
@Component({
  selector: 'vv-benchmark',
  template: `
    <header class="rxa-demo-header">
      <div>
        <h2>Virtual View — Benchmark</h2>
        <p class="rxa-demo-subtitle">
          Compare a plain list against <code>rxVirtualView</code> with and
          without view caching. Every run is described by its URL.
        </p>
      </div>
    </header>

    <div class="rxa-demo-toolbar">
      <section class="rxa-demo-group">
        <span class="rxa-demo-label">Mode</span>
        @for (m of modes; track m) {
          <label class="rxa-demo-controls">
            <input
              type="radio"
              name="mode"
              [checked]="mode() === m"
              (change)="mode.set(m)"
            />
            {{ m }}
          </label>
        }
      </section>
      <section class="rxa-demo-group">
        <label class="rxa-demo-controls">
          <span class="rxa-demo-label">Items</span>
          <input
            type="number"
            min="1"
            [value]="items()"
            (change)="items.set($any($event.target).valueAsNumber)"
          />
        </label>
        <label class="rxa-demo-controls">
          <span class="rxa-demo-label">Cache size</span>
          <input
            type="number"
            min="0"
            [value]="cacheSize()"
            (change)="cacheSize.set($any($event.target).valueAsNumber)"
          />
        </label>
        <label class="rxa-demo-controls">
          <span class="rxa-demo-label">Nodes per card</span>
          <input
            type="number"
            min="0"
            [value]="nodes()"
            (change)="nodes.set($any($event.target).valueAsNumber)"
          />
        </label>
      </section>
      <a
        class="rxa-demo-controls"
        routerLink="list"
        [queryParams]="queryParams()"
        (click)="markNavStart()"
        >Open list →</a
      >
    </div>

    <ol class="vv-bench-help">
      <li>
        <strong>Navigation:</strong> start a DevTools Performance recording,
        click <em>Open list</em>, stop once the result row shows up. Repeat per
        mode.
      </li>
      <li>
        <strong>Caching:</strong> on the list page use <em>Scroll test</em>
        (scripted down/up scrolling over the same range) or
        <em>Hide / show</em> (swaps all visible views out and back in).
      </li>
      <li>
        Keep the tab in the foreground: Chrome pauses IntersectionObserver and
        rAF in occluded tabs.
      </li>
    </ol>
  `,
  styles: `
    .vv-bench-help {
      max-width: 720px;
      line-height: 1.5;
    }
    input[type='number'] {
      width: 80px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class VirtualViewBenchmarkComponent {
  readonly modes: BenchmarkMode[] = ['plain', 'vv', 'vv-cache'];
  readonly mode = signal<BenchmarkMode>(BENCHMARK_DEFAULTS.mode);
  readonly items = signal(BENCHMARK_DEFAULTS.items);
  readonly cacheSize = signal(BENCHMARK_DEFAULTS.cacheSize);
  readonly nodes = signal(BENCHMARK_DEFAULTS.nodes);

  readonly queryParams = computed(() => ({
    mode: this.mode(),
    items: this.items(),
    cacheSize: this.cacheSize(),
    nodes: this.nodes(),
  }));

  markNavStart() {
    performance.mark(NAV_START_MARK);
    benchmarkStats.navStart = performance.now();
  }
}
