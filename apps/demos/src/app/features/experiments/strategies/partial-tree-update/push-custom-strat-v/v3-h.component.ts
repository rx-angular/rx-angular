import { ChangeDetectionStrategy, Component } from '@angular/core';import { DataService } from '../shared/data.service';

@Component({
  selector: 'rxa-v3-h',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>H<small>v3</small></h1>
      </div>
      <div class="row w-100">
        <rxa-value-display class="col" [value]="data.count$ | push"></rxa-value-display>
      </div>
    </rxa-visualizer>
  `,
  host: { class: 'w-100' }, changeDetection: ChangeDetectionStrategy.OnPush
})
export class V3HComponent {

  constructor(public data: DataService) {
  }

}
