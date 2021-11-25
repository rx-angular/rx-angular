import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Adapter } from "./adapter";
import { Presenter } from "./presenter";

export interface DemoBasicsItem {
  id: string;
  name: string;
}

@Component({
  selector: 'rxa-presenter-pattern-solution',
  template: `
    <h3>Presenter Pattern</h3>
    <mat-expansion-panel
      *ngIf="ps.vm$ | async as m"
      (expandedChange)="ps.listExpandedChanges.next($event)"
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
        (click)="ps.refreshClicks.next($event)"
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
  providers: [Presenter, Adapter]
})
export class PresenterPatternSolution extends RxState<any> {

  @Input()
  set refreshInterval(refreshInterval$: Observable<number>) {
    this.ps.connect('refreshInterval', refreshInterval$.pipe(
      filter(i => i > 100)
    ));
  }

  constructor(
    public ps: Presenter,
    public ad: Adapter
  ) {
    super();
    this.ps.connect('list', this.ad.list$);
    this.hold(this.ps.refreshListTrigger$, this.ad.refresh);
  }
}
