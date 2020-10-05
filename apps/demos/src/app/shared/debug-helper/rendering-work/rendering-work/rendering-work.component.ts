import { Component, Input } from '@angular/core';

@Component({
  selector: 'rxa-rendering-work',
  template: ` <div *ngFor="let item of items">{{ item }}</div> `,
})
export class RenderingWorkComponent {
  @Input() set factor(factor: number) {
    this.items = new Array(factor * 100).fill(1).map((v, index) => index);
  }

  public items;
}
