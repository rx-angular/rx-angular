import { Component, signal, ViewEncapsulation } from '@angular/core';
import {
  RxVirtualView,
  RxVirtualViewContent,
  RxVirtualViewObserver,
  RxVirtualViewPlaceholder,
} from '@rx-angular/template/virtual-view';

interface Card {
  id: number;
  name: string;
}

/**
 * `@if` / `@else` content-template swap demo (route `/if-else`).
 *
 * Each visible `rxVirtualView` card chooses its `*rxVirtualViewContent` via an
 * `@if (mode() === 'a') {...} @else {...}` branch. Toggling the `mode` signal
 * at runtime swaps the content template while the host element stays mounted
 * and visible. This exercises the fix that keeps a mounted, visible card
 * re-rendering the newly selected content template instead of going blank.
 */
@Component({
  selector: 'app-if-else-swap-demo',
  imports: [
    RxVirtualViewObserver,
    RxVirtualView,
    RxVirtualViewContent,
    RxVirtualViewPlaceholder,
  ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="container demo-page">
      <h2>&#64;if / &#64;else content swap</h2>
      <p class="demo-intro">
        Every card below is virtualized and currently on screen. Press
        <strong>Toggle A/B</strong> to flip the <code>mode</code> signal at
        runtime. Each card's content is chosen by an
        <code>&#64;if / &#64;else</code> block, so the content template swaps
        while the host element stays mounted. The card must show the new variant
        (never go blank).
      </p>

      <div class="demo-controls">
        <button type="button" (click)="toggle()">
          Toggle A/B (current: {{ mode() }})
        </button>
      </div>

      <div class="rx-for-section" rxVirtualViewObserver [root]="null">
        <div class="users-grid">
          @for (card of cards(); track card.id) {
            <div rxVirtualView #vv="rxVirtualView" [useContainment]="false">
              <ng-container *rxVirtualViewContent>
                @if (mode() === 'a') {
                  <div class="user-card">
                    <h3>Variant A &mdash; {{ card.name }}</h3>
                    <p class="email">Rendered from the &#64;if branch</p>
                    <span class="role role-admin">Variant A</span>
                  </div>
                } @else {
                  <div class="user-card">
                    <h3>Variant B &mdash; {{ card.name }}</h3>
                    <p class="email">Rendered from the &#64;else branch</p>
                    <span class="role role-manager">Variant B</span>
                  </div>
                }
              </ng-container>
              <div
                *rxVirtualViewPlaceholder
                style="min-height: var(--rx-vw-h, 107px); background: red"
              ></div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class IfElseSwapDemoComponent {
  protected readonly mode = signal<'a' | 'b'>('a');

  protected readonly cards = signal<Card[]>([
    { id: 1, name: 'Card One' },
    { id: 2, name: 'Card Two' },
    { id: 3, name: 'Card Three' },
    { id: 4, name: 'Card Four' },
    { id: 5, name: 'Card Five' },
    { id: 6, name: 'Card Six' },
  ]);

  protected toggle() {
    this.mode.update((m) => (m === 'a' ? 'b' : 'a'));
  }
}
