import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'presenter-pattern-container',
  template: `
    <h1>Presenter Pattern</h1>
    <mat-form-field>
      <label>RefreshInterval {{ refreshInterval$ | async }}</label>
      <input
        type="number"
        (input)="refreshIntervalInput$.next($event)"
        matInput
      />
    </mat-form-field>

    <presenter-pattern-start [refreshInterval]="refreshInterval$ | async">
    </presenter-pattern-start>
  `,
})
export class PresenterPatternContainerComponent {
  refreshIntervalInput$ = new Subject<Event>();
  refreshInterval$ = this.refreshIntervalInput$.pipe(
    map((e: any) => e.target.value)
  );
}
