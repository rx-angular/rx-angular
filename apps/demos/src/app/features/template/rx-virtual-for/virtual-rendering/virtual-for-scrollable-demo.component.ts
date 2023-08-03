import { coerceNumberProperty } from '@angular/cdk/coercion';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { RxStrategyNames } from '@rx-angular/cdk/render-strategies';
import { patch, toDictionary, update } from '@rx-angular/cdk/transformations';
import { RxState } from '@rx-angular/state';
import {
  BehaviorSubject,
  combineLatest,
  defer,
  pairwise,
  ReplaySubject,
  Subject,
  switchMap,
} from 'rxjs';
import {
  distinctUntilChanged,
  map,
  shareReplay,
  startWith,
  withLatestFrom,
} from 'rxjs/operators';
import { ArrayProviderComponent } from '../../../../shared/debug-helper/value-provider/array-provider/array-provider.component';
import { TestItem } from '../../../../shared/debug-helper/value-provider/index';
import { RxVirtualScrollViewportComponent } from '@rx-angular/template/experimental/virtual-scrolling';

@Component({
  selector: 'rxa-virtual-for-scrollable',
  template: `
    <div class="container">
      <h1 class="mat-headline mt-2">Virtual Rendering</h1>
      <rxa-strategy-select
        (strategyChange)="strategy$.next($event)"
      ></rxa-strategy-select>
      <div class="d-flex flex-wrap">
        <div class="mr-4">
          <h2 class="mat-subheading-2">ScrollStrategy</h2>
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
        </div>
        <div class="mr-4">
          <h2 class="mat-subheading-2">Components</h2>
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
        </div>
        <div *rxIf="showRxa$" class="d-flex flex-column">
          <h2 class="mat-subheading-2">rxVirtualFor Settings</h2>
          <div class="d-flex align-items-center flex-grow-1">
            <div class="mr-2">
              <label>runwayItems</label>
              <input
                style="width: 75px; display: block"
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
            </div>
            <div>
              <label>runwayItemsOpposite</label>
              <input
                style="width: 75px; display: block"
                #runwayItemsOppositeInput
                placeholder="runwayItemsOpposite"
                matInput
                min="0"
                value="5"
                (input)="
                  state.set({
                    runwayItemsOpposite: toNumber(
                      runwayItemsOppositeInput.value
                    )
                  })
                "
                type="number"
              />
            </div>
          </div>
        </div>
      </div>
      <rxa-array-provider
        [unpatched]="[]"
        [buttons]="true"
      ></rxa-array-provider>
      <div class="d-flex justify-content-between">
        <div class="w-50" *rxIf="showRxa$">
          <h2 class="mat-subheading-2">*rxVirtualFor</h2>
          <div class="d-flex">
            <input
              style="width: 200px"
              matInput
              #scrollToInput
              placeholder="scrollToIndex"
              type="number"
            />
            <button mat-button (click)="scrollToIndex(scrollToInput.value)">
              ScrollTo
            </button>
          </div>
          <h2 class="mat-subheading-1">Stats</h2>
          <div class="stats">
            <div>
              <strong>Items: </strong
              ><span *rxLet="data$; let data">{{ data.length }}</span>
            </div>
            <div>
              <strong>renderedItems: </strong
              ><span *rxLet="renderedItems$; let renderedItems">{{
                renderedItems
              }}</span>
            </div>
            <div>
              <strong>scrolledIndex: </strong>
              <span *rxLet="rxaScrolledIndex$; let idx">{{ idx }}</span>
            </div>
          </div>
          <ng-container *rxLet="rxVirtualForState$; let state">
            <div style="min-height: 600px" rxVirtualScrollElement>
              <div style="height: 300px; width: 100%; border: 1px solid red;">
                Content Before Content Before Content Before
              </div>
              <div style="position: relative;">
                <div style="height: 50px; width: 100%; border: 1px solid red;">
                  More Content Before
                </div>
                <rx-virtual-scroll-viewport
                  (scrolledIndexChange)="rxaScrolledIndex$.next($event)"
                  *ngIf="state.scrollStrategy === 'fixed'"
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
                <rx-virtual-scroll-viewport
                  *ngIf="state.scrollStrategy === 'auto'"
                  (scrolledIndexChange)="rxaScrolledIndex$.next($event)"
                  autosize
                  withSyncScrollbar
                  [resizeObserverConfig]="{
                    extractSize: extractSize
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
                <rx-virtual-scroll-viewport
                  *ngIf="state.scrollStrategy === 'dynamic'"
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
              </div>
              <div style="height: 1650px; width: 100%; border: 1px solid red;">
                Content After Content After Content After
              </div>
            </div>
          </ng-container>
        </div>
        <div class="w-50" *rxIf="showCdk$">
          <h2 class="mat-subheading-2">*cdkVirtualVor</h2>
          <div class="d-flex">
            <input
              style="width: 200px"
              matInput
              #scrollToInput
              placeholder="scrollToIndex"
              type="number"
            />
            <button mat-button (click)="scrollToCdkIndex(scrollToInput.value)">
              ScrollTo
            </button>
          </div>
          <h2 class="mat-subheading-1">Stats</h2>
          <div class="stats">
            <div>
              <strong>Items: </strong
              ><span *rxLet="data$; let data">{{ data.length }}</span>
            </div>
            <div><strong>renderedItems: </strong> N/A</div>
            <div>
              <strong>scrolledIndex: </strong>
              <span *rxLet="cdkScrolledIndex$; let idx">{{ idx }}</span>
            </div>
          </div>
          <ng-container *rxLet="scrollStrategy$; let viewMode">
            <div style="min-height: 600px" cdkVirtualScrollingElement>
              <div style="height: 300px; width: 100%; border: 1px solid red;">
                Content Before Content Before Content Before
              </div>
              <div style="position: relative;">
                <div style="height: 50px; width: 100%; border: 1px solid red;">
                  More Content Before
                </div>
                <cdk-virtual-scroll-viewport
                  (scrolledIndexChange)="cdkScrolledIndex$.next($event)"
                  *ngIf="viewMode === 'fixed'"
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
                <cdk-virtual-scroll-viewport
                  *ngIf="viewMode === 'auto'"
                  class="viewport"
                  autosize
                >
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
              </div>
              <div style="height: 300px; width: 100%; border: 1px solid red;">
                Content After Content After Content After
              </div>
            </div>
          </ng-container>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
      }
      .viewport {
        /*height: 550px;*/
      }
      .item {
        width: 250px;
        overflow: hidden;
        /*height: 50px;*/
        will-change: transform;
        border: 1px solid green;
        padding: 10px 0;
        box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.13);
      }
      .item.cdk {
        opacity: 1;
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
    map((components) => components === 'rxa' || components === 'both')
  );

  showCdk$ = this.components$.pipe(
    map((components) => components === 'cdk' || components === 'both')
  );

  cdkScrolledIndex$ = new ReplaySubject<number>(1);
  rxaScrolledIndex$ = new ReplaySubject<number>(1);

  itemSize = 50;

  rendered = new Subject<unknown>();
  renderedItems$ = this.rendered.pipe(
    map(
      () =>
        this.virtualViewport.getScrollElement().querySelectorAll('.item').length
    )
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
    item: TestItem & { tmpl: TemplateRef<any>; content: string }
  ): number => item.id;

  constructor(
    public state: RxState<{
      data: any[];
      runwayItems: number;
      runwayItemsOpposite: number;
      scrollStrategy: 'fixed' | 'auto' | 'dynamic';
    }>
  ) {
    state.set({
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
          })
        )
      )
    );
  }

  scrollToIndex(index: string): void {
    this.virtualViewport.scrollToIndex(coerceNumberProperty(index, 0));
  }

  scrollToCdkIndex(index: string): void {
    this.cdkVirtualViewport.scrollToIndex(coerceNumberProperty(index, 0));
  }
}
