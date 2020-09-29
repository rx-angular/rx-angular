import { Component, Input, OnInit } from '@angular/core';
import { CdHelper } from '../../../utils/cd-helper';

@Component({
  selector: 'rxa-cd-trigger',
  template: `
    <button mat-raised-button (click)="cdHelper.cdRef_markForCheck()">
      markForCheck
    </button>
    <button mat-raised-button [unpatch] (click)="cdHelper.cdRef_detectChanges()">
      detectChanges
    </button>
    <button mat-raised-button [unpatch] (click)="cdHelper.markDirty()">
      ɵmarkDirty
    </button>
    <button mat-raised-button [unpatch] (click)="cdHelper.detectChanges()">
      ɵdetectChanges
    </button>
  `,
  styles: [`
    :host {
      display: flex;
    }
  `],
  providers: [CdHelper]
})
export class CdTriggerComponent {

  @Input()
  cdHelper = this._cdHelper;

  constructor(private _cdHelper: CdHelper) { }

}
