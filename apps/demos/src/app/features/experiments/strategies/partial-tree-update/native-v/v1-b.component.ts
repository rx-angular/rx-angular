import { Component } from '@angular/core';

@Component({
  selector: 'rxa-v1-b',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>B<small>v1</small></h1>
      </div>
      <div class="row w-100">
        <div class="col">
        <rxa-v1-d>
        </rxa-v1-d>
        </div>
      </div>
    </rxa-visualizer>
  `,
  host: { class: 'w-100' }
})
export class V1BComponent {

  constructor() {
  }

}
