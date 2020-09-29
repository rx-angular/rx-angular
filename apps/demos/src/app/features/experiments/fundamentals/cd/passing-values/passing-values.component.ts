import { ChangeDetectionStrategy, Component } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { scan, startWith } from 'rxjs/operators';

@Component({
  selector: 'rxa-passing-values',
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <h1 class="mat-headline">Passing Values</h1>
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <mat-form-field>
              <mat-label>Nesting Level</mat-label>
              <input matInput type="number" [(ngModel)]="level">
            </mat-form-field>
            <div>
              <button mat-raised-button color="primary" (click)="btnBothClick$.next($event)">
                <mat-icon class="mr-2">add</mat-icon> Increment Both
              </button>
            </div>
          </div>
        </div>
      </ng-container>
      <div class="row w-100">
        <div class="col-sm-12 col-md-6">
          <h2 class="mat-subheader">Static Values</h2>
          <div>
            <strong>Current value:</strong> {{ staticValue }}
          </div>
          <div class="mb-1">
            <button mat-mini-fab (click)="btnClick$.next($event)">
              <mat-icon>add</mat-icon>
            </button>
          </div>
          <rxa-recursive [level]="level" [value]="staticValue"></rxa-recursive>
        </div>
        <div class="col-sm-12 col-md-6">
          <h2 class="mat-subheader">Reactive Values</h2>
          <div>
            <strong>Current value:</strong> {{ valueReactive$ | push }}
          </div>
          <div class="mb-1">
            <button mat-mini-fab unpatch (click)="btnReactiveClick$.next($event)">
              <mat-icon>add</mat-icon>
            </button>
          </div>
          <rxa-recursive-reactive [level]="level" [value$]="valueReactive$"></rxa-recursive-reactive>
        </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.Default
})
export class PassingValuesComponent {
  btnClick$ = new Subject<Event>();
  btnReactiveClick$ = new Subject<Event>();
  btnBothClick$ = new Subject<Event>();

  private _level = 3;
  set level(level: number) {
    this._level = level >= 1 ? level : 1;
  }
  get level(): number { return this._level }

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
