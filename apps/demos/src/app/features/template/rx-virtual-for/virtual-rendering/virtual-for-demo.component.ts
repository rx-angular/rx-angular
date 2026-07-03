import { ScrollingModule as AutosizedScrollingModule } from '@angular/cdk-experimental/scrolling';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { RxStrategyNames } from '@rx-angular/cdk/render-strategies';
import { RxState } from '@rx-angular/state';
import { RxIf } from '@rx-angular/template/if';
import { RxLet } from '@rx-angular/template/let';
import {
  AutoSizeVirtualScrollStrategy,
  DynamicSizeVirtualScrollStrategy,
  FixedSizeVirtualScrollStrategy,
  RxVirtualFor,
  RxVirtualScrollViewportComponent,
} from '@rx-angular/template/virtual-scrolling';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArrayProviderComponent } from '../../../../shared/debug-helper/value-provider/array-provider/array-provider.component';
import { TestItem } from '../../../../shared/debug-helper/value-provider/index';
import { StrategySelectModule } from '../../../../shared/debug-helper/strategy-select/index';
import { DocsLinkComponent } from '../../../../shared/docs-link';

@Component({
  selector: 'rxa-virtual-for-feature-showcase',
  standalone: true,
  imports: [
    CommonModule,
    AutosizedScrollingModule,
    ScrollingModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    RxIf,
    RxLet,
    RxVirtualFor,
    RxVirtualScrollViewportComponent,
    FixedSizeVirtualScrollStrategy,
    DynamicSizeVirtualScrollStrategy,
    AutoSizeVirtualScrollStrategy,
    ArrayProviderComponent,
    StrategySelectModule,
    DocsLinkComponent,
  ],
  template: `
    <div class="container vf-showcase">
      <header class="vf-header">
        <div>
          <h2>Virtual Rendering</h2>
          <p class="vf-subtitle">
            Compare RxAngular's <code>*rxVirtualFor</code> with the CDK's
            <code>*cdkVirtualFor</code> across fixed, dynamic and autosized
            scroll strategies.
          </p>
        </div>
        <rxa-docs-link
          docs="packages/template/reference/rx-virtual-for"
          source="apps/demos/src/app/features/template/rx-virtual-for"
        />
      </header>

      <div class="vf-toolbar">
        <section class="vf-group">
          <span class="vf-label">Strategy</span>
          <rxa-strategy-select
            (strategyChange)="strategy$.next($event)"
          ></rxa-strategy-select>
        </section>
        <section class="vf-group">
          <span class="vf-label">Scroll strategy</span>
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
        <section class="vf-group">
          <span class="vf-label">Components</span>
          <mat-button-toggle-group
            *rxLet="components$; let components"
            aria-label="Visible Examples"
            [value]="components"
          >
            <mat-button-toggle value="rxa" (click)="components$.next('rxa')"
              >rxVirtualFor
            </mat-button-toggle>
            <mat-button-toggle value="cdk" (click)="components$.next('cdk')"
              >cdkVirtualFor
            </mat-button-toggle>
            <mat-button-toggle value="both" (click)="components$.next('both')"
              >Both
            </mat-button-toggle>
          </mat-button-toggle-group>
        </section>
        <section class="vf-group" *rxIf="showRxa$">
          <span class="vf-label">rxVirtualFor settings</span>
          <div class="vf-fields">
            <label class="vf-field">
              <span>runwayItems</span>
              <input
                class="vf-input"
                #runwayItemsInput
                placeholder="runwayItems"
                min="0"
                value="20"
                (input)="
                  state.set({ runwayItems: toNumber(runwayItemsInput.value) })
                "
                type="number"
              />
            </label>
            <label class="vf-field">
              <span>runwayItemsOpposite</span>
              <input
                class="vf-input"
                #runwayItemsOppositeInput
                placeholder="runwayItemsOpposite"
                min="0"
                value="5"
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

      <section class="vf-group vf-group--wide">
        <span class="vf-label">Data</span>
        <rxa-array-provider
          numberOfItems="1000"
          [initialNumberOfItems]="1000"
          [unpatched]="[]"
          [buttons]="true"
        ></rxa-array-provider>
      </section>

      <div class="vf-columns">
        <div class="vf-col demo-card" *rxIf="showRxa$">
          <div class="vf-col-head">
            <h3>*rxVirtualFor</h3>
            <span class="vf-badge vf-badge--brand">RxAngular</span>
          </div>
          <div class="vf-scrollto">
            <input
              class="vf-input vf-input--wide"
              #scrollToInput
              placeholder="scrollToIndex"
              type="number"
            />
            <button
              class="btn btn-outline-primary btn-sm"
              (click)="scrollToIndex(scrollToInput.value)"
            >
              Scroll to
            </button>
            <input
              class="vf-input vf-input--wide"
              #initialScrollToInput
              [value]="initialScrollTo"
              (change)="setInitialScrollTo(initialScrollToInput.valueAsNumber)"
              placeholder="initialScrollTo"
              type="number"
            />
          </div>
          <div class="vf-stats">
            <div class="vf-stat">
              <span class="vf-stat-label">Items</span>
              <span class="vf-stat-value" *rxLet="data$; let data">{{
                data.length
              }}</span>
            </div>
            <div class="vf-stat">
              <span class="vf-stat-label">Rendered</span>
              <span
                class="vf-stat-value"
                *rxLet="renderedItems$; let renderedItems"
                >{{ renderedItems }}</span
              >
            </div>
            <div class="vf-stat">
              <span class="vf-stat-label">Scrolled index</span>
              <span class="vf-stat-value" *rxLet="rxaScrolledIndex$; let idx">{{
                idx
              }}</span>
            </div>
          </div>
          <div class="vf-viewport-wrap">
            <ng-container *rxLet="rxVirtualForState$; let state">
              @if (state.scrollStrategy === 'fixed') {
                <rx-virtual-scroll-viewport
                  (scrolledIndexChange)="rxaScrolledIndex$.next($event)"
                  [initialScrollIndex]="initialScrollTo"
                  [itemSize]="itemSize"
                  [runwayItemsOpposite]="state.runwayItemsOpposite"
                  [runwayItems]="state.runwayItems"
                  class="viewport"
                >
                  <div
                    *rxVirtualFor="
                      let item of data$;
                      let i = index;
                      trackBy: trackItem;
                      renderCallback: rendered;
                      strategy: $any(strategy$)
                    "
                    class="item"
                    [style.height.px]="itemSize"
                  >
                    {{ i }} {{ item.content }}
                  </div>
                </rx-virtual-scroll-viewport>
              }
              @if (state.scrollStrategy === 'auto') {
                <rx-virtual-scroll-viewport
                  (scrolledIndexChange)="rxaScrolledIndex$.next($event)"
                  autosize
                  [initialScrollIndex]="initialScrollTo"
                  withSyncScrollbar
                  [resizeObserverConfig]="{
                    extractSize: extractSize,
                  }"
                  [runwayItemsOpposite]="state.runwayItemsOpposite"
                  [runwayItems]="state.runwayItems"
                  class="viewport"
                >
                  <div
                    *rxVirtualFor="
                      let item of data$;
                      let i = index;
                      trackBy: trackItem;
                      renderCallback: rendered;
                      strategy: $any(strategy$)
                    "
                    class="item"
                    #div
                  >
                    <div class="content">{{ i }} {{ item.content }}</div>
                    <!--<div *rxLet="[]" class="content">
                    {{ i }} {{ item.content }}
                  </div>
                  <div *rxLet="[]" class="content">
                    {{ i }} {{ item.content }}
                  </div>
                  <div *rxLet="[]" class="content">
                    {{ i }} {{ item.content }}
                  </div>
                  <div *rxLet="[]" class="content">
                    {{ i }} {{ item.content }}
                  </div>
                  <div *rxLet="[]" class="content">
                    {{ i }} {{ item.content }}
                  </div>
                  <div *rxLet="[]" class="content">
                    {{ i }} {{ item.content }}
                  </div>-->
                    <!--<button (click)="div.style.height = '170px'">
                  change size
                </button>-->
                  </div>
                </rx-virtual-scroll-viewport>
              }
              @if (state.scrollStrategy === 'dynamic') {
                <rx-virtual-scroll-viewport
                  (scrolledIndexChange)="rxaScrolledIndex$.next($event)"
                  [dynamic]="dynamicSize"
                  [initialScrollIndex]="initialScrollTo"
                  [runwayItemsOpposite]="state.runwayItemsOpposite"
                  [runwayItems]="state.runwayItems"
                  class="viewport"
                >
                  <div
                    [style.height.px]="dynamicSize(item)"
                    *rxVirtualFor="
                      let item of data$;
                      let i = index;
                      trackBy: trackItem;
                      renderCallback: rendered;
                      strategy: $any(strategy$)
                    "
                    class="item"
                    #div
                  >
                    <div class="overflow-hidden">
                      {{ i }} {{ item.content }}
                    </div>
                    <!--<button (click)="div.style.height = '170px'">
                change size
              </button>-->
                  </div>
                </rx-virtual-scroll-viewport>
              }
            </ng-container>
          </div>
        </div>
        <div class="vf-col demo-card" *rxIf="showCdk$">
          <div class="vf-col-head">
            <h3>*cdkVirtualFor</h3>
            <span class="vf-badge vf-badge--accent">Angular CDK</span>
          </div>
          <div class="vf-scrollto">
            <input
              class="vf-input vf-input--wide"
              #scrollToInput
              placeholder="scrollToIndex"
              type="number"
            />
            <button
              class="btn btn-outline-secondary btn-sm"
              (click)="scrollToCdkIndex(scrollToInput.value)"
            >
              Scroll to
            </button>
          </div>
          <div class="vf-stats">
            <div class="vf-stat">
              <span class="vf-stat-label">Items</span>
              <span class="vf-stat-value" *rxLet="data$; let data">{{
                data.length
              }}</span>
            </div>
            <div class="vf-stat">
              <span class="vf-stat-label">Rendered</span>
              <span class="vf-stat-value">N/A</span>
            </div>
            <div class="vf-stat">
              <span class="vf-stat-label">Scrolled index</span>
              <span class="vf-stat-value" *rxLet="cdkScrolledIndex$; let idx">{{
                idx
              }}</span>
            </div>
          </div>
          <div class="vf-viewport-wrap">
            <ng-container *rxLet="scrollStrategy$; let viewMode">
              @if (viewMode === 'fixed') {
                <cdk-virtual-scroll-viewport
                  (scrolledIndexChange)="cdkScrolledIndex$.next($event)"
                  class="viewport"
                  [itemSize]="itemSize"
                >
                  <div
                    *cdkVirtualFor="
                      let item of data$;
                      let i = index;
                      trackBy: trackItem
                    "
                    class="item cdk"
                    [style.height.px]="itemSize"
                  >
                    {{ i }} {{ item.content }}
                  </div>
                </cdk-virtual-scroll-viewport>
              }
              @if (viewMode === 'auto') {
                <cdk-virtual-scroll-viewport class="viewport" autosize>
                  <div
                    *cdkVirtualFor="
                      let item of data$;
                      let i = index;
                      trackBy: trackItem
                    "
                    class="item cdk"
                  >
                    {{ i }} {{ item.content }}
                  </div>
                </cdk-virtual-scroll-viewport>
              }
            </ng-container>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .vf-showcase {
        padding-bottom: 2rem;
      }

      /* Header */
      .vf-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1rem;
        flex-wrap: wrap;
        margin: 0.5rem 0 1rem;
      }
      .vf-header h2 {
        margin: 0 0 0.25rem;
        font-size: 1.5rem;
      }
      .vf-subtitle {
        margin: 0;
        max-width: 70ch;
        color: var(--rxa-text-muted);
        font-size: 0.9rem;
        line-height: 1.5;
      }

      /* Toolbar of grouped controls */
      .vf-toolbar {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        padding: 1rem;
        border: 1px solid var(--rxa-border);
        border-radius: var(--rxa-radius);
        background: var(--rxa-surface-2);
      }
      .vf-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 0.6rem 0.75rem;
        border: 1px solid var(--rxa-border);
        border-radius: var(--rxa-radius-sm);
        background: var(--rxa-surface);
      }
      .vf-group--wide {
        margin-top: 1rem;
      }
      .vf-label {
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--rxa-text-muted);
      }

      .vf-fields {
        display: flex;
        gap: 0.75rem;
      }
      .vf-field {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        font-size: 0.72rem;
        font-weight: 600;
        color: var(--rxa-text-muted);
      }
      .vf-input {
        width: 90px;
        font-family: inherit;
        font-size: 0.85rem;
        color: var(--rxa-text);
        background: var(--rxa-surface);
        border: 1px solid var(--rxa-border-strong);
        border-radius: var(--rxa-radius-sm);
        padding: 0.35rem 0.5rem;
      }
      .vf-input--wide {
        width: 150px;
      }
      .vf-input:focus {
        outline: none;
        border-color: var(--rxa-brand);
        box-shadow: var(--rxa-ring);
      }

      /* Comparison columns */
      .vf-columns {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-top: 1rem;
        align-items: flex-start;
      }
      .vf-col {
        flex: 1 1 320px;
        padding: 1rem;
      }
      .vf-col-head {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.75rem;
      }
      .vf-col-head h3 {
        margin: 0;
        font-size: 1.05rem;
      }
      .vf-badge {
        font-size: 0.65rem;
        font-weight: 700;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        padding: 0.2rem 0.5rem;
        border-radius: var(--rxa-radius-pill);
      }
      .vf-badge--brand {
        background: rgba(var(--rxa-brand-rgb), 0.1);
        color: var(--rxa-brand);
      }
      .vf-badge--accent {
        background: rgba(108, 76, 241, 0.12);
        color: var(--rxa-accent);
      }

      .vf-scrollto {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.75rem;
      }

      .vf-stats {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 0.75rem;
      }
      .vf-stat {
        display: flex;
        flex-direction: column;
        gap: 0.1rem;
        padding: 0.4rem 0.7rem;
        border: 1px solid var(--rxa-border);
        border-radius: var(--rxa-radius-sm);
        background: var(--rxa-surface-2);
        min-width: 72px;
      }
      .vf-stat-label {
        font-size: 0.62rem;
        font-weight: 700;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: var(--rxa-text-muted);
      }
      .vf-stat-value {
        font-size: 1rem;
        font-weight: 700;
        color: var(--rxa-text);
        font-variant-numeric: tabular-nums;
      }

      /* Viewport + items */
      .vf-viewport-wrap {
        border: 1px solid var(--rxa-border);
        border-radius: var(--rxa-radius-sm);
        overflow: hidden;
        background: var(--rxa-surface);
        box-shadow: var(--rxa-shadow-sm);
      }
      .viewport {
        height: 550px;
        width: 100%;
      }
      .item {
        width: 100%;
        box-sizing: border-box;
        overflow: hidden;
        will-change: transform;
        border-bottom: 1px solid var(--rxa-border);
        border-left: 3px solid rgba(var(--rxa-brand-rgb), 0.45);
        padding: 8px 12px;
        background: var(--rxa-surface);
        font-size: 0.85rem;
        line-height: 1.35;
        color: var(--rxa-text);
      }
      .item:hover {
        background: var(--rxa-surface-3);
      }
      .item.cdk {
        border-left-color: var(--rxa-accent);
      }
      .overflow-hidden {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .content:hover {
        height: 200px;
      }
    `,
  ],
  providers: [RxState],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualForDemoComponent implements OnInit, AfterViewInit {
  readonly state: RxState<{
    data: any[];
    runwayItems: number;
    runwayItemsOpposite: number;
    scrollStrategy: 'fixed' | 'auto' | 'dynamic';
  }> = inject(RxState);

  @ViewChild(ArrayProviderComponent)
  arrayProvider: ArrayProviderComponent;

  @ViewChild(RxVirtualScrollViewportComponent)
  virtualViewport: RxVirtualScrollViewportComponent;

  @ViewChild(CdkVirtualScrollViewport)
  cdkVirtualViewport: CdkVirtualScrollViewport;

  private readonly afterViewInit$ = new ReplaySubject<void>(1);

  contentCache = {};

  toNumber = coerceNumberProperty;

  strategy$ = new Subject<RxStrategyNames<string>>();
  scrollStrategy$ = this.state.select('scrollStrategy');
  rxVirtualForState$ = this.state.select();
  components$ = new BehaviorSubject<'cdk' | 'rxa' | 'both'>('rxa');

  showRxa$ = this.components$.pipe(
    map((components) => components === 'rxa' || components === 'both'),
  );

  showCdk$ = this.components$.pipe(
    map((components) => components === 'cdk' || components === 'both'),
  );

  cdkScrolledIndex$ = new ReplaySubject<number>(1);
  rxaScrolledIndex$ = new ReplaySubject<number>(1);

  itemSize = 50;

  rendered = new Subject<any>();
  renderedItems$ = this.rendered.pipe(
    map(
      () =>
        this.virtualViewport.getScrollElement().querySelectorAll('.item')
          .length,
    ),
  );

  data$ = this.state.select('data');

  extractSize = (entries: ResizeObserverEntry) =>
    entries.borderBoxSize[0].blockSize;

  dynamicSize = (item) => (item.id % 2 === 0 ? 200 : 40);

  randomContent = () => {
    return new Array(Math.max(1, Math.floor(Math.random() * 25)))
      .fill('')
      .map(() => this.randomWord())
      .join(' ');
  };

  randomWord = () => {
    const words = [
      'Apple',
      'Banana',
      'The',
      'Orange',
      'House',
      'Boat',
      'Lake',
      'Car',
      'And',
    ];
    return words[Math.floor(Math.random() * words.length)];
  };

  trackItem = (
    idx: number,
    item: TestItem & { tmpl: TemplateRef<any>; content: string },
  ): number => item.id;

  initialScrollTo = parseInt(localStorage.getItem('vs-initialScrollTo') ?? '0');

  constructor() {
    this.state.set({
      runwayItems: 20,
      runwayItemsOpposite: 5,
      scrollStrategy: 'fixed',
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.arrayProvider.addItemsImmutable(1000);
    this.state.connect(
      'data',
      this.arrayProvider.array$.pipe(
        map((values) =>
          values.map((item) => {
            let content = this.contentCache[item.id];
            if (!content) {
              content = this.randomContent();
              this.contentCache[item.id] = content;
            }
            return {
              ...item,
              content,
            };
          }),
        ),
      ),
    );
  }

  setInitialScrollTo(index: number) {
    localStorage.setItem('vs-initialScrollTo', index.toString());
    this.initialScrollTo = index;
  }

  scrollToIndex(index: string): void {
    this.virtualViewport.scrollToIndex(coerceNumberProperty(index, 0));
  }

  scrollToCdkIndex(index: string): void {
    this.cdkVirtualViewport.scrollToIndex(coerceNumberProperty(index, 0));
  }
}
