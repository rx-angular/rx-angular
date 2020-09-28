import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { CdConfigService } from '../../../../shared/debug-helper/strategy-control-panel';

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
export class DetectChangesContainerComponent {
  btnClick$ = new Subject<Event>();

  constructor(private cdConfig: CdConfigService) {
  }
  detectChanges() {
    this.cdConfig.cdRef_detectChanges();
  }

}
