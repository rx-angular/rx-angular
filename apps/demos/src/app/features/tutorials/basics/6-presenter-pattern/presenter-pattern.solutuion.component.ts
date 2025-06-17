import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Adapter } from './adapter';
import { Presenter } from './presenter';

export interface DemoBasicsItem {
  id: string;
  name: string;
}

@Component({
  selector: 'rxa-presenter-pattern-solution',
  template: `
    <h3>Presenter Pattern</h3>
    @if (ps.vm$ | async; as m) {
      <mat-expansion-panel
        (expandedChange)="ps.listExpandedChanges.next($event)"
        [expanded]="m.listExpanded"
      >
        <mat-expansion-panel-header>
          <mat-panel-title> User Name </mat-panel-title>
          <mat-panel-description>
            @if (!m.listExpanded) {
              <span
                >{{ m.list.length }} Repositories Updated every:
                {{ m.refreshInterval }} ms</span
              >
            }
            @if (m.listExpanded) {
              <span>{{ m.list.length }}</span>
            }
          </mat-panel-description>
        </mat-expansion-panel-header>
        <button
          mat-raised-button
          color="primary"
          (click)="ps.refreshClicks.next($event)"
        >
          Refresh List
        </button>
        @if (m.list.length) {
          <div>
            <mat-list>
              @for (item of m.list; track item) {
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
  providers: [Presenter, Adapter],
  standalone: false,
})
export class PresenterPatternSolution extends RxState<any> {
  @Input()
  set refreshInterval(refreshInterval$: Observable<number>) {
    this.ps.connect(
      'refreshInterval',
      refreshInterval$.pipe(filter((i) => i > 100)),
    );
  }

  constructor(
    public ps: Presenter,
    public ad: Adapter,
  ) {
    super();
    this.ps.connect('list', this.ad.list$);
    this.hold(this.ps.refreshListTrigger$, this.ad.refresh);
  }
}
