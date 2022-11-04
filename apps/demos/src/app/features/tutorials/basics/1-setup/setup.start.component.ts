import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  filter,
  interval,
  merge,
  Observable,
  Subject,
  Subscription,
  switchMap,
  takeUntil,
} from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { ListServerItem, ListService } from '../data-access/list-resource';
//👇 1- import RxState
import { RxState } from '@rx-angular/state';
import { RxActionFactory } from '@rx-angular/state/actions';
import { RxEffects } from '@rx-angular/state/effects';

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
  list: [],
};

@Component({
  selector: 'rxa-setup-start',
  //👇 Render the model property of the component
  template: `
    <h3>Setup</h3>
    <mat-expansion-panel
      *rxLet="vm$; let vm"
      (expandedChange)="
        vm.listExpanded = $event; ui.listExpandedChanges($event)
      "
      [expanded]="listExpanded"
    >
      <mat-expansion-panel-header class="list">
        <mat-progress-bar *ngIf="false" [mode]="'query'"></mat-progress-bar>
        <mat-panel-title> List</mat-panel-title>
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
        (click)="ui.refreshClicks($event)"
      >
        Refresh List
      </button>

      <div *ngIf="vm.list.length; else noList">
        <mat-list>
          <mat-list-item *ngFor="let item of list">
            {{ item.name }}
          </mat-list-item>
        </mat-list>
      </div>

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
  providers: [RxActionFactory, RxState, RxEffects],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetupStart {
  ui = this.rxActions.create();
  vm$ = this.model.select();

  @Input()
  set refreshInterval(refreshInterval$: Observable<number>) {
    this.model.connect(
      'refreshInterval',
      refreshInterval$.pipe(filter((rI) => rI > 4000))
    );
  }

  @Output()
  listExpandedChange = this.ui.listExpandedChanges$;

  autoTrigger$ = this.model
    .select('refreshInterval')
    .pipe(switchMap((ms) => interval(ms)));

  fetchEffect = (_) => this.listService.refetchList();

  constructor(
    private listService: ListService,
    private model: RxState<ComponentState>,
    private ef: RxEffects,
    private rxActions: RxActionFactory<{
      listExpandedChanges: boolean;
      refreshClicks: undefined;
    }>
  ) {
    this.model.set(initComponentState);

    this.model.connect(
      'list',
      this.listService.list$.pipe(map(this.parseListItems))
    );

    this.ef.register(
      merge(this.autoTrigger$, this.ui.listExpandedChanges$),
      this.fetchEffect
    );
  }

  parseListItems(l: ListServerItem[]): DemoBasicsItem[] {
    return l.map(({ id, name }) => ({ id, name }));
  }
}
