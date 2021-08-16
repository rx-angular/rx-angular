import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { distinctUntilKeyChanged, map, startWith } from 'rxjs/operators';
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
  selector: 'rxa-side-effects-solution',
  template: `
    <h3>
      Side Effects
    </h3>
    <mat-expansion-panel
      *ngIf="model$ | async as vm"
      (expandedChange)="listExpandedChanges.next($event)"
      [expanded]="vm.listExpanded"
    >
      <mat-expansion-panel-header class="list">
        <mat-progress-bar *ngIf="false" [mode]="'query'"></mat-progress-bar>
        <mat-panel-title>
          List
        </mat-panel-title>
        <mat-panel-description>
          <span
          >{{ vm.list.length }} Repositories Updated every:
            {{ vm.refreshInterval }} ms
          </span>
        </mat-panel-description>
      </mat-expansion-panel-header>

      <button
        mat-raised-button
        color="primary"
        (click)="refreshClicks$.next($event)">
        Refresh List
      </button>

      <div *ngIf="vm.list?.length; else noList">
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
export class SideEffectsSolution extends RxState<ComponentState>
  implements OnInit, OnDestroy {
  model$ = this.select();

  listExpandedChanges = new Subject<boolean>();
  refreshClicks$ = new Subject<Event>();

  @Input()
  set refreshInterval(refreshInterval: number) {
    if (refreshInterval > 4000) {
      this.set({ refreshInterval });
    }
  }

  listExpanded: boolean = initComponentState.listExpanded;
  @Output()
  listExpandedChange = this.$.pipe(distinctUntilKeyChanged('listExpanded'), map(s => s.listExpanded));

  constructor(private listService: ListService) {
    super();
    this.set(initComponentState);
    this.connect('listExpanded', this.listExpandedChanges);
    this.connect('list', this.listService.list$.pipe(map(this.parseListItems)));
    this.hold(this.refreshClicks$.pipe(startWith(true)), () => this.listService.refetchList())
  }

  ngOnInit(): void {
    this.refreshClicks$.next(undefined);
  }

  parseListItems(l: ListServerItem[]): DemoBasicsItem[] {
    return l.map(({ id, name }) => ({ id, name }));
  }
}
