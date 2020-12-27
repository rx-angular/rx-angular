import { Component } from '@angular/core';

@Component({
  selector: 'rxa-v1-a',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>A<small>v1</small></h1>
      </div>
      <div class="row w-100">
        <div class="col">
          <rxa-v1-b>
          </rxa-v1-b>
        </div>
        <div class="col">
          <rxa-v1-c>
          </rxa-v1-c>
        </div>
      </div>
    </rxa-visualizer>
  `,
  host: { class: 'w-100' }
})
export class V1AComponent {

  constructor() {
  }

}
