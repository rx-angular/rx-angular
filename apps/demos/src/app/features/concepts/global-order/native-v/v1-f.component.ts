import { ChangeDetectionStrategy, Component } from '@angular/core';import { DataService } from '../shared/data.service';

@Component({
  selector: 'rxa-v1-f',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>F<small>v1</small></h1>
      </div>
      <div class=" w-100">
        <div class="row">
          <div class="col">
          </div>
        </div>
        <div class="row w-100">
          <div class="col">
            <rxa-v1-h>
            </rxa-v1-h>
          </div>
        </div>
      </div>
    </rxa-visualizer>
  `,
  host: { class: 'w-100' }, changeDetection: ChangeDetectionStrategy.OnPush
})
export class V1FComponent {

  constructor(public data: DataService) {
  }

}
