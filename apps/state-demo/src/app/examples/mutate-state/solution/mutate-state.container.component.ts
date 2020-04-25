import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mutate-state-container',
  template: `
    <h1>Solution</h1>
    <small>Child re-renders: {{ rerenders() }}</small
    ><br />
    <mat-form-field>
      <label>RefreshInterval</label>
      <input
        type="number"
        (input)="refreshIntervalInput$.next($event)"
        matInput
      />
    </mat-form-field>

    <mutate-state [refreshInterval]="refreshInterval$ | async"> </mutate-state>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MutateStateContainerComponent {
  refreshIntervalInput$ = new Subject<Event>();
  refreshInterval$ = this.refreshIntervalInput$.pipe(
    map((e: any) => e.target.value)
  );

  numRenders = 0;
  rerenders(): number {
    return ++this.numRenders;
  }
}
