import { ChangeDetectionStrategy, Component } from '@angular/core';@Component({
  selector: 'rxa-v1-d',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>D<small>v1</small></h1>
      </div>

    </rxa-visualizer>
  `,
  host: { class: 'w-100' }, changeDetection: ChangeDetectionStrategy.OnPush
})
export class V1DComponent {

  constructor() {
  }

}
