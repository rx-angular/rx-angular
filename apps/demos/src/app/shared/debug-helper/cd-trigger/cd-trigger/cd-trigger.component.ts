import { Component, Input } from '@angular/core';
import { CdHelper } from '../../../utils/cd-helper';

@Component({
  selector: 'rxa-cd-trigger',
  template: `
    <button mat-raised-button (click)="cdHelper.appRef_tick()">
      tick
    </button>
    <button mat-raised-button (click)="cdHelper.cdRef_markForCheck()">
      markForCheck <rxa-zone-patched-icon class="mat-icon"></rxa-zone-patched-icon>
    </button>
    <button mat-raised-button [unpatch] (click)="cdHelper.cdRef_detectChanges()">
      detectChanges <rxa-zone-patched-icon class="mat-icon" [zoneState]="'unpatched'"></rxa-zone-patched-icon>
    </button>
    <button mat-raised-button [unpatch] (click)="cdHelper.markDirty()">
      ɵmarkDirty <rxa-zone-patched-icon class="mat-icon" [zoneState]="'unpatched'"></rxa-zone-patched-icon>
    </button>
    <button mat-raised-button [unpatch] (click)="cdHelper.detectChanges()">
      ɵdetectChanges <rxa-zone-patched-icon class="mat-icon" [zoneState]="'unpatched'"></rxa-zone-patched-icon>
    </button>
  `,
  host: {
    class: 'd-flex flex-wrap'
  },
  providers: [CdHelper]
})
export class CdTriggerComponent {

  @Input()
  cdHelper = this._cdHelper;

  constructor(private _cdHelper: CdHelper) { }

}
