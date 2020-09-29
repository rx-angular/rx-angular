import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { scan } from 'rxjs/operators';

@Component({
  selector: 'rxa-cd-parent13',
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <h2>Passing Values</h2>
        <button mat-raised-button [unpatch] (click)="btnClick$.next($event)">
          Increment
        </button>
      </ng-container>
      Value: {{ value$ | push }}
      <rxa-recursive level="2" [value]="value$ | push"></rxa-recursive>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.Default
})
export class PassingValuesComponent {
  btnClick$ = new Subject<Event>();

  value$ = this.btnClick$.pipe(
    scan(a => ++a, 0)
  );
}
