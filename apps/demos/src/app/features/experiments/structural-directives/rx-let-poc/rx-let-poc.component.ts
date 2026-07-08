import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { RxStrategyProvider } from '@rx-angular/cdk/render-strategies';
import { RxLet as RxLet_1 } from '@rx-angular/template/let';
import { RxLet } from '../../../../rx-angular-pocs/template/directives/let/rx-let.directive';
import { DirtyChecksComponent } from '../../../../shared/debug-helper/dirty-checks/dirty-checks.component';
import { StrategySelectComponent } from '../../../../shared/debug-helper/strategy-select/strategy-select.component';
import { TriggerProviderComponent } from '../../../../shared/debug-helper/trigger-provider/trigger-provider.component';
import { ValueProviderComponent } from '../../../../shared/debug-helper/value-provider/value-provider/value-provider.component';
import { VisualizerComponent } from '../../../../shared/debug-helper/visualizer/visualizer/visualizer.component';
import { ListItemGhostComponent } from '../../../../shared/ghost-elements/list-item-ghost/list-item-ghost.component';

@Component({
  selector: 'rxa-rx-let-poc',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <rxa-strategy-select
          (strategyChange)="strategyProvider.primaryStrategy = $event"
        >
        </rxa-strategy-select>
        <rxa-trigger-provider
          #triggers="rxaTriggerProvider"
        ></rxa-trigger-provider>
        <br />
        <rxa-value-provider
          [buttons]="true"
          #v="rxaValueProvider"
        ></rxa-value-provider>
      </div>
      <div class="mt-5 row w-100 d-flex">
        <div class="col-6 dh-embedded-view p-2">
          <ng-template #suspense>
            <rxa-list-item-ghost></rxa-list-item-ghost>
          </ng-template>
          <div
            *rxLet="
              v.incremental$;
              let n;
              suspenseTrg: triggers.suspense$;
              errorTrg: triggers.error$;
              completeTrg: triggers.complete$;
              let s = $suspenseVal;
              let e = $errorVal;
              let c = $completeVal
            "
          >
            <mat-progress-bar
              *ngIf="s"
              color="primary"
              mode="indeterminate"
            ></mat-progress-bar>
            <rxa-dirty-check></rxa-dirty-check>
            n: {{ n }} s: {{ s }}, e: {{ e }}, c: {{ c }}
          </div>
        </div>
        <div class="col-6 dh-embedded-view p-2">
          <div
            *rxLet="
              v.incremental$;
              let n;
              errorTpl: error;
              completeTpl: complete;
              suspenseTpl: suspense;
              suspenseTrg: triggers.suspense$;
              errorTrg: triggers.error$;
              completeTrg: triggers.complete$
            "
          >
            <rxa-dirty-check></rxa-dirty-check>
            n: {{ n }}
          </div>
          <ng-template #suspense>
            <rxa-list-item-ghost></rxa-list-item-ghost>
          </ng-template>
          <ng-template #error>
            <rxa-dirty-check></rxa-dirty-check>
            ERROR
          </ng-template>
          <ng-template #complete>
            <rxa-dirty-check></rxa-dirty-check>
            COMPLETE
          </ng-template>
        </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
  host: {
    class: 'm-1 p-1',
    style: 'display: block;',
  },
  providers: [],
  imports: [
    VisualizerComponent,
    StrategySelectComponent,
    TriggerProviderComponent,
    ValueProviderComponent,
    ListItemGhostComponent,
    RxLet,
    RxLet_1,
    NgIf,
    MatProgressBar,
    DirtyChecksComponent,
  ],
})
export class RxLetPocComponent {
  constructor(public strategyProvider: RxStrategyProvider) {}
}
