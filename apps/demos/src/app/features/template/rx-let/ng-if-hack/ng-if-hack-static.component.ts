import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rxa-ngif-hack-static',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h3>*ngIf</h3>
        <rxa-value-provider
          [unpatched]="[]"
          [buttons]="true"
          #valP="rxaValueProvider"
        ></rxa-value-provider>
      </div>
      @if (valP.boolean) {
        value: {{ valP.boolean | json }}<br />
      }
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class NgIfHackNgIfStaticComponent {}
