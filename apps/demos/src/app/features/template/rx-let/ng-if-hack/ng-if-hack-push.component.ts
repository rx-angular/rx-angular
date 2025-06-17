import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rxa-ngif-hack-ng-if-push',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h3>*ngIf + push</h3>
        <rxa-value-provider
          [buttons]="true"
          #valP="rxaValueProvider"
        ></rxa-value-provider>
      </div>
      @if (valP.boolean$ | push; as value) {
        *ngIf: {{ value | json }}<br />
      }
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class NgIfHackNgIfPushComponent {}
