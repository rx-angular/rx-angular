import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  ListServerItem,
  ListService,
} from '../../../data-access/list-resource';
import { merge, Subject, timer } from 'rxjs';
import { RxState } from '@rx-angular/state';

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
  selector: 'demo-basics-3-start',
  template: `
    <h3>Demo Basics 3 - Introduce MVVM Architecture</h3>
    <mat-expansion-panel
      *ngIf="model$ | async as m"
      (expandedChange)="listExpandedChanges.next($event)"
      [expanded]="m.listExpanded"
    >
      <mat-expansion-panel-header>
        <mat-panel-title>
          User Name
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoBasicsComponenteStart extends RxState<ComponentState> {
  refreshClicks = new Subject<Event>();
  listExpandedChanges = new Subject<boolean>();

  model$ = this.select();

  @Input()
  set refreshInterval(refreshInterval: number) {
    if (refreshInterval > 100) {
      this.set({ refreshInterval });
    }
  }

  refreshListSideEffect$ = merge(
    this.refreshClicks,
    this.select(
      map((s) => s.refreshInterval),
      switchMap((ms) => timer(0, ms))
    )
  ).pipe(tap((_) => this.listService.refetchList()));

  constructor(private listService: ListService) {
    super();
    this.set(initComponentState);
    this.connect(
      this.listExpandedChanges.pipe(map((b) => ({ listExpanded: b })))
    );
    this.connect('list', this.listService.list$.pipe(map(this.parseListItems)));
    this.hold(this.refreshListSideEffect$);
  }

  parseListItems(l: ListServerItem[]): DemoBasicsItem[] {
    return l.map(({ id, name }) => ({ id, name }));
  }
}
