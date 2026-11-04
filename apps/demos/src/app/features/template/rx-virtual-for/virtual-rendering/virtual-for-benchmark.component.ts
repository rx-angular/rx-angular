import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  NgZone,
  OnDestroy,
  signal,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  RxStrategyNames,
  RxStrategyProvider,
} from '@rx-angular/cdk/render-strategies';
import {
  AutoSizeVirtualScrollStrategy,
  RxVirtualFor,
  RxVirtualScrollElementDirective,
  RxVirtualScrollViewportComponent,
} from '@rx-angular/template/virtual-scrolling';
import { BehaviorSubject } from 'rxjs';
import { DocsLinkComponent } from '../../../../shared/docs-link';

/**
 * Benchmark for the autosize virtual scroll strategy.
 *
 * Everything is deterministic (seeded data) so runs are comparable. The
 * scenarios can be started from the UI or scripted through `window.__vsBench`,
 * e.g. from the chrome devtools protocol while recording a trace.
 *
 * There are two kinds of measurements:
 * - perf: frame timings + long animation frames, nothing touches the layout
 * - ux: after the layout of every frame the rendered items are checked for
 *   blank areas, overlaps, wrong order and visual jumps. It reads layout, so
 *   it is never combined with a perf measurement.
 */

interface BenchItem {
  id: number;
  title: string;
  body: string;
  tags: string[];
}

interface BenchConfig {
  items: number;
  mode: 'runway' | 'element';
  template: 'light' | 'heavy';
  ro: boolean;
  strategy: RxStrategyNames<string>;
  runway: number;
}

interface FrameStats {
  frames: number;
  avg: number;
  p95: number;
  max: number;
  over20: number;
  loafs: number;
  loafMs: number;
  loafForcedLayoutMs: number;
}

interface UxStats {
  frames: number;
  blankFrames: number;
  maxBlankPx: number;
  overlaps: number;
  gaps: number;
  orderErrors: number;
  maxJumpPx: number;
  jumpFrames: number;
  /** uncaught errors, e.g. "ResizeObserver loop completed with undelivered notifications" */
  errors: number;
  /** the first problems, for debugging */
  events: string[];
}

const WORDS =
  'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat'.split(
    ' ',
  );

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const nextFrame = () => new Promise<number>((r) => requestAnimationFrame(r));
const scrollTopDescriptor = Object.getOwnPropertyDescriptor(
  Element.prototype,
  'scrollTop',
)!;

@Component({
  selector: 'rxa-virtual-for-benchmark',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    RxVirtualFor,
    RxVirtualScrollViewportComponent,
    RxVirtualScrollElementDirective,
    AutoSizeVirtualScrollStrategy,
    DocsLinkComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container vf-showcase">
      <header class="vf-header">
        <div>
          <h2>Autosize Benchmark</h2>
          <p class="vf-subtitle">
            Deterministic scenarios for the <code>autosize</code> scroll
            strategy. Run them here, or scripted through
            <code>window.__vsBench</code> while recording a performance trace.
          </p>
        </div>
        <rxa-docs-link
          docs="packages/template/reference/rx-virtual-for"
          source="apps/demos/src/app/features/template/rx-virtual-for/virtual-rendering/virtual-for-benchmark.md"
        />
      </header>

      <form class="vf-toolbar" (submit)="apply($event)">
        <section class="vf-group">
          <span class="vf-label">List</span>
          <div class="vf-fields">
            <label class="vf-field">
              <span>items</span>
              <input
                class="vf-input"
                name="items"
                type="number"
                min="0"
                [value]="config.items"
              />
            </label>
            <label class="vf-field">
              <span>runwayItems</span>
              <input
                class="vf-input"
                name="runway"
                type="number"
                min="0"
                [value]="config.runway"
              />
            </label>
            <label class="vf-field">
              <span>template</span>
              <select class="vf-input" name="template">
                <option value="light" [selected]="config.template === 'light'">
                  light
                </option>
                <option value="heavy" [selected]="config.template === 'heavy'">
                  heavy
                </option>
              </select>
            </label>
          </div>
        </section>
        <section class="vf-group">
          <span class="vf-label">Viewport</span>
          <div class="vf-fields">
            <label class="vf-field">
              <span>scroll container</span>
              <select class="vf-input vf-input--wide" name="mode">
                <option value="runway" [selected]="config.mode === 'runway'">
                  viewport
                </option>
                <option value="element" [selected]="config.mode === 'element'">
                  rxVirtualScrollElement
                </option>
              </select>
            </label>
            <label class="vf-field">
              <span>strategy</span>
              <select class="vf-input" name="strategy">
                @for (s of strategyNames; track s) {
                  <option [value]="s" [selected]="config.strategy === s">
                    {{ s }}
                  </option>
                }
              </select>
            </label>
            <label class="vf-check">
              <input name="ro" type="checkbox" [checked]="config.ro" />
              withResizeObserver
            </label>
          </div>
        </section>
        <div class="vf-apply">
          <button class="btn btn-outline-primary btn-sm" type="submit">
            Apply &amp; reload
          </button>
        </div>
      </form>

      <section class="vf-group vf-group--wide">
        <span class="vf-label">Scenarios</span>
        <div class="vf-actions">
          @for (s of scenarios; track s.key) {
            <button
              class="btn btn-outline-primary btn-sm"
              [disabled]="running()"
              (click)="run(s.key)"
            >
              {{ s.label }}
            </button>
          }
          <label
            class="vf-check"
            title="Checks every painted frame for blank areas, overlaps, gaps, wrong order, visual jumps and uncaught errors. Reads layout itself, so frame timings are meaningless with it on."
          >
            <input
              type="checkbox"
              [checked]="ux()"
              (change)="ux.set($any($event.target).checked)"
            />
            UX checks
          </label>
        </div>
        <p class="vf-hint">
          @if (ux()) {
            Checks every painted frame for blank areas, overlaps, gaps, wrong
            order, visual jumps and errors. Reads layout, so no timings.
          } @else {
            Measures frame timings and long animation frames. Nothing reads
            layout.
          }
        </p>
      </section>

      <div class="vf-columns">
        <div class="vf-col demo-card">
          <div class="vf-col-head">
            <h3>*rxVirtualFor</h3>
            <span class="vf-badge vf-badge--brand">autosize</span>
            @if (running()) {
              <span class="vf-badge vf-badge--accent"
                >running {{ running() }}…</span
              >
            }
          </div>
          @if (result(); as r) {
            <div class="vf-stats">
              @for (stat of r.stats; track stat.label) {
                <div class="vf-stat" [class.vf-stat--bad]="stat.bad">
                  <span class="vf-stat-label">{{ stat.label }}</span>
                  <span class="vf-stat-value">{{ stat.value }}</span>
                </div>
              }
            </div>
            @if (r.events.length) {
              <ul class="vf-events">
                @for (e of r.events; track $index) {
                  <li>{{ e }}</li>
                }
              </ul>
            }
          }
          <div class="vf-viewport-wrap">
            @if (config.mode === 'runway') {
              <rx-virtual-scroll-viewport
                autosize
                class="viewport"
                [withResizeObserver]="config.ro"
                [runwayItems]="config.runway"
              >
                <div
                  *rxVirtualFor="
                    let item of data$;
                    let i = index;
                    trackBy: trackById;
                    strategy: config.strategy
                  "
                  class="item"
                  [attr.data-id]="item.id"
                >
                  <ng-container
                    *ngTemplateOutlet="itemTpl; context: { $implicit: item, i }"
                  />
                </div>
              </rx-virtual-scroll-viewport>
            } @else {
              <div class="viewport bench-scroll-element" rxVirtualScrollElement>
                <div class="bench-static-header">
                  static content above the list
                </div>
                <rx-virtual-scroll-viewport
                  autosize
                  [withResizeObserver]="config.ro"
                  [runwayItems]="config.runway"
                >
                  <div
                    *rxVirtualFor="
                      let item of data$;
                      let i = index;
                      trackBy: trackById;
                      strategy: config.strategy
                    "
                    class="item"
                    [attr.data-id]="item.id"
                  >
                    <ng-container
                      *ngTemplateOutlet="
                        itemTpl;
                        context: { $implicit: item, i }
                      "
                    />
                  </div>
                </rx-virtual-scroll-viewport>
              </div>
            }
          </div>
        </div>
      </div>

      <ng-template #itemTpl let-item let-i="i">
        @if (config.template === 'light') {
          <div>{{ i }} {{ item.title }} {{ item.body }}</div>
        } @else {
          <div class="card-item">
            <div class="card-item__head">
              <div class="card-item__avatar"></div>
              <div>
                <strong>{{ item.title }}</strong>
                <div class="card-item__meta">#{{ i }} · id {{ item.id }}</div>
              </div>
            </div>
            <p>{{ item.body }}</p>
            <div class="card-item__tags">
              @for (tag of item.tags; track $index) {
                <span>{{ tag }}</span>
              }
            </div>
            <div class="card-item__foot">
              <span>reply</span><span>share</span><span>like</span>
            </div>
          </div>
        }
      </ng-template>
    </div>
  `,
  styles: [
    `
      .vf-showcase {
        padding-bottom: 2rem;
      }
      .vf-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1rem;
        flex-wrap: wrap;
        margin: 0.5rem 0 1rem;
      }
      .vf-header h2 {
        margin: 0 0 0.25rem;
        font-size: 1.5rem;
      }
      .vf-subtitle {
        margin: 0;
        max-width: 70ch;
        color: var(--rxa-text-muted);
        font-size: 0.9rem;
        line-height: 1.5;
      }
      .vf-toolbar {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        padding: 1rem;
        border: 1px solid var(--rxa-border);
        border-radius: var(--rxa-radius);
        background: var(--rxa-surface-2);
      }
      .vf-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 0.6rem 0.75rem;
        border: 1px solid var(--rxa-border);
        border-radius: var(--rxa-radius-sm);
        background: var(--rxa-surface);
      }
      .vf-group--wide {
        margin-top: 1rem;
      }
      .vf-label {
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--rxa-text-muted);
      }
      .vf-fields,
      .vf-actions {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        gap: 0.75rem;
      }
      .vf-actions {
        align-items: center;
        gap: 0.5rem;
      }
      .vf-field {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        font-size: 0.72rem;
        font-weight: 600;
        color: var(--rxa-text-muted);
      }
      .vf-check {
        display: flex;
        align-items: center;
        gap: 0.35rem;
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--rxa-text-muted);
        padding: 0.35rem 0;
        cursor: pointer;
      }
      .vf-input {
        width: 90px;
        font-family: inherit;
        font-size: 0.85rem;
        color: var(--rxa-text);
        background: var(--rxa-surface);
        border: 1px solid var(--rxa-border-strong);
        border-radius: var(--rxa-radius-sm);
        padding: 0.35rem 0.5rem;
      }
      select.vf-input {
        width: auto;
        min-width: 90px;
      }
      .vf-input:focus {
        outline: none;
        border-color: var(--rxa-brand);
        box-shadow: var(--rxa-ring);
      }
      .vf-apply {
        display: flex;
        align-items: flex-end;
      }
      .vf-hint {
        margin: 0;
        font-size: 0.78rem;
        color: var(--rxa-text-muted);
      }
      .vf-columns {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
      }
      .vf-col {
        flex: 1 1 320px;
        padding: 1rem;
      }
      .vf-col-head {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.75rem;
      }
      .vf-col-head h3 {
        margin: 0;
        font-size: 1.05rem;
      }
      .vf-badge {
        font-size: 0.65rem;
        font-weight: 700;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        padding: 0.2rem 0.5rem;
        border-radius: var(--rxa-radius-pill);
      }
      .vf-badge--brand {
        background: rgba(var(--rxa-brand-rgb), 0.1);
        color: var(--rxa-brand);
      }
      .vf-badge--accent {
        background: rgba(108, 76, 241, 0.12);
        color: var(--rxa-accent);
      }
      .vf-stats {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 0.75rem;
      }
      .vf-stat {
        display: flex;
        flex-direction: column;
        gap: 0.1rem;
        padding: 0.4rem 0.7rem;
        border: 1px solid var(--rxa-border);
        border-radius: var(--rxa-radius-sm);
        background: var(--rxa-surface-2);
        min-width: 72px;
      }
      .vf-stat--bad {
        border-color: var(--rxa-danger);
        background: var(--rxa-danger-bg);
      }
      .vf-stat-label {
        font-size: 0.62rem;
        font-weight: 700;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: var(--rxa-text-muted);
      }
      .vf-stat-value {
        font-size: 1rem;
        font-weight: 700;
        color: var(--rxa-text);
        font-variant-numeric: tabular-nums;
      }
      .vf-events {
        margin: 0 0 0.75rem;
        padding-left: 1.25rem;
        font-family: var(--rxa-mono);
        font-size: 0.75rem;
        color: var(--rxa-danger);
      }
      .vf-viewport-wrap {
        border: 1px solid var(--rxa-border);
        border-radius: var(--rxa-radius-sm);
        overflow: hidden;
        background: var(--rxa-surface);
        box-shadow: var(--rxa-shadow-sm);
      }
      .viewport {
        display: block;
        height: 600px;
        width: 100%;
      }
      .bench-static-header {
        height: 150px;
        padding: 1rem;
        color: var(--rxa-text-muted);
        background: var(--rxa-surface-2);
        border-bottom: 1px solid var(--rxa-border);
      }
      .item {
        width: 100%;
        box-sizing: border-box;
        border-bottom: 1px solid var(--rxa-border);
        border-left: 3px solid rgba(var(--rxa-brand-rgb), 0.45);
        padding: 8px 12px;
        background: var(--rxa-surface);
        font-size: 0.85rem;
        line-height: 1.35;
        color: var(--rxa-text);
      }
      .card-item__head {
        display: flex;
        gap: 8px;
        align-items: center;
      }
      .card-item__avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: rgba(var(--rxa-brand-rgb), 0.18);
      }
      .card-item__meta {
        font-size: 0.7rem;
        color: var(--rxa-text-muted);
      }
      .card-item p {
        margin: 4px 0;
      }
      .card-item__tags,
      .card-item__foot {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        font-size: 0.7rem;
        color: var(--rxa-text-muted);
      }
      .card-item__tags span {
        padding: 0 6px;
        border-radius: var(--rxa-radius-pill);
        background: var(--rxa-surface-3);
      }
    `,
  ],
})
export class VirtualForBenchmarkComponent implements OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly ngZone = inject(NgZone);

  @ViewChild(RxVirtualScrollViewportComponent)
  viewport?: RxVirtualScrollViewportComponent;

  readonly config: BenchConfig = this.readConfig();
  readonly result = signal<{
    stats: { label: string; value: string; bad?: boolean }[];
    events: string[];
  } | null>(null);
  readonly ux = signal(false);
  readonly running = signal('');
  readonly strategyNames = inject(RxStrategyProvider).strategyNames;
  readonly scenarios = [
    { key: 'scrollDown', label: 'Scroll down' },
    { key: 'scrollUp', label: 'Scroll up' },
    { key: 'updates', label: 'Data updates' },
    { key: 'jumps', label: 'Jumps' },
    { key: 'replaceVisible', label: 'Replace visible' },
    { key: 'smallList', label: 'Small list' },
  ];

  private random = mulberry32(42);
  private nextId = 0;
  readonly data$ = new BehaviorSubject<BenchItem[]>(
    this.createItems(this.config.items),
  );

  readonly trackById = (_: number, item: BenchItem) => item.id;

  constructor() {
    (window as any).__vsBench = this.api();
  }

  ngOnDestroy() {
    delete (window as any).__vsBench;
  }

  apply(event: Event) {
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);
    this.router.navigate([], {
      queryParams: {
        items: form.get('items'),
        mode: form.get('mode'),
        template: form.get('template'),
        ro: form.get('ro') ? 1 : 0,
        strategy: form.get('strategy'),
        runway: form.get('runway'),
      },
    });
    // the config is read once, a reload keeps every run independent
    setTimeout(() => location.reload());
  }

  async run(scenario: string) {
    const label = this.scenarios.find((s) => s.key === scenario)!.label;
    this.running.set(label);
    try {
      const res = await (window as any).__vsBench[scenario]({ ux: this.ux() });
      this.result.set(this.toStats(res, scenario));
    } finally {
      this.running.set('');
    }
  }

  private toStats(
    res: { duration: number; ux?: UxStats } & Partial<FrameStats>,
    scenario: string,
  ) {
    const stat = (label: string, value: number, unit = '', bad = false) => ({
      label,
      value: `${value}${unit}`,
      bad,
    });
    const stats = [stat('duration', res.duration, ' ms')];
    if (res.ux) {
      const u = res.ux;
      stats.push(
        stat('frames', u.frames),
        stat('blank frames', u.blankFrames, '', u.blankFrames > 0),
        stat('max blank', u.maxBlankPx, ' px', u.maxBlankPx > 0),
        stat('overlaps', u.overlaps, '', u.overlaps > 0),
        stat('gaps', u.gaps, '', u.gaps > 0),
        stat('order errors', u.orderErrors, '', u.orderErrors > 0),
        stat('errors', u.errors, '', u.errors > 0),
      );
      // the jumps of the `jumps` scenario are intended
      if (scenario !== 'jumps') {
        stats.push(
          stat('jump frames', u.jumpFrames, '', u.jumpFrames > 0),
          stat('max jump', u.maxJumpPx, ' px', u.maxJumpPx > 0),
        );
      }
      return { stats, events: u.events };
    }
    stats.push(
      stat('frames', res.frames!),
      stat('avg frame', res.avg!, ' ms'),
      stat('p95 frame', res.p95!, ' ms'),
      stat('max frame', res.max!, ' ms'),
      stat('frames > 20 ms', res.over20!),
      stat('long anim. frames', res.loafs!),
      stat('LoAF time', res.loafMs!, ' ms'),
      stat('LoAF forced layout', res.loafForcedLayoutMs!, ' ms'),
    );
    return { stats, events: [] };
  }

  private readConfig(): BenchConfig {
    const p = this.route.snapshot.queryParamMap;
    return {
      items: Number(p.get('items') ?? 10000),
      mode: (p.get('mode') as BenchConfig['mode']) ?? 'runway',
      template: (p.get('template') as BenchConfig['template']) ?? 'heavy',
      ro: p.get('ro') !== '0',
      strategy: (p.get('strategy') as RxStrategyNames<string>) ?? 'normal',
      runway: Number(p.get('runway') ?? 10),
    };
  }

  private text(min: number, max: number) {
    const count = min + Math.floor(this.random() * (max - min));
    const words = new Array(count);
    for (let i = 0; i < count; i++) {
      words[i] = WORDS[Math.floor(this.random() * WORDS.length)];
    }
    return words.join(' ');
  }

  private createItem(): BenchItem {
    const tags = new Array(Math.floor(this.random() * 6));
    for (let i = 0; i < tags.length; i++) {
      tags[i] = WORDS[Math.floor(this.random() * WORDS.length)];
    }
    return {
      id: this.nextId++,
      title: this.text(2, 6),
      body: this.text(3, 70),
      tags,
    };
  }

  private createItems(count: number): BenchItem[] {
    const items = new Array<BenchItem>(count);
    for (let i = 0; i < count; i++) {
      items[i] = this.createItem();
    }
    return items;
  }

  private scrollTarget(): Element {
    return this.config.mode === 'element'
      ? document.querySelector('.bench-scroll-element')!
      : document.querySelector('.rx-virtual-scroll__runway')!;
  }

  /** the scrolled distance from the top of the list, reads layout */
  private listScrollTop(): number {
    const target = this.scrollTarget();
    if (this.config.mode === 'runway') {
      return target.scrollTop;
    }
    const vp = document.querySelector('rx-virtual-scroll-viewport')!;
    return (
      this.scrollTarget().getBoundingClientRect().top -
      vp.getBoundingClientRect().top
    );
  }

  private visibleHeight(): number {
    return this.scrollTarget().clientHeight;
  }

  private api() {
    // data operations, all of them emit a new array like a store would
    let run = 0;
    const ops = {
      /**
       * replaces the data set with fresh, never measured items. The same seed
       * produces the same content, the ids are new (same digit count) so no
       * size is known for them.
       */
      reset: (seed = 1, count = this.config.items) => {
        this.random = mulberry32(seed);
        this.nextId = ++run * 1_000_000;
        this.data$.next(this.createItems(count));
      },
      /** new references with new content for `fraction` of the items */
      update: (fraction = 0.3) => {
        const data = this.data$.value.slice();
        for (let i = 0; i < data.length; i++) {
          if (this.random() < fraction) {
            data[i] = { ...data[i], body: this.text(3, 70) };
          }
        }
        this.data$.next(data);
      },
      /** new references with identical content (e.g. a store re-mapping) */
      remap: () => this.data$.next(this.data$.value.map((i) => ({ ...i }))),
      /** same references, mutated content, new array */
      mutate: (fraction = 0.3) => {
        const data = this.data$.value.slice();
        for (let i = 0; i < data.length; i++) {
          if (this.random() < fraction) {
            data[i].body = this.text(3, 70);
          }
        }
        this.data$.next(data);
      },
      /**
       * replaces `count` items starting at `index` with new items (new ids)
       * of identical content, so their size equals the replaced ones
       */
      replace: (index: number, count = 1) => {
        const data = this.data$.value.slice();
        for (let i = index; i < index + count && i < data.length; i++) {
          data[i] = { ...data[i], id: this.nextId++ };
        }
        this.data$.next(data);
      },
      shuffle: () => {
        const data = this.data$.value.slice();
        for (let i = data.length - 1; i > 0; i--) {
          const j = Math.floor(this.random() * (i + 1));
          [data[i], data[j]] = [data[j], data[i]];
        }
        this.data$.next(data);
      },
      prepend: (count = 100) =>
        this.data$.next([...this.createItems(count), ...this.data$.value]),
      append: (count = 100) =>
        this.data$.next([...this.data$.value, ...this.createItems(count)]),
      remove: (count = 100) => {
        const data = this.data$.value.slice();
        for (let i = 0; i < count && data.length; i++) {
          data.splice(Math.floor(this.random() * data.length), 1);
        }
        this.data$.next(data);
      },
    };

    const frameStats = () => {
      const deltas: number[] = [];
      const loafs: any[] = [];
      let last = 0;
      let running = true;
      let observer: PerformanceObserver | undefined;
      try {
        observer = new PerformanceObserver((list) =>
          loafs.push(...list.getEntries()),
        );
        observer.observe({ type: 'long-animation-frame', buffered: false });
      } catch {
        // not supported
      }
      const tick = (t: number) => {
        if (last) {
          deltas.push(t - last);
        }
        last = t;
        if (running) {
          requestAnimationFrame(tick);
        }
      };
      requestAnimationFrame(tick);
      return (): FrameStats => {
        running = false;
        observer?.disconnect();
        const sorted = deltas.slice().sort((a, b) => a - b);
        const round = (n: number) => Math.round(n * 10) / 10;
        return {
          frames: deltas.length,
          avg: round(deltas.reduce((a, b) => a + b, 0) / (deltas.length || 1)),
          p95: round(sorted[Math.floor(sorted.length * 0.95)] ?? 0),
          max: round(sorted[sorted.length - 1] ?? 0),
          over20: deltas.filter((d) => d > 20).length,
          loafs: loafs.length,
          loafMs: round(loafs.reduce((a, l) => a + l.duration, 0)),
          loafForcedLayoutMs: round(
            loafs.reduce(
              (a, l) =>
                a +
                (l.scripts ?? []).reduce(
                  (s: number, x: any) => s + x.forcedStyleAndLayoutDuration,
                  0,
                ),
              0,
            ),
          ),
        };
      };
    };

    /**
     * Checks the rendered items right after the layout of every frame, which
     * is the state that gets painted. `expectedDelta` returns the scroll
     * delta the driver applied since the last sample, to tell scrolling
     * apart from visual jumps.
     */
    const uxChecks = (expectedDelta: () => number = () => 0) => {
      const stats: UxStats = {
        frames: 0,
        blankFrames: 0,
        maxBlankPx: 0,
        overlaps: 0,
        gaps: 0,
        orderErrors: 0,
        maxJumpPx: 0,
        jumpFrames: 0,
        errors: 0,
        events: [],
      };
      const onError = (e: ErrorEvent) => {
        stats.errors++;
        log(`error ${e.message}`);
      };
      window.addEventListener('error', onError);
      const log = (msg: string) =>
        stats.events.length < 10 &&
        stats.events.push(
          `f${stats.frames} top=${Math.round(scrollTopNow)} ${msg}`,
        );
      let scrollTopNow = 0;
      let running = true;
      let anchor: { id: string; screenY: number } | undefined;
      const sample = () => {
        const indexById = new Map<number, number>();
        const data = this.data$.value;
        for (let i = 0; i < data.length; i++) indexById.set(data[i].id, i);
        const runway = document.querySelector('.rx-virtual-scroll__runway')!;
        const scrollTop = this.listScrollTop();
        scrollTopNow = scrollTop;
        const height = this.visibleHeight();
        const items: { id: string; idx: number; y: number; h: number }[] = [];
        for (const el of Array.from(runway.children) as HTMLElement[]) {
          const id = el.getAttribute('data-id');
          if (id == null || !el.isConnected) continue;
          const match = /translateY\((-?[\d.]+)px\)/.exec(el.style.transform);
          if (!match) continue;
          items.push({
            id,
            idx: indexById.get(Number(id)) ?? -1,
            y: Number(match[1]),
            h: el.offsetHeight,
          });
        }
        items.sort((a, b) => a.idx - b.idx);
        for (let i = 1; i < items.length; i++) {
          const prev = items[i - 1];
          const cur = items[i];
          if (cur.idx === prev.idx + 1) {
            const d = cur.y - (prev.y + prev.h);
            if (d < -1) {
              stats.overlaps++;
              log(`overlap ${prev.idx}/${cur.idx} ${Math.round(d)}`);
            } else if (d > 1) {
              stats.gaps++;
              log(`gap ${prev.idx}/${cur.idx} ${Math.round(d)}`);
            }
          }
          // a view of an item that left the data set awaits its render
          if (prev.idx >= 0 && cur.y < prev.y) {
            stats.orderErrors++;
            log(`order ${prev.idx}/${cur.idx}`);
          }
        }
        // blank area within the visible part of the list
        const contentHeight =
          this.config.mode === 'runway'
            ? runway.scrollHeight
            : (
                document.querySelector(
                  'rx-virtual-scroll-viewport',
                ) as HTMLElement
              ).offsetHeight;
        const top = Math.max(0, scrollTop);
        const bottom = Math.min(contentHeight, scrollTop + height);
        let covered = 0;
        let cursor = top;
        for (const it of items.slice().sort((a, b) => a.y - b.y)) {
          const s = Math.max(cursor, it.y);
          const e = Math.min(bottom, it.y + it.h);
          if (e > s) {
            covered += e - s;
            cursor = e;
          }
        }
        const blank = Math.max(0, bottom - top - covered);
        stats.frames++;
        if (blank > 2) {
          stats.blankFrames++;
          stats.maxBlankPx = Math.max(stats.maxBlankPx, Math.round(blank));
          log(`blank ${Math.round(blank)} items=${items.length}`);
        }
        // visual jump of the item that was on top in the last frame
        const delta = expectedDelta();
        if (anchor) {
          const it = items.find((i) => i.id === anchor!.id);
          if (it) {
            const jump = Math.abs(it.y - scrollTop - (anchor.screenY - delta));
            if (jump > 1) {
              stats.jumpFrames++;
              stats.maxJumpPx = Math.max(stats.maxJumpPx, Math.round(jump));
              log(`jump ${Math.round(jump)} id=${anchor.id} delta=${delta}`);
            }
          }
        }
        const first = items.find((i) => i.y + i.h > scrollTop);
        anchor = first && { id: first.id, screenY: first.y - scrollTop };
      };
      const loop = () => {
        if (!running) return;
        requestAnimationFrame(() => {
          // a fresh observation is delivered after the layout of this frame
          const ro = new ResizeObserver(() => {
            ro.disconnect();
            if (!running) return;
            sample();
            loop();
          });
          ro.observe(document.documentElement);
        });
      };
      loop();
      return () => {
        running = false;
        window.removeEventListener('error', onError);
        return { ...stats };
      };
    };

    const firstVisibleIndex = () => {
      const top = this.listScrollTop();
      const ids = new Map(this.data$.value.map((d, i) => [d.id, i]));
      let best = Infinity;
      for (const el of Array.from(
        document.querySelector('.rx-virtual-scroll__runway')!.children,
      ) as HTMLElement[]) {
        const m = /translateY\((-?[\d.]+)px\)/.exec(el.style.transform);
        const id = Number(el.getAttribute('data-id'));
        if (m && Number(m[1]) + el.offsetHeight > top && ids.has(id)) {
          best = Math.min(best, ids.get(id)!);
        }
      }
      return best === Infinity ? 0 : best;
    };

    const settle = async (ms = 800) => {
      await sleep(ms);
      await nextFrame();
    };

    const target = () => this.scrollTarget();

    const measure = async (
      ux: boolean,
      work: (setDelta: (d: number) => void) => Promise<void>,
    ) => {
      let lastDelta = 0;
      const stopUx = ux
        ? uxChecks(() => {
            const d = lastDelta;
            lastDelta = 0;
            return d;
          })
        : undefined;
      const stopFrames = ux ? undefined : frameStats();
      // marks for splitting a trace into runs, see `__benchMark`
      const mark = (window as any).__benchMark;
      if (mark) performance.mark(`bench:${mark.label}:${mark.rep}:start`);
      const t0 = performance.now();
      await work((d) => (lastDelta += d));
      const duration = Math.round(performance.now() - t0);
      if (mark) performance.mark(`bench:${mark.label}:${mark.rep}:end`);
      await nextFrame();
      return {
        duration,
        ...(stopFrames ? stopFrames() : {}),
        ...(stopUx ? { ux: stopUx() } : {}),
      };
    };

    const scrollTo = async (top: number) => {
      scrollTopDescriptor.set!.call(target(), top);
      await settle();
    };

    const scrollScenario = async (px: number, frames: number, ux: boolean) =>
      measure(ux, async (setDelta) => {
        // the driver applies `px` once per frame, the ux check compares with
        // it. Like user input, the step lands between two frames: a task
        // posted from rAF runs right after the frame got painted. The scroll
        // event then fires in the scroll steps of the next frame, before its
        // layout and ResizeObserver callbacks.
        await new Promise<void>((resolve) => {
          let n = 0;
          const channel = new MessageChannel();
          channel.port1.onmessage = () => {
            const el = target();
            const before = scrollTopDescriptor.get!.call(el);
            scrollTopDescriptor.set!.call(el, before + px);
            const applied = scrollTopDescriptor.get!.call(el) - before;
            setDelta(applied);
            if (++n < frames) requestAnimationFrame(benchDriverStep);
            else {
              channel.port1.close();
              resolve();
            }
          };
          const benchDriverStep = () => channel.port2.postMessage(null);
          requestAnimationFrame(benchDriverStep);
        });
        await settle(300);
      });

    const api = {
      config: this.config,
      ops,
      settle,
      scrollTo,
      frameStats,
      uxChecks,
      viewport: () => this.viewport,
      /** scroll down through fresh (never measured) items */
      scrollDown: async ({
        ux = false,
        px = 60,
        frames = 180,
        seed = 1,
        startIndex = 0,
      } = {}) => {
        await scrollTo(0);
        ops.reset(seed);
        await settle();
        if (startIndex) {
          this.ngZone.run(() => this.viewport!.scrollToIndex(startIndex));
          await settle(1200);
        }
        return scrollScenario(px, frames, ux);
      },
      /**
       * scroll up through items that were measured before, after a data
       * emission that didn't change them (store re-mapping)
       */
      scrollUp: async ({
        ux = false,
        px = 60,
        frames = 180,
        remap = true,
        seed = 1,
      } = {}) => {
        await scrollTo(0);
        ops.reset(seed);
        await settle();
        // measure the items by scrolling through them
        const step = Math.abs(px) * 5;
        for (let top = 0; top <= px * frames; top += step) {
          await nextFrame();
          await sleep(0);
          scrollTopDescriptor.set!.call(target(), top);
          await nextFrame();
          await nextFrame();
        }
        await settle();
        if (remap) {
          ops.remap();
          await settle();
        }
        return scrollScenario(-px, frames, ux);
      },
      /**
       * a list around the size of the container: content grows beyond it and
       * shrinks below it again, the scrollbar comes and goes
       */
      smallList: async ({ ux = false, rounds = 4, seed = 1 } = {}) => {
        await scrollTo(0);
        return measure(ux, async () => {
          for (let r = 0; r < rounds; r++) {
            for (const count of [2, 3, 4, 6, 9, 5, 3, 1, 8, 2]) {
              ops.reset(seed + r, count);
              await settle(250);
            }
          }
        });
      },
      /** replaces visible items with same-sized new ones, one at a time */
      replaceVisible: async ({
        ux = false,
        count = 10,
        at = 5000,
        seed = 1,
      } = {}) => {
        await scrollTo(0);
        ops.reset(seed);
        await settle();
        await scrollTo(at);
        return measure(ux, async () => {
          for (let i = 0; i < count; i++) {
            ops.replace(firstVisibleIndex() + (i % 4), 1);
            await settle(300);
          }
        });
      },
      /** data updates while parked in the middle of the list */
      updates: async ({
        ux = false,
        rounds = 3,
        at = 20000,
        seed = 1,
        startIndex = 0,
      } = {}) => {
        await scrollTo(0);
        ops.reset(seed);
        await settle();
        if (startIndex) {
          this.ngZone.run(() => this.viewport!.scrollToIndex(startIndex));
          await settle(1200);
        } else {
          await scrollTo(at);
        }
        return measure(ux, async () => {
          for (let r = 0; r < rounds; r++) {
            for (const op of [
              () => ops.update(0.3),
              () => ops.remap(),
              () => ops.mutate(0.3),
              () => ops.shuffle(),
              () => ops.prepend(50),
              () => ops.remove(50),
            ]) {
              op();
              await settle(400);
            }
          }
        });
      },
      /** far jumps via scrollToIndex */
      jumps: async ({ ux = false, count = 8, seed = 1 } = {}) => {
        await scrollTo(0);
        ops.reset(seed);
        await settle();
        const random = mulberry32(7);
        return measure(ux, async () => {
          for (let i = 0; i < count; i++) {
            const index = Math.floor(random() * this.data$.value.length);
            this.ngZone.run(() => this.viewport!.scrollToIndex(index));
            await settle(500);
          }
        });
      },
    };
    return api;
  }
}
