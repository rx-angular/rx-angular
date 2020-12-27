import { Component, Input } from '@angular/core';


@Component({
  selector: 'rxa-value-display',
  template: `<mat-icon class="item" [ngClass]="{red:value%2 === 1, green:value%2 === 0}">{{value%2  === 0 ? 'check' : 'highlight_off'}}</mat-icon>`,
  styles: [`
    .item.red {
      color: red;
    }
    .item.green {
      color: green;
    }
  `],
})
export class ValueDisplayComponent {

  @Input()
  value: number

}
