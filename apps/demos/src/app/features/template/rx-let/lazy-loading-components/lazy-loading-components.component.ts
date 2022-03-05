import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RxEffects } from '@rx-angular/state/effects';

@Component({
  selector: 'rxa-lazy-loading-components',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h2>Lazy Loading Components</h2>
        <mat-button-toggle-group name="visibleExamples"
                                 aria-label="Visible Examples"
                                 [value]="displayStates.all"
                                 #group="matButtonToggleGroup">
          <mat-button-toggle [value]="displayStates.await">Async Await</mat-button-toggle>
          <mat-button-toggle [value]="displayStates.promise">Promise</mat-button-toggle>
          <mat-button-toggle [value]="displayStates.observable">Observable</mat-button-toggle>
          <mat-button-toggle [value]="displayStates.all">All</mat-button-toggle>
        </mat-button-toggle-group>
        <br/>
      </div>
      <div class="w-100 row">
        <div class="col" *ngIf="group.value === displayStates.await || group.value === displayStates.all">
          <rxa-lazy-loading-components-async-await></rxa-lazy-loading-components-async-await>
        </div>
        <div class="col" *ngIf="group.value === displayStates.promise || group.value === displayStates.all">
          <rxa-lazy-loading-components-promise></rxa-lazy-loading-components-promise>
        </div>
        <div class="col" *ngIf="group.value === displayStates.observable || group.value === displayStates.all">
          <rxa-lazy-loading-components-observable></rxa-lazy-loading-components-observable>
        </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazyLoadingComponentsComponent extends RxEffects {

  displayStates = {
    none: 0,
    all: 1,
    await: 2,
    promise: 3,
    observable: 4
  };

}
