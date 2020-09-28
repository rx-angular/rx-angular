import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdConfigService } from '../../../../shared/debug-helper/strategy-control-panel';

@Component({
  selector: 'rxa-cd04-child02-push',
  template: `
    <h3>ChangeDetection Child 02</h3>
    ChangeDetectionStrategy: OnPush<br/>
    <renders></renders><br/>
    <button mat-raised-button (click)="cdConfig.cdRef_markForCheck()">
      ChangeDetectorRef#markForCheck (can't unpatch)
    </button>
    <button mat-raised-button [unpatch] (click)="cdConfig.markDirty()">
      ɵmarkDirty
    </button>
    <button mat-raised-button [unpatch] (click)="cdConfig.cdRef_detectChanges()">
      ChangeDetectorRef#detectChanges
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Child0402Component {
  constructor(public cdConfig: CdConfigService) {
  }
}
