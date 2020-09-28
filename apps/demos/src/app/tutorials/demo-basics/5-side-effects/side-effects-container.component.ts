import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'rxa-side-effects-container',
  template: `
    <h1>Side Effects</h1>
    <br/>
    <mat-form-field>
      <label>RefreshInterval</label>
      <input
        type="number"
        (input)="refreshIntervalInput$.next($event)"
        matInput/>
    </mat-form-field>

    <rxa-side-effects-start [refreshInterval]="refreshInterval$ | async">
    </rxa-side-effects-start>
  `,
})
export class SideEffectsContainerComponent {
  refreshIntervalInput$ = new Subject<Event>();
  refreshInterval$ = this.refreshIntervalInput$.pipe(
    map((e: any) => e.target.value)
  );
}
