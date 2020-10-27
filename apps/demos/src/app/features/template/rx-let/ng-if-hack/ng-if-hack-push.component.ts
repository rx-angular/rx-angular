import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rxa-ngif-hack-ng-if-push',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h3>*ngIf + push</h3>
        <rxa-value-provider [buttons]="true" #valP="rxaValueProvider"></rxa-value-provider>
      </div>
      <ng-container *ngIf="valP.boolean$ | push as value">
        *ngIf: {{ value | json }}<br/>
      </ng-container>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgIfHackNgIfPushComponent {

}
