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
} from '@rx-angular/template/virtual-scrolling';
import { DocsLinkComponent } from '../../../../shared/docs-link';

@Component({
  selector: 'rxa-virtual-for-scroll-to',
  template: `
    <header class="rxa-demo-header">
      <div>
        <h2>Scroll To</h2>
        <p class="rxa-demo-subtitle">
          Uses <code>*rxVirtualFor</code> with an autosized viewport that jumps
          to an <code>initialScrollIndex</code> and reports the current scrolled
          index.
        </p>
      </div>
      <rxa-docs-link
        docs="template/virtual-scrolling"
        source="apps/demos/src/app/features/template/rx-virtual-for"
      />
    </header>
    <div class="container position-relative rxa-viewport-card">
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
        border: 1px solid var(--rxa-border);
        border-radius: var(--rxa-radius-sm);
        overflow: hidden;
        background: var(--rxa-surface);
        box-shadow: var(--rxa-shadow-sm);
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
        box-sizing: border-box;
        overflow: hidden;
        will-change: transform;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--rxa-surface);
        border-bottom: 1px solid var(--rxa-border);
        border-left: 3px solid rgba(var(--rxa-brand-rgb), 0.45);
        color: var(--rxa-text);
        font-size: 0.85rem;
      }
      .item:hover {
        background: var(--rxa-surface-3);
      }
    `,
  ],
  providers: [RxState],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RxVirtualScrollViewportComponent,
    AutoSizeVirtualScrollStrategy,
    RxVirtualFor,
    DocsLinkComponent,
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
