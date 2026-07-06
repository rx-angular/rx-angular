import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { InputBindingsStart } from './input-bindings.start.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'rxa-input-bindings-container',
  template: `
    <h1>Input Bindings</h1>
    <mat-form-field>
      <label>RefreshInterval</label>
      <input
        type="number"
        (input)="refreshIntervalInput$.next($event)"
        matInput
      />
    </mat-form-field>

    <rxa-input-bindings-start
      [refreshInterval]="refreshInterval$ | async"
      (listExpandedChange)="listExpandedChange$.next($event)"
    >
    </rxa-input-bindings-start>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatFormField, MatInput, InputBindingsStart, AsyncPipe],
})
export class InputBindingsContainerComponent {
  refreshIntervalInput$ = new Subject<Event>();
  refreshInterval$ = this.refreshIntervalInput$.pipe(
    map((e: any) => e.target.value),
  );
  listExpandedChange$ = new Subject<boolean>();
}
