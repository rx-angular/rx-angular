import { Component } from '@angular/core';
import { CounterState, INITIAL_STATE } from '../shared/model';
import { RxState, selectSlice } from '@rx-angular/state';
import { EMPTY, Subject, timer } from 'rxjs';
import { toLatestFrom } from '../../../../shared/utils/to-latest-from';
import { toInt } from '../../../../shared/utils/to-int';
import { map, switchMap } from 'rxjs/operators';
import { updateCount } from '../shared/utils';


@Component({
  selector: 'rxa-counter-rx-state-in-the-view',
  template: `
    <h1>RxState in the view</h1>
    <div class="counter">

      <rxa-counter-display [count$]="count$"></rxa-counter-display>

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

      <button (click)="setToClick.next($event)" mat-raised-button>
        Set To
      </button>

      <mat-form-field>
        <label>Count</label>
        <input #count type="number" min="0" matInput [value]="initialCounterState.count" (input)="countChange.next(count.value)"/>
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
        <input #tickSpeed type="number" min="0" matInput [value]="tickSpeed$ | push" (input)="set({tickSpeed: tickSpeed.value})"/>
      </mat-form-field>

      <mat-form-field>
        <label>CountDiff</label>
        <input #countDiff type="number" min="0" matInput [value]="countDiff$ | push" (input)="set({countUp: countDiff.value})"/>
      </mat-form-field>

    </div>
  `
})
export class RxStateInTheViewComponent extends RxState<CounterState> {
  initialCounterState = INITIAL_STATE;
  readonly setToClick = new Subject<Event>();
  readonly countChange = new Subject<string>();

  readonly count$ = this.select(map(s => s.count+''));
  readonly tickSpeed$ = this.select(map(s => s.tickSpeed+''));
  readonly countDiff$ = this.select(map(s => s.countDiff+''));

  private readonly updateCountTrigger$ = this.select(
    selectSlice(['isTicking', 'tickSpeed']),
    switchMap(s => (s.isTicking ? timer(0, s.tickSpeed) : EMPTY))
  );

  constructor() {
    super();
    this.set(this.initialCounterState);
    this.connect('count', this.setToClick.pipe(toLatestFrom(this.countChange, this.initialCounterState.count+''), toInt()));
    this.connect('count', this.updateCountTrigger$, updateCount);
  }

}


