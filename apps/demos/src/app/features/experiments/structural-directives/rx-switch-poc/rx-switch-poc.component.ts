import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'rxa-switch-poc',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h2>
          rxSwitch POC <small>{{switchValue$ | push}}</small>
        </h2>
        <div class="d-flex flex-column">
        <label>Switch Value (0-10)</label>
        <mat-slider min="0" max="10" (valueChange)="switchValueChange.next($event)">
        </mat-slider>
        </div>
        <br/>
        <button mat-raised-button [unpatch] (click)="updateCase1$.next($event)">
          Case1: {{case1Value$ | push}}
        </button>
        <button mat-raised-button [unpatch] (click)="updateCase2$.next($event)">
          Case2: : {{case2Value$ | push}}
        </button>
        <button mat-raised-button [unpatch] (click)="updateCase3$.next($event)">
          Case3: {{case3Value$ | push}}
        </button>
      </div>
      <div class="row w-100">

        <ng-container *poc1Switch="switchValue$; let value">
          <rxa-visualizer class="col-sm-4" *poc1SwitchCase="case1Value$; let caseValue">
            <h3 visualizerHeader>Case 1: v >= 0 && v <= 3</h3>
            <p>SwitchValue: {{value}}</p>
            <p>CaseValue: {{caseValue}}</p>
          </rxa-visualizer>
          <rxa-visualizer class="col-sm-4" *poc1SwitchCase="case2Value$; let caseValue">
            <h3 visualizerHeader>Case 2: v > 3 && v <= 6</h3>
            <p>SwitchValue: {{value}}</p>
            <p>CaseValue: {{caseValue}}</p>
          </rxa-visualizer>
          <rxa-visualizer class="col-sm-4" *poc1SwitchCase="case3Value$; let caseValue">
            <h3 visualizerHeader>Case 3: v > 6 && v <= 10</h3>
            <p>SwitchValue: {{value}}</p>
            <p>CaseValue: {{caseValue}}</p>
          </rxa-visualizer>
        </ng-container>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: environment.changeDetection
})
export class RxSwitchPocComponent {
  switchValueChange = new Subject<number>();
  updateCase1$ = new Subject<Event>();
  updateCase2$ = new Subject<Event>();
  updateCase3$ = new Subject<Event>();

  switchValue$ = this.switchValueChange;

  case1Value$ = this.switchValue$.pipe(
    map(v => this.condition(v, 0, 3))
  );
  case2Value$ = this.switchValue$.pipe(
    map(v => this.condition(v, 3, 6))
  );
  case3Value$ = this.switchValue$.pipe(
    map(v => this.condition(v, 6, 10))
  );
  condition = (v, from, to) => ((v === 0) ? v > from : v >= from) && v <= to;
}
