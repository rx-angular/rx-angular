import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rxa-ngif-hack-static',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h3>*ngIf</h3>
        <rxa-value-provider [unpatched]="[]" [buttons]="true" #valP="rxaValueProvider"></rxa-value-provider>
      </div>
      <ng-container *ngIf="valP.boolean">
        value: {{ valP.boolean | json }}<br/>
      </ng-container>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgIfHackNgIfStaticComponent {

}
