import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { coerceAllFactory, coerceObservable } from '@rx-angular/cdk/coercing';
import { interval, map, Observable, scan, Subject } from 'rxjs';
import { DocsLinkComponent } from '../../../shared/docs-link/docs-link.component';

interface LogEntry {
  value: string;
  source: 'static value' | 'observable';
  at: string;
}

/**
 * Demo for `@rx-angular/cdk/coercing`.
 *
 * Coercing helpers normalize a "value OR Observable" input into a single,
 * predictable Observable stream. This demo wires a `coerceAllFactory` whose
 * `values$` is the unified output: every time you push either a static value
 * (e.g. a number from a button) or a whole Observable (a ticking `interval`)
 * into `next()`, the factory coerces it, keeps only distinct sources and emits
 * only distinct results. The live log below shows the single merged stream.
 */
@Component({
  selector: 'rxa-coercing-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocsLinkComponent, AsyncPipe],
  template: `
    <rxa-docs-link
      docs="cdk/coercing/coercing"
      source="apps/demos/src/app/features/cdk/coercing"
    />

    <h2>CDK · Coercing</h2>
    <p class="lead">
      <code>&#64;rx-angular/cdk/coercing</code> turns the awkward "is it a value
      or an Observable?" question into a single reactive stream.
      <code>coerceObservable(value)</code> wraps a static value in
      <code>of()</code> (and passes existing Observables through), while
      <code>coerceDistinctWith()</code> and <code>coerceAllFactory()</code>
      flatten a stream of values-or-Observables into one distinct output — ideal
      for inputs that can be set imperatively or bound reactively.
    </p>

    <section class="demo-card">
      <h3>1 · coerceObservable(valueOrObservable)</h3>
      <p class="note">
        A static value becomes an Observable; an Observable is forwarded as-is.
        Both paths give you a stream you can subscribe to uniformly.
      </p>
      <div class="controls">
        <button (click)="coerceStatic()">coerce a static number</button>
        <button (click)="coerceStream()">coerce an Observable</button>
      </div>
      <p class="readout">
        last coerced emission:
        <strong>{{ singleCoerced() ?? '—' }}</strong>
      </p>
    </section>

    <section class="demo-card">
      <h3>2 · coerceAllFactory() — one unified, distinct stream</h3>
      <p class="note">
        Push a <em>static value</em> or a whole <em>Observable</em> into the
        same <code>next()</code>. The factory uses
        <code>coerceDistinctWith()</code> under the hood: distinct sources,
        distinct emitted values, all merged into the single
        <code>values$</code> you see logged here.
      </p>
      <div class="controls">
        <button (click)="pushStatic()">next(static value)</button>
        <button (click)="pushInterval()">next(interval$ Observable)</button>
        <button (click)="pushSameStatic()">next(same value) — deduped</button>
        <button class="ghost" (click)="clearLog()">clear log</button>
      </div>

      <p class="readout">
        current value$ emission: <strong>{{ values$ | async }}</strong>
      </p>

      <div class="log">
        <div class="log-head">unified stream log (newest first)</div>
        @if (log().length === 0) {
          <p class="empty">Nothing yet — push a value or an Observable.</p>
        } @else {
          <ul>
            @for (entry of log(); track $index) {
              <li>
                <span class="time">{{ entry.at }}</span>
                <span
                  class="src src--{{
                    entry.source === 'observable' ? 'obs' : 'val'
                  }}"
                >
                  {{ entry.source }}
                </span>
                <span class="val">{{ entry.value }}</span>
              </li>
            }
          </ul>
        }
      </div>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .lead {
        max-width: 72ch;
      }
      .demo-card {
        border: 1px solid #d0d7de;
        border-radius: 8px;
        padding: 1rem;
        margin-bottom: 1.25rem;
        background: #fafbfc;
      }
      .demo-card h3 {
        margin-top: 0;
      }
      .note {
        color: #57606a;
        max-width: 72ch;
      }
      .controls {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin: 0.75rem 0;
      }
      .controls button {
        cursor: pointer;
        border: 1px solid #8250df;
        background: #8250df;
        color: #fff;
        border-radius: 6px;
        padding: 0.35rem 0.75rem;
        font-size: 0.85rem;
      }
      .controls button.ghost {
        background: #fff;
        color: #57606a;
        border-color: #d0d7de;
      }
      .readout {
        font-size: 0.9rem;
      }
      .log {
        margin-top: 0.5rem;
      }
      .log-head {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #57606a;
        margin-bottom: 0.25rem;
      }
      .empty {
        color: #8b949e;
        font-style: italic;
      }
      .log ul {
        list-style: none;
        margin: 0;
        padding: 0;
        max-height: 16rem;
        overflow-y: auto;
        border: 1px solid #eaeef2;
        border-radius: 6px;
      }
      .log li {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.3rem 0.6rem;
        border-bottom: 1px solid #eaeef2;
        font-size: 0.85rem;
      }
      .log li:last-child {
        border-bottom: none;
      }
      .time {
        color: #8b949e;
        font-variant-numeric: tabular-nums;
      }
      .src {
        font-size: 0.7rem;
        padding: 0.05rem 0.45rem;
        border-radius: 999px;
        white-space: nowrap;
      }
      .src--val {
        background: #ddf4ff;
        color: #0969da;
      }
      .src--obs {
        background: #fbefff;
        color: #8250df;
      }
      .val {
        font-weight: 600;
      }
    `,
  ],
})
export class CoercingComponent {
  private readonly destroyRef = inject(DestroyRef);

  // --- section 1: coerceObservable ----------------------------------------
  protected readonly singleCoerced = signal<string | null>(null);
  private staticCounter = 0;

  coerceStatic(): void {
    const value = ++this.staticCounter * 10;
    // a plain number -> coerced into of(number)
    coerceObservable(value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((v) => this.singleCoerced.set(`${v} (from static value)`));
  }

  coerceStream(): void {
    // an Observable -> forwarded as-is, takes the first 3 ticks
    const stream$: Observable<number> = interval(300).pipe(map((i) => i + 1));
    coerceObservable(stream$)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((v) => this.singleCoerced.set(`${v} (from Observable tick)`));
  }

  // --- section 2: coerceAllFactory ----------------------------------------
  private readonly merger = coerceAllFactory<number>(
    () => new Subject<Observable<number> | number>(),
  );

  /** The single, unified, distinct output stream. */
  protected readonly values$ = this.merger.values$;

  protected readonly log = signal<LogEntry[]>([]);
  private pushedStatic = 0;
  private lastPushSource: LogEntry['source'] = 'static value';

  constructor() {
    // Mirror each unified emission into a human-readable log.
    this.values$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.addLog(`${value}`, this.lastPushSource));
  }

  pushStatic(): void {
    this.lastPushSource = 'static value';
    this.pushedStatic += 5;
    // push a raw value; coerceAllFactory coerces + dedupes it
    this.merger.next(this.pushedStatic);
  }

  pushSameStatic(): void {
    this.lastPushSource = 'static value';
    // pushing the same coerced value again -> dropped by distinctUntilChanged
    this.merger.next(this.pushedStatic);
  }

  pushInterval(): void {
    this.lastPushSource = 'observable';
    // push a whole Observable; switchAll keeps only the latest source active
    this.merger.next(interval(500).pipe(scan((acc) => acc + 1, 100)));
  }

  clearLog(): void {
    this.log.set([]);
  }

  private addLog(value: string, source: LogEntry['source']): void {
    const at = new Date().toLocaleTimeString();
    this.log.update((entries) =>
      [{ value, source, at }, ...entries].slice(0, 50),
    );
  }
}
