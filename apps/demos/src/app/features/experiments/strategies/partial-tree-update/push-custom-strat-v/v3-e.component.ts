import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataService } from '../shared/data.service';
import { RxEffects } from '../../../../../rx-angular-pocs/state/rx-effects';

@Component({
  selector: 'rxa-v3-e',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>E<small>v3</small></h1>
        <ng-container *ngIf="data.count$ | push as v">
          <p>Value is: {{v}}</p>
        </ng-container>
      </div>

    </rxa-visualizer>
  `,
  host: { class: 'w-100' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxEffects]
})
export class V3EComponent {

  constructor(public data: DataService,
              private rxEf: RxEffects) {
    this.rxEf.hold(this.data.count$, v => console.log('E next: ', v));
  }
}
