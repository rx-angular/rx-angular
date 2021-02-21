import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, ElementRef
} from '@angular/core';
import { AppConfigService } from '../../app-config.service';
import { BehaviorSubject, EMPTY } from 'rxjs';
import { RippleRenderer } from '../../shared/ripple/rxa-responsive-meter';
import { Platform } from '@angular/cdk/platform';
import { filter, switchMap } from 'rxjs/operators';
 import { interval } from '../../rx-angular-pocs';

@Component({
  selector: 'rxa-config-panel',
  template: `
    <div class="d-flex align-items-center">
      <mat-chip-list>
        <mat-chip color="primary" [selected]="appConfig.hasZone">
          <mat-icon matChipAvatar>snooze</mat-icon>
          {{ appConfig.zoneEnv }}</mat-chip
        >
        <mat-chip color="primary" [selected]="appConfig.devMode">
          <mat-icon matChipAvatar>build_circle</mat-icon>
          {{ appConfig.devMode ? 'Development' : 'Production' }}</mat-chip
        >
      </mat-chip-list>
      <mat-slide-toggle
        [checked]="rippleOn"
        *rxLet="rippleOn$; let rippleOn"
        (change)="toggleCdRipple$.next($event.checked)"
        >CD
      </mat-slide-toggle>
      <mat-slide-toggle
        [checked]="rippleOn"
        *rxLet="rippleOn$; let rippleOn"
        (change)="toggleResponsiveRipple$.next($event.checked)"
        >non-blocking
      </mat-slide-toggle>
      <button class="mx-2" unpatch mat-button (click)="tick()">
        <mat-icon>account_tree</mat-icon>
        ApplicationRef.tick()
      </button>
    </div>
  `,
  styles: [
    `
      rxa-strategy-select {
        font-size: 14px;
        margin-top: 18px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppControlPanelComponent implements AfterViewInit {
  toggleCdRipple$ =  new BehaviorSubject<boolean>(false);
  toggleResponsiveRipple$ = new BehaviorSubject<boolean>(false);
  rippleOn$ = this.appConfig.select('rippleOn');
  rp: RippleRenderer;

  constructor(
    public appConfig: AppConfigService,
    private readonly elementRef: ElementRef,
    private readonly platform: Platform
  ) {
    this.appConfig.connect('rippleOn', this.toggleCdRipple$);
    this.appConfig.connect('rippleResponsiveOn', this.toggleResponsiveRipple$);
    this.appConfig.hold(
      this.appConfig.select('rippleResponsiveOn').pipe(
        switchMap((isOn) => (isOn ? interval(300) : EMPTY)),
        filter(() => !!this.rp)
      ),
      (v) => {
        console.log('v', v);
        this.rp.fadeInRipple(0, 0)
      }
    );
  }

  ngAfterViewInit(): void {
    this.setupRipple();
  }

  tick() {
    this.appConfig.appRef_tick();
  }

  setupRipple() {
    this.rp = new RippleRenderer(this.elementRef, this.platform);
  }
}
