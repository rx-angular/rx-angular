import {
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { Hooks } from '../hooks';
import { select } from '@rx-angular/state/selections';
import { RxEffects } from '@rx-angular/state/effects';
import { AppConfigService } from '../../../app-config.service';

@Component({
  selector: 'rxa-dirty-check-work',
  template: `
    <div class="d-inline-flex align-items-center">
      <span>Performed work </span>
      <span
        class="indicator-ripple"
        [ngStyle]="{ width: radius + 'px', height: radius + 'px' }"
        matRipple
        [matRippleColor]="color"
        [matRippleRadius]="radius"
      >
        <span>{{ numDirtyChecks() }}</span>
      </span>
      <span> times</span>
      <span>{{ doWork() }}</span>
    </div>
  `,
  styles: [
    `
      :host .indicator-ripple {
        border: 1px solid #ffff005f;
      }
    `,
  ],
  providers: [RxEffects],
})
export class DirtyChecksWorkComponent extends Hooks {
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

  @Input() work = 10;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private configService: AppConfigService,
    private rxEf: RxEffects
  ) {
    super();
    this.rxEf.register(this.configService.$.pipe(select('rippleOn')), (r) => {
      this.rippleOn = r;
    });
    this.rxEf.register(this.afterViewInit$, () => {
      this.displayElem = this.elementRef.nativeElement.children[0].children[0];
      this.numDirtyChecks();
    });
  }

  doWork(): string {
    for (let i = 0; i <= this.work * 100; i++) {
      console.log('performing work');
    }
    return '';
  }

  numDirtyChecks() {
    if (this.rippleOn) {
      this.rippleOn && this.ripple && this.ripple.launch(this.rippleEffect);
    }
    this.displayElem &&
      this.renderer.setProperty(
        this.displayElem,
        'innerHTML',
        ++this.dirtyChecks + ''
      );
  }
}
