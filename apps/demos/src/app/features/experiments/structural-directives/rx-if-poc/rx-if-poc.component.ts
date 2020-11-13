import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';

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
          <h3>Angular Native</h3>
          <ng-template #f1>
            <div class="dh-embedded-view">
              <rxa-dirty-check></rxa-dirty-check>
              FALSE
            </div>
          </ng-template>
          <div class="dh-embedded-view" *ngIf="v.boolean$ | async; else: f1">
            <rxa-dirty-check></rxa-dirty-check>
            TRUE
          </div>
        </div>
        <div class="col-sm-3">
          <h3>Render EmbeddedViews directly</h3>
          <ng-template #f1>
            <div class="dh-embedded-view">
              <rxa-dirty-check></rxa-dirty-check>
              FALSE
            </div>
          </ng-template>
          <div class="dh-embedded-view" *poc1If="v.boolean$; let value; falsey: f1">
            <rxa-dirty-check></rxa-dirty-check>
            TRUE
          </div>

        </div>
        <div class="col-sm-3">
          <h3>Create/Destroy EmbeddedViews</h3>
          <ng-template #f2>
            <div class="dh-embedded-view">
              <rxa-dirty-check></rxa-dirty-check>
              FALSE
            </div>
          </ng-template>
          <div class="dh-embedded-view" *poc2If="v.boolean$; let value; falsey: f2">
            <rxa-dirty-check></rxa-dirty-check>
            TRUE
          </div>
        </div>
        <div class="col-sm-3">
          <h3>Display/Hide EmbeddedViews</h3>
          <ng-template #f3>
            <div class="dh-embedded-view">
              <rxa-dirty-check></rxa-dirty-check>
              FALSE
            </div>
          </ng-template>
          <ng-template #suspense>
            <rxa-list-item-ghost></rxa-list-item-ghost>
          </ng-template>
          <div class="dh-embedded-view" *rxIf="v.boolean$; let value; else: f3; strategy: strategy; rxSuspense: suspense">
            <rxa-dirty-check></rxa-dirty-check>
            TRUE
          </div>
        </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: environment.changeDetection
})
export class RxIfPocComponent {
  strategy;
}
