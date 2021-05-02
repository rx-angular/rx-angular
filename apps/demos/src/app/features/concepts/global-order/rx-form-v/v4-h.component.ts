import { ChangeDetectionStrategy, Component } from '@angular/core';import { DataService } from '../shared/data.service';

@Component({
  selector: 'rxa-v4-h',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>H<small>v4</small></h1>
      </div>
      <div class="row w-100">
      </div>
    </rxa-visualizer>
  `,
  host: { class: 'w-100' }, changeDetection: ChangeDetectionStrategy.OnPush
})
export class V4HComponent {

  constructor(public data: DataService) {
  }

}
