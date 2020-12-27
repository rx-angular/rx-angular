import { Component } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'rxa-v2-c',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>C<small>v2</small></h1>
      </div>
      <div class=" w-100">
        <div class="row">
          <rxa-value-display *rxLet="data.count$ let count" class="col" [value]="count"></rxa-value-display>
        </div>
        <div class="row">
          <div class="col">
            <rxa-v2-e>
            </rxa-v2-e>
          </div>
          <div class="col">
            <rxa-v2-f>
            </rxa-v2-f>
          </div>
        </div>
      </div>
    </rxa-visualizer>
  `,
  host: { class: 'w-100' }
})
export class V2CComponent {

  constructor(public data: DataService) {
  }

}
