import { Component, Input } from '@angular/core';


@Component({
  selector: 'rxa-value-display',
  template: `<mat-icon class="item" [ngClass]="{red:!isTrue, green:isTrue}">{{isTrue ? 'check' : 'highlight_off'}}</mat-icon>`,
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

  isTrue = false;

  @Input()
  set value(value: number){
    this.isTrue = Math.abs(value%2)<1
  }

}
