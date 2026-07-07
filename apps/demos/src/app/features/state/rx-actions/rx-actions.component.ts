import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { rxActions } from '@rx-angular/state/actions';
import { scan } from 'rxjs';
import { DocsLinkComponent } from '../../../shared/docs-link';
import { CodeHighlightComponent } from '../../../shared/code-highlight';

// Shown verbatim on the page via <rxa-code>. Flush-left so it renders cleanly.
const RX_ACTIONS_CODE = `interface CounterActions {
  add: number;
  subtract: number;
  reset: void;
  setName: string;
}

export class RxActionsComponent {
  // One call turns the interface into dispatchers, streams and on* helpers.
  // The transform maps the raw DOM event to a clean string before it emits, so
  // the template can call actions.setName($event) directly.
  readonly actions = rxActions<CounterActions>(({ transforms }) =>
    transforms({
      setName: (event: Event) =>
        (event.target as HTMLInputElement | null)?.value ?? '',
    }),
  );

  readonly count = signal(0);

  constructor() {
    // Every key is also an observable stream: add$, subtract$, setName$ ...
    this.actions.add$
      .pipe(takeUntilDestroyed())
      .subscribe((value) => this.count.update((c) => c + value));

    this.actions.subtract$
      .pipe(takeUntilDestroyed())
      .subscribe((value) => this.count.update((c) => c - value));
  }

  // on* side-effect helper for the reset action (auto-cleaned on destroy).
  // Returns a fn you can call to stop just this effect.
  private readonly stopReset = this.actions.onReset(
    (reset$) => reset$,
    () => this.count.set(0),
  );
}`;

/**
 * The typed action interface. Every key becomes:
 * - a dispatcher fn        -> `actions.add(5)`
 * - an observable stream   -> `actions.add$`
 * - an `on*` effect helper -> `actions.onReset(...)`
 */
interface CounterActions {
  add: number;
  subtract: number;
  reset: void;
  setName: string;
}

@Component({
  selector: 'rxa-rx-actions-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocsLinkComponent, CodeHighlightComponent],
  template: `
    <rxa-docs-link
      docs="packages/state/reference/rx-actions-api"
      source="apps/demos/src/app/features/state/rx-actions"
    />

    <h2>rxActions</h2>
    <p class="text-muted">
      <code>rxActions</code> turns a typed action interface into a single object
      that exposes, for every key, a <strong>dispatcher</strong> function
      (<code>add(5)</code>), an <strong>observable</strong> stream
      (<code>add$</code>) and an <strong>on*</strong> side-effect helper
      (<code>onReset()</code>). It is the glue between template events and your
      state, with automatic subscription cleanup on destroy.
    </p>

    <div class="card p-3 mb-3">
      <h5>Reactive counter</h5>
      <p class="text-muted mb-2">
        The buttons dispatch actions via the generated
        <code>add()</code> / <code>subtract()</code> /
        <code>reset()</code> functions. We subscribe to the <code>add$</code> /
        <code>subtract$</code> streams and accumulate the result into a signal.
      </p>

      <div class="d-flex align-items-center gap-2 mb-2">
        <button class="btn btn-outline-secondary" (click)="actions.subtract(1)">
          - 1
        </button>
        <button class="btn btn-outline-secondary" (click)="actions.add(1)">
          + 1
        </button>
        <button class="btn btn-outline-secondary" (click)="actions.add(10)">
          + 10
        </button>
        <button class="btn btn-outline-danger" (click)="actions.reset()">
          reset
        </button>
        <span class="badge bg-primary fs-6">count = {{ count() }}</span>
      </div>
      <small class="text-muted">resets triggered: {{ resetCount() }}</small>

      <div class="mt-2">
        <small class="text-muted">
          last deltas (via <code>actions.$(['add', 'subtract'])</code>):
        </small>
        <div class="d-flex gap-2 flex-wrap mt-1">
          @for (entry of deltaLog(); track $index) {
            <span class="badge bg-secondary">{{ entry }}</span>
          } @empty {
            <span class="text-muted">—</span>
          }
        </div>
      </div>
    </div>

    <div class="card p-3 mb-3">
      <h5>Event transform</h5>
      <p class="text-muted mb-2">
        <code>setName</code> is configured with a transform. We pass the raw DOM
        <code>$event</code> and the transform plucks
        <code>event.target.value</code> before emission, so the
        <code>setName$</code> stream always carries a clean <code>string</code>.
      </p>

      <input
        class="form-control mb-2"
        style="max-width: 320px"
        placeholder="Type a name…"
        (input)="actions.setName($event)"
      />
      <div>
        Hello, <strong>{{ name() || '—' }}</strong>
      </div>
    </div>

    <section class="code-section">
      <h3 class="rxa-demo-section-title">Example code</h3>
      <rxa-code title="rx-actions.component.ts" [code]="exampleCode" />
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .gap-2 {
        gap: 0.5rem;
      }
    `,
  ],
})
export class RxActionsComponent {
  protected readonly exampleCode = RX_ACTIONS_CODE;

  // `setName` gets a transform with an explicit `Event` param: the raw DOM
  // event is mapped to its input value before the action emits. Because the
  // transform's parameter type is `Event`, the generated dispatcher
  // `actions.setName(...)` accepts the template's `$event` directly.
  protected readonly actions = rxActions<CounterActions>(({ transforms }) =>
    transforms({
      setName: (event: Event) =>
        (event.target as HTMLInputElement | null)?.value ?? '',
    }),
  );

  // View state lives in signals.
  protected readonly count = signal(0);
  protected readonly resetCount = signal(0);
  protected readonly name = signal('');
  protected readonly deltaLog = signal<string[]>([]);

  constructor() {
    // React to each action stream individually and accumulate into the signal.
    // `add` adds its value, `subtract` removes it.
    this.actions.add$
      .pipe(takeUntilDestroyed())
      .subscribe((value) => this.count.update((c) => c + value));

    this.actions.subtract$
      .pipe(takeUntilDestroyed())
      .subscribe((value) => this.count.update((c) => c - value));

    // Demonstrate the `$()` merge selector: it merges several action streams
    // into one observable. Here we merge `add$` and `subtract$` and keep a
    // small log of the latest deltas.
    this.actions
      .$(['add', 'subtract'])
      .pipe(
        scan(
          (log: string[], value) => [`Δ ${String(value)}`, ...log].slice(0, 5),
          [],
        ),
        takeUntilDestroyed(),
      )
      .subscribe((log) => this.deltaLog.set(log));

    // The `setName$` stream already carries the transformed string value.
    this.actions.setName$
      .pipe(takeUntilDestroyed())
      .subscribe((value) => this.name.set(value));
  }

  // `on*` side-effect helper: register an effect for the `reset` action.
  // The first arg is the pipe (behaviour), the second the side-effect callback.
  // Returns a cleanup fn that stops the effect when called.
  private readonly stopReset = this.actions.onReset(
    (reset$) => reset$,
    () => {
      this.count.set(0);
      this.resetCount.update((c) => c + 1);
    },
  );
}
