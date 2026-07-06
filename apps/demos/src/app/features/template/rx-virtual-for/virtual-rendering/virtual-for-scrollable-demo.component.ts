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
  RxVirtualScrollElementDirective,
  RxVirtualScrollViewportComponent,
} from '@rx-angular/template/virtual-scrolling';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArrayProviderComponent } from '../../../../shared/debug-helper/value-provider/array-provider/array-provider.component';
import { TestItem } from '../../../../shared/debug-helper/value-provider/index';
import { StrategySelectModule } from '../../../../shared/debug-helper/strategy-select/index';
import { DocsLinkComponent } from '../../../../shared/docs-link';

@Component({
  selector: 'rxa-virtual-for-scrollable',
  standalone: true,
  imports: [
    CommonModule,
    AutosizedScrollingModule,
    ScrollingModule,
    MatButtonToggleModule,
    MatInputModule,
    RxIf,
    RxLet,
    RxVirtualFor,
    RxVirtualScrollViewportComponent,
    RxVirtualScrollElementDirective,
    FixedSizeVirtualScrollStrategy,
    DynamicSizeVirtualScrollStrategy,
    AutoSizeVirtualScrollStrategy,
    ArrayProviderComponent,
    StrategySelectModule,
    DocsLinkComponent,
  ],
  template: `
    <div class="container">
      <header class="rxa-demo-header">
        <div>
          <h2>Custom Scroll Element</h2>
          <p class="rxa-demo-subtitle">
            Renders <code>*rxVirtualFor</code> inside a custom
            <code>rxVirtualScrollElement</code> with content before and after
            the viewport, across fixed, dynamic and autosized strategies —
            compared to the CDK's <code>*cdkVirtualFor</code>.
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
          <span class="rxa-demo-label">Components</span>
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
        <section class="rxa-demo-group" *rxIf="showRxa$">
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
                value="20"
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
        <section class="rxa-demo-group rxa-demo-group--wide">
          <span class="rxa-demo-label">Data</span>
          <rxa-array-provider
            [unpatched]="[]"
            [buttons]="true"
          ></rxa-array-provider>
        </section>
      </div>

      <div class="rxa-demo-columns">
        <div class="demo-card vf-col" *rxIf="showRxa$">
          <h3 class="rxa-demo-section-title">
            *rxVirtualFor
            <span class="badge bg-primary">RxAngular</span>
          </h3>
          <div class="rxa-demo-controls">
            <input
              class="rxa-demo-input scrollto-input"
              matInput
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
          </div>
          <div class="rxa-stat-row">
            <div class="rxa-stat">
              <span class="rxa-stat-label">Items</span>
              <span class="rxa-stat-value" *rxLet="data$; let data">{{
                data.length
              }}</span>
            </div>
            <div class="rxa-stat">
              <span class="rxa-stat-label">Rendered</span>
              <span
                class="rxa-stat-value"
                *rxLet="renderedItems$; let renderedItems"
                >{{ renderedItems }}</span
              >
            </div>
            <div class="rxa-stat">
              <span class="rxa-stat-label">Scrolled index</span>
              <span
                class="rxa-stat-value"
                *rxLet="rxaScrolledIndex$; let idx"
                >{{ idx }}</span
              >
            </div>
          </div>
          <div class="rxa-viewport-card">
            <ng-container *rxLet="rxVirtualForState$; let state">
              <div style="min-height: 600px" rxVirtualScrollElement>
                <div
                  style="height: 300px; width: 100%; border: 1px dashed rgba(var(--rxa-brand-rgb), 0.4);"
                >
                  Content Before Content Before Content Before
                </div>
                <div style="position: relative;">
                  <div
                    style="height: 50px; width: 100%; border: 1px dashed rgba(var(--rxa-brand-rgb), 0.4);"
                  >
                    More Content Before
                  </div>
                  @if (state.scrollStrategy === 'fixed') {
                    <rx-virtual-scroll-viewport
                      (scrolledIndexChange)="rxaScrolledIndex$.next($event)"
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
                </div>
                <div
                  style="height: 1650px; width: 100%; border: 1px dashed rgba(var(--rxa-brand-rgb), 0.4);"
                >
                  Content After Content After Content After
                </div>
              </div>
            </ng-container>
          </div>
        </div>
        <div class="demo-card vf-col" *rxIf="showCdk$">
          <h3 class="rxa-demo-section-title">
            *cdkVirtualFor
            <span class="badge bg-secondary">Angular CDK</span>
          </h3>
          <div class="rxa-demo-controls">
            <input
              class="rxa-demo-input scrollto-input"
              matInput
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
          <div class="rxa-stat-row">
            <div class="rxa-stat">
              <span class="rxa-stat-label">Items</span>
              <span class="rxa-stat-value" *rxLet="data$; let data">{{
                data.length
              }}</span>
            </div>
            <div class="rxa-stat">
              <span class="rxa-stat-label">Rendered</span>
              <span class="rxa-stat-value">N/A</span>
            </div>
            <div class="rxa-stat">
              <span class="rxa-stat-label">Scrolled index</span>
              <span
                class="rxa-stat-value"
                *rxLet="cdkScrolledIndex$; let idx"
                >{{ idx }}</span
              >
            </div>
          </div>
          <div class="rxa-viewport-card">
            <ng-container *rxLet="scrollStrategy$; let viewMode">
              <div style="min-height: 600px" cdkVirtualScrollingElement>
                <div
                  style="height: 300px; width: 100%; border: 1px dashed rgba(var(--rxa-brand-rgb), 0.4);"
                >
                  Content Before Content Before Content Before
                </div>
                <div style="position: relative;">
                  <div
                    style="height: 50px; width: 100%; border: 1px dashed rgba(var(--rxa-brand-rgb), 0.4);"
                  >
                    More Content Before
                  </div>
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
                </div>
                <div
                  style="height: 300px; width: 100%; border: 1px dashed rgba(var(--rxa-brand-rgb), 0.4);"
                >
                  Content After Content After Content After
                </div>
              </div>
            </ng-container>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .vf-col {
        padding: 1rem;
      }
      .field {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      .field-input {
        width: 90px;
      }
      .scrollto-input {
        width: 200px;
      }
      .rxa-viewport-card {
        border: 1px solid var(--rxa-border);
        border-radius: var(--rxa-radius-sm);
        overflow: hidden;
        background: var(--rxa-surface);
        box-shadow: var(--rxa-shadow-sm);
      }
      .item {
        width: 250px;
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
      }
      .content:hover {
        height: 200px;
      }
    `,
  ],
  providers: [RxState],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualForCustomScrollableDemoComponent
  implements OnInit, AfterViewInit
{
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
  components$ = new BehaviorSubject<'cdk' | 'rxa' | 'both'>('both');

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

  constructor() {
    this.state.set({
      runwayItems: 20,
      runwayItemsOpposite: 5,
      scrollStrategy: 'fixed',
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
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

  scrollToIndex(index: string): void {
    this.virtualViewport.scrollToIndex(coerceNumberProperty(index, 0));
  }

  scrollToCdkIndex(index: string): void {
    this.cdkVirtualViewport.scrollToIndex(coerceNumberProperty(index, 0));
  }
}
