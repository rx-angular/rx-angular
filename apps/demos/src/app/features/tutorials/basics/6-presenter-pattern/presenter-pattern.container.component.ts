import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { PresenterPatternStart } from './presenter-pattern.start.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'rxa-presenter-pattern-container',
  template: `
    <h1>Presenter Pattern</h1>
    <mat-form-field>
      <label>RefreshInterval {{ refreshInterval$ | async }}</label>
      <input
        type="number"
        (input)="refreshIntervalInput$.next($event)"
        matInput
      />
    </mat-form-field>

    <rxa-presenter-pattern-start [refreshInterval]="refreshInterval$ | async">
    </rxa-presenter-pattern-start>
  `,
  imports: [MatFormField, MatInput, PresenterPatternStart, AsyncPipe],
})
export class PresenterPatternContainerComponent {
  refreshIntervalInput$ = new Subject<Event>();
  refreshInterval$ = this.refreshIntervalInput$.pipe(
    map((e: any) => e.target.value),
  );
}
