import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Action, Store} from "@ngrx/store";
import {
  fetchRepositoryList,
  repositoryListFetchError,
  repositoryListFetchSuccess,
  RepositoryListItem
} from "../../../data-access/github";
import {Observable, Subject} from "rxjs";
import {DemoBasicsItem} from "../demo-basics-item.interface";

import {ofType} from "@ngrx/effects";
import {map} from "rxjs/operators";

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
  selector: 'demo-basics-1',
  template: `
    <h3>Demo Basic 1 - Setup and Retrieving State</h3>
    <!-- CC Dominic Elm and his template streams :) -->
    <mat-expansion-panel
      (expandedChange)="listExpandedChanges.next($event)"
      [expanded]="m.listExpanded">

      <mat-expansion-panel-header class="list">
        <mat-progress-bar *ngIf="false" [mode]="'query'"></mat-progress-bar>
        <mat-panel-title>
          List
        </mat-panel-title>
        <mat-panel-description>
                   <span *ngIf="!m.listExpanded">{{m.list.length}}
                     Repositories Updated every: {{m.refreshInterval}}
                     ms
                   </span>
          <span *ngIf="m.listExpanded">{{m.list.length}}</span>
        </mat-panel-description>
      </mat-expansion-panel-header>

      <button mat-raised-button color="primary"
              (click)="refreshClicks.next($event)">
        Refresh List
      </button>

      <div *ngIf="m.list.length; else noList">
        <mat-list>
          <mat-list-item *ngFor="let item of m.list">
            {{item.name}}
          </mat-list-item>
        </mat-list>
      </div>

      <ng-template #noList>
        <mat-card>No list given!</mat-card>
      </ng-template>

    </mat-expansion-panel>
  `,
  styles: [`
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
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
// 1) implement LocalState Service => ComponentState
export class DemoBasicsComponent1 {

  // UI interaction
  refreshClicks = new Subject<Event>();
  listExpandedChanges = new Subject<boolean>();

  // UI state
  // 1.1) Select component State
  m = initComponentState;

  _refreshInterval: number;
  @Input()
  set refreshInterval(refreshInterval: number) {
    if (refreshInterval > 4000) {
      this._refreshInterval = refreshInterval;
    }
  }

  constructor(private store: Store<any>) {
    // 2.1) Initialize component state
    // 2.2) Connect input bindings
    // 2.3) Connect state from child components ( listExpandedChanges => listExpanded )
    // 2.4) Connect Global state (selectRepositoryList -> parseListItems => list)
  }

  onRefreshClicks(event) {

  }
  // Map RepositoryListItem to ListItem
  parseListItems(l: RepositoryListItem[]): DemoBasicsItem[] {
    return l.map(({id, name}) => ({id, name}))
  }
}

