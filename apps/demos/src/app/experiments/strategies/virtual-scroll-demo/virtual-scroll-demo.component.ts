import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'rx-virtual-scroll-demo',
  template: `
    <h1>Virtual Scroll Viewport</h1>
    <cdk-virtual-scroll-viewport [itemSize]="50" style="height: 500px;">
      <div *cdkVirtualFor="let item of items; let index = index">
        <ngx-rx-scroll-item>
          <span>Item: {{ item }}</span>
        </ngx-rx-scroll-item>
      </div>
    </cdk-virtual-scroll-viewport>
  `,
})
export class VirtualScrollDemoComponent implements AfterViewInit {
  readonly items = this.getItems();

  @ViewChild(CdkVirtualScrollViewport) scrollViewPort: CdkVirtualScrollViewport;

  constructor() {}

  ngAfterViewInit(): void {
    this.scrollViewPort.checkViewportSize();
  }

  private getItems(): number[] {
    return Array(200)
      .fill(1)
      .map((v, i) => v + i);
  }
}
