import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';

import { defer, Subject } from 'rxjs';
import { BaseComponent } from '../../base.component.ts/base.component';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-cd-parent03',
  template: `
    <h2>
      C 03
      <small
        >ɵmarkDirty when called in the component renders itself and all child
        components with cd.Default</small
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
      <button [unpatch] (click)="btnClick$.next($event)">ɵmarkDirty</button>
    </div>
    <div class="case-content">
      <app-cd03-child01-default></app-cd03-child01-default>
      <app-cd03-child02-push></app-cd03-child02-push>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CdParent03Component extends BaseComponent {
  btnClick$ = new Subject<Event>();

  baseEffects$ = this.btnClick$.pipe(tap(() => this.ɵmarkDirty()));
}
