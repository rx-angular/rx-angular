import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { RxState } from '@rx-angular/state';
import { distinctUntilKeyChanged, map, switchMap, tap } from 'rxjs/operators';
import {
  ListService,
  ListServerItem,
} from '../../../data-access/list-resource';
import { interval, merge, Subject, Subscription } from 'rxjs';

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
  selector: 'demo-basics-2-start',
  template: `
    <h3>Demo Basics 2 - Handle Side Effects</h3>
    <mat-expansion-panel
      *ngIf="model$ | async as vm"
      (expandedChange)="listExpandedChanges.next($event)"
      [expanded]="vm.listExpanded"
    >
      <mat-expansion-panel-header>
        <mat-panel-title>
          List
        </mat-panel-title>
        <mat-panel-description>
          <span>
            {{ vm.list.length }} Repositories Updated every:
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

      <div *ngIf="vm.list.length; else noList">
        <mat-list>
          <mat-list-item *ngFor="let item of vm.list">
            {{ item.name }}
          </mat-list-item>
        </mat-list>
      </div>

      <ng-template #noList>
        <mat-card>No list given!</mat-card>
      </ng-template>
    </mat-expansion-panel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoBasicsComponent2Start extends RxState<ComponentState>
  implements OnInit, OnDestroy {
  intervalSubscription = new Subscription();
  listExpandedChanges = new Subject<boolean>();
  refreshClick = new Subject<Event>();

  model$ = this.select();

  intervalRefreshTick$ = this.select('refreshInterval').pipe(
    switchMap((ms) => interval(ms))
  );

  refreshListSideEffect$ = merge(this.intervalRefreshTick$, this.refreshClick);

  @Input()
  set refreshInterval(refreshInterval: number) {
    if (refreshInterval > 100) {
      this.set({ refreshInterval });
    }
  }

  @Output()
  listExpandedChange = this.$.pipe(distinctUntilKeyChanged('listExpanded'));

  constructor(private listService: ListService) {
    super();
    this.set(initComponentState);
    this.connect(
      this.listExpandedChanges.pipe(map((listExpanded) => ({ listExpanded })))
    );
    this.connect('list', this.listService.list$.pipe(map(this.parseListItems)));
    this.hold(this.refreshListSideEffect$, (_) =>
      this.listService.refetchList()
    );
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
        switchMap((ms) => interval(ms)),
        tap((_) => this.listService.refetchList())
      )
      .subscribe();
  }

  onRefreshClicks(event) {
    this.listService.refetchList();
  }

  parseListItems(l: ListServerItem[]): DemoBasicsItem[] {
    return l.map(({ id, name }) => ({ id, name }));
  }

  /*
    intervalRefreshTick$ = this.select(
    map(s => s.refreshInterval),
    switchMap(ms => timer(0, ms))
  );
  refreshListSideEffect$ = merge(this.refreshClicks, this.intervalRefreshTick$);


  * */
}
