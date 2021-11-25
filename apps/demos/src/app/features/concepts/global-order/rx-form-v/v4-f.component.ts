import { ChangeDetectionStrategy, Component } from '@angular/core';import { DataService } from '../shared/data.service';

@Component({
  selector: 'rxa-v4-f',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>F<small>v4</small></h1>
      </div>
      <div class=" w-100">
        <div class="row">
          <div class="col">
            <rxa-value-display *rxLet="data.count$ let count" class="col" [value]="count"></rxa-value-display>
          </div>
        </div>
        <div class="row w-100">
          <div class="col">
            <rxa-v4-h>
            </rxa-v4-h>
          </div>
        </div>
      </div>
    </rxa-visualizer>
  `,
  host: { class: 'w-100' }, changeDetection: ChangeDetectionStrategy.OnPush
})
export class V4FComponent {

  constructor(public data: DataService) {
  }

}
