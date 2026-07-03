import { coerceNumberProperty } from '@angular/cdk/coercion';
import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  viewChild,
} from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { RxStrategyNames } from '@rx-angular/cdk/render-strategies';
import { rxState } from '@rx-angular/state';
import {
  AutoSizeVirtualScrollStrategy,
  DynamicSizeVirtualScrollStrategy,
  FixedSizeVirtualScrollStrategy,
  ListRange,
  RxVirtualFor,
  RxVirtualScrollViewportComponent,
} from '@rx-angular/template/virtual-scrolling';
import { RxIf } from '@rx-angular/template/if';
import { RxLet } from '@rx-angular/template/let';
import { EMPTY, exhaustMap, Subject } from 'rxjs';
import { map, scan, startWith, switchMap, take, tap } from 'rxjs/operators';
import { StrategySelectModule } from '../../../../shared/debug-helper/strategy-select/index';
import { DocsLinkComponent } from '../../../../shared/docs-link';
import { Message, MessageService } from './messages/messages.service';

@Component({
  selector: 'virtual-for-inverse-infinite-scroll',
  template: `
    <div class="container">
      <header class="rxa-demo-header">
        <div>
          <h2>Reverse Infinite Scroll</h2>
          <p class="rxa-demo-subtitle">
            Loads older chat messages as you scroll to the top, keeping the
            scrolled index stable on prepend via
            <code>keepScrolledIndexOnPrepend</code>.
          </p>
        </div>
        <rxa-docs-link
          docs="packages/template/reference/rx-virtual-for"
          source="apps/demos/src/app/features/template/rx-virtual-for"
        />
      </header>
      <div class="rxa-demo-toolbar">
        <section class="rxa-demo-group">
          <span class="rxa-demo-label">Strategy</span>
          <rxa-strategy-select
            (strategyChange)="strategy$.next($event)"
          ></rxa-strategy-select>
        </section>
        <section class="rxa-demo-group">
          <span class="rxa-demo-label">Scroll strategy</span>
          <mat-button-toggle-group
            *rxLet="scrollStrategy$; let viewMode"
            aria-label="Visible Examples"
            [value]="viewMode"
          >
            <mat-button-toggle
              value="fixed"
              (click)="state.set({ scrollStrategy: 'fixed' })"
              >Fixed size
            </mat-button-toggle>
            <mat-button-toggle
              value="dynamic"
              (click)="state.set({ scrollStrategy: 'dynamic' })"
              >Dynamic
            </mat-button-toggle>
            <mat-button-toggle
              value="auto"
              (click)="state.set({ scrollStrategy: 'auto' })"
              >Autosized
            </mat-button-toggle>
          </mat-button-toggle-group>
        </section>
        <section class="rxa-demo-group">
          <span class="rxa-demo-label">rxVirtualFor settings</span>
          <div class="rxa-demo-controls">
            <label class="field">
              <span class="rxa-demo-label">runwayItems</span>
              <input
                class="rxa-demo-input field-input"
                #runwayItemsInput
                placeholder="runwayItems"
                matInput
                min="0"
                value="10"
                (input)="
                  state.set({ runwayItems: toNumber(runwayItemsInput.value) })
                "
                type="number"
              />
            </label>
            <label class="field">
              <span class="rxa-demo-label">runwayItemsOpposite</span>
              <input
                class="rxa-demo-input field-input"
                #runwayItemsOppositeInput
                placeholder="runwayItemsOpposite"
                matInput
                min="0"
                value="10"
                (input)="
                  state.set({
                    runwayItemsOpposite: toNumber(
                      runwayItemsOppositeInput.value
                    ),
                  })
                "
                type="number"
              />
            </label>
          </div>
        </section>
      </div>
      <div class="rxa-viewport-card">
        <ng-container *rxLet="rxVirtualForState$; let state">
          @if (state.scrollStrategy === 'auto') {
            <rx-virtual-scroll-viewport
              #viewport
              autosize
              class="ch-vscroll-viewport"
              [runwayItems]="state.runwayItems"
              [runwayItemsOpposite]="state.runwayItemsOpposite"
              keepScrolledIndexOnPrepend
              [initialScrollIndex]="batchSize - 1"
              (viewRange)="setViewRange($event)"
              (scrolledIndexChange)="scrolled$.next($event)"
            >
              <div
                *rxVirtualFor="
                  let item of messages$;
                  trackBy: trackMessage;
                  renderCallback: viewsRendered$
                "
                class="chat-bubble"
              >
                <div class="chat-bubble-content">
                  <div>{{ item.message.text }}</div>
                  <div>{{ item.sendAt | date }}</div>
                </div>
              </div>
            </rx-virtual-scroll-viewport>
          } @else if (state.scrollStrategy === 'fixed') {
            <rx-virtual-scroll-viewport
              #viewport
              [itemSize]="100"
              class="ch-vscroll-viewport"
              keepScrolledIndexOnPrepend
              [runwayItems]="state.runwayItems"
              [runwayItemsOpposite]="state.runwayItemsOpposite"
              [initialScrollIndex]="batchSize - 1"
              (viewRange)="setViewRange($event)"
              (scrolledIndexChange)="scrolled$.next($event)"
            >
              <div
                *rxVirtualFor="
                  let item of messages$;
                  trackBy: trackMessage;
                  renderCallback: viewsRendered$
                "
                class="chat-bubble fixed"
              >
                <div class="chat-bubble-content">
                  <div>{{ item.message.text }}</div>
                  <div>{{ item.sendAt | date }}</div>
                </div>
              </div>
            </rx-virtual-scroll-viewport>
          } @else {
            <rx-virtual-scroll-viewport
              #viewport
              [dynamic]="dynamicSize"
              class="ch-vscroll-viewport"
              keepScrolledIndexOnPrepend
              [runwayItems]="state.runwayItems"
              [runwayItemsOpposite]="state.runwayItemsOpposite"
              [initialScrollIndex]="batchSize - 1"
              (viewRange)="setViewRange($event)"
              (scrolledIndexChange)="scrolled$.next($event)"
            >
              <div
                *rxVirtualFor="
                  let item of messages$;
                  trackBy: trackMessage;
                  renderCallback: viewsRendered$
                "
                [style.height.px]="dynamicSize(item)"
                class="chat-bubble"
              >
                <div class="chat-bubble-content">
                  <div>{{ item.message.text }}</div>
                  <div>{{ item.sendAt | date }}</div>
                </div>
              </div>
            </rx-virtual-scroll-viewport>
          }
        </ng-container>
      </div>
      <div class="rxa-demo-controls scroll-top-row">
        <button class="btn btn-outline-primary btn-sm" (click)="scrollToTop()">
          Scroll to top
        </button>
      </div>
    </div>

    <!--<div class="notification">
      {{
        lastMessageFetched
          ? 'All messages fetched!'
          : 'Scroll top for more messages (Not all messages fetched!)'
      }}
    </div>-->
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RxVirtualScrollViewportComponent,
    RxVirtualFor,
    AutoSizeVirtualScrollStrategy,
    DynamicSizeVirtualScrollStrategy,
    DatePipe,
    MatButtonToggleModule,
    MatInputModule,
    RxLet,
    StrategySelectModule,
    FixedSizeVirtualScrollStrategy,
    DocsLinkComponent,
  ],
  styles: [
    `
      .field {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      .field-input {
        width: 90px;
      }
      .rxa-viewport-card {
        border: 1px solid var(--rxa-border);
        border-radius: var(--rxa-radius-sm);
        overflow: hidden;
        background: var(--rxa-surface);
        box-shadow: var(--rxa-shadow-sm);
        margin-top: 1rem;
      }
      .scroll-top-row {
        margin-top: 1rem;
      }
      .ch-vscroll-viewport {
        height: 700px;
        overflow-x: hidden;
      }

      .list-item {
        padding: 2em;
        width: 200px;
      }

      ::ng-deep .ch-message-board {
        height: 100%; /* Set height for the message board container */
      }

      .chat-bubble {
        box-sizing: border-box;
        max-height: 500px;
        overflow-y: hidden;
        will-change: transform;
        width: 350px;
        border-bottom: 1px solid var(--rxa-border);
        border-left: 3px solid rgba(var(--rxa-brand-rgb), 0.45);
        background: var(--rxa-surface);
        color: var(--rxa-text);
      }

      .chat-bubble:hover {
        background: var(--rxa-surface-3);
      }

      .chat-bubble-content {
        padding: 0.5em;
        font-size: 0.85rem;
      }

      .chat-bubble.fixed {
        height: 100px;
      }

      .notification {
        margin-top: 1em;
        font-size: 2rem;
        font-weight: 6000;
      }
    `,
  ],
})
export class VirtualForReverseInfiniteScrollComponent {
  state = rxState<{
    data: any[];
    runwayItems: number;
    runwayItemsOpposite: number;
    scrollStrategy: 'fixed' | 'auto' | 'dynamic';
  }>(({ set }) => {
    set({
      runwayItems: 10,
      runwayItemsOpposite: 10,
      scrollStrategy: 'auto',
    });
  });

  dynamicSize = (item: Message) => {
    return item.message.text.length;
  };

  rxVirtualForState$ = this.state.select();

  toNumber = coerceNumberProperty;

  readonly messageService = inject(MessageService);
  readonly scrolled$ = new Subject<number>();
  readonly batchSize = 20;

  strategy$ = new Subject<RxStrategyNames<string>>();
  scrollStrategy$ = this.state.select('scrollStrategy');

  viewRange = { start: 0, end: 0 };
  initialScrollIsStable = false;
  lastMessage: Message | null = null;

  viewsRendered$ = new Subject<any>();

  viewport = viewChild(RxVirtualScrollViewportComponent);

  readonly messages$ = this.scrollStrategy$.pipe(
    switchMap(() => {
      // reset when scroll strategy changes
      this.lastMessage = null;
      this.initialScrollIsStable = false;
      this.viewRange = { start: 0, end: 0 };
      return this.infiniteScroll();
    }),
  );

  setViewRange(range: ListRange) {
    this.viewRange = range;
  }

  private infiniteScroll() {
    return this.scrolled$.pipe(
      switchMap((scrolled) =>
        this.viewsRendered$.pipe(
          map(() => scrolled),
          take(1),
        ),
      ),
      startWith(null),
      exhaustMap((scrolled) => {
        console.log('scrolled', scrolled);
        console.log('range', this.viewRange);
        if (
          scrolled === null ||
          (this.initialScrollIsStable && this.viewRange.start === 0)
        ) {
          return this.messageService.getMessages(
            this.lastMessage,
            this.batchSize,
          );
        }
        if (!this.initialScrollIsStable) {
          this.initialScrollIsStable = this.viewRange.end === this.batchSize;
        }
        return EMPTY;
      }),
      map((messages) => {
        return messages.reduce((acc, cur) => {
          return { ...acc, [cur.id]: cur };
        }, {});
      }),
      scan((acc: any, batch) => {
        const mergedMessages = { ...acc, ...batch };
        return mergedMessages;
      }, {}),
      map((scanResult) => Object.values(scanResult)),
      map((messages: any) => {
        return [
          ...messages.sort((a: Message, b: Message) => a.sendAt - b.sendAt),
        ];
      }),
      tap((messages) => {
        console.log(messages);
        this.lastMessage = messages[0];
      }),
      startWith([]),
    );
  }

  trackMessage = (index: number, message: Message) => {
    return message.id;
  };

  scrollToTop = () => {
    this.viewport()?.scrollToIndex(0);
  };
}
