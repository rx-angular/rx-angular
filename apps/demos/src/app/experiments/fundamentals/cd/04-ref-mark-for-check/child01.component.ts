import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdConfigService } from '../../../../shared/debug-helper/strategy-control-panel';

@Component({
  selector: 'rxa-cd04-child01-default',
  template: `
    <h3>ChangeDetection Child 01</h3>
    ChangeDetectionStrategy: Default<br/>
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
    <rxa-cd04-child0101-push></rxa-cd04-child0101-push>
  `,
  changeDetection: ChangeDetectionStrategy.Default
})
export class Child0401Component {
  constructor(public cdConfig: CdConfigService) {
  }

}
