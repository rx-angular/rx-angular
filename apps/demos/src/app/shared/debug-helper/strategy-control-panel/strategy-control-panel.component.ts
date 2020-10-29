import { ApplicationRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, NgZone } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { isNgZone, isViewEngineIvy } from '@rx-angular/template';
import { environment } from '../../../../environments/environment';
import { AppConfigService } from './app-config.service';

@Component({
  selector: 'rxa-config-panel',
  template: `
    <div class="d-flex align-items-center">
      <mat-chip-list>
        <mat-chip color="primary" [selected]="hasZone">
          <mat-icon matChipAvatar>snooze</mat-icon>
          {{ zoneEnv }}</mat-chip>
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
      <rxa-strategy-select
        *rxLet="strategyName$; let strategy"
        (strategyChange)="appConfigService.set({ strategy: $event })"
        [strategy]="strategy"></rxa-strategy-select>
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
export class StrategyControlPanelComponent extends RxState<any> {

  expanded = !isNgZone(this.ngZone);
  @Input()
  appComponentRef;

  readonly env = environment;
  readonly hasZone = isNgZone(this.ngZone);
  readonly zoneEnv = this.hasZone ? 'NgZone' : 'NgNoopZone';
  readonly engine = isViewEngineIvy() ? 'Ivy' : 'ViewEngine';

  strategyName$ = this.appConfigService.strategyName$;

  constructor(
    private cdRef: ChangeDetectorRef,
    private appRef: ApplicationRef,
    private ngZone: NgZone,
    public appConfigService: AppConfigService
  ) {
    super();
  }

  tick() {
    this.appRef.tick();
  }

}
