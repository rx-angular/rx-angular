import { EMPTY } from 'rxjs';
import { Component, Input } from '@angular/core';

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
  standalone: false,
})
export class CounterDisplayComponent {
  @Input()
  count$ = EMPTY;
}
