import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { INITIAL_STATE } from '../shared/model';
import { CounterPresenterService } from './counter.presenter';

@Component({
  selector: 'rxa-dynamic-counter-and-forms',
  template: `
    <h1>RxState + Presenter Patters</h1>
    <div class="counter">

      <rxa-counter-display [count$]="p.count$"></rxa-counter-display>

      <button (click)="p.dontTick()" mat-raised-button>
        Start
      </button>

      <button (click)="p.dontTick()" mat-raised-button>
        Pause
      </button>

      <button (click)="p.reset()" mat-raised-button>
        Reset
      </button>

      <br/>

      <button (click)="p.setToClick()" mat-raised-button>
        Set To
      </button>

      <mat-form-field>
        <label>Count</label>
        <input #count type="number" min="0" matInput [value]="p.count$ | push" (input)="p.changeCount(count.value)"/>
      </mat-form-field>
      <br/>

      <button (click)="p.countUp()" mat-raised-button>
        Count Up
      </button>

      <button (click)="p.countDown()" mat-raised-button>
        Count Down
      </button>

      <br/>

      <mat-form-field>
        <label>Tick Speed</label>
        <input #tickSpeed type="number" min="0" matInput [value]="p.count$ | push" (input)="p.changeTickSpeed(tickSpeed.value)"/>
      </mat-form-field>

      <mat-form-field>
        <label>CountDiff</label>
        <input #countDiff type="number" min="0" matInput [value]="p.countDiff$ | push" (input)="p.changeCountDiff(countDiff.value)"/>
      </mat-form-field>

    </div>
  `,
  providers: [CounterPresenterService]
})
export class RxStateAsPresenterComponent {

  constructor(public p: CounterPresenterService) {
    this.p.initialCounterState = INITIAL_STATE;
    this.p.reset();
  }

}


