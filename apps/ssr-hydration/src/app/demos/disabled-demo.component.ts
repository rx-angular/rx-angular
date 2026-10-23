import { Component, signal, ViewEncapsulation } from '@angular/core';
import {
  provideVirtualViewConfig,
  RxVirtualView,
  RxVirtualViewContent,
  RxVirtualViewObserver,
  RxVirtualViewPlaceholder,
} from '@rx-angular/template/virtual-view';

type Kind = 'a' | 'b' | 'c';

interface MarketCard {
  id: number;
  name: string;
  kind: Kind;
}

/**
 * Disabled (SSR-style) demo (route `/disabled`).
 *
 * A component-level `provideVirtualViewConfig({ enabled: false })` override
 * forces every virtual view here to stay permanently disabled, reproducing the
 * server / pre-hydration path: content always renders synchronously, is never
 * virtualized, and the placeholder never takes over. The `@switch` card plus
 * its <strong>Cycle</strong> button verify the disabled-path fix: a content
 * swap on a mounted card still re-renders the new case correctly.
 */
@Component({
  selector: 'app-disabled-demo',
  imports: [
    RxVirtualViewObserver,
    RxVirtualView,
    RxVirtualViewContent,
    RxVirtualViewPlaceholder,
  ],
  providers: [provideVirtualViewConfig({ enabled: false })],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="container demo-page">
      <h2>Disabled virtual views (SSR / pre-hydration path)</h2>
      <p class="demo-intro">
        This route provides
        <code>provideVirtualViewConfig(&#123; enabled: false &#125;)</code> at
        the component level, so the directive stays disabled. Content always
        renders synchronously and is never swapped for the placeholder &mdash;
        the same behavior you get on the server and before hydration completes.
        Press <strong>Cycle market types</strong> to confirm that even on the
        disabled path a <code>&#64;switch</code> content swap re-renders the new
        case correctly.
      </p>

      <div class="demo-controls">
        <button type="button" (click)="cycleAll()">Cycle market types</button>
      </div>

      <div class="rx-for-section" rxVirtualViewObserver [root]="null">
        <div class="users-grid">
          @for (card of cards(); track card.id) {
            <div rxVirtualView #vv="rxVirtualView" [useContainment]="false">
              <ng-container *rxVirtualViewContent>
                @switch (card.kind) {
                  @case ('a') {
                    <div class="user-card">
                      <h3>Moneyline &mdash; {{ card.name }}</h3>
                      <p class="email">&#64;case ('a') &mdash; disabled path</p>
                      <span class="role role-admin">Type A</span>
                    </div>
                  }
                  @case ('b') {
                    <div class="user-card">
                      <h3>Spread &mdash; {{ card.name }}</h3>
                      <p class="email">&#64;case ('b') &mdash; disabled path</p>
                      <span class="role role-manager">Type B</span>
                    </div>
                  }
                  @default {
                    <div class="user-card">
                      <h3>Over / Under &mdash; {{ card.name }}</h3>
                      <p class="email">&#64;default &mdash; disabled path</p>
                      <span class="role role-user">Type C</span>
                    </div>
                  }
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
export class DisabledDemoComponent {
  protected readonly cards = signal<MarketCard[]>([
    { id: 1, name: 'Lakers vs Celtics', kind: 'a' },
    { id: 2, name: 'Yankees vs Red Sox', kind: 'b' },
    { id: 3, name: 'Chiefs vs Eagles', kind: 'c' },
    { id: 4, name: 'Warriors vs Nets', kind: 'a' },
    { id: 5, name: 'Dodgers vs Cubs', kind: 'b' },
    { id: 6, name: 'Bills vs Dolphins', kind: 'c' },
  ]);

  protected cycleAll() {
    this.cards.update((cards) =>
      cards.map((card) => ({ ...card, kind: this.next(card.kind) })),
    );
  }

  private next(kind: Kind): Kind {
    return kind === 'a' ? 'b' : kind === 'b' ? 'c' : 'a';
  }
}
