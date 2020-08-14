import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'demo-basics2-container',
  template: `
    <h1>Step-2</h1>
    <small>Parent re-renders: {{ rerenders() }}</small
    ><br />
    <mat-form-field>
      <label>RefreshInterval</label>
      <input
        type="number"
        (input)="refreshIntervalInput$.next($event)"
        matInput
      />
    </mat-form-field>

    <demo-basics-2-start [refreshInterval]="refreshInterval$ | async">
    </demo-basics-2-start>
  `,
})
export class DemoBasics2ContainerComponent {
  refreshIntervalInput$ = new Subject<Event>();
  refreshInterval$ = this.refreshIntervalInput$.pipe(
    map((e: any) => e.target.value)
  );
  numRenders = 0;
  rerenders(): number {
    return ++this.numRenders;
  }
}
