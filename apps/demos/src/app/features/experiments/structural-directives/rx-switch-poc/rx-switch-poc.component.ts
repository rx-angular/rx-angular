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
          rxSwitch POCa <small *poc1Let="switchValue$; let switchValue">{{switchValue}}</small>
        </h2>
        <mat-button-toggle-group name="visibleExamples"
                                 aria-label="Visible Examples"
                                 [value]="displayStates.all"
                                 (valueChange)="visibleExampleChange.next($event)">
          <mat-button-toggle [value]="displayStates.ngSwitch">ngSwitch</mat-button-toggle>
          <mat-button-toggle [value]="displayStates.rxSwitch">rxSwitch</mat-button-toggle>
          <mat-button-toggle [value]="displayStates.all">All</mat-button-toggle>
          <mat-button-toggle value="none">None</mat-button-toggle>
        </mat-button-toggle-group>

        <mat-form-field class="d-flex flex-column">
          <label>Switch Value (1-3)</label>
          <input matInput #i type="number" min="1" max="3" [unpatch] (input)="switchValueChange.next(i.value)"/>
        </mat-form-field>
        <br/>
        <button mat-raised-button [unpatch] (click)="updateCase1$.next($event)">
          Case1:
          <ng-container *rxLet="case1Value$; let case1Value">{{case1Value}}</ng-container>
        </button>
        <button mat-raised-button [unpatch] (click)="updateCase2$.next($event)">
          Case2: :
          <ng-container *rxLet="case2Value$; let case2Value">{{case2Value}}</ng-container>
        </button>
        <button mat-raised-button [unpatch] (click)="updateCase3$.next($event)">
          Case3:
          <ng-container *rxLet="case3Value$; let case3Value">{{case3Value}}</ng-container>
        </button>
      </div>
      <div class="w-100 col">
        <div *rxIf="ngSwitchVisible$;">
          <div class="row" [ngSwitch]="switchValue$ | async">
            <div class="col-sm-4">
              <rxa-visualizer viewType="embedded-view" *ngSwitchCase="case1Value$ | async">
                <p>CaseValue {{case1Value$ | push}}</p>
              </rxa-visualizer>
            </div>
            <div class="col-sm-4">
              <rxa-visualizer viewType="embedded-view" *ngSwitchCase="case2Value$ | async">
                <p>CaseValue {{case2Value$ | push}}</p>
              </rxa-visualizer>
            </div>
            <div class="col-sm-4">
              <rxa-visualizer viewType="embedded-view" *ngSwitchCase="case3Value$ | async">
                <p>CaseValue {{case3Value$ | push}}</p>
              </rxa-visualizer>
            </div>
          </div>
        </div>
        <ng-container *rxIf="rxSwitchVisible$">
          <div class="row" *rxSwitch="switchValue$; let value">
            <div class="col-sm-4">
              <rxa-visualizer viewType="embedded-view" *rxSwitchCase="case1Value$; let rxCaseValue1">
                <p>rxSwitchValue: {{value}}<br/>
                  CaseValue: {{rxCaseValue1}}</p>
              </rxa-visualizer>
            </div>
            <div class="col-sm-4">
              <rxa-visualizer viewType="embedded-view" *rxSwitchCase="case2Value$; let rxCaseValue2">
                <p>rxSwitchValue: {{value}}<br/>
                  CaseValue: {{rxCaseValue2}}</p>
              </rxa-visualizer>
            </div>
            <div class="col-sm-4">
              <rxa-visualizer viewType="embedded-view" *rxSwitchCase="case3Value$; let rxCaseValue3">
                <p>rxSwitchValue: {{value}}<br/>
                  CaseValue: {{rxCaseValue3}}</p>
              </rxa-visualizer>
            </div>
          </div>
        </ng-container>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: environment.changeDetection
})
export class RxSwitchPocComponent {

  displayStates = {
    ngSwitch: 0,
    rxSwitch: 1,
    all: 3
  };
  visibleExampleChange = new BehaviorSubject<number>(this.displayStates.all);

  rxSwitchVisible$ = this.visibleExampleChange.pipe(
    map(visibleExample => this.isVisible(visibleExample, this.displayStates.rxSwitch))
  );
  ngSwitchVisible$ = this.visibleExampleChange.pipe(
    map(visibleExample => this.isVisible(visibleExample, this.displayStates.ngSwitch))
  );

  switchValueChange = new Subject<string | number>();
  updateCase1$ = new Subject<Event>();
  updateCase2$ = new Subject<Event>();
  updateCase3$ = new Subject<Event>();

  switchValue$ = this.switchValueChange;

  case1Value$ = this.updateCase1$.pipe(
    map(v => toInt(undefined, 1, 3)),
    startWith(1),
    stateful()
  );
  case2Value$ = this.updateCase2$.pipe(
    map(v => toInt(undefined, 1, 3)),
    startWith(2),
    stateful()
  );
  case3Value$ = this.updateCase3$.pipe(
    map(v => toInt(undefined, 1, 3)),
    startWith(3),
    stateful()
  );

  isVisible(visibleExample: number, displayId: number): boolean {
    return visibleExample === displayId || visibleExample === this.displayStates.all;
  }
}
