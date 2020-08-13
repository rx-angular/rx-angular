import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'demo-basics4-container',
  template: `
    <h1>Solution</h1>
    <small>re-renders: {{ rerenders() }}</small
    ><br />
    <mat-form-field>
      <label>RefreshInterval</label>
      <input
        type="number"
        (input)="refreshIntervalInput$.next($event)"
        matInput
      />
    </mat-form-field>

    <demo-basics [refreshInterval]="refreshInterval$ | async"> </demo-basics>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoBasicsContainerComponent {
  refreshIntervalInput$ = new Subject<Event>();
  refreshInterval$ = this.refreshIntervalInput$.pipe(
    map((e: any) => e.target.value)
  );

  numRenders = 0;
  rerenders(): number {
    return ++this.numRenders;
  }
}
