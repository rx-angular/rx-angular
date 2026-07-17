import { Component, signal, ViewEncapsulation } from '@angular/core';
import {
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
 * `@switch` content-template swap demo (route `/switch`).
 *
 * Mirrors the sports-marquee scenario that the fix targets: each visible
 * `rxVirtualView` card selects its `*rxVirtualViewContent` via
 * `@switch (card.kind)`. Cycling a card's `kind` at runtime (a -> b -> c -> a)
 * changes the active `@case` on an already-rendered, visible card. The card
 * must re-render the new case's content instead of going blank.
 */
@Component({
  selector: 'app-switch-swap-demo',
  imports: [
    RxVirtualViewObserver,
    RxVirtualView,
    RxVirtualViewContent,
    RxVirtualViewPlaceholder,
  ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="container demo-page">
      <h2>&#64;switch content swap</h2>
      <p class="demo-intro">
        Each on-screen card picks its content with
        <code>&#64;switch (card.kind)</code>. Press
        <strong>Cycle market types</strong> to advance every card's
        <code>kind</code> (a &rarr; b &rarr; c &rarr; a), or cycle a single card
        with its own button. Because the cards are already rendered and visible,
        this is exactly the fixed bug: a <code>&#64;case</code> change on a
        mounted card must re-render the new content, not blank out.
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
                      <p class="email">&#64;case ('a')</p>
                      <span class="role role-admin">Type A</span>
                      <button type="button" (click)="cycleOne(card.id)">
                        Cycle this card
                      </button>
                    </div>
                  }
                  @case ('b') {
                    <div class="user-card">
                      <h3>Spread &mdash; {{ card.name }}</h3>
                      <p class="email">&#64;case ('b')</p>
                      <span class="role role-manager">Type B</span>
                      <button type="button" (click)="cycleOne(card.id)">
                        Cycle this card
                      </button>
                    </div>
                  }
                  @default {
                    <div class="user-card">
                      <h3>Over / Under &mdash; {{ card.name }}</h3>
                      <p class="email">&#64;default</p>
                      <span class="role role-user">Type C</span>
                      <button type="button" (click)="cycleOne(card.id)">
                        Cycle this card
                      </button>
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
export class SwitchSwapDemoComponent {
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

  protected cycleOne(id: number) {
    this.cards.update((cards) =>
      cards.map((card) =>
        card.id === id ? { ...card, kind: this.next(card.kind) } : card,
      ),
    );
  }

  private next(kind: Kind): Kind {
    return kind === 'a' ? 'b' : kind === 'b' ? 'c' : 'a';
  }
}
