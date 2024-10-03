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
import {
  AutoSizeVirtualScrollStrategy,
  RxVirtualFor,
  RxVirtualScrollViewportComponent,
} from '@rx-angular/template/experimental/virtual-scrolling';

@Component({
  selector: 'rxa-virtual-for-scroll-to',
  template: `
    <h1 class="mat-headline mt-2">Scroll To</h1>
    <div class="container position-relative">
      <rx-virtual-scroll-viewport
        autosize
        [initialScrollIndex]="initialScrollIndex"
        (scrolledIndexChange)="onScrolledIndexChange($event)"
      >
        <div class="item" *rxVirtualFor="let item of items">
          {{ item }}
        </div>
      </rx-virtual-scroll-viewport>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-flow: column;
        height: 100%;
      }
      .container {
        height: 100%;
        flex-grow: 1;
      }
      rx-virtual-scroll-viewport {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }

      .item {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: lightpink;
        border-top: 1px solid gray;
      }
    `,
  ],
  providers: [RxState],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RxVirtualScrollViewportComponent,
    AutoSizeVirtualScrollStrategy,
    RxVirtualFor,
  ],
})
export class VirtualForScrollToDemoComponent implements OnInit {
  items: string[] | undefined;
  initialScrollIndex = 5;

  ngOnInit() {
    this.items = Array.from({ length: 100 }, (_, i) => i.toString());
  }

  onScrolledIndexChange(index: number) {
    console.log('onScrolledIndexChange', index);
  }
}
