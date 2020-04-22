import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'demo-basics1-container',
  template: `
    <h1>Step 1</h1>
    <mat-form-field>
      <label>RefreshInterval {{ refreshInterval$ | async }}</label>
      <input
        type="number"
        (input)="refreshIntervalInput$.next($event)"
        matInput
      />
    </mat-form-field>

    <demo-basics-1 [refreshInterval]="refreshInterval$ | async" (listExpandedChange)="listExpandedChange$.next($event)">
    </demo-basics-1>
  `
})
export class DemoBasics1ContainerComponent {
  refreshIntervalInput$ = new Subject<Event>();
  refreshInterval$ = this.refreshIntervalInput$.pipe(
    map((e: any) => e.target.value)
  );
  listExpandedChange$ = new Subject<Event>();
}
