import { ChangeDetectionStrategy, Component } from '@angular/core';import { DataService } from '../shared/data.service';
import { RxEffects } from '../../../../../rx-angular-pocs/state/rx-effects';

@Component({
  selector: 'rxa-v3-c',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>C<small>v3</small></h1>
      </div>
      <div class=" w-100">
        <div class="row">
          <rxa-value-display class="col" [value]="data.count$ | push"></rxa-value-display>
        </div>
        <div class="row">
          <div class="col">
            <rxa-v3-e></rxa-v3-e>
          </div>
          <div class="col">
            <rxa-v3-f></rxa-v3-f>
          </div>
        </div>
      </div>
    </rxa-visualizer>
  `,
  host: { class: 'w-100' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxEffects]
})
export class V3CComponent {

  constructor(public data: DataService,
              private rxEf: RxEffects) {
      this.rxEf.hold(this.data.count$, v => console.log('C next: ', v));
  }

}
