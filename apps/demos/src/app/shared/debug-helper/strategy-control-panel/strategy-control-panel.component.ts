import { ApplicationRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, NgZone } from '@angular/core';
import { isNgZone, isViewEngineIvy } from '@rx-angular/template';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'rxa-config-panel',
  template: `
    <div class="d-flex align-items-center">
      <mat-chip-list>
        <mat-chip color="primary" [selected]="hasZone">
          <mat-icon matChipAvatar>snooze</mat-icon>
          {{ zoneEnv }}</mat-chip>
        <mat-chip color="primary" [selected]="devMode">
          <mat-icon matChipAvatar>build_circle</mat-icon>
          {{ devMode ? 'Development' : 'Production' }}</mat-chip>
        <mat-chip color="primary" [selected]="true">
          <mat-icon matChipAvatar>image</mat-icon>
          {{ engine }}
        </mat-chip>
      </mat-chip-list>
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
export class StrategyControlPanelComponent {

  expanded = !isNgZone(this.ngZone);
  @Input()
  appComponentRef;

  readonly env = environment;
  readonly hasZone = isNgZone(this.ngZone);
  readonly devMode = !environment.production;
  readonly zoneEnv = this.hasZone ? 'NgZone' : 'NgNoopZone';
  readonly engine = isViewEngineIvy() ? 'Ivy' : 'ViewEngine';

  constructor(
    private cdRef: ChangeDetectorRef,
    private appRef: ApplicationRef,
    private ngZone: NgZone
  ) {
  }

  tick() {
    this.appRef.tick();
  }

}
