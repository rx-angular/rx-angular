import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import {
  RepositoryListItem,
  selectRepositoryList
} from '../../../data-access/github';
import { NEVER, Subject } from 'rxjs';
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

@Component({
  selector: 'demo-basics-2',
  template: `
    <h3>Demo Basics 2 - Handle Side Effects</h3>
    <mat-expansion-panel
      *ngIf="model$ | async as m"
      (expandedChange)="listExpandedChanges.next($event)"
      [expanded]="m.listExpanded"
    >
      <mat-expansion-panel-header>
        <mat-panel-title>
          List
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
export class DemoBasicsComponent2 extends RxState<ComponentState> {
  refreshClicks = new Subject<Event>();
  listExpandedChanges = new Subject<boolean>();

  model$ = this.select();

  @Input()
  set refreshInterval(refreshInterval: number) {
    if (refreshInterval > 100) {
      this.setState({ refreshInterval });
    }
  }

  refreshListSideEffect$ = NEVER;

  constructor(private store: Store<any>) {
    super();
    this.setState(initComponentState);
    this.connect(
      this.listExpandedChanges.pipe(map(b => ({ listExpanded: b })))
    );
    this.connect(
      'list',
      this.store.select(selectRepositoryList).pipe(map(this.parseListItems))
    );

    // Side-Effects
    // 1) setup side-effect
    // 2) show subscribe and connect
    // 3) extent side effect with refresh interval
    this.refreshListSideEffect$.subscribe();
  }

  parseListItems(l: RepositoryListItem[]): DemoBasicsItem[] {
    return l.map(({ id, name }) => ({ id, name }));
  }
}
