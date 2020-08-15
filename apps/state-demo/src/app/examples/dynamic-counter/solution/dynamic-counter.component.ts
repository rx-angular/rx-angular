import { Subject, timer, combineLatest, EMPTY } from 'rxjs';
import {
  map,
  startWith,
  withLatestFrom,
  switchMap,
  tap,
  pluck,
} from 'rxjs/operators';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { RxState, stateful } from '@rx-angular/state';

interface InputEvent {
  target: {
    value: any;
  };
}

interface CounterState {
  isTicking: boolean;
  count: number;
  countUp: boolean;
  tickSpeed: number;
  countDiff: number;
}

const initialCounterState = {
  isTicking: false,
  count: 0,
  countUp: true,
  tickSpeed: 200,
  countDiff: 1,
};

@Component({
  selector: 'dynamic-counter',
  template: `
    <h1>Counter With Container</h1>

    <form [formGroup]="counterForm" class="counter">
      <div class="count">
        <span class="position" *ngFor="let d of count$ | async | toArray">
          <span class="digit static">
            {{ d }}
          </span>
        </span>
      </div>

      <button
        type="button"
        (click)="set({ isTicking: true })"
        mat-raised-button
        color="primary"
      >
        Start
      </button>

      <button
        type="button"
        (click)="set({ isTicking: false })"
        mat-raised-button
        color="primary"
      >
        Pause
      </button>

      <button
        type="button"
        (click)="set(initialCounterState)"
        mat-raised-button
        color="primary"
      >
        Reset
      </button>

      <br />

      <button
        type="button"
        (click)="btnSetTo.next($event)"
        mat-raised-button
        color="primary"
      >
        Set To
      </button>

      <mat-form-field>
        <label>Count</label>
        <input type="number" min="0" matInput [formControlName]="'count'" />
      </mat-form-field>
      <br />

      <button
        type="button"
        (click)="set({ countUp: true })"
        mat-raised-button
        color="primary"
      >
        Count Up
      </button>

      <button
        type="button"
        (click)="set({ countUp: false })"
        mat-raised-button
        color="primary"
      >
        Count Down
      </button>

      <br />
      <mat-form-field>
        <label>Tick Speed</label>
        <input type="number" min="0" matInput [formControlName]="'tickSpeed'" />
      </mat-form-field>
      <mat-form-field>
        <label>CountDiff</label>
        <input type="number" min="0" matInput [formControlName]="'countDiff'" />
      </mat-form-field>
    </form>
  `,
  styleUrls: ['./dynamic-counter.component.scss'],
})
export class CounterComponent extends RxState<CounterState> {
  initialCounterState = initialCounterState;

  counterForm = this.fb.group({
    tickSpeed: [],
    count: [],
    countDiff: [],
  });
  counterForm$ = this.counterForm.valueChanges;

  btnSetTo: Subject<Event> = new Subject<Event>();

  count$ = this.select('count');

  constructor(private fb: FormBuilder) {
    super();
    this.set(this.initialCounterState);
    this.counterForm.patchValue(initialCounterState);

    this.connect(this.counterForm$.pipe(pluckDistinct('tickSpeed')));
    this.connect(this.counterForm$.pipe(pluckDistinct('countDiff')));

    this.connect(
      this.btnSetTo.pipe(
        withLatestFrom(
          this.counterForm$
            .pipe(pluckDistinct('count'))
            .pipe(startWith({ count: initialCounterState.count }))
        ),
        map(([e, slice]) => slice),
        tap(console.log)
      )
    );

    const tick$ = combineLatest([
      this.select('isTicking'),
      this.select('tickSpeed'),
    ]).pipe(switchMap(([isTicking, ms]) => (isTicking ? timer(0, ms) : EMPTY)));

    this.connect(
      'count',
      tick$,
      (s, _) => s.count + (s.countUp ? 1 : -1) * s.countDiff
    );
  }
}

function pluckDistinct<T>(key: string) {
  return (o$) =>
    o$.pipe(
      stateful(
        pluck(key),
        map((v) => ({ [key]: v }))
      )
    );
}
