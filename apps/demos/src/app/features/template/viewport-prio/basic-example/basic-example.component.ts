import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { getStrategies } from '@rx-angular/template';
import { BehaviorSubject, interval, NEVER, Subject } from 'rxjs';
import { scan, switchMap } from 'rxjs/operators';

@Component({
  selector: 'rxa-let1-container',
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <rxa-value-provider [changes$]="running$" #valP="rxaValueProvider">
          <h1>Stop rendering if directive is out of the viewport</h1>
          <button mat-raised-button [unpatch] (click)="valP.next()">
            count up
          </button>
          <button
            mat-raised-button
            [unpatch]
            (click)="runningToggle$.next();">
            auto
          </button>
        </rxa-value-provider>
      </ng-container>

      <div class="row w-100">
        <h3>View Port</h3>
        <div #viewPort class="view-port col-sm-12">
          <div class="view-port-inner">
            <div
              class="target"
              viewport-prio
              *rxLet="valP.incremental$; let count"
            >
              <rxa-renders [value$]="count"></rxa-renders>
            </div>
          </div>
        </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .view-port {
        height: 250px;
        overflow-y: scroll;
        border: 1px solid red;
      }

      .view-port-inner {
        height: 1000px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .target {
        height: 100px;
        width: 100px;
        border: 1px solid red;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
      }
    `,
  ],
})
export class BasicExampleComponent {
  runningToggle$ = new Subject<boolean>();
  running$ = this.runningToggle$.pipe(
    scan(b => !b, false),
    switchMap(b => b ? interval(200):NEVER)
  );

  constructor() {}
}
