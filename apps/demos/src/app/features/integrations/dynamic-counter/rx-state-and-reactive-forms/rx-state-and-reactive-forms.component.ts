import { EMPTY, Observable, Subject, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';

import { selectSlice } from '@rx-angular/state/selections';
import { RxState } from '@rx-angular/state';
import { CounterState, INITIAL_STATE } from '../shared/model';
import { toLatestFrom } from '../../../../shared/utils/to-latest-from';
import { updateCount } from '../shared/utils';

@Component({
  selector: 'rxa-dynamic-counter-and-forms',
  template: `
    <h1>RxState + ReactiveForms</h1>
    <form [formGroup]="counterForm" class="counter">
      <rxa-counter-display [count$]="count$"></rxa-counter-display>

      <button
        (click)="updateTicking.next({ isTicking: true })"
        mat-raised-button
      >
        Start
      </button>

      <button
        (click)="updateTicking.next({ isTicking: false })"
        mat-raised-button
      >
        Pause
      </button>

      <button (click)="reset()" mat-raised-button>Reset</button>

      <br />

      <button (click)="btnSetTo.next(undefined)" mat-raised-button>
        Set To
      </button>

      <mat-form-field>
        <label>Count</label>
        <input type="number" min="0" matInput [formControlName]="'count'" />
      </mat-form-field>
      <br />

      <button (click)="updateCountUp.next({ countUp: true })" mat-raised-button>
        Count Up
      </button>

      <button
        (click)="updateCountUp.next({ countUp: false })"
        mat-raised-button
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
  providers: [RxState],
})
export class RxStateAndReactiveFormsCounterComponent {
  readonly initialCounterState = INITIAL_STATE;
  readonly counterForm = this.fb.group({
    tickSpeed: [],
    count: [],
    countDiff: [],
  });

  readonly updateTicking = new Subject<{ isTicking: boolean }>();
  readonly updateCountUp = new Subject<{ countUp: boolean }>();
  readonly btnSetTo: Subject<Event> = new Subject<Event>();

  readonly count$: Observable<string> = this.$.select(map((s) => s.count + ''));

  constructor(
    private fb: UntypedFormBuilder,
    private $: RxState<CounterState>
  ) {
    this.reset();

    this.$.connect(this.updateTicking);
    this.$.connect(this.updateCountUp);
    this.$.connect(
      this.counterForm.valueChanges.pipe(
        selectSlice(['tickSpeed', 'countDiff'])
      )
    );
    this.$.connect(
      this.btnSetTo.pipe(
        toLatestFrom(
          this.counterForm.valueChanges.pipe(selectSlice(['count'])),
          { count: this.counterForm.value.count }
        )
      )
    );

    const updateCountTrigger$ = this.$.select(
      selectSlice(['isTicking', 'tickSpeed']),
      switchMap((s) => (s.isTicking ? timer(0, s.tickSpeed) : EMPTY))
    );
    this.$.connect('count', updateCountTrigger$, updateCount);
  }

  reset() {
    const { tickSpeed, countDiff, count, ...ignore } = this.initialCounterState;
    this.$.set(this.initialCounterState);
    this.counterForm.patchValue({ tickSpeed, countDiff, count });
  }
}
