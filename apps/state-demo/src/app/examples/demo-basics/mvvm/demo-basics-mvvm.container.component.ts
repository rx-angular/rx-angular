import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'demo-basicsmvvm-container',
  template: `
    <h1>Step 3</h1>
    <mat-form-field>
      <label>RefreshInterval {{ refreshInterval$ | async }}</label>
      <input
        type="number"
        (input)="refreshIntervalInput$.next($event)"
        matInput
      />
    </mat-form-field>

    <demo-basics-mvvm [refreshInterval]="refreshInterval$ | async">
    </demo-basics-mvvm>
  `
})
export class DemoBasicsMvvmContainerComponent {
  refreshIntervalInput$ = new Subject<Event>();
  refreshInterval$ = this.refreshIntervalInput$.pipe(
    map((e: any) => e.target.value)
  );
}
