import { Component } from '@angular/core';

@Component({
  selector: 'rxa-v1-e',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>E<small>v1</small></h1>
      </div>

    </rxa-visualizer>
  `,
  host: { class: 'w-100' }
})
export class V1EComponent {

  constructor() {
  }

}
