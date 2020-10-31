import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppConfigService } from '../../app-config.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'rxa-config-panel',
  template: `
    <div class="d-flex align-items-center">
      <mat-chip-list>
        <mat-chip color="primary" [selected]="appConfig.hasZone">
          <mat-icon matChipAvatar>snooze</mat-icon>
          {{ appConfig.zoneEnv }}</mat-chip>
        <mat-chip color="primary" [selected]="appConfig.devMode">
          <mat-icon matChipAvatar>build_circle</mat-icon>
          {{ appConfig.devMode ? 'Development' : 'Production' }}</mat-chip>
        <mat-chip color="primary" [selected]="true">
          <mat-icon matChipAvatar>image</mat-icon>
          {{ appConfig.engine }}
        </mat-chip>
      </mat-chip-list>
      <mat-slide-toggle [checked]="rippleOn" *rxLet="rippleOn$; let rippleOn" (change)="toggleRipple$.next($event.checked)">Ripple</mat-slide-toggle>
      <button class="mx-2"
              unpatch
              mat-button
              (click)="tick()">
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
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppControlPanelComponent {

  toggleRipple$ = new Subject<boolean>();
  rippleOn$ =  this.appConfig.select('rippleOn');

  constructor(public appConfig: AppConfigService) {
    this.appConfig.connect('rippleOn', this.toggleRipple$);
  }

  tick() {
    this.appConfig.appRef_tick();
  }

}
