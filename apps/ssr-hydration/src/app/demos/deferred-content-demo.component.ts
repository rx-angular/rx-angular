import { Component, signal, ViewEncapsulation } from '@angular/core';
import {
  provideVirtualViewConfig,
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
 * Deferred content demo (route `/deferred`).
 *
 * These virtual views run with `provideVirtualViewConfig({ enabled: false })`,
 * i.e. the SSR / pre-hydration path. Each card's `*rxVirtualViewContent` lives
 * inside an `@if (revealed())` branch that is initially inactive, so the
 * content template does not exist yet and nothing renders. Pressing
 * <strong>Reveal content</strong> flips `revealed` to true after init; the
 * directive then picks up the newly available content template and renders it.
 * While disabled the `*rxVirtualViewPlaceholder` is not used (it is an
 * enabled/visibility feature), so the empty deferred slots are shown instead.
 */
@Component({
  selector: 'app-deferred-content-demo',
  imports: [
    RxVirtualViewObserver,
    RxVirtualView,
    RxVirtualViewContent,
    RxVirtualViewPlaceholder,
  ],
  providers: [provideVirtualViewConfig({ enabled: false })],
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .deferred-slot {
        min-height: 90px;
        border: 1px dashed #cbd5e1;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #94a3b8;
        font-size: 0.85em;
      }
      .deferred-slot:has(.user-card) {
        border: 0;
        min-height: 0;
        display: block;
      }
    `,
  ],
  template: `
    <div class="container demo-page">
      <h2>Deferred content behind an inactive branch</h2>
      <p class="demo-intro">
        These virtual views run with
        <code>provideVirtualViewConfig(&#123; enabled: false &#125;)</code> (the
        SSR / pre-hydration path). Each card's
        <code>*rxVirtualViewContent</code> starts behind an inactive
        <code>&#64;if (revealed())</code> branch, so nothing renders yet and you
        only see the empty deferred slots. Press
        <strong>Reveal content</strong> to activate the branch; the directive
        then picks up the newly available content template and renders it. While
        disabled the <code>*rxVirtualViewPlaceholder</code> is not used (it is
        an enabled/visibility feature).
      </p>

      <div class="demo-controls">
        <button type="button" (click)="reveal()" [disabled]="revealed()">
          {{ revealed() ? 'Content revealed' : 'Reveal content' }}
        </button>
      </div>

      <div class="rx-for-section" rxVirtualViewObserver [root]="null">
        <div class="users-grid">
          @for (card of cards(); track card.id) {
            <div
              class="deferred-slot"
              rxVirtualView
              #vv="rxVirtualView"
              [useContainment]="false"
            >
              @if (!revealed()) {
                <span>Awaiting deferred content…</span>
              }
              @if (revealed()) {
                <div class="user-card" *rxVirtualViewContent>
                  <h3>{{ card.name }}</h3>
                  <p class="email">Deferred content is now available</p>
                  <span class="role role-user">Revealed</span>
                </div>
              }
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
export class DeferredContentDemoComponent {
  protected readonly revealed = signal(false);

  protected readonly cards = signal<Card[]>([
    { id: 1, name: 'Deferred Card One' },
    { id: 2, name: 'Deferred Card Two' },
    { id: 3, name: 'Deferred Card Three' },
    { id: 4, name: 'Deferred Card Four' },
    { id: 5, name: 'Deferred Card Five' },
    { id: 6, name: 'Deferred Card Six' },
  ]);

  protected reveal() {
    this.revealed.set(true);
  }
}
