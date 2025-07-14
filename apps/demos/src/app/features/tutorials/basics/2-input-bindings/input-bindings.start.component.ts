import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
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
  selector: 'rxa-input-bindings-start',
  template: `
    <h3>Input Bindings</h3>
    {{ model$ | async | json }}
    <!--👇 Bind the state to the view -->
    <mat-expansion-panel
      (expandedChange)="listExpanded = $event; listExpandedChanges.next($event)"
      [expanded]="listExpanded"
    >
      <mat-expansion-panel-header class="list">
        @if (false) {
          <mat-progress-bar [mode]="'query'"></mat-progress-bar>
        }
        <mat-panel-title> List </mat-panel-title>
        <!--👇 Replace the refreshInterval component -->
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

      @if (storeList$ | async; as list) {
        @if (list?.length) {
          <div>
            <mat-list>
              @for (item of list; track item) {
                <mat-list-item>
                  {{ item.name }}
                </mat-list-item>
              }
            </mat-list>
          </div>
        } @else {
          <mat-card>No list given!</mat-card>
        }
      }
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
  standalone: false,
})
export class InputBindingsStart
  extends RxState<ComponentState>
  implements OnInit, OnDestroy
{
  model$ = this.select();

  intervalSubscription = new Subscription();
  listExpandedChanges = new Subject<boolean>();
  storeList$ = this.listService.list$.pipe(
    map(this.parseListItems),
    startWith(initComponentState.list),
  );

  _refreshInterval: number = initComponentState.refreshInterval;
  @Input()
  set refreshInterval(refreshInterval: number) {
    if (refreshInterval > 4000) {
      //👇 Partially update the state with the state slice
      this._refreshInterval = refreshInterval;
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
  //👇 Update the resetRefreshTick method
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
