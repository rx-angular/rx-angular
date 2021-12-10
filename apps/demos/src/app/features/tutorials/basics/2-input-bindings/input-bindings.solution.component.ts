import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { interval, Subject, Subscription } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { ListServerItem, ListService } from '../data-access/list-resource';

export interface DemoBasicsItem {
  id: string;
  name: string;
}

interface ComponentState {
  refreshInterval: number;
  list: DemoBasicsItem[];
  listExpanded: boolean;
}

const initComponentState = {
  refreshInterval: 10000,
  listExpanded: false,
  list: [],
};

@Component({
  selector: 'rxa-input-bindings-solution',
  template: `
    <h3>
      Input Bindings
    </h3>
    <mat-expansion-panel
      *ngIf="model$ | async as vm"
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
            {{ vm.refreshInterval }} ms
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
      `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputBindingsSolution extends RxState<ComponentState> implements OnInit, OnDestroy {
  model$ = this.select();

  intervalSubscription = new Subscription();
  listExpandedChanges = new Subject<boolean>();
  storeList$ = this.listService.list$.pipe(
    map(this.parseListItems),
    startWith(initComponentState.list)
  );

  @Input()
  set refreshInterval(refreshInterval: number) {
    if (refreshInterval > 4000) {
      this.set({ refreshInterval });
      this.resetRefreshTick();
    }
  }

  listExpanded: boolean = initComponentState.listExpanded;
  @Output()
  listExpandedChange = this.listExpandedChanges;

  constructor(private listService: ListService) {
    super();
    this.set(initComponentState);
  }

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.resetRefreshTick();
  }

  resetRefreshTick() {
    this.intervalSubscription.unsubscribe();
    this.intervalSubscription = interval(this.get('refreshInterval'))
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
