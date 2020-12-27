import { Component } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'rxa-v1-c',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>C<small>v1</small></h1>
      </div>
      <div class=" w-100">
        <div class="row">
          <rxa-value-display class="col" [value]="data.count$ | async"></rxa-value-display>
        </div>
        <div class="row">
          <div class="col">
            <rxa-v1-e>
            </rxa-v1-e>
          </div>
          <div class="col">
            <rxa-v1-f>
            </rxa-v1-f>
          </div>
        </div>
      </div>
    </rxa-visualizer>
  `,
  host: { class: 'w-100' }
})
export class V1CComponent {

  constructor(public data: DataService) {
  }

}
