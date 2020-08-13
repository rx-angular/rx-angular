import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { defer, Subject } from 'rxjs';
import { BaseComponent } from '../../base.component.ts/base.component';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-cd-parent02',
  template: `
    <h2>
      CD 02
      <small
        >ChangeDetectorRef#detectChanges when called in the component renders
        itself and all child components with cd.Default</small
      >
    </h2>
    <div class="case-info">
      <span>CD: <b class="cds">Default</b></span>
      <span
        >dirty: <b class="dirty">{{ isMarkedDirty }}</b></span
      >
      <span
        >render: <b class="num-renders">{{ getNumOfRenderings() }}</b></span
      >
    </div>
    <div class="case-interaction">
      <button [unpatch] (click)="btnClick$.next($event)">
        ChangeDetectorRef#detectChanges
      </button>
    </div>
    <div class="case-content">
      <app-cd02-child01-default></app-cd02-child01-default>
      <app-cd02-child02-push></app-cd02-child02-push>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
})
export class CdParent02Component extends BaseComponent {
  btnClick$ = new Subject<Event>();

  baseEffects$ = this.btnClick$.pipe(tap(() => this.cdRef_detectChanges()));
}
