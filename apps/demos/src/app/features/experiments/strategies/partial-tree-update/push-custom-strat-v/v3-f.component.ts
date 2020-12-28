import { ChangeDetectionStrategy, Component } from '@angular/core';import { DataService } from '../shared/data.service';
import { RxEffects } from '../../../../../rx-angular-pocs/state/rx-effects';

@Component({
  selector: 'rxa-v3-f',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>F<small>v3</small></h1>
      </div>
      <div class=" w-100">
        <div class="row">
          <div class="col">
            <rxa-value-display class="col" [value]="data.count$ | push"></rxa-value-display>
          </div>
        </div>
        <div class="row w-100">
          <div class="col">
            <rxa-v3-h></rxa-v3-h>
          </div>
        </div>
      </div>
    </rxa-visualizer>
  `,
  host: { class: 'w-100' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxEffects]
})
export class V3FComponent {

  constructor(public data: DataService,
              private rxEf: RxEffects) {
    this.rxEf.hold(this.data.count$, v => console.log('F next: ', v));
  }

}
