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
//👇 Import { map }
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
  selector: 'rxa-output-bindings-start',
  template: `
    <h3>Output Bindings</h3>
    <!--👇 Refactor the state binding -->
    @if (model$ | async; as vm) {
      <mat-expansion-panel
        (expandedChange)="
          listExpanded = $event; listExpandedChanges.next($event)
        "
        [expanded]="listExpanded"
      >
        <mat-expansion-panel-header class="list">
          @if (false) {
            <mat-progress-bar [mode]="'query'"></mat-progress-bar>
          }
          <mat-panel-title> List </mat-panel-title>
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
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class OutputBindingsStart
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
  //👇 Connect an observable to the state
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
