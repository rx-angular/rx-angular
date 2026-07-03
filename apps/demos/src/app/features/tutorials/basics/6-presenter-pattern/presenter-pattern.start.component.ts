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
import { distinctUntilKeyChanged, map, tap } from 'rxjs/operators';
import { ListServerItem, ListService } from '../data-access/list-resource';
import {
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
  MatExpansionPanelDescription,
} from '@angular/material/expansion';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatButton } from '@angular/material/button';
import { MatList, MatListItem } from '@angular/material/list';
import { MatCard } from '@angular/material/card';
import { AsyncPipe } from '@angular/common';

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
  selector: 'rxa-presenter-pattern-start',
  template: `
    <h3>Presenter Pattern</h3>
    @if (model$ | async; as vm) {
      <mat-expansion-panel
        (expandedChange)="listExpandedChanges.next($event)"
        [expanded]="vm.listExpanded"
      >
        <mat-expansion-panel-header class="list">
          @if (false) {
            <mat-progress-bar [mode]="'query'"></mat-progress-bar>
          }
          <mat-panel-title> List </mat-panel-title>
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
          (click)="onRefreshClicks($event)"
        >
          Refresh List
        </button>
        @if (vm.list?.length) {
          <div>
            <mat-list>
              @for (item of vm.list; track item) {
                <mat-list-item>
                  {{ item.name }}
                </mat-list-item>
              }
            </mat-list>
          </div>
        } @else {
          <mat-card>No list given!</mat-card>
        }
      </mat-expansion-panel>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatProgressBar,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatButton,
    MatList,
    MatListItem,
    MatCard,
    AsyncPipe,
  ],
})
export class PresenterPatternStart
  extends RxState<ComponentState>
  implements OnInit, OnDestroy
{
  model$ = this.select();

  intervalSubscription = new Subscription();
  listExpandedChanges = new Subject<boolean>();

  @Input()
  set refreshInterval(refreshInterval: number) {
    if (refreshInterval > 4000) {
      this.set({ refreshInterval });
      this.resetRefreshTick();
    }
  }

  listExpanded: boolean = initComponentState.listExpanded;
  @Output()
  listExpandedChange = this.$.pipe(
    distinctUntilKeyChanged('listExpanded'),
    map((s) => s.listExpanded),
  );

  constructor(private listService: ListService) {
    super();
    this.set(initComponentState);
    this.connect('listExpanded', this.listExpandedChanges);
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
