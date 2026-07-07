import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { RxState } from '@rx-angular/state';
import { CounterState, INITIAL_STATE } from '../shared/model';
import { MatButton } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { RxPush } from '../../../../../../../../libs/template/push/src/lib/push.pipe';
import { ToArrayPipe } from '../../../../shared/utils/to-array.pipe';
import { PushPipe } from '../../../../rx-angular-pocs/template/pipes/push/push.pipe';

@Component({
  selector: 'rxa-counter-starter',
  template: `
    <h1>Counter</h1>
    <div class="counter">
      <div class="count">
        @for (d of count$ | push | toArray; track d) {
          <span class="position">
            <span class="digit static">
              {{ d }}
            </span>
          </span>
        }
      </div>

      <button mat-raised-button>Start</button>

      <button mat-raised-button>Pause</button>

      <button mat-raised-button>Reset</button>

      <br />

      <button mat-raised-button>Set To</button>

      <mat-form-field>
        <label>Count</label>
        <input type="number" min="0" matInput />
      </mat-form-field>
      <br />

      <button mat-raised-button>Count Up</button>

      <button mat-raised-button>Count Down</button>

      <br />
      <mat-form-field>
        <label>Tick Speed</label>
        <input type="number" min="0" matInput />
      </mat-form-field>
      <mat-form-field>
        <label>CountDiff</label>
        <input type="number" min="0" matInput />
      </mat-form-field>
    </div>
  `,
  imports: [MatButton, MatFormField, MatInput, RxPush, ToArrayPipe, PushPipe],
})
export class StarterComponent {
  readonly initialCounterState: CounterState = INITIAL_STATE;

  readonly count$: Observable<string>;

  constructor() {}
}
