import { coerceNumberProperty } from '@angular/cdk/coercion';
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
      <h2 class="mat-subheading-2">ScrollStrategy</h2>
      <mat-button-toggle-group
        *rxLet="scrollStrategy$; let viewMode"
        aria-label="Visible Examples"
        [value]="viewMode"
      >
        <mat-button-toggle value="fixed" (click)="scrollStrategy$.next('fixed')"
          >Fixed size
        </mat-button-toggle>
        <mat-button-toggle value="auto" (click)="scrollStrategy$.next('auto')"
          >Autosized
        </mat-button-toggle>
      </mat-button-toggle-group>
      <h2 class="mat-subheading-2 mt-4">Components</h2>
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
      <rxa-array-provider
        [unpatched]="[]"
        [buttons]="true"
      ></rxa-array-provider>
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
      <div class="d-flex justify-content-between">
        <div class="w-50" *rxIf="showRxa$">
          <div class="stats">
            <div *rxLet="data$; let data">
              <strong>Items: </strong>{{ data.length }}
            </div>
            <div *rxLet="renderedItems$; let renderedItems">
              <strong>renderedItems: </strong>{{ renderedItems }}
            </div>
          </div>
          <h2 class="mat-subheading-1">*rxVirtualFor</h2>
          <ng-container *rxLet="scrollStrategy$; let viewMode">
            <rx-virtual-scroll-viewport
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
                  strategy: strategy$
                "
                class="item"
                [style.height.px]="itemSize"
              >
                {{ i }} {{ item.content }}
              </div>
            </rx-virtual-scroll-viewport>
            <ng-template #autoSized>
              <rx-virtual-scroll-viewport autosize class="viewport">
                <div
                  *rxVirtualFor="
                    let item of data$;
                    let i = index;
                    trackBy: trackItem;
                    renderCallback: rendered;
                    strategy: strategy$
                  "
                  class="item"
                >
                  {{ i }} {{ item.content }}
                </div>
              </rx-virtual-scroll-viewport>
            </ng-template>
          </ng-container>
        </div>
        <div class="w-50" *rxIf="showCdk$">
          <h2 class="mat-subheading-1">*cdkVirtualVor</h2>
          <ng-container *rxLet="scrollStrategy$; let viewMode">
            <cdk-virtual-scroll-viewport
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
        border: 1px solid green;
        padding: 10px 0;
        box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.13);
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
}
