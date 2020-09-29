import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdConfigService } from '../../../../../shared/debug-helper/strategy-control-panel';
import { CdHelper } from '../../../../../shared/utils/cd-helper';

@Component({
  selector: 'rxa-cd-parent04',
  template: `
    <h2>
      CD 04
      <small
      >ChangeDetectorRef#markForCheck when called in the component renders
        itself and all child components with cd.Default
      </small
      >
    </h2>
    <div class="case-info">
      <span>CD: <b class="cds">Default</b></span>
      <rxa-dirty-check></rxa-dirty-check>
    </div>
    <div class="case-interaction">
      <button mat-raised-button (click)="cdHelper.cdRef_markForCheck()">
        ChangeDetectorRef#markForCheck (patched)
      </button>
      <button mat-raised-button [unpatch] (click)="cdHelper.cdRef_markForCheck()">
        ChangeDetectorRef#markForCheck (unpatched)
      </button>
      <button mat-raised-button [unpatch] (click)="cdHelper.markDirty()">
        ɵmarkDirty
      </button>
      <button mat-raised-button [unpatch] (click)="cdHelper.cdRef_detectChanges()">
        ChangeDetectorRef#detectChanges
      </button>
    </div>
    <div class="case-content">
      <rxa-cd04-child01-default></rxa-cd04-child01-default>
      <rxa-cd04-child02-push></rxa-cd04-child02-push>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [CdHelper]
})
export class RefMarkMorCheckContainerComponent {

  constructor(public cdHelper: CdHelper) {
  }
}
