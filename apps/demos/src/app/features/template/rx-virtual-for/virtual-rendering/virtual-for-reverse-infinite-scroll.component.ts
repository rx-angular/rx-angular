import { coerceNumberProperty } from '@angular/cdk/coercion';
import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { RxStrategyNames } from '@rx-angular/cdk/render-strategies';
import { rxState } from '@rx-angular/state';
import { toObservable } from '@angular/core/rxjs-interop';
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
import {
  combineLatest,
  defer,
  exhaustMap,
  fromEvent,
  merge,
  of,
  Subject,
} from 'rxjs';
import {
  filter,
  finalize,
  map,
  scan,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import { StrategySelectModule } from '../../../../shared/debug-helper/strategy-select/index';
import { DocsLinkComponent } from '../../../../shared/docs-link';
import { Message, MessageService } from './messages/messages.service';

const LOADER_ID = '__loading-older__';
const LOADER_ROW = {
  id: LOADER_ID,
  message: { text: '' },
  sendAt: 0,
} as unknown as Message;

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
          <span class="rxa-demo-label">Loading row</span>
          <mat-button-toggle-group
            [value]="showLoadingRow()"
            aria-label="Loading row"
          >
            <mat-button-toggle [value]="true" (click)="showLoadingRow.set(true)"
              >On
            </mat-button-toggle>
            <mat-button-toggle
              [value]="false"
              (click)="showLoadingRow.set(false)"
              >Off
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
                [value]="runwayItems()"
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
                [value]="runwayItemsOpposite()"
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
      @if (reachedBeginning()) {
        <p class="history-done" role="status">Beginning of conversation</p>
      }
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
              [initialScrollIndex]="batchSize() - 1"
              (viewRange)="setViewRange($event)"
              (scrolledIndexChange)="scrolled$.next($event)"
            >
              <div
                *rxVirtualFor="
                  let item of rows$;
                  trackBy: trackMessage;
                  renderCallback: viewsRendered$
                "
                class="chat-bubble"
              >
                <div class="chat-bubble-content">
                  @if (item.id === LOADER_ID) {
                    <span class="loading-row">
                      <span class="spinner" aria-hidden="true"></span>
                      Loading older messages…
                    </span>
                  } @else {
                    <div>{{ item.message.text }}</div>
                    <div>{{ item.sendAt | date }}</div>
                  }
                </div>
              </div>
            </rx-virtual-scroll-viewport>
          } @else if (state.scrollStrategy === 'fixed') {
            <rx-virtual-scroll-viewport
              #viewport
              [itemSize]="300"
              class="ch-vscroll-viewport"
              keepScrolledIndexOnPrepend
              [runwayItems]="state.runwayItems"
              [runwayItemsOpposite]="state.runwayItemsOpposite"
              [initialScrollIndex]="batchSize() - 1"
              (viewRange)="setViewRange($event)"
              (scrolledIndexChange)="scrolled$.next($event)"
            >
              <div
                *rxVirtualFor="
                  let item of rows$;
                  trackBy: trackMessage;
                  renderCallback: viewsRendered$;
                  let i = index
                "
                class="chat-bubble fixed"
              >
                <div class="chat-bubble-content">
                  @if (item.id === LOADER_ID) {
                    <span class="loading-row">
                      <span class="spinner" aria-hidden="true"></span>
                      Loading older messages…
                    </span>
                  } @else {
                    @for (w of work; track w) {
                      <div></div>
                    }
                    <div>{{ i }}</div>
                    <div>{{ item.message.text }}</div>
                    <div>{{ item.sendAt | date }}</div>
                  }
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
              [initialScrollIndex]="batchSize() - 1"
              (viewRange)="setViewRange($event)"
              (scrolledIndexChange)="scrolled$.next($event)"
            >
              <div
                *rxVirtualFor="
                  let item of rows$;
                  trackBy: trackMessage;
                  renderCallback: viewsRendered$
                "
                [style.height.px]="dynamicSize(item)"
                class="chat-bubble"
              >
                <div class="chat-bubble-content">
                  @if (item.id === LOADER_ID) {
                    <span class="loading-row">
                      <span class="spinner" aria-hidden="true"></span>
                      Loading older messages…
                    </span>
                  } @else {
                    @for (w of work; track w) {
                      <div></div>
                    }
                    <div>{{ item.message.text }}</div>
                    <div>{{ item.sendAt | date }}</div>
                  }
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
        position: relative;
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
        height: 300px;
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
        outline: 1px solid red;
      }

      .chat-bubble:hover {
        background: var(--rxa-surface-3);
      }

      .chat-bubble-content {
        padding: 0.5em;
        font-size: 0.85rem;
      }

      .chat-bubble.fixed {
        height: 300px;
      }

      /*
       * The loading indicator is a row *inside* the scrollable content, the way
       * chat clients usually do it. That means it changes the content geometry
       * twice - it is inserted ahead of the anchor while the request runs and
       * removed again when the batch replaces it - which is exactly what
       * keepScrolledIndexOnPrepend has to net out.
       */
      .loading-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        height: 100%;
        font-size: 0.8rem;
        color: var(--rxa-text-muted, var(--rxa-text));
      }

      .history-done {
        margin: 0.75rem 0 0;
        font-size: 0.85rem;
        font-style: italic;
        color: var(--rxa-text-muted, var(--rxa-text));
      }

      .spinner {
        width: 0.85em;
        height: 0.85em;
        border-radius: 50%;
        border: 2px solid rgba(var(--rxa-brand-rgb), 0.35);
        border-top-color: rgb(var(--rxa-brand-rgb));
        animation: history-spin 0.7s linear infinite;
      }

      @keyframes history-spin {
        to {
          transform: rotate(360deg);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .spinner {
          animation-duration: 2s;
        }
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
      runwayItems: 2,
      runwayItemsOpposite: 2,
      scrollStrategy: 'auto',
    });
  });

  dynamicSize = (item: Message) => {
    return item.id === LOADER_ID ? 80 : Math.min(500, item.message.text.length);
  };

  rxVirtualForState$ = this.state.select();

  toNumber = coerceNumberProperty;

  readonly messageService = inject(MessageService);
  readonly scrolled$ = new Subject<number>();
  runwayItems = this.state.signal('runwayItems');
  runwayItemsOpposite = this.state.signal('runwayItemsOpposite');
  readonly batchSize = this.state.computed(
    ({ runwayItemsOpposite }) => runwayItemsOpposite() * 2,
  );
  work = new Array(1).fill(0).map((_, i) => i);

  strategy$ = new Subject<RxStrategyNames<string>>();
  scrollStrategy$ = this.state.select('scrollStrategy');

  viewRange = { start: 0, end: 0 };
  readonly viewRange$ = new Subject<ListRange>();
  lastMessage: Message | null = null;

  viewsRendered$ = new Subject<any>();

  protected readonly LOADER_ID = LOADER_ID;

  /** render the loading indicator as a row inside the list */
  readonly showLoadingRow = signal(true);

  /** a history request is in flight */
  readonly loadingOlder = signal(false);
  /** the backend ran out of older messages */
  readonly reachedBeginning = signal(false);

  viewport = viewChild(RxVirtualScrollViewportComponent);
  /** re-emits whenever the strategy switch swaps the viewport instance */
  private readonly viewport$ = toObservable(this.viewport);

  readonly messages$ = this.scrollStrategy$.pipe(
    switchMap(() => {
      // reset when scroll strategy changes
      this.lastMessage = null;
      this.viewRange = { start: 0, end: 0 };
      this.loadingOlder.set(false);
      this.reachedBeginning.set(false);
      return this.infiniteScroll();
    }),
  );

  setViewRange(range: ListRange) {
    this.viewRange = range;
    this.viewRange$.next(range);
  }

  private infiniteScroll() {
    return merge(
      // the initial history request
      of(null),
      /*
       * Follow-up requests need actual user *input*: passive scroll changes
       * (initial scroll, prepend compensations, measurement corrections) must
       * never trigger a request, otherwise a fresh page chain-loads on its
       * own. Two gestures express "give me older messages":
       * - wheel/trackpad upwards - this also fires while the scroll position
       *   is already clamped at the very top, where no scroll events exist
       * - dragging the scrollbar (or keyboard-scrolling) to the very top
       * During the initial request the `loadingOlder` guard below absorbs
       * premature gestures.
       */
      this.viewport$.pipe(
        filter(
          (viewport): viewport is RxVirtualScrollViewportComponent =>
            !!viewport,
        ),
        switchMap((viewport) => {
          const scrollElement = viewport.getScrollElement();
          let lastScrollTop = scrollElement.scrollTop;
          let lastWheel = 0;
          return merge(
            fromEvent<WheelEvent>(scrollElement, 'wheel').pipe(
              filter((e) => e.deltaY < 0),
              /*
               * one trigger per *gesture*: a trackpad fling keeps emitting
               * wheel events for seconds (momentum) - only the first event
               * after a quiet period counts, otherwise a single fling at the
               * top chain-loads batch after batch
               */
              filter(() => {
                const now = Date.now();
                const isGestureStart = now - lastWheel > 400;
                lastWheel = now;
                return isGestureStart;
              }),
            ),
            fromEvent(scrollElement, 'scroll').pipe(
              filter(() => {
                const scrollTop = scrollElement.scrollTop;
                const scrolledUp = scrollTop < lastScrollTop;
                lastScrollTop = scrollTop;
                return scrolledUp && scrollTop === 0;
              }),
            ),
          );
        }),
        filter(() => this.viewRange.start === 0),
      ),
    ).pipe(
      filter(() => !this.reachedBeginning() && !this.loadingOlder()),
      exhaustMap(() => this.loadOlderMessages()),
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
        this.lastMessage = messages[0];
      }),
      startWith([]),
    );
  }

  /**
   * Fetches the next page of history while reflecting the request in the UI,
   * the way a real client would.
   */
  private loadOlderMessages() {
    return defer(() => {
      this.loadingOlder.set(true);
      return this.messageService.getMessages(
        this.lastMessage,
        this.batchSize(),
      );
    }).pipe(
      tap((batch) => {
        if (!batch.length) {
          this.reachedBeginning.set(true);
        }
      }),
      finalize(() => this.loadingOlder.set(false)),
    );
  }

  /**
   * What actually gets rendered: the messages plus, while a request is running,
   * a transient loading row at the very top.
   */
  readonly rows$ = combineLatest([
    this.messages$,
    toObservable(this.loadingOlder),
    toObservable(this.showLoadingRow),
  ]).pipe(
    map(([messages, loading, showRow]) =>
      // only for *history* requests - during the initial load there is nothing
      // to anchor to yet, and a lone loading row would consume the
      // initialScrollIndex before the first messages arrive
      loading && showRow && messages.length > 0
        ? [LOADER_ROW, ...messages]
        : messages,
    ),
  );

  trackMessage = (index: number, message: Message) => {
    return message.id;
  };

  scrollToTop = () => {
    this.viewport()?.scrollToIndex(0);
  };
}
