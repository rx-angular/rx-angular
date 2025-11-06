import { Component, Input } from '@angular/core';

@Component({
  selector: 'rxa-rendering-work',
  template: `
    @for (item of items; track item) {
      <div>{{ item }}</div>
    }
  `,
  standalone: false,
})
export class RenderingWorkComponent {
  @Input() set factor(factor: number) {
    this.items = new Array(factor * 100).fill(1).map((v, index) => index);
  }

  public items;
}
