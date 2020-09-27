import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseComponent } from '../../../base.component.ts/base.component';
import { merge, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-cd04-child02-push',
  template: `
    <h3>ChangeDetection Child 02</h3>
    ChangeDetectionStrategy: OnPush<br/>
    <renders></renders><br/>
    <button mat-raised-button (click)="cdRef_markForCheck()">
      ChangeDetectorRef#markForCheck (can't unpatch)
    </button>
    <button mat-raised-button [unpatch] (click)="markDirty()">
      ɵmarkDirty
    </button>
    <button mat-raised-button [unpatch] (click)="cdRef_detectChanges()">
      ChangeDetectorRef#detectChanges
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Child0402Component extends BaseComponent {

}
