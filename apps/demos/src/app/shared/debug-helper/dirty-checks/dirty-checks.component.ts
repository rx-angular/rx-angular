import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { Hooks } from '../hooks';
import { AppConfigService } from '../strategy-control-panel';
import { combineLatest } from 'rxjs/operators';
import { select } from '@rx-angular/state';
import { RxEffects } from '../../rx-effects.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rxa-dirty-check',
  template: `
    <div class="indicator-ripple" [ngStyle]="{width: radius+'px',height: radius+'px'}" matRipple
         [matRippleColor]="color" [matRippleRadius]="radius">
      <span>{{ numDirtyChecks() }}{{radius}}</span>
    </div>
  `,
  styles: [`
    :host .indicator-ripple {
      border: 1px solid #ffff005f;
    }`],
  providers: [RxEffects]
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


  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private configService: AppConfigService,
    private rxEf: RxEffects
  ) {
    super();
    this.rxEf.hold(this.configService.$.pipe(select('rippleOn')), (r) => {
      this.rippleOn = r
    });
    this.rxEf.hold(
      this.afterViewInit$, () => {
        this.displayElem = this.elementRef.nativeElement.children[0].children[0];
        this.numDirtyChecks();
      });
  }

  numDirtyChecks() {
    if (this.rippleOn) {
      // tslint:disable-next-line:no-unused-expression
      this.rippleOn && this.ripple && this.ripple.launch(this.rippleEffect);
    }
    // tslint:disable-next-line:no-unused-expression
    this.displayElem && this.renderer.setProperty(this.displayElem, 'innerHTML', ++this.dirtyChecks + '');
  }
}
