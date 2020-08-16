import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { BaseComponent } from '../../base.component.ts/base.component';
import { tap } from 'rxjs/operators';
import { defer, Subject } from 'rxjs';

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
      <span
        >render: <b class="num-renders">{{ getNumOfRenderings() }}</b></span
      >
    </div>
    <div class="case-interaction">
      <button [unpatch] (click)="btnClick$.next($event)">ɵdetectChanges</button>
    </div>
    <div class="case-content">
      <app-cd01-child01-default></app-cd01-child01-default>
      <app-cd01-child02-push></app-cd01-child02-push>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
})
export class CdParent01Component extends BaseComponent {
  btnClick$ = new Subject<Event>();

  baseEffects$ = this.btnClick$.pipe(tap(() => this.cdRef_detectChanges()));
}
