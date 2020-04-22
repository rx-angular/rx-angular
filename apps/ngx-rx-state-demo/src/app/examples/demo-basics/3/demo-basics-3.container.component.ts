import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'demo-basics3-container',
  template: `
    <h1>Step 3</h1>
    <small>Child re-renders: {{rerenders()}}</small><br/>
    <mat-form-field>
      <label>RefreshInterval {{ refreshInterval$ | async }}</label>
      <input
        type="number"
        (input)="refreshIntervalInput$.next($event)"
        matInput
      />
    </mat-form-field>

    <demo-basics-3 [refreshInterval]="refreshInterval$ | async">
    </demo-basics-3>
  `
})
export class DemoBasics3ContainerComponent {
  refreshIntervalInput$ = new Subject<Event>();
  refreshInterval$ = this.refreshIntervalInput$.pipe(
    map((e: any) => e.target.value)
  );

  numRenders = 0;
  rerenders(): number {
    return  ++this.numRenders;
  }

}
