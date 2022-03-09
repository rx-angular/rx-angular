import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'rxa-dirty-check',
  template: `
    <div class="dirty-check">
      <span class="indicator">{{ numDirtyChecks() }}</span>
    </div>
  `,
  styles: [
    `
      :host .indicator {
        border: 1px solid #ffff005f;
      }
    `,
  ],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class DirtyChecksComponent implements AfterViewInit {
  displayElem;
  dirtyChecks = 0;

  @Input()
  log;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.displayElem = this.elementRef.nativeElement.children[0].children[0];
    this.numDirtyChecks();
  }

  numDirtyChecks() {
    if (this.log) {
      console.log('dirtyCheck', this.log);
    } else {
    }
    return this.dirtyChecks++;
  }
}
