import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'rxa-rx-if-poc',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h2>
          rxIf POC
        </h2>
        <rxa-strategy-select (strategyChange)="strategy = $event"></rxa-strategy-select>
        <rxa-value-provider #v="rxaValueProvider" [buttons]="true"></rxa-value-provider>
        <button mat-raised-button (click)="v.next()" class="mr-1">
          toggle
        </button>
        <button mat-raised-button [unpatch] (click)="v.next()">
          toggle (unpatched)
        </button>
      </div>
      <div class="row w-100">
        <div class="col-sm-3">
          <h3>RxIf</h3>
          <ng-template #elseTpl>
            <div class="dh-embedded-view">
              <rxa-dirty-check></rxa-dirty-check>
              FALSE TEMPLATE
            </div>
          </ng-template>
          <div class="dh-embedded-view" *rxIf="v.boolean$; let value; else: elseTpl; strategy: strategy;">
            <rxa-dirty-check></rxa-dirty-check>
            TRUE TEMPLATE
          </div>
        </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: environment.changeDetection
})
export class RxIfBasicComponent {
  strategy;
}
