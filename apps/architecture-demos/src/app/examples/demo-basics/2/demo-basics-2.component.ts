import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import { RxState } from '@rx-angular/state';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  fetchRepositoryList,
  RepositoryListItem,
  selectRepositoryList
} from '../../../data-access/github';
import { interval, NEVER, Subject, Subscription } from 'rxjs';
import { DemoBasicsItem } from '../demo-basics-item.interface';

interface ComponentState {
  refreshInterval: number;
  list: DemoBasicsItem[];
  listExpanded: boolean;
}

// The  initial base-state is normally derived form somewhere else automatically. But could also get specified statically here.
const initComponentState = {
  refreshInterval: 10000,
  listExpanded: false,
  list: []
};

@Component({
  selector: 'demo-basics-2',
  template: `
    <h3>Demo Basics 2 - Handle Side Effects</h3>
    <small>Child re-renders: {{ rerenders() }}</small
    ><br />
    <mat-expansion-panel
      *ngIf="model$ | push as m"
      (expandedChange)="listExpandedChanges.next($event)"
      [expanded]="m.listExpanded"
    >
      <mat-expansion-panel-header>
        <mat-panel-title>
          List
        </mat-panel-title>
        <mat-panel-description>
          <span
            >{{ m.list.length }} Repositories Updated every:
            {{ m.refreshInterval }} ms
          </span>
        </mat-panel-description>
      </mat-expansion-panel-header>

      <button
        mat-raised-button
        color="primary"
        (click)="onRefreshClicks($event)"
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
export class DemoBasicsComponent2 extends RxState<ComponentState>
  implements OnInit, OnDestroy {
  intervalSubscription = new Subscription();
  // 1.1) Introduce reactive UI ( refreshClicks = new Subject<Event>(); )
  listExpandedChanges = new Subject<boolean>();

  model$ = this.select();

  @Input()
  set refreshInterval(refreshInterval: number) {
    if (refreshInterval > 100) {
      this.set({ refreshInterval });
    }
  }

  numRenders = 0;
  rerenders(): number {
    return ++this.numRenders;
  }

  constructor(private store: Store<any>) {
    super();
    this.set(initComponentState);
    this.connect(
      this.listExpandedChanges.pipe(map(b => ({ listExpanded: b })))
    );
    this.connect(
      'list',
      this.store.select(selectRepositoryList).pipe(map(this.parseListItems))
    );

    // Side-Effects
    // 2.1) setup side-effect (this.refreshListSideEffect$)
    // 2.2) show subscribe and connect
    // 2.3) extent side effect with refresh interval
  }

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.resetRefreshTick();
  }

  resetRefreshTick() {
    this.intervalSubscription.unsubscribe();
    this.intervalSubscription = this.select('refreshInterval')
      .pipe(
        switchMap(ms => interval(ms)),
        tap(_ => this.store.dispatch(fetchRepositoryList({})))
      )
      .subscribe();
  }

  onRefreshClicks(event) {
    this.store.dispatch(fetchRepositoryList({}));
  }

  // Map RepositoryListItem to ListItem
  parseListItems(l: RepositoryListItem[]): DemoBasicsItem[] {
    return l.map(({ id, name }) => ({ id, name }));
  }
}
