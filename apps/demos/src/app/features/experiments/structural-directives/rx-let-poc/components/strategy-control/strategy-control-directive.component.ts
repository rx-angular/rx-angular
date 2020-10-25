import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RenderStrategy, SchedulingPriority } from '@rx-angular/template';
import { RxChangeDetectorRef } from '../../../../../../shared/rx-change-detector-ref/rx-change-detector-ref.service';
import { BehaviorSubject } from 'rxjs';
import { StrategyCredentials } from '../../rx-let-poc.directive';
import { map } from 'rxjs/operators';

const localCredentials: StrategyCredentials = {
  renderMethod: 'detectChanges',
  priority: SchedulingPriority.animationFrame,
  detach: false,
  queued: false
}
const queuedCredentials: StrategyCredentials = {
  renderMethod: 'detectChanges',
  priority: SchedulingPriority.sync,
  detach: false,
  queued: true
}
const queuedDetachCredentials: StrategyCredentials = {
  renderMethod: 'detectChanges',
  priority: SchedulingPriority.sync,
  detach: true,
  queued: true
}
const globalCredentials: StrategyCredentials = {
  renderMethod: 'markDirty',
  priority: SchedulingPriority.sync,
  detach: false,
  queued: false
}
const noopCredentials: StrategyCredentials = {
  renderMethod: 'noop',
  priority: SchedulingPriority.sync,
  detach: false,
  queued: false
}
const nativeCredentials: StrategyCredentials = {
  renderMethod: 'markForCheck',
  priority: SchedulingPriority.sync,
  detach: false,
  queued: false
}

@Component({
  selector: 'rxa-strategy-control-directive',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <mat-card-title>Strategy controlled by directive</mat-card-title>
        <br/>

        <rxa-strategy-select
          [strategies]="rxCdRef.strategies$"
          [currentStrategy]="changeStrategy$"
          (strategyChange)="changeStrategy$.next({ name: $event })"
        ></rxa-strategy-select>
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
              strategy: strategyCredentials$
            "
          >
            {{strategyCredentials$ | push | json}}
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
  changeStrategy$ = new BehaviorSubject<Partial<RenderStrategy>>({
    name: 'local'
  });
  strategyCredentials$ = this.changeStrategy$.pipe(
    map(s => {
      switch (s.name) {
        case'global':
          return globalCredentials;
        case'native':
          return nativeCredentials;
        case'noop':
          return noopCredentials;
        case 'chunk':
          return queuedCredentials;
        case 'chunkDetach':
          return queuedDetachCredentials;
        case'local':
        default:
          return localCredentials;
      }
    })
  );
  displayStates = {
    none: 0,
    all: 1,
    provided: 2,
    inherited: 3
  };

  constructor(public rxCdRef: RxChangeDetectorRef) {
  }

  visible(group, choice) {
    return group.value === choice || group.value === this.displayStates.all;
  }
}
