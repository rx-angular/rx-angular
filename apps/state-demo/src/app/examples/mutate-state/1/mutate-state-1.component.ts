import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Action, Store } from '@ngrx/store';
import {
  fetchRepositoryList,
  repositoryListFetchError,
  repositoryListFetchSuccess,
  RepositoryListItem,
  selectRepositoryList
} from '../../../data-access/github';
import { interval, Observable, Subject, Subscription } from 'rxjs';
import { DemoBasicsItem } from '../mutate-state-item.interface';

import { ofType } from '@ngrx/effects';
import { map, startWith, tap } from 'rxjs/operators';
import { RxState } from '@rx-angular/state';

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
  selector: 'mutate-state-1',
  template: `
    <h3>Demo Basic 1 - Setup and Retrieving State</h3>
    <small>Child rerenders: {{ rerenders() }}</small
    ><br />
    <!-- CC Dominic Elm and his template streams :) -->
    <mat-expansion-panel
      (expandedChange)="listExpanded = $event; listExpandedChanges.next($event)"
      [expanded]="listExpanded"
    >
      <mat-expansion-panel-header class="list">
        <mat-progress-bar *ngIf="false" [mode]="'query'"></mat-progress-bar>
        <mat-panel-title>
          List
        </mat-panel-title>
        <mat-panel-description>
          <span
            >{{ (storeList$ | async)?.length }} Repositories Updated every:
            {{ _refreshInterval }} ms
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

      <ng-container *ngIf="storeList$ | async as list">
        <div *ngIf="list?.length; else noList">
          <mat-list>
            <mat-list-item *ngFor="let item of list">
              {{ item.name }}
            </mat-list-item>
          </mat-list>
        </div>
      </ng-container>

      <ng-template #noList>
        <mat-card>No list given!</mat-card>
      </ng-template>
    </mat-expansion-panel>
  `,
  styles: [
    `
      .list .mat-expansion-panel-header {
        position: relative;
      }

      .list .mat-expansion-panel-header mat-progress-bar {
        position: absolute;
        top: 0px;
        left: 0;
      }

      .list .mat-expansion-panel-content .mat-expansion-panel-body {
        padding-top: 10px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
// 1) implement RxState Service => extends RxState<ComponentState>
export class DemoBasicsComponent1 implements OnInit, OnDestroy {
  intervalSubscription = new Subscription();
  // UI interaction
  listExpandedChanges = new Subject<boolean>();
  storeList$ = this.store
    .select(selectRepositoryList)
    .pipe(map(this.parseListItems), startWith(initComponentState.list));

  // UI base-state
  // 1.1) Select component State
  //

  _refreshInterval: number = initComponentState.refreshInterval;
  @Input()
  set refreshInterval(refreshInterval: number) {
    if (refreshInterval > 4000) {
      this._refreshInterval = refreshInterval;
      this.resetRefreshTick();
    }
  }

  listExpanded: boolean = initComponentState.listExpanded;
  @Output()
  listExpandedChange = this.listExpandedChanges;

  numRenders = 0;
  rerenders(): number {
    return ++this.numRenders;
  }

  constructor(private store: Store<any>) {
    // super();
    // 2.1) Initialize component base-state
    // 2.2) Connect input bindings
    // 2.3) Connect base-state from child components ( listExpandedChanges => listExpanded )
    // 2.4) Connect Global base-state (selectRepositoryList -> parseListItems => list)
  }

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.resetRefreshTick();
  }

  resetRefreshTick() {
    this.intervalSubscription.unsubscribe();
    this.intervalSubscription = interval(this._refreshInterval)
      .pipe(tap(_ => this.store.dispatch(fetchRepositoryList({}))))
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
