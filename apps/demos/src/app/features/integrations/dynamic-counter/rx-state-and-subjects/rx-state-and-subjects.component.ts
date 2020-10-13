import { Component } from '@angular/core';
import { CounterState, INITIAL_STATE } from '../shared/model';
import { RxState, selectSlice } from '@rx-angular/state';
import { EMPTY, Observable, Subject, timer } from 'rxjs';
import { toLatestFrom } from '../../../../shared/utils/to-latest-from';
import { map, scan, switchMap } from 'rxjs/operators';
import { toInt } from '../../../../shared/utils/to-int';
import { updateCount } from '../shared/utils';

@Component({
  selector: 'rxa-counter-rx-state-in-the-view',
  template: `
    <h1>RxState + Subjects</h1>
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

      <button (click)="setToClick.next()" mat-raised-button>
        Set To
      </button>

      <mat-form-field>
        <label>Count</label>
        <input #count type="number" min="0" matInput [value]="count$ | push" (input)="countChange.next(count.value)"/>
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
        <input #countDiff type="number" min="0" matInput [value]="countDiff$ | push" (input)="set({countDiff: countDiff.value})"/>
      </mat-form-field>

    </div>
  `
})
export class RxStateAndSubjectsComponent extends RxState<CounterState> {
  initialCounterState: CounterState = INITIAL_STATE;

  readonly countChange = new Subject<string>();
  readonly tickSpeedChange = new Subject<string>();
  readonly countDiffChange = new Subject<string>();
  readonly isTickingToggle = new Subject<boolean>();
  readonly countUpToggle = new Subject<boolean>();
  readonly setToClick = new Subject<Event>();

  private readonly updateCountTrigger$ = this.select(
    selectSlice(['isTicking', 'tickSpeed']),
    switchMap(s => (s.isTicking ? timer(0, s.tickSpeed) : EMPTY))
  );

  readonly count$: Observable<string> = this.select(map(s => s.count + ''));
  readonly tickSpeed$: Observable<string> = this.select(map(s => s.tickSpeed + ''));
  readonly countDiff$: Observable<string> = this.select(map(s => s.countDiff + ''));


  constructor() {
    super();
    this.set(this.initialCounterState);

    this.connect('isTicking', this.isTickingToggle.pipe(scan(a => !a, this.initialCounterState.isTicking)));
    this.connect('countUp', this.countUpToggle.pipe(scan(a => !a, this.initialCounterState.countUp)));
    this.connect('countDiff', this.countDiffChange.pipe(toInt()));
    this.connect('tickSpeed', this.tickSpeedChange.pipe(toInt()));
    this.connect('count', this.setToClick.pipe(toLatestFrom(this.countChange, this.initialCounterState.count + ''), toInt()));

    this.connect('count', this.updateCountTrigger$, updateCount);
  }



}


