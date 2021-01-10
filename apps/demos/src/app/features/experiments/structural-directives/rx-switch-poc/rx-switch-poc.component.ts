import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { toInt } from '../../../../shared/debug-helper/value-provider';
import { stateful } from '@rx-angular/state';

@Component({
  selector: 'rxa-switch-poc',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h2>
          *rxSwitch
        </h2>

        <mat-form-field class="d-flex flex-column">
          <label>Switch Value (1-3)</label>
          <input matInput [value]="value$.getValue()" #i type="number" min="1" max="3" [unpatch] (input)="value$.next(i.value)"/>
        </mat-form-field>
      </div>
      <div class="w-100 col">
          <div class="row" [rxSwitch]="value$">
            <div class="col-sm-4">
              <rxa-visualizer viewType="embedded-view" *rxSwitchCase="'1'">
                <p>CaseValue: 1</p>
              </rxa-visualizer>
            </div>
            <div class="col-sm-4">
              <rxa-visualizer viewType="embedded-view" *rxSwitchCase="'2'">
                <p>CaseValue: 2</p>
              </rxa-visualizer>
            </div>
            <div class="col-sm-4">
              <rxa-visualizer viewType="embedded-view" *rxSwitchCase="'3'">
                <p>CaseValue: 3</p>
              </rxa-visualizer>
            </div>
          </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: environment.changeDetection
})
export class RxSwitchPocComponent {

  value$ = new BehaviorSubject<unknown>('1');

}
