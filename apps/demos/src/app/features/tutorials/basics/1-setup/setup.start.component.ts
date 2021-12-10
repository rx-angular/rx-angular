import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { interval, Subject, Subscription } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { ListServerItem, ListService } from '../data-access/list-resource';
//👇 1- import RxState
import { RxState } from '@rx-angular/state';
//👇 2- define a component state
interface ComponentState {
  refreshInterval: number;
  list: DemoBasicsItem[];
  listExpanded: boolean;
}

export interface DemoBasicsItem {
  id: string;
  name: string;
}

//👇 The  initial base-state is normally derived from somewhere else automatically but could also get specified statically here.
const initComponentState = {
  refreshInterval: 10000,
  listExpanded: false,
  list: []
};

@Component({
  selector: 'rxa-setup-start',
  //👇 Render the model property of the component
  template: `
    <h3>
      Setup
    </h3>
    <mat-expansion-panel
      (expandedChange)="listExpanded = $event; listExpandedChanges.next($event)"
      [expanded]="listExpanded">
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
//👇 3- extend the component
export class SetupStart implements OnInit, OnDestroy {
  //👇 Set up the model property of the component
  intervalSubscription = new Subscription();
  listExpandedChanges = new Subject<boolean>();
  storeList$ = this.listService.list$.pipe(
    map(this.parseListItems),
    startWith(initComponentState.list)
  );

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
  constructor(
    private listService: ListService
  ) {
    //👇 Always call super() first in the constructor

    //👇 Call set() to initialize the state

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
      .pipe(tap((_) => this.listService.refetchList()))
      .subscribe();
  }

  onRefreshClicks(event) {
    this.listService.refetchList();
  }

  parseListItems(l: ListServerItem[]): DemoBasicsItem[] {
    return l.map(({ id, name }) => ({ id, name }));
  }
}
