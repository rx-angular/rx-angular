import { ChangeDetectionStrategy, Component } from '@angular/core';import { DataService } from '../shared/data.service';

@Component({
  selector: 'rxa-v2-f',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>F<small>v2</small></h1>
      </div>
      <div class=" w-100">
        <div class="row">
          <div class="col">
            <rxa-value-display *rxLet="data.count$ let count" class="col" [value]="count"></rxa-value-display>
          </div>
        </div>
        <div class="row w-100">
          <div class="col">
            <rxa-v2-h>
            </rxa-v2-h>
          </div>
        </div>
      </div>
    </rxa-visualizer>
  `,
  host: { class: 'w-100' }, changeDetection: ChangeDetectionStrategy.OnPush
})
export class V2FComponent {

  constructor(public data: DataService) {
  }

}
