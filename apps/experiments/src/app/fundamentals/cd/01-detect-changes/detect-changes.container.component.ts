import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { BaseComponent } from '../../../base.component.ts/base.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cd-parent01',
  template: `
    <h2>
      CD 01
      <small
      >ɵdetectChanges when called in the component renders itself and all
        child components with cd.Default</small
      >
    </h2>
    <div class="case-info">
      <span>CD: <b class="cds">Default</b></span>
      <span
      >dirty: <b class="dirty">{{ isMarkedDirty }}</b></span
      >
      <renders></renders>
    </div>
    <div class="case-interaction">
      <button mat-raised-button [unpatch] (click)="detectChanges()">
        ɵdetectChanges
      </button>
    </div>
    <div class="case-content">
      <app-cd01-child01-default></app-cd01-child01-default>
      <app-cd01-child02-push></app-cd01-child02-push>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None
})
export class DetectChangesContainerComponent extends BaseComponent {
  btnClick$ = new Subject<Event>();

  detectChanges() {
    this.cdRef_detectChanges();
  }

}
