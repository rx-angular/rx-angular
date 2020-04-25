import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mutate-state1-container',
  template: `
    <h1>Step 1</h1>
    <small>Parent re-renders: {{ rerenders() }}</small
    ><br />
    <mat-form-field>
      <label>Title</label>
      <input
        type="text"
        (input)="refreshIntervalInput$.next($event)"
        matInput
      />
    </mat-form-field>

    <demo-basics-1
      [refreshInterval]="refreshInterval$ | async"
      (listExpandedChange)="listExpandedChange$.next($event)"
    >
    </demo-basics-1>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MutateState1ContainerComponent {
  refreshIntervalInput$ = new Subject<Event>();
  refreshInterval$ = this.refreshIntervalInput$.pipe(
    map((e: any) => e.target.value)
  );
  listExpandedChange$ = new Subject<Event>();

  numRenders = 0;
  rerenders(): number {
    return ++this.numRenders;
  }
}
