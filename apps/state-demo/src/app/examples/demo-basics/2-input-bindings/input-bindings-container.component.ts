import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'input-bindings-container',
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

    <input-bindings-start
      [refreshInterval]="refreshInterval$ | async"
      (listExpandedChange)="listExpandedChange$.next($event)"
    >
    </input-bindings-start>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputBindingsContainerComponent {
  refreshIntervalInput$ = new Subject<Event>();
  refreshInterval$ = this.refreshIntervalInput$.pipe(
    map((e: any) => e.target.value)
  );
  listExpandedChange$ = new Subject<boolean>();
}
