import { Injectable, OnInit } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { TestItem } from '../../../../shared/debug-helper/value-provider';

export type SortDirection = 1 | -1;
export type SortProps<T> = Extract<keyof T, string> | '';

export interface SortingModel<T> {
  property: SortProps<T>;
  direction: SortDirection;
}

@Injectable()
export class SortingPresenter<T>
  extends RxState<SortingModel<T>>
  implements OnInit {
  // Handle the active sort direction

  get direction(): SortDirection {
    return this.get().direction;
  }

  set property(property: SortProps<T>) {
    this.set({property});
  }
  get property(): SortProps<T> {
    return this.get().property;
  }

  connectToggleSortBy(toggleDirectionTrigger$: Observable<SortProps<T>>): void {
    this.connect(toggleDirectionTrigger$, (s, property) => ({
      property,
      direction: this.toggleDirectionValue(s),
    }));
  }

  toggleSortBy(property: SortProps<T>): void {
    if (this.get().property === property) {
      this.set('direction', this.toggleDirectionValue);
    }
    this.set({property});
  }

  // Handle the UI state

  isSortedBy(property: keyof TestItem): boolean {
    return property === this.get().property;
  }

  isSortedBy$(property: keyof TestItem): Observable<boolean> {
    return this.select(map((s) => s.property === property));
  }

  isAsc(): boolean {
    return this.get().direction === 1;
  }

  isDesc(): boolean {
    return this.get().direction === -1;
  }

  // Handle the sorting

  getSortedItems(items: T[]): T[] {
    return this.sortItemsValue(items, this.get());
  }

  sortItems = <V>() => (items$: Observable<V[]>): Observable<V[]> =>
    items$.pipe(
      withLatestFrom(this.$),
      map((args) => this.sortItemsValue(...args))
    );

  // internal logic ============================================================

  ngOnInit(): void {
    this.set({ direction: 1 });
  }

  private sortItemsValue<V>(items: V[], s: SortingModel<T>): V[] {
    return [...items].sort(
      (a: any, b: any) => (a[s.property] - b[s.property]) * s.direction
    );
  }

  private toggleDirectionValue(s: SortingModel<T>): SortDirection {
    return ((s.direction === 1 ? 1 : -1) * -1) as SortDirection;
  }
}
