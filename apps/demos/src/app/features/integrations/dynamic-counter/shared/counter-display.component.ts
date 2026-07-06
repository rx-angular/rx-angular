import { EMPTY } from 'rxjs';
import { Component, Input } from '@angular/core';
import { RxPush } from '../../../../../../../../libs/template/push/src/lib/push.pipe';
import { ToArrayPipe } from '../../../../shared/utils/to-array.pipe';
import { PushPipe } from '../../../../rx-angular-pocs/template/pipes/push/push.pipe';

@Component({
  selector: 'rxa-counter-display',
  template: `
    @for (d of count$ | push | toArray; track d) {
      <span class="position">
        <span class="digit static">{{ d }}</span>
      </span>
    }
  `,
  host: {
    class: 'count',
  },
  imports: [RxPush, ToArrayPipe, PushPipe],
})
export class CounterDisplayComponent {
  @Input()
  count$ = EMPTY;
}
