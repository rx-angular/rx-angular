import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  fetchRepositoryList,
  RepositoryListItem,
  selectRepositoryList
} from '../../../data-access/github';
import { merge, Subject, timer } from 'rxjs';
import { DemoBasicsItem } from '../demo-basics-item.interface';
import { RxState } from '@ngx-rx/state';

interface ComponentState {
  refreshInterval: number;
  list: DemoBasicsItem[];
  listExpanded: boolean;
}

// The  initial state is normally derived form somewhere else automatically. But could also get specified statically here.
const initComponentState = {
  refreshInterval: 10000,
  listExpanded: false,
  list: []
};

// 1. Create an interface DemoBasicsView and implement all UI interaction like buttons etc.
// 2. Create an interface DemoBasicsBaseModel this is basically a copy of your previous ComponentState.
// 3. Implement a property `baseModel$: Observable<DemoBasicsBaseModel>;` to provide the base model state.
// 4. Create a service called DemoBasicsViewModel
//   - extend LocalState<DemoBasicsBaseModel>
//   - implement DemoBasicsView
@Component({
  selector: 'demo-basics-3',
  template: `
    <h3>Demo Basics 3 - Introduce MVVM Architecture</h3>
    <mat-expansion-panel
      *ngIf="model$ | async as m"
      (expandedChange)="listExpandedChanges.next($event)"
      [expanded]="m.listExpanded"
    >
      <mat-expansion-panel-header>
        <mat-panel-title>
          User Name
        </mat-panel-title>
        <mat-panel-description>
          <span *ngIf="!m.listExpanded"
            >{{ m.list.length }} Repositories Updated every:
            {{ m.refreshInterval }} ms</span
          >
          <span *ngIf="m.listExpanded">{{ m.list.length }}</span>
        </mat-panel-description>
      </mat-expansion-panel-header>

      <button
        mat-raised-button
        color="primary"
        (click)="refreshClicks.next($event)"
      >
        Refresh List
      </button>

      <div *ngIf="m.list.length; else noList">
        <mat-list>
          <mat-list-item *ngFor="let item of m.list">
            {{ item.name }}
          </mat-list-item>
        </mat-list>
      </div>

      <ng-template #noList>
        <mat-card>No list given!</mat-card>
      </ng-template>
    </mat-expansion-panel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoBasicsComponent3 extends RxState<ComponentState> {
  refreshClicks = new Subject<Event>();
  listExpandedChanges = new Subject<boolean>();

  model$ = this.select();

  @Input()
  set refreshInterval(refreshInterval: number) {
    if (refreshInterval > 100) {
      // 6. Refactor to use the vm.setState
      this.setState({ refreshInterval });
    }
  }

  refreshListSideEffect$ = merge(
    this.refreshClicks,
    this.select(
      map(s => s.refreshInterval),
      switchMap(ms => timer(0, ms))
    )
  ).pipe(tap(_ => this.store.dispatch(fetchRepositoryList({}))));

  // 5. Inject `DemoBasicsViewModel` as service into `DemoBasicsComponent` constructor under property `vm`
  constructor(private store: Store<any>) {
    // remove everything related to the view
    super();
    this.setState(initComponentState);
    this.connect(
      this.listExpandedChanges.pipe(map(b => ({ listExpanded: b })))
    );
    // Refactor to use the vm connectState method
    this.connect(
      'list',
      this.store.select(selectRepositoryList).pipe(map(this.parseListItems))
    );
    // Refactor to use the vm refreshListSideEffect$ property
    this.hold(this.refreshListSideEffect$);
  }

  parseListItems(l: RepositoryListItem[]): DemoBasicsItem[] {
    return l.map(({ id, name }) => ({ id, name }));
  }
}
