import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EMPTY } from 'rxjs';

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
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class CounterDisplayComponent {
  @Input()
  count$ = EMPTY;
}
