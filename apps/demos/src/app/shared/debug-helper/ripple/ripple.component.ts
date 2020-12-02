import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { Hooks } from '../hooks';
import { RxState, select } from '@rx-angular/state';
import { AppConfigService } from '../../../app-config.service';
import { switchMap } from 'rxjs/operators';
import { isObservable, Observable, of } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rxa-ripple',
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    {{dirty()}}
    <div class="d-inline-flex align-items-center indicator-ripple" matRipple
         [matRippleColor]="color" [matRippleRadius]="0">
        <ng-content></ng-content>
    </div>
  `,
  providers: [RxState]
})
export class RippleComponent extends Hooks {
  @ViewChild(MatRipple) ripple: MatRipple;

  displayElem;

  always = true;

  @Input()
  name = '';

  @Input()
  set value(value$: any | Observable<any>) {
    this.always = false;
    this.state.connect('value', isObservable(value$) ? value$ : of(value$));
  }

  rippleOn = true;

  radius = 20;

  color = 'rgba(253,255,0,0.24)';

  rippleEffect = { centered: true };

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private configService: AppConfigService,
    private state: RxState<{ value: any }>
  ) {
    super();
    this.state.hold(this.afterViewInit$, (v) => {
      console.log('hold: ', this.elementRef.nativeElement.children[0].children[0]);
      this.displayElem = this.elementRef.nativeElement.children[0].children[0]
    });
    this.state.hold(
      this.afterViewInit$.pipe(switchMap(() => this.state.select('value'))),
      (v) => this.render(v)
    );
  }

  dirty() {
    if(this.always) {
      this.render('')
    }
  }

  render(value: any) {
    // tslint:disable-next-line:no-unused-expression
    this.rippleOn && this.ripple && this.ripple.launch(this.rippleEffect);
    // tslint:disable-next-line:no-unused-expression
    this.displayElem && this.renderer.setProperty(this.displayElem, 'innerHTML', value + '');
    console.log(this.name, ' called');
  }
}
