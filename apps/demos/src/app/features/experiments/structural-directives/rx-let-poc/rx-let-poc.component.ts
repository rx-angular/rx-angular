import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StrategyProvider } from '../../../../shared/rx-angular-pocs/render-stragegies/strategy-provider.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'rxa-rx-let-poc',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <rxa-strategy-select (strategyChange)="strategyProvider.primaryStrategy = $event">
        </rxa-strategy-select>
        <rxa-trigger-provider #triggers="rxaTriggerProvider"></rxa-trigger-provider>
        <br/>
        <rxa-value-provider [buttons]="true" #v="rxaValueProvider"></rxa-value-provider>
      </div>
      <div class="mt-5 row w-100 d-flex">
        <div class="col-6 dh-embedded-view p-2">
          <ng-template #suspense>
            <rxa-list-item-ghost></rxa-list-item-ghost>
          </ng-template>
          <div *rxLetTriggered="v.incremental$; let n;
          suspenseTrg: triggers.suspense$;
          errorTrg: triggers.error$;
          completeTrg: triggers.complete$;
          let s = $suspenseVal;
          let e = $errorVal;
          let c = $completeVal;">
            <mat-progress-bar *ngIf="s" color="primary" mode="indeterminate"></mat-progress-bar>
            n: {{n}} s: {{s}}, e: {{e}}, c: {{c}}
          </div>
        </div>
        <div class="col-6 dh-embedded-view p-2">
          <div *rxLetTriggered="v.incremental$; let n;
          errorTpl: error;
          completeTpl: complete;
          suspenseTpl: suspense;
          suspenseTrg: triggers.suspense$;
          errorTrg: triggers.error$;
          completeTrg: triggers.complete$;"
          >
            n: {{n}}
          </div>
          <ng-template #suspense>
            <rxa-list-item-ghost></rxa-list-item-ghost>
          </ng-template>
          <ng-template #error>ERROR</ng-template>
          <ng-template #complete>COMPLETE</ng-template>
        </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
  host: {
    class: 'm-1 p-1',
    style: 'display: block;'
  },
  providers: [StrategyProvider]
})
export class RxLetPocComponent implements OnInit {

  constructor(public strategyProvider: StrategyProvider) {

  }

  ngOnInit(): void {
  }

}
