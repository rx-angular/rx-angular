import { coerceNumberProperty } from '@angular/cdk/coercion';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RxStrategyNames } from '@rx-angular/cdk/render-strategies';
import { patch, toDictionary, update } from '@rx-angular/cdk/transformations';
import {
  BehaviorSubject,
  combineLatest,
  defer,
  pairwise,
  ReplaySubject,
  Subject,
  switchMap,
} from 'rxjs';
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { ArrayProviderComponent } from '../../../../shared/debug-helper/value-provider/array-provider/array-provider.component';
import { TestItem } from '../../../../shared/debug-helper/value-provider/index';
import { RxVirtualScrollViewportComponent } from './virtual-scroll-viewport.component';

@Component({
  selector: 'rxa-virtual-for-test',
  template: `
    <div class="container">
      <h1 class="mat-headline mt-2">Virtual Rendering</h1>
      <rxa-strategy-select
        (strategyChange)="strategy$.next($event)"
      ></rxa-strategy-select>
      <div class="d-flex">
        <div class="mr-4">
          <h2 class="mat-subheading-2">ScrollStrategy</h2>
          <mat-button-toggle-group
            *rxLet="scrollStrategy$; let viewMode"
            aria-label="Visible Examples"
            [value]="viewMode"
          >
            <mat-button-toggle
              value="fixed"
              (click)="scrollStrategy$.next('fixed')"
              >Fixed size
            </mat-button-toggle>
            <mat-button-toggle
              value="auto"
              (click)="scrollStrategy$.next('auto')"
              >Autosized
            </mat-button-toggle>
          </mat-button-toggle-group>
        </div>
        <div>
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
          <ng-container *rxLet="scrollStrategy$; let viewMode">
            <rx-virtual-scroll-viewport
              (scrolledIndexChange)="rxaScrolledIndex$.next($event)"
              *ngIf="viewMode === 'fixed'; else autoSized"
              [itemSize]="itemSize"
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
            <ng-template #autoSized>
              <rx-virtual-scroll-viewport
                (scrolledIndexChange)="rxaScrolledIndex$.next($event)"
                autosize
                [resizeObserverConfig]="{
                  extractSize: extractSize
                }"
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
                  <!--<button (click)="div.style.height = '170px'">
                    change size
                  </button>-->
                </div>
              </rx-virtual-scroll-viewport>
            </ng-template>
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
            <cdk-virtual-scroll-viewport
              (scrolledIndexChange)="cdkScrolledIndex$.next($event)"
              *ngIf="viewMode === 'fixed'; else autoSized"
              class="viewport"
              [itemSize]="itemSize"
            >
              <div
                *cdkVirtualFor="
                  let item of data$;
                  let i = index;
                  trackBy: trackItem
                "
                class="item"
                [style.height.px]="itemSize"
              >
                {{ i }} {{ item.content }}
              </div>
            </cdk-virtual-scroll-viewport>
            <ng-template #autoSized>
              <cdk-virtual-scroll-viewport class="viewport" autosize>
                <div
                  *cdkVirtualFor="
                    let item of data$;
                    let i = index;
                    trackBy: trackItem
                  "
                  class="item"
                >
                  {{ i }} {{ item.content }}
                </div>
              </cdk-virtual-scroll-viewport>
            </ng-template>
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
        height: 350px;
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
      .content:hover {
        height: 200px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualForTestComponent implements OnInit, AfterViewInit {
  @ViewChild(ArrayProviderComponent)
  arrayProvider: ArrayProviderComponent;

  @ViewChild(RxVirtualScrollViewportComponent)
  virtualViewport: RxVirtualScrollViewportComponent;

  @ViewChild(CdkVirtualScrollViewport)
  cdkVirtualViewport: CdkVirtualScrollViewport;

  private readonly afterViewInit$ = new ReplaySubject<void>(1);

  contentCache = {};

  strategy$ = new Subject<RxStrategyNames<string>>();
  scrollStrategy$ = new BehaviorSubject<'fixed' | 'auto'>('fixed');
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
      () => this.virtualViewport.nativeElement.querySelectorAll('.item').length
    )
  );

  data$ = defer(() =>
    this.afterViewInit$.pipe(
      switchMap(() =>
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
      )
    )
  );

  extractSize = (entries: ResizeObserverEntry[]) =>
    entries[0].borderBoxSize[0].blockSize;

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

  trackItem = (idx: number, item: TestItem): number => item.id;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.afterViewInit$.next();
  }

  scrollToIndex(index: string): void {
    this.virtualViewport.scrollToIndex(coerceNumberProperty(index, 0));
  }

  scrollToCdkIndex(index: string): void {
    this.cdkVirtualViewport.scrollToIndex(coerceNumberProperty(index, 0));
  }
}
