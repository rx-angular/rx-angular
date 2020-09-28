import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdConfigService } from '../../../../shared/debug-helper/strategy-control-panel';

@Component({
  selector: 'app-cd-parent04',
  template: `
    <h2>
      CD 04
      <small
      >ChangeDetectorRef#markForCheck when called in the component renders
        itself and all child components with cd.Default</small
      >
    </h2>
    <div class="case-info">
      <span>CD: <b class="cds">Default</b></span>
      <renders></renders>
    </div>
    <div class="case-interaction">
      <button mat-raised-button (click)="cdConfig.cdRef_markForCheck()">
        ChangeDetectorRef#markForCheck (patched)
      </button>
      <button mat-raised-button [unpatch] (click)="cdConfig.cdRef_markForCheck()">
        ChangeDetectorRef#markForCheck (unpatched)
      </button>
      <button mat-raised-button [unpatch] (click)="cdConfig.markDirty()">
        ɵmarkDirty
      </button>
      <button mat-raised-button [unpatch] (click)="cdConfig.cdRef_detectChanges()">
        ChangeDetectorRef#detectChanges
      </button>
    </div>
    <div class="case-content">
      <app-cd04-child01-default></app-cd04-child01-default>
      <app-cd04-child02-push></app-cd04-child02-push>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Default
})
export class RefMarkMorCheckContainerComponent {

  constructor(public cdConfig: CdConfigService) {
  }
}
