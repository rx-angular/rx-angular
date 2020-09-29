import { ChangeDetectionStrategy, Component } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { scan, startWith } from 'rxjs/operators';

@Component({
  selector: 'rxa-passing-values',
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <h2>Passing Values</h2>
        <button mat-raised-button (click)="btnClick$.next($event)">
          Increment Static
        </button>
        <button mat-raised-button [unpatch] (click)="btnReactiveClick$.next($event)">
          Increment Reactive
        </button>
        <button mat-raised-button color="accent" (click)="btnBothClick$.next($event)">
          Increment Both
        </button>
        <mat-form-field>
          <mat-label>Nesting Level</mat-label>
          <input matInput [(ngModel)]="level">
        </mat-form-field>
      </ng-container>
      <div class="passing-values-container">
        <div>
          <h2>Static Values</h2>
          <rxa-recursive [level]="level" [value]="staticValue"></rxa-recursive>
        </div>
        <div>
          <h2>Reactive Values</h2>
          <rxa-recursive-reactive [level]="level" [value$]="valueReactive$"></rxa-recursive-reactive>
        </div>
      </div>
    </rxa-visualizer>
  `,
  styles: [`
    .passing-values-container {
      display: flex;
      justify-content: space-evenly;
      width: 100%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PassingValuesComponent {
  btnClick$ = new Subject<Event>();
  btnReactiveClick$ = new Subject<Event>();
  btnBothClick$ = new Subject<Event>();

  level = 3;

  staticValue = 0;

  value$ = merge(
    this.btnClick$,
    this.btnBothClick$
  ).pipe(
    scan(a => ++a, 0),
    startWith(0)
  );
  valueReactive$ = merge(
    this.btnReactiveClick$,
    this.btnBothClick$
  ).pipe(
    scan(a => ++a, 0),
    startWith(0)
  );

  constructor() {
    this.value$.subscribe(v => this.staticValue = v);
  }

}
