import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  NgZone,
  QueryList,
  signal,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { coalesceWith } from '@rx-angular/cdk/coalescing';
import { RxState } from '@rx-angular/state';
import { RxFor } from '@rx-angular/template/for';
import { RxLet } from '@rx-angular/template/let';
import {
  BehaviorSubject,
  combineLatest,
  defer,
  merge,
  scheduled,
  Subject,
} from 'rxjs';
import { map, shareReplay, switchMap, switchMapTo } from 'rxjs/operators';
import { asyncScheduler } from 'rxjs-zone-less';
import { Hooks } from '../../../../shared/debug-helper/hooks';
import { StrategySelectModule } from '../../../../shared/debug-helper/strategy-select';
import {
  ArrayProviderService,
  removeItemsImmutable,
  shuffleItemsImmutable,
  TestItem,
} from '../../../../shared/debug-helper/value-provider';
import { ArrayProviderComponent } from '../../../../shared/debug-helper/value-provider/array-provider/array-provider.component';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer/visualizer.module';
import { DocsLinkComponent } from '../../../../shared/docs-link';
import {
  LegacyReconciliationProvider,
  NewReconciliationProvider,
} from '../reconciliation-provider-directives';
import { ListActionItemComponent } from './list-action-item.component';

let itemIdx = 0;

function getNewItem(): TestItem {
  const _idx = itemIdx;
  const i = { id: _idx, value: (itemIdx + 1) * 10 };
  ++itemIdx;
  return i;
}

function getItems(num: number) {
  return new Array(num).fill(null).map((_) => getNewItem());
}

const item0 = getNewItem();
const item1 = getNewItem();
const item2 = getNewItem();
const item3 = getNewItem();
const item4 = getNewItem();
const item5 = getNewItem();
const item6 = getNewItem();
const item7 = getNewItem();
const item8 = getNewItem();
const item9 = getNewItem();
const item10 = getNewItem();
const items10 = [
  item0,
  item1,
  item2,
  item3,
  item4,
  item5,
  item6,
  item7,
  item8,
  item9,
  item10,
];
const items5 = getItems(500);
const items5k = getItems(10);
const firstItems5k = items5k[0];
const lastItems5k = items5k[249];
const items5kSwapped = [...items5k];
items5kSwapped[0] = lastItems5k;
items5kSwapped[249] = firstItems5k;

/*const customChangeSet = [
  [],
  // insert 0,1,2,3,4
  [item0, item1, item2, item3, ...items5],
  // unchanged 0, remove 1, update 2 => 2232, move 3,2
  [item0, item3, { ...item2, value: '2232' }, ...items5],
  [item0, item3, { ...item2, value: '2232' }],
  [],
  // insert 0,1,2,3,4
  [item0, item3, { ...item2, value: '2232' }, ...items5],
  // unchanged 0, remove 1, update 2 => 2232, move 3,2
  [item0, item1, item2, item3, ...items5],
  [item0, item3, { ...item2, value: '2232' }],
  [],
  // insert 0,1,2,3,4
  [item0, ...items5, item1, item2, item3],
  // unchanged 0, remove 1, update 2 => 2232, move 3,2
  [item0, item3, { ...item2, value: '2232' }, ...items5],
  [item0, item3, { ...item2, value: '2232' }],
];*/

/*
 [141, 8191, 8970]
 [8191, 141, 8970]
 [8191, 8970, 141]
 [141, 8970, 8191]
 */
// const items5k
const items5k2 = shuffleItemsImmutable(items5k);
const items5k3 = shuffleItemsImmutable(items5k2);
const items5k4 = shuffleItemsImmutable(items5k3);
const items5k5 = removeItemsImmutable(items5k4, 5);
// const items5k6 = removeItemsImmutable(items5k5, 10);
const customChangeSet = [
  // [],
  [
    item0,
    item1,
    item2,
    item3,
    item4,
    // item5, item6, item7,item8, item9
  ],
  [
    item0,
    item4,
    item2,
    item3,
    item1,
    // item5, item1, item2, item8, item0
  ] /*
  [
    item2, item4, item0, item3, item1,
    // item7, item1, item2, item4, item0
  ],*/,
  [
    item0,
    item1,
    // item5, item6, item7,item8, item9
  ],
  /*[],
  [...items5k],
  [],*/
  // [item0, item1, item3, item4],
  // [item0, item1, item2, item3, item4],
  // [item2, item1, item3, item4, item0],
];

const moveChangeSet1 = [items5k];

@Component({
  selector: 'rxa-rx-for-list-actions',
  standalone: true,
  imports: [
    MatButtonModule,
    MatButtonToggleModule,
    RxLet,
    RxFor,
    VisualizerModule,
    ArrayProviderComponent,
    StrategySelectModule,
    ListActionItemComponent,
    NewReconciliationProvider,
    LegacyReconciliationProvider,
    DocsLinkComponent,
  ],
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <header class="rxa-la-header">
          <div class="rxa-la-title">
            <h2>Reactive Iterable Differ</h2>
            <p class="rxa-la-subtitle">
              Stress-test <code>*rxFor</code> reconciliation with live change
              sets, strategies and filtering.
            </p>
          </div>
          <rxa-docs-link
            docs="packages/template/reference/rx-for"
            source="apps/demos/src/app/features/template/rx-for"
          />
        </header>

        <div class="rxa-la-toolbar">
          <section class="rxa-la-group rxa-la-group--wide">
            <span class="rxa-la-label">Data</span>
            <rxa-array-provider
              [unpatched]=""
              [buttons]="true"
              #arrayP="rxaArrayProvider"
            ></rxa-array-provider>
          </section>

          <section class="rxa-la-group">
            <span class="rxa-la-label">Strategy</span>
            <rxa-strategy-select
              (strategyChange)="strategy$.next($event)"
            ></rxa-strategy-select>
          </section>

          <section class="rxa-la-group">
            <span class="rxa-la-label">View</span>
            <mat-button-toggle-group
              name="visibleExamples"
              *rxLet="view; let viewMode"
              aria-label="Visible Examples"
              [value]="viewMode"
              #group="matButtonToggleGroup"
            >
              <mat-button-toggle value="tile" (click)="view.next('tile')"
                >Tile
              </mat-button-toggle>
              <mat-button-toggle value="list" (click)="view.next('list')"
                >List
              </mat-button-toggle>
            </mat-button-toggle-group>
          </section>

          <section class="rxa-la-group">
            <span class="rxa-la-label">Reconciler</span>
            <mat-button-toggle-group
              [value]="reconciler()"
              #group="matButtonToggleGroup"
            >
              <mat-button-toggle
                value="experimental"
                (click)="reconciler.set('experimental')"
                >experimental
              </mat-button-toggle>
              <mat-button-toggle
                value="legacy"
                (click)="reconciler.set('legacy')"
                >legacy
              </mat-button-toggle>
            </mat-button-toggle-group>
          </section>

          <section class="rxa-la-group">
            <span class="rxa-la-label">Change sets</span>
            <div class="rxa-la-btn-row">
              <button
                class="btn btn-outline-primary btn-sm"
                (click)="triggerChangeSet.next()"
              >
                ChangeSet
              </button>
              <button
                class="btn btn-outline-primary btn-sm"
                (click)="triggerMoveSet.next()"
              >
                MoveSet
              </button>
              <button
                class="btn btn-outline-primary btn-sm"
                (click)="triggerMoveSetSwapped.next()"
              >
                MoveSet Swapped
              </button>
            </div>
          </section>
        </div>

        <div class="rxa-la-subbar">
          <div class="rxa-la-filter">
            <svg
              class="rxa-la-filter-icon"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"
              />
            </svg>
            <input
              class="rxa-la-filter-input"
              type="text"
              placeholder="Filter by value…"
              #searchInput
              (input)="filter$.next(searchInput.value)"
            />
          </div>
          <div class="rxa-la-rendered" *rxLet="rendered$; let rendered">
            <span class="rxa-la-rendered-label">Rendered</span>
            <span class="rxa-la-rendered-value">{{ rendered }}</span>
          </div>
        </div>
      </ng-container>
      <div class="d-flex flex-column justify-content-start w-100">
        <div
          class="work-container d-flex flex-wrap w-100"
          [class.list-view]="viewMode === 'list'"
          *rxLet="view; let viewMode"
        >
          @if (reconciler() === 'experimental') {
            <ng-container provideExperimentalReconciliation>
              <div
                #workChild
                class="work-child d-flex"
                *rxFor="
                  let a of data$;
                  let index = index;
                  let count = count;
                  let even = even;
                  let odd = odd;
                  let first = first;
                  let last = last;
                  renderCallback: renderCallback;
                  trackBy: trackById;
                  strategy: strategy$
                "
                [title]="a.id + '_' + index + '_' + count"
                [class.even]="even"
              >
                <list-action-item>
                  <div class="child-bg" [style.background]="color(a)"></div>
                  <!--<div class="child-bg" [class.even]="even"></div>-->
                  <div class="child-context flex-column flex-wrap">
                    <button (click)="clickMe()">click me</button>
                    <!--<small>{{ a }}</small>-->
                    <small>id: {{ a.id }}</small>
                    <small>value: {{ a.value }}</small>
                    <small>index: {{ index }}</small>
                    <small>count: {{ count }}</small>
                    <small>even: {{ even }}</small>
                    <small>odd: {{ odd }}</small>
                    <small>first: {{ first }}</small>
                    <small>last: {{ last }}</small>
                  </div>
                </list-action-item>
              </div>
            </ng-container>
          } @else {
            <ng-container provideLegacyReconciliation>
              <div
                #workChild
                class="work-child d-flex"
                *rxFor="
                  let a of data$;
                  let index = index;
                  let count = count;
                  let even = even;
                  let odd = odd;
                  let first = first;
                  let last = last;
                  renderCallback: renderCallback;
                  trackBy: trackById;
                  strategy: strategy$
                "
                [title]="a.id + '_' + index + '_' + count"
                [class.even]="even"
              >
                <list-action-item>
                  <div class="child-bg" [style.background]="color(a)"></div>
                  <!--<div class="child-bg" [class.even]="even"></div>-->
                  <div class="child-context flex-column flex-wrap">
                    <button (click)="clickMe()">click me</button>
                    <!--<small>{{ a }}</small>-->
                    <small>id: {{ a.id }}</small>
                    <small>value: {{ a.value }}</small>
                    <small>index: {{ index }}</small>
                    <small>count: {{ count }}</small>
                    <small>even: {{ even }}</small>
                    <small>odd: {{ odd }}</small>
                    <small>first: {{ first }}</small>
                    <small>last: {{ last }}</small>
                  </div>
                </list-action-item>
              </div>
            </ng-container>
          }
        </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ArrayProviderService],
  styles: [
    `
      /* ---- Header ---------------------------------------------------- */
      .rxa-la-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1rem;
        flex-wrap: wrap;
        margin-bottom: 1rem;
      }

      .rxa-la-title h2 {
        margin: 0 0 0.25rem;
        font-size: 1.35rem;
      }

      .rxa-la-subtitle {
        margin: 0;
        max-width: 60ch;
        color: var(--rxa-text-muted);
        font-size: 0.9rem;
        line-height: 1.5;
      }

      /* ---- Toolbar --------------------------------------------------- */
      .rxa-la-toolbar {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        padding: 1rem;
        border: 1px solid var(--rxa-border);
        border-radius: var(--rxa-radius);
        background: var(--rxa-surface-2);
      }

      .rxa-la-group {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        padding: 0.6rem 0.75rem;
        border: 1px solid var(--rxa-border);
        border-radius: var(--rxa-radius-sm);
        background: var(--rxa-surface);
      }

      .rxa-la-group--wide {
        flex: 1 1 100%;
      }

      .rxa-la-label {
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--rxa-text-muted);
      }

      .rxa-la-btn-row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
      }

      /* Tighten Material controls that live inside the toolbar groups */
      .rxa-la-group rxa-array-provider p {
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--rxa-text-muted);
        margin: 0.25rem 0;
      }

      /* ---- Sub bar: filter + rendered counter ------------------------ */
      .rxa-la-subbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 0.75rem;
        margin-top: 1rem;
      }

      .rxa-la-filter {
        position: relative;
        display: flex;
        align-items: center;
        flex: 1 1 260px;
        max-width: 420px;
      }

      .rxa-la-filter-icon {
        position: absolute;
        left: 0.7rem;
        color: var(--rxa-text-muted);
        pointer-events: none;
      }

      .rxa-la-filter-input {
        width: 100%;
        font-family: inherit;
        font-size: 0.9rem;
        color: var(--rxa-text);
        background: var(--rxa-surface);
        border: 1px solid var(--rxa-border-strong);
        border-radius: var(--rxa-radius-sm);
        padding: 0.5rem 0.7rem 0.5rem 2.2rem;
        transition:
          border-color 0.15s ease,
          box-shadow 0.15s ease;
      }

      .rxa-la-filter-input:focus {
        outline: none;
        border-color: var(--rxa-brand);
        box-shadow: var(--rxa-ring);
      }

      .rxa-la-rendered {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.35rem 0.5rem 0.35rem 0.75rem;
        border: 1px solid var(--rxa-border);
        border-radius: var(--rxa-radius-pill);
        background: var(--rxa-surface);
        box-shadow: var(--rxa-shadow-sm);
      }

      .rxa-la-rendered-label {
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--rxa-text-muted);
      }

      .rxa-la-rendered-value {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 1.75rem;
        height: 1.75rem;
        padding: 0 0.5rem;
        border-radius: var(--rxa-radius-pill);
        background: var(--rxa-brand);
        color: #fff;
        font-size: 0.85rem;
        font-weight: 700;
        font-variant-numeric: tabular-nums;
      }

      /* ---- Work area ------------------------------------------------- */
      .work-container {
        gap: 2px;
      }

      .work-container.list-view {
        flex-direction: column;
        gap: 0;
      }

      .work-container.list-view .work-child {
        width: 100%;
        height: 65px;
        margin: 0.4rem 0;
        padding: 0.5rem;
        border: 1px solid var(--rxa-border);
        border-radius: var(--rxa-radius-sm);
        background: var(--rxa-surface) !important;
        box-shadow: var(--rxa-shadow-sm);
        outline: none;
        transition:
          border-color 0.12s ease,
          box-shadow 0.12s ease;
      }

      .work-container.list-view .work-child:hover {
        border-color: var(--rxa-border-strong);
        box-shadow: var(--rxa-shadow);
      }

      .work-container.list-view .work-child.even {
        outline: none;
        border-left: 3px solid var(--rxa-brand);
      }

      .child-context {
        display: none;
      }

      .work-container.list-view .work-child .child-context {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        align-content: center;
        gap: 0.15rem 1.1rem;
        width: 100%;
        font-size: 0.72rem;
        color: var(--rxa-text-muted);
      }

      .work-container.list-view .work-child .child-context small {
        white-space: nowrap;
        font-variant-numeric: tabular-nums;
      }

      .work-container.list-view .work-child .child-context button {
        flex: 0 0 100%;
        align-self: flex-start;
        font-family: inherit;
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--rxa-brand);
        background: rgba(var(--rxa-brand-rgb), 0.08);
        border: 1px solid rgba(var(--rxa-brand-rgb), 0.25);
        border-radius: var(--rxa-radius-sm);
        padding: 0.2rem 0.55rem;
        margin-bottom: 0.25rem;
        cursor: pointer;
        transition: background-color 0.12s ease;
      }

      .work-container.list-view .work-child .child-context button:hover {
        background: rgba(var(--rxa-brand-rgb), 0.16);
      }

      .work-container.list-view .work-child .child-bg {
        margin-right: 0.75rem;
        width: 50px;
        position: relative;
        border-radius: var(--rxa-radius-sm);
        flex: 0 0 auto;
      }

      /* Tile view — compact heat-map of rendered items */
      .work-child {
        position: relative;
        width: 12px;
        height: 12px;
        margin: 0;
        padding: 0px;
        border-radius: 3px;
        outline: 1px solid var(--rxa-border);
        background-color: transparent;
      }

      .work-child.even {
        outline: 1px solid var(--rxa-border-strong);
      }

      .work-child .child-bg {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 3px;
      }

      .work-child .child-bg.even {
        background-color: var(--rxa-brand);
      }
      .work-child.broken {
        outline: 2px solid var(--rxa-danger);
      }
    `,
  ],
})
export class ListActionsComponent extends Hooks implements AfterViewInit {
  state = inject<RxState<any>>(RxState);
  cdRef = inject(ChangeDetectorRef);

  @ViewChild('arrayP', { read: ArrayProviderComponent, static: true })
  arrayP: ArrayProviderComponent;

  @ViewChildren('workChild') workChildren: QueryList<ElementRef<HTMLElement>>;

  private numRendered = 0;

  readonly view = new BehaviorSubject<'list' | 'tile'>('list');
  readonly reconciler = signal<'experimental' | 'legacy'>('experimental');
  readonly filter$ = new BehaviorSubject<string>('');
  readonly triggerChangeSet = new Subject<void>();
  readonly activeChangeSet$ = this.triggerChangeSet.pipe(
    switchMapTo(scheduled(customChangeSet, asyncScheduler)),
    // tap((data) => console.log(data))
  );

  readonly triggerMoveSet = new Subject<void>();
  readonly triggerMoveSetSwapped = new Subject<void>();
  readonly activeMoveSet$ = merge(
    this.triggerMoveSet.pipe(switchMap(() => [items5k])),
    this.triggerMoveSetSwapped.pipe(switchMap(() => [items5kSwapped])),
  );

  readonly data$ = defer(() =>
    combineLatest([
      merge(this.arrayP.array$, this.activeChangeSet$, this.activeMoveSet$),
      this.filter$,
    ]).pipe(
      map(([items, search]) => {
        return items.filter((item) =>
          (item.value * 100).toString().startsWith(search),
        );
      }),
    ),
  ).pipe(shareReplay(1));
  readonly renderCallback = new Subject();
  readonly rendered$ = this.renderCallback.pipe(map(() => ++this.numRendered));
  readonly viewBroken$ = this.renderCallback.pipe(
    coalesceWith(scheduled([], asyncScheduler), (this.cdRef as any).context),
    map(() => {
      const children = Array.from(
        document.getElementsByClassName('work-child'),
      );
      let broken = false;
      let i = 0;
      for (const child of children) {
        const even = i % 2 === 0;
        if (
          (even && !child.classList.contains('even')) ||
          (!even && child.classList.contains('even'))
        ) {
          broken = true;
          child.classList.add('broken');
          break;
        }
        i++;
      }
      return broken;
    }),
  );
  strategy$ = new Subject<string>();
  customChangeSet = customChangeSet;
  customChangeSet$ = new Subject<any>();

  trackById = (idx, item) => {
    return item.id;
  };

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.state.hold(this.workChildren.changes, (workChildren) => {
      // console.log('workChildren', this.workChildren.toArray());
    });
  }

  clickMe() {
    console.log('clicked in angular zone', NgZone.isInAngularZone());
  }

  trackByIdFn = (a) => a.id;

  color(a) {
    return '#' + Math.floor(a.value * 16777215).toString(16);
  }
}
