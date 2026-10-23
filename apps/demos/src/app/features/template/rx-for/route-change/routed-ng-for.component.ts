import { coerceNumberProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { TestItem } from '../../../../shared/debug-helper/value-provider/model';
import { BgColorPipe } from './bg-color.pipe';
import { SortingPresenter } from './sorting.presenter';

let itemIdx = 0;

function getNewItem(): TestItem {
  const _idx = itemIdx;
  const i = { id: _idx, value: Math.random() };
  ++itemIdx;
  return i;
}

function getItems(num: number) {
  return new Array(num).fill(null).map((_) => getNewItem());
}

@Component({
  selector: 'rxa-routed-ng-for',
  standalone: true,
  imports: [MatButtonModule, MatCheckboxModule, MatIconModule, BgColorPipe],
  template: `
    <div
      class="d-flex py-3 w-100 align-items-center justify-content-around header"
    >
      <div>Selected</div>
      <div class="d-flex align-items-center">
        <span class="mr-2">ID</span>
        <button mat-icon-button (click)="sorting.toggleSortBy('id')">
          @if (sorting.isAsc()) {
            <mat-icon>arrow_upward</mat-icon>
          }
          @if (sorting.isDesc()) {
            <mat-icon>arrow_downward</mat-icon>
          }
        </button>
      </div>
      <div class="d-flex align-items-center">
        <span class="mr-2">Value</span>
        <button mat-icon-button (click)="sorting.toggleSortBy('value')">
          @if (sorting.isAsc()) {
            <mat-icon>arrow_upward</mat-icon>
          }
          @if (sorting.isDesc()) {
            <mat-icon>arrow_downward</mat-icon>
          }
        </button>
      </div>
      <div>Index</div>
      <div>Action</div>
    </div>
    @for (item of items; track item.id; let i = $index; let c = $count) {
      <div
        [style.height.px]="item.value * 300 + 40"
        class="d-flex py-3 w-100 align-items-center justify-content-around item"
      >
        <div>
          <mat-checkbox></mat-checkbox>
        </div>
        <div>{{ item.id }}</div>
        <div class="d-flex align-items-center">
          <span class="box" [style.background]="item.value | bgColor"></span
          >{{ item.value }}
        </div>
        <div>{{ i }}</div>
        <button mat-raised-button>
          <mat-icon>delete</mat-icon>
          Delete
        </button>
        <button mat-raised-button>
          <mat-icon>edit</mat-icon>
          Edit
        </button>
      </div>
    }
  `,
  styles: [
    `
      :host {
        flex-grow: 1;
        overflow: auto;
      }

      .item {
        border-bottom: 1px solid var(--rxa-border);
        transition: background-color 0.12s ease;
      }

      .item:hover {
        background: var(--rxa-surface-3);
      }

      .item .value {
        width: 5px;
        height: 5px;
      }

      .item .box {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin: 5px;
        border-radius: var(--rxa-radius-sm);
        box-shadow: var(--rxa-shadow-sm);
      }

      .header {
        font-weight: 700;
        position: sticky;
        top: 0;
        color: var(--rxa-text);
        background-color: var(--rxa-surface-2);
        border-bottom: 1px solid var(--rxa-border);
        z-index: 2;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SortingPresenter],
})
export class RoutedNgForComponent {
  private activeRoute = inject(ActivatedRoute);
  readonly sorting = inject<SortingPresenter<TestItem>>(SortingPresenter);

  items = [] as TestItem[];

  constructor() {
    this.sorting.property = 'id';
    this.activeRoute.params.subscribe(({ count }: { count: number }) => {
      const items = getItems(coerceNumberProperty(count, 1000));
      this.items = this.sorting.getSortedItems(items);
    });
  }
}
