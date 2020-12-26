import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
// tslint:disable
@Component({
  selector: 'rxa-dirty-check',
  template: `
    <div class="dirty-check">
      <span>{{ numDirtyChecks() }}</span>
    </div>
  `,
  styles: [
    `
      :host .indicator-ripple {
        border: 1px solid #ffff005f;
      }
    `,
  ],
})
export class DirtyChecksComponent implements AfterViewInit {
  displayElem;
  dirtyChecks = 0;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
  ngAfterViewInit() {
    this.displayElem = this.elementRef.nativeElement.children[0].children[0];
    this.numDirtyChecks();
  }

  numDirtyChecks() {
    // tslint:disable-next-line:no-unused-expression
    this.displayElem &&
      this.renderer.setProperty(
        this.displayElem,
        'innerHTML',
        ++this.dirtyChecks + ''
      );
  }
}
