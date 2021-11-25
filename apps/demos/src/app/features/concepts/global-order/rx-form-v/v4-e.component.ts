import { ChangeDetectionStrategy, Component } from '@angular/core';@Component({
  selector: 'rxa-v4-e',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>E<small>v4</small></h1>
      </div>

    </rxa-visualizer>
  `,
  host: { class: 'w-100' }, changeDetection: ChangeDetectionStrategy.OnPush
})
export class V4EComponent {

  constructor() {
  }

}
