import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { SideEffectsStart } from './side-effects.start.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'rxa-side-effects-container',
  template: `
    <h1>Side Effects</h1>
    <br />
    <mat-form-field>
      <label>RefreshInterval</label>
      <input
        type="number"
        (input)="refreshIntervalInput$.next($event)"
        matInput
      />
    </mat-form-field>

    <rxa-side-effects-start [refreshInterval]="refreshInterval$ | async">
    </rxa-side-effects-start>
  `,
  imports: [MatFormField, MatInput, SideEffectsStart, AsyncPipe],
})
export class SideEffectsContainerComponent {
  refreshIntervalInput$ = new Subject<Event>();
  refreshInterval$ = this.refreshIntervalInput$.pipe(
    map((e: any) => e.target.value),
  );
}
