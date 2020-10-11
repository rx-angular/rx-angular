import { Component } from '@angular/core';
import { CounterState, INITIAL_STATE } from '../shared/model';
import { RxState, selectSlice } from '../../../../../../../../libs/state/src/lib';
import { EMPTY, Subject, timer } from 'rxjs';
import { toLatestFrom } from '../../../../shared/utils/to-latest-from';
import { toInt } from '../../../../shared/utils/to-int';
import { switchMap } from 'rxjs/operators';
import { updateCount } from '../shared/utils';


@Component({
  selector: 'rxa-counter-rx-state-in-the-view',
  template: `
    <h1>RxState + ReactiveForms</h1>
    <div class="counter">

      <rxa-counter-display [count$]="select('count')"></rxa-counter-display>

      <button (click)="set({isTicking: true})" mat-raised-button>
        Start
      </button>

      <button (click)="set({isTicking: false})" mat-raised-button>
        Pause
      </button>

      <button (click)="set(initialCounterState)" mat-raised-button>
        Reset
      </button>

      <br/>

      <button (click)="setToClick.next()" mat-raised-button>
        Set To
      </button>

      <mat-form-field>
        <label>Count</label>
        <input #count type="number" min="0" matInput [value]="select('count') | push" (input)="countChange.next(count.value)"/>
      </mat-form-field>
      <br/>

      <button (click)="set({countUp: true})" mat-raised-button>
        Count Up
      </button>

      <button (click)="set({countUp: false})" mat-raised-button>
        Count Down
      </button>

      <br/>

      <mat-form-field>
        <label>Tick Speed</label>
        <input #tickSpeed type="number" min="0" matInput [value]="select('tickSpeed') | push" (input)="set({tickSpeed: tickSpeed.value})"/>
      </mat-form-field>

      <mat-form-field>
        <label>CountDiff</label>
        <input #countDiff type="number" min="0" matInput [value]="select('countDiff') | push"(input)="set({countUp: countDiff.value})"/>
      </mat-form-field>

    </div>
  `
})
export class RxStateInTheViewComponent extends RxState<CounterState> {
  initialCounterState = INITIAL_STATE;
  readonly setToClick = new Subject<Event>();
  readonly countChange = new Subject<number | string>();

  private readonly updateCountTrigger$ = this.select(
    selectSlice(['isTicking', 'tickSpeed']),
    switchMap(s => (s.isTicking ? timer(0, s.tickSpeed) : EMPTY))
  );

  constructor() {
    super();
    this.set(this.initialCounterState);
    this.connect('count', this.setToClick.pipe(toLatestFrom(this.countChange), toInt()));
    this.connect('count', this.updateCountTrigger$, updateCount);
  }

}


