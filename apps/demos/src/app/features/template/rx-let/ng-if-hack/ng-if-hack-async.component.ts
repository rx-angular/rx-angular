import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rxa-ngif-hack-ng-if-async',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h3>*ngIf + async</h3>
        <rxa-value-provider [unpatched]="[]" [buttons]="true" #valP="rxaValueProvider"></rxa-value-provider>
      </div>
      <ng-container *ngIf="valP.boolean$ | async as value">
        *ngIf: {{ value | json }}<br/>
      </ng-container>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgIfHackNgIfAsyncComponent {

}
