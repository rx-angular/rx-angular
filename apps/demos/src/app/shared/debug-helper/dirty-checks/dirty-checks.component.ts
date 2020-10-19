import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { Hooks } from '../hooks';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rxa-dirty-check',
  template: `

  `,
  styles: [`
    :host .indicator-ripple {
      border: 1px solid #ffff005f;
    }`]
})
export class DirtyChecksComponent extends Hooks {
  @ViewChild(MatRipple) ripple: MatRipple;

  displayElem;
  dirtyChecks = 0;

  @Input()
  rippleOn = true;


  @Input()
  radius = 20;

  @Input()
  color = 'rgba(253,255,0,0.24)';

  @Input()
  rippleEffect = { centered: true };



  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    super();
    this.afterViewInit$.subscribe(() => {
      this.ripple.launch(this.rippleEffect);
      this.displayElem = this.elementRef.nativeElement.children[0].children[0];
      this.numDirtyChecks();
    });
  }

  numDirtyChecks() {
    // tslint:disable-next-line:no-unused-expression
    this.rippleOn && this.ripple && this.ripple.launch(this.rippleEffect);
    // tslint:disable-next-line:no-unused-expression
    this.displayElem && this.renderer.setProperty(this.displayElem, 'innerHTML', ++this.dirtyChecks + '');
  }
}
