import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rxa-ngif-hack-rx-let',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h3>*rxLet Directive</h3>
        <rxa-value-provider
          [unpatched]="false"
          [buttons]="true"
          #valP="rxaValueProvider"
        ></rxa-value-provider>
      </div>

      <ng-container
        *rxLet="
          valP.boolean$;
          let value;
          suspense: suspenseView;
          error: errorView;
          rxComplete: completeView
        "
      >
        value: {{ value | json }}<br />
      </ng-container>

      <ng-template #suspenseView>
        <rxa-list-item-ghost></rxa-list-item-ghost>
      </ng-template>

      <ng-template #errorView>
        <mat-icon color="warn">delete</mat-icon>
      </ng-template>

      <ng-template #completeView>
        <mat-icon color="primary">check</mat-icon>
      </ng-template>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgIfHackRxLetComponent {}
