import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { defer, merge, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseComponent } from '../../../base.component.ts/base.component';

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
      <span>dirty: <b class="dirty">{{ isMarkedDirty }}</b></span>
      <renders></renders>
    </div>
    <div class="case-interaction">
      <button mat-raised-button [unpatch] (click)="markForCheck()">
        ChangeDetectorRef#markForCheck
      </button>
      <button mat-raised-button [unpatch] (click)="detectChanges()">
        ChangeDetectorRef#detectChanges
      </button>
    </div>
    <div class="case-content">
      <app-cd04-child01-default></app-cd04-child01-default>
      <app-cd04-child02-push></app-cd04-child02-push>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class RefMarkMorCheckContainerComponent extends BaseComponent {

  markForCheck() {
    this.cdRef_markForCheck()
  }

  detectChanges() {
    this.cdRef_detectChanges()
  }

}
