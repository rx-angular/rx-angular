import { coerceNumberProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { RxFor } from '@rx-angular/template/for';
import { RxIf } from '@rx-angular/template/if';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { TestItem } from '../../../../shared/debug-helper/value-provider/model';
import { SortingPresenter, SortProps } from './sorting.presenter';

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
  selector: 'rxa-routed-rx-for',
  standalone: true,
  imports: [MatButtonModule, MatCheckboxModule, MatIconModule, RxFor, RxIf],
  template: `
    <div
      class="d-flex py-3 w-100 align-items-center justify-content-around header"
    >
      <div>Selected</div>
      <div class="d-flex align-items-center">
        <span class="mr-2">ID</span>
        <button mat-icon-button (click)="toggleSortBy$.next('id')">
          <ng-container *rxIf="sorting.isSortedBy$('id')">
            @if (sorting.isAsc()) {
              <mat-icon>arrow_upward</mat-icon>
            }
            @if (sorting.isDesc()) {
              <mat-icon>arrow_downward </mat-icon>
            }
          </ng-container>
        </button>
      </div>
      <div class="d-flex align-items-center">
        <span class="mr-2">Value</span>
        <button mat-icon-button (click)="toggleSortBy$.next('value')">
          <ng-container *rxIf="sorting.isSortedBy$('value')">
            @if (sorting.isAsc()) {
              <mat-icon>arrow_upward</mat-icon>
            }
            @if (sorting.isDesc()) {
              <mat-icon>arrow_downward </mat-icon>
            }
          </ng-container>
        </button>
      </div>
      <div>Index</div>
      <div>Action</div>
    </div>
    <div
      class="d-flex py-3 w-100 align-items-center justify-content-around item"
      *rxFor="
        let item of items$;
        let i = index;
        let count = count;
        strategy: 'normal';
        trackBy: 'id'
      "
    >
      <div>
        <mat-checkbox></mat-checkbox>
      </div>
      <div>{{ item.id }}</div>
      <div>{{ item.value }}</div>
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
export class RoutedRxForComponent {
  private activeRoute = inject(ActivatedRoute);
  readonly sorting = inject<SortingPresenter<TestItem>>(SortingPresenter);

  toggleSortBy$ = new Subject<SortProps<TestItem>>();

  constructor() {
    this.sorting.connectToggleSortBy(this.toggleSortBy$);
  }

  items$ = this.activeRoute.params.pipe(
    map((params: { count: number }) =>
      getItems(coerceNumberProperty(params.count, 1000)),
    ),
    // this.sorting.sortItems()
  );
}
