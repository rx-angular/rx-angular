import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'list-action-item',
  template: ` <ng-content /> `,
  changeDetection: ChangeDetectionStrategy.Eager,
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
