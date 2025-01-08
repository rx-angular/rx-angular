import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'list-action-item',
  template: ` <ng-content /> `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class ListActionItemComponent implements OnDestroy {
  ngOnDestroy() {
    // console.log('onDestroy');
  }
}
