import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdHelper } from '../../../../../shared/utils/cd-helper';

@Component({
  selector: 'rxa-cd04-child01-default',
  template: `
    <h3>ChangeDetection Child 01</h3>
    ChangeDetectionStrategy: Default<br/>
    <rxa-dirty-check></rxa-dirty-check><br/>
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
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [CdHelper]
})
export class Child0401Component {
  constructor(public cdConfig: CdHelper) {
  }

}
