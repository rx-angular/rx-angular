import { EMPTY } from 'rxjs';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'rxa-counter-display',
  template: `
    <span class="position" *ngFor="let d of count$ | push | toArray">
        <span class="digit static">{{ d }}</span>
    </span>
  `,
  host: {
    class: 'count'
  }
})
export class CounterDisplayComponent {
  @Input()
  count$ = EMPTY;

}


