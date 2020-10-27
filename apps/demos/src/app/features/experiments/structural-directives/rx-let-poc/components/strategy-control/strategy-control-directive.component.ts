import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'rxa-strategy-control-directive',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <mat-card-title>Strategy controlled by directive</mat-card-title>
        <br/>

        <rxa-strategy-select (strategyChange)="changeStrategy$.next($event)"></rxa-strategy-select>
        <br/>

        <rxa-value-provider
          buttons="true"
          #vP="rxaValueProvider"
        ></rxa-value-provider>
        <br/>
        <mat-button-toggle-group
          name="visibleExamples"
          aria-label="Visible Examples"
          [value]="displayStates.all"
          #group="matButtonToggleGroup"
        >
          <mat-button-toggle [value]="displayStates.none"
          >None
          </mat-button-toggle
          >
          <mat-button-toggle [value]="displayStates.provided"
          >Own provider
          </mat-button-toggle
          >
          <mat-button-toggle [value]="displayStates.inherited"
          >Inherited provider
          </mat-button-toggle
          >
          <mat-button-toggle [value]="displayStates.all">All</mat-button-toggle>
        </mat-button-toggle-group>
      </div>
      <div class="row w-100">
        <div class="col" *ngIf="visible(group, displayStates.provided)">
          <div
            *rxLet="
              vP.incremental$;
              let counter;
              strategy: changeStrategy$
            "
          >
            <mat-card-title>{{ counter }}</mat-card-title>
            <rxa-dirty-check></rxa-dirty-check>
          </div>
        </div>
        <div class="col" *ngIf="visible(group, displayStates.inherited)">
          <!-- <div
            *rxLetNoProvider="
              vP.incremental$;
              let counter;
              strategy: (changeStrategy$ | push).name
            "
          >
            <mat-card-title>{{ counter }}</mat-card-title>
          </div> -->
        </div>
      </div>
    </rxa-visualizer>
  `,
  host: {
    class: 'm-1 p-1',
    style: 'display: block;'
  },
  changeDetection: ChangeDetectionStrategy.Default
})
export class StrategyControlDirectiveComponent {
  changeStrategy$ = new BehaviorSubject<string>('local');
  displayStates = {
    none: 0,
    all: 1,
    provided: 2,
    inherited: 3
  };

  visible(group, choice) {
    return group.value === choice || group.value === this.displayStates.all;
  }
}
