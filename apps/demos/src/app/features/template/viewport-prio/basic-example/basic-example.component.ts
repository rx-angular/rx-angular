import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { getStrategies } from '@rx-angular/template';

@Component({
  selector: 'rxa-let1-container',
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <rxa-value-provider #valP="rxaValueProvider">
          <h1>Stop rendering if directive is out of the viewport</h1>
          <button mat-raised-button [unpatch] (click)="valP.next()">
            count up
          </button>
          <button
            mat-raised-button
            [unpatch]
            (click)="
              valP.schedule$.next(
                !running ? { scheduler: 'timeout', tickSpeed: 200 } : undefined
              );
              running = !running
            "
          >
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
  running = false;

  strategies = Object.keys(getStrategies({ cdRef: this.cdRef }));

  constructor(private ngZone: NgZone, private cdRef: ChangeDetectorRef) {}
}
