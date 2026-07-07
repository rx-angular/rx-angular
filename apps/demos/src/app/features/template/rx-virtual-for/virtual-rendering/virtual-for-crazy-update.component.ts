import { Component, signal } from '@angular/core';
import {
  AutoSizeVirtualScrollStrategy,
  RxVirtualScrollViewportComponent,
  RxVirtualFor,
} from '@rx-angular/template/virtual-scrolling';
import { BehaviorSubject, Subject } from 'rxjs';
import { DocsLinkComponent } from '../../../../shared/docs-link';

@Component({
  selector: 'app-root',
  imports: [
    RxVirtualFor,
    RxVirtualScrollViewportComponent,
    AutoSizeVirtualScrollStrategy,
    DocsLinkComponent,
  ],
  template: `
    <header class="rxa-demo-header">
      <div>
        <h2>Crazy Update</h2>
        <p class="rxa-demo-subtitle">
          Rapidly mutates the <code>*rxVirtualFor</code> source right after the
          first render to verify the autosized viewport stays consistent.
        </p>
      </div>
      <rxa-docs-link
        docs="packages/template/reference/rx-virtual-for"
        source="apps/demos/src/app/features/template/rx-virtual-for"
      />
    </header>
    <rx-virtual-scroll-viewport
      class="viewport-card"
      autosize
      [tombstoneSize]="63"
    >
      <div
        class="item"
        *rxVirtualFor="
          let item of items$;
          trackBy: 'id';
          renderCallback: renderedItems
        "
        style="width: 100%;"
      >
        <p>{{ item.name }}</p>
      </div>
    </rx-virtual-scroll-viewport>
  `,
  styles: [
    `
      .viewport-card {
        box-sizing: border-box;
        border: 1px solid var(--rxa-border);
        border-radius: var(--rxa-radius-sm);
        box-shadow: var(--rxa-shadow-sm);
        background: var(--rxa-surface);
      }
      .item {
        box-sizing: border-box;
        overflow: hidden;
        will-change: transform;
        padding: 8px 12px;
        border-bottom: 1px solid var(--rxa-border);
        border-left: 3px solid rgba(var(--rxa-brand-rgb), 0.45);
        background: var(--rxa-surface);
        color: var(--rxa-text);
        font-size: 0.85rem;
      }
      .item p {
        margin: 0;
      }
      .item:hover {
        background: var(--rxa-surface-3);
      }
    `,
  ],
})
export class VirtualForCrazyUpdateComponent {
  items = signal(
    Array.from({ length: 200 }).map((_item, index) => ({
      id: index,
      name: `item #${index}`,
    })),
  );
  items$ = new BehaviorSubject(
    Array.from({ length: 200 }).map((_item, index) => ({
      id: index,
      name: `item #${index}`,
    })),
  );

  renderedItems = new Subject<any[]>();

  constructor() {
    this.renderedItems.subscribe(() => console.log('Completed rendering'));

    setTimeout(() => {
      this.items$.next(
        this.items$.getValue().filter((item) => item.id % 2 === 0),
      );
      this.items.update((items) => items.filter((item) => item.id % 2 === 0));
      console.log('Updating items');
    }, 350);
  }
}
