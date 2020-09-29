import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'rxa-cd-parent02',
  template: `
    <h2>
      CD 02
      <small
      >ChangeDetectorRef#detectChanges when called in the component renders
        itself and all child components with cd.Default
      </small
      >
    </h2>
    <div class="case-info">
      <span>CD: <b class="cds">Default</b></span>
      <rxa-dirty-check></rxa-dirty-check>
    </div>
    <div class="case-interaction">
      <button mat-raised-button [unpatch] (click)="btnClick$.next($event)">
        ChangeDetectorRef#detectChanges
      </button>
    </div>
    <div class="case-content">
      <rxa-cd02-child01-default></rxa-cd02-child01-default>
      <rxa-cd02-child02-push></rxa-cd02-child02-push>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None
})
export class RefDetectChangesContainerComponent {
  btnClick$ = new Subject<Event>();

}
