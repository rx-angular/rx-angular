import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Renderer2, RendererFactory2,
  ViewChildren
} from '@angular/core';
import {
  FastDomRenderer2,
  FastDomRendererRendererFactory
} from '../../../../rx-angular-pocs/cdk/renderer/fast-dom.renderer2';
import { ɵDomRendererFactory2 as DomRendererFactory2 } from '@angular/platform-browser';

@Component({
  selector: 'rxa-read-write-read-default',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h2>Problem of reflows</h2>
        <button mat-raised-button [unpatch] (click)="update()">update</button>
        <ul id="list">
          <li class="d-flex flex-column" #item *ngFor="let i of data">
            <lable class="w-100">{{ i.name }}</lable>
            <span class="" style="background: red">{{ i.value }}</span>
          </li>
        </ul>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadWriteReadDefaultComponent {
  @ViewChildren('item')
  items;

  data = [
    { name: 'a', value: 12 },
    { name: 'b', value: 2 },
    { name: 'c', value: 1 },
    { name: 'd', value: 21 },
  ];

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  update(): void {
    let colWidth = 0;

    this.items.forEach((item, idx) => {
      const li = item.nativeElement, span = li.children[1];
      // read
      colWidth = Math.max(colWidth, li.offsetWidth);
      const w = this.data[idx].value * (colWidth / 100);
      // write
      this.renderer.setStyle(span, 'width', `${w}px`);
    });
  }
}
