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
  ListServerItem,
  ListService,
} from '../../../data-access/list-resource';
import { interval, Subject, Subscription } from 'rxjs';

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
  selector: 'demo-basics-1-solution',
  template: `
    <h3>
      Demo Basics 1 - Setup a reactive state, its selections and the related UI
      interactions
    </h3>
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
export class DemoBasicsComponent1Solution extends RxState<ComponentState>
  implements OnInit, OnDestroy {
  intervalSubscription = new Subscription();
  listExpandedChanges = new Subject<boolean>();

  model$ = this.select();

  @Input()
  set refreshInterval(refreshInterval: number) {
    if (refreshInterval > 100) {
      this.set({ refreshInterval });
      this.resetRefreshTick();
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
}
