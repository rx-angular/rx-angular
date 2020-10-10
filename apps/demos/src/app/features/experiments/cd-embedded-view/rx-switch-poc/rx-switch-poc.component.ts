import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Subject } from 'rxjs';
import { map, scan, startWith } from 'rxjs/operators';

@Component({
  selector: 'rx-switch-poc',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h2>
          rxSwitch POC
        </h2>
        <button mat-raised-button [unpatch] (click)="toggleClick$.next($event)">
          toggle
        </button>
        <button mat-raised-button [unpatch] (click)="case1Click$.next($event)">
          case1 toggle
        </button>
        <button mat-raised-button [unpatch] (click)="case2Click$.next($event)">
          case2 toggle
        </button>
        <button mat-raised-button [unpatch] (click)="case3Click$.next($event)">
          case3 toggle
        </button>
      </div>
      <div class="row w-100">

          <ng-container *poc1Switch="switchValue$; let value">
            <rxa-visualizer class="col-sm-4" *poc1SwitchCase="case1Value$; let caseValue">
              <h3 visualizerHeader>Case 1</h3>
              <p>SwitchValue: {{value}}</p>
              <p>CaseValue: {{caseValue}}</p>
            </rxa-visualizer>
            <rxa-visualizer class="col-sm-4" *poc1SwitchCase="case2Value$; let caseValue">
              <h3 visualizerHeader>Case 2</h3>
              <p>SwitchValue: {{value}}</p>
              <p>CaseValue: {{caseValue}}</p>
            </rxa-visualizer>
            <rxa-visualizer class="col-sm-4" *poc1SwitchCase="case3Value$; let caseValue">
              <h3 visualizerHeader>Case 3</h3>
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
  toggleClick$ = new Subject<Event>();
  case1Click$ = new Subject<Event>();
  case2Click$ = new Subject<Event>();
  case3Click$ = new Subject<Event>();

  switchValue$ = this.toggleClick$.pipe(
    scan(a => !a, false),
    startWith(false)
  );

  case1Value$ = this.case1Click$.pipe(
    map(a => Math.random() < 0.3),
    startWith(true)
  );
  case2Value$ = this.case2Click$.pipe(
    map(a => Math.random() < 0.6),
    startWith(false)
  );
  case3Value$ = this.case3Click$.pipe(
    map(a => Math.random() < 0.9),
    startWith(false)
  );
}
