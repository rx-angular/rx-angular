import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { GlobalStateStart } from './global-state.start.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'rxa-output-bindings-container',
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

    <rxa-global-state-start
      [refreshInterval]="refreshInterval$ | async"
      (listExpandedChange)="listExpandedChange$.next($event)"
    >
    </rxa-global-state-start>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatFormField, MatInput, GlobalStateStart, AsyncPipe],
})
export class GlobalStateContainerComponent {
  refreshIntervalInput$ = new Subject<Event>();
  refreshInterval$ = this.refreshIntervalInput$.pipe(
    map((e: any) => e.target.value),
  );
  listExpandedChange$ = new Subject<boolean>();
}
