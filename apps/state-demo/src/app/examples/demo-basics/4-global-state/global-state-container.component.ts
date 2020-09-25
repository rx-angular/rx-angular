import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'output-bindings-container',
  template: `
    <h1>Global State</h1>
    <mat-form-field>
      <label>RefreshInterval</label>
      <input
        type="number"
        (input)="refreshIntervalInput$.next($event)"
        matInput
      />
    </mat-form-field>

    <global-state-start
      [refreshInterval]="refreshInterval$ | async"
      (listExpandedChange)="listExpandedChange$.next($event)"
    >
    </global-state-start>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobalStateContainerComponent {
  refreshIntervalInput$ = new Subject<Event>();
  refreshInterval$ = this.refreshIntervalInput$.pipe(
    map((e: any) => e.target.value)
  );
  listExpandedChange$ = new Subject<boolean>();
}
