import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { rxEffects } from '@rx-angular/state/effects';
import { EMPTY, interval, Subject, switchMap } from 'rxjs';
import { CodeHighlightComponent } from '../../../shared/code-highlight';
import { DocsLinkComponent } from '../../../shared/docs-link';

// Shown verbatim on the page via <rxa-code>. Flush-left so it renders cleanly.
const RX_EFFECTS_CODE = `export class RxEffectsComponent {
  readonly ticks = signal(0);
  readonly polls = signal(0);
  private readonly pollingTrigger$ = new Subject<boolean>();
  private stopFast: (() => void) | null = null;

  // One rxEffects instance; every registered effect is torn down on destroy.
  private readonly effects = rxEffects(({ register, onDestroy }) => {
    // Always-on: trigger observable + side-effect callback.
    register(interval(1000), () => this.ticks.update((t) => t + 1));

    // Trigger-driven: switchMap between polling and idle without re-registering.
    register(
      this.pollingTrigger$.pipe(
        switchMap((isPolling) => (isPolling ? interval(750) : EMPTY)),
      ),
      () => this.polls.update((p) => p + 1),
    );

    onDestroy(() => console.log('effects cleaned up'));
  });

  start() {
    // register() returns a cleanup fn to stop just this one effect.
    this.stopFast = this.effects.register(interval(200), () =>
      this.fast.update((v) => v + 1),
    );
  }

  stop() {
    this.stopFast?.();
    this.stopFast = null;
  }
}`;

@Component({
  selector: 'rxa-rx-effects-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocsLinkComponent, CodeHighlightComponent],
  template: `
    <rxa-docs-link
      docs="packages/state/reference/rx-effects-api"
      source="apps/demos/src/app/features/state/rx-effects"
    />

    <h2>rxEffects</h2>
    <p class="text-muted">
      <code>rxEffects</code> is a tiny helper to run observable-based side
      effects without manually subscribing/unsubscribing. You
      <code>register</code> a trigger observable together with a side-effect
      callback, and every subscription is cleaned up automatically when the
      component is destroyed. <code>register</code> returns a function you can
      call to stop that single effect early.
    </p>

    <div class="card p-3 mb-3">
      <h5>Always-on interval effect</h5>
      <p class="text-muted mb-2">
        Registered once on creation: an <code>interval(1000)</code> ticks every
        second and the side effect increments a signal. This effect lives for
        the whole component lifetime and is auto-cleaned on destroy.
      </p>
      <span class="badge bg-primary fs-6">ticks = {{ ticks() }}</span>
    </div>

    <div class="card p-3 mb-3">
      <h5>Start / stop a single effect</h5>
      <p class="text-muted mb-2">
        Click <em>Start</em> to <code>register</code> a fast interval whose side
        effect bumps the counter. <code>register</code> returns a cleanup fn
        &mdash; <em>Stop</em> calls it to unsubscribe just this effect.
      </p>
      <div class="d-flex align-items-center gap-2">
        <button
          class="btn btn-success"
          [disabled]="running()"
          (click)="start()"
        >
          Start
        </button>
        <button
          class="btn btn-outline-danger"
          [disabled]="!running()"
          (click)="stop()"
        >
          Stop
        </button>
        <span class="badge bg-info fs-6">fast = {{ fast() }}</span>
        <span class="text-muted">{{ running() ? 'running…' : 'stopped' }}</span>
      </div>
    </div>

    <div class="card p-3 mb-3">
      <h5>Toggle a polling effect (trigger driven)</h5>
      <p class="text-muted mb-2">
        A long-lived effect is registered on a <code>Subject</code> based
        trigger. When polling is on it <code>switchMap</code>s to an interval;
        when off it switches to <code>EMPTY</code> &mdash; one effect, toggled
        reactively without re-registering.
      </p>
      <div class="d-flex align-items-center gap-2">
        <button class="btn btn-outline-primary" (click)="togglePolling()">
          {{ polling() ? 'Pause polling' : 'Resume polling' }}
        </button>
        <span class="badge bg-secondary fs-6">polls = {{ polls() }}</span>
      </div>
    </div>

    <div class="card p-3">
      <h5>Lifecycle log</h5>
      <p class="text-muted mb-2">
        An <code>onDestroy</code> hook is registered too &mdash; navigate away
        and the cleanup runs (check the console).
      </p>
    </div>

    <section class="code-section">
      <h3 class="rxa-demo-section-title">Example code</h3>
      <rxa-code title="rx-effects.component.ts" [code]="exampleCode" />
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
export class RxEffectsComponent {
  protected readonly exampleCode = RX_EFFECTS_CODE;

  // View state (declared before `effects` so the setup callback can read them).
  protected readonly ticks = signal(0);
  protected readonly fast = signal(0);
  protected readonly running = signal(false);
  protected readonly polls = signal(0);
  protected readonly polling = signal(true);

  // Trigger for the toggleable polling effect (starts polling).
  private readonly pollingTrigger$ = new Subject<boolean>();

  // Holds the cleanup fn returned by `register` for the start/stop effect.
  private stopFast: (() => void) | null = null;

  // Single `rxEffects` instance, configured inline. All registered effects are
  // bound to this component's lifecycle and torn down automatically on destroy.
  private readonly effects = rxEffects(({ register, onDestroy }) => {
    // Always-on effect: trigger = interval, side effect = increment signal.
    register(interval(1000), () => this.ticks.update((t) => t + 1));

    // Long-lived, trigger-driven polling effect. The trigger Subject decides
    // whether we poll (interval) or stay idle (EMPTY) via switchMap.
    register(
      this.pollingTrigger$.pipe(
        switchMap((isPolling) => (isPolling ? interval(750) : EMPTY)),
      ),
      () => this.polls.update((p) => p + 1),
    );

    // Custom cleanup logic that runs when the component is destroyed.
    onDestroy(() => console.log('[rxEffects demo] effects cleaned up'));
  });

  start(): void {
    if (this.running()) {
      return;
    }
    // `register` returns a cleanup fn that unsubscribes just this effect.
    this.stopFast = this.effects.register(interval(200), () =>
      this.fast.update((v) => v + 1),
    );
    this.running.set(true);
  }

  stop(): void {
    this.stopFast?.();
    this.stopFast = null;
    this.running.set(false);
  }

  togglePolling(): void {
    const next = !this.polling();
    this.polling.set(next);
    this.pollingTrigger$.next(next);
  }

  constructor() {
    // Kick off polling immediately on creation.
    queueMicrotask(() => this.pollingTrigger$.next(this.polling()));
  }
}
