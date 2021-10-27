import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { interval, merge, Subject, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { ListServerItem, ListService } from '../data-access/list-resource';
import { RxState } from '../../../../../../../../libs/state/src/lib';
//👇 1- import RxState
//👇 2- define a component state
interface ComponentModel {
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

/*
// Not used as we DONT want to have a singleton.
// We need the instance per component
@Injectable({
  providedIn: 'root'
})
*/

/*
class GlobalState extends RxState implements OnDestroy {
  subscription = new Subscription();

  hold(o$: Observable<any>) {
    this.subscription.add(o$.subscribe());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}*/

@Component({
  selector: 'rxa-setup-start',
  //👇 Render the model property of the component
  template: `
    <h3>Setup</h3>
    <mat-expansion-panel
      *rxLet="model$; let model"
      (expandedChange)="model.listExpanded = $event; listExpandedChanges.next($event)"
      [expanded]="model.listExpanded"
    >
      <mat-expansion-panel-header class="list">
        <mat-progress-bar *ngIf="false" [mode]="'query'"></mat-progress-bar>
        <mat-panel-title> List</mat-panel-title>
        <mat-panel-description>
          <span
            >{{ model.list.length }} Repositories Updated every:
            {{ model.refreshInterval }} ms
          </span>
        </mat-panel-description>
      </mat-expansion-panel-header>

      <button
        mat-raised-button
        color="primary"
        (click)="refreshClick.next($event)"
      >
        Refresh List
      </button>

        <div *ngIf="model.list.length; else noList">
          <mat-list>
            <mat-list-item *rxFor="let item of model.list">
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  // providers: [SubHandler],
})
//👇 3- extend the component
export class SetupStart extends RxState<ComponentModel> {
  model$ = this.select();

  listExpandedChanges = new Subject<boolean>();
  refreshClick = new Subject<void>();

  @Input()
  set refreshInterval(refreshInterval: number) {
    if (refreshInterval > 4000) {
      this.set({ refreshInterval });
    }
  }

  @Output()
  listExpandedChange = this.select('listExpanded');

  timerRefresh = this.select(
    map((s) => s.refreshInterval),
    switchMap((ms) => interval(ms))
  );
  refreshListTrigger$ = merge(this.timerRefresh, this.refreshClick);
  refreshListSideEffect = (_) => this.listService.refetchList();

  constructor(private listService: ListService) {
    super();
    this.set(initComponentState);
    this.connect('list', this.listService.list$.pipe(map(this.parseListItems)));
    this.connect('listExpanded', this.listExpandedChanges);
    this.hold(this.refreshListTrigger$, this.refreshListSideEffect);
  }

  parseListItems(l: ListServerItem[]): DemoBasicsItem[] {
    return l.map(({ id, name }) => ({ id, name }));
  }
}
