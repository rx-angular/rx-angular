import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { DemoBasicsComponent } from './demo-basics.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'rxa-demo-basics4-container',
  template: `
    <h1>Solution</h1>
    <br />
    <mat-form-field>
      <label>RefreshInterval</label>
      <input
        type="number"
        (input)="refreshIntervalInput$.next($event)"
        matInput
      />
    </mat-form-field>

    <rxa-demo-basics
      [refreshInterval]="refreshInterval$ | async"
    ></rxa-demo-basics>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatFormField, MatInput, DemoBasicsComponent, AsyncPipe],
})
export class DemoBasicsContainerComponent {
  refreshIntervalInput$ = new Subject<Event>();
  refreshInterval$ = this.refreshIntervalInput$.pipe(
    map((e: any) => e.target.value),
  );
}
