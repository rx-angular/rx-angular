import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { defer, merge, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseComponent } from '../../base.component.ts/base.component';

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
      <span
        >dirty: <b class="dirty">{{ isMarkedDirty }}</b></span
      >
      <span
        >render: <b class="num-renders">{{ getNumOfRenderings() }}</b></span
      >
    </div>
    <div class="case-interaction">
      <button [unpatch] (click)="markForCheck$.next($event)">
        ChangeDetectorRef#markForCheck
      </button>
      <button [unpatch] (click)="detectChanges$.next($event)">
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
export class CdParent04Component extends BaseComponent {
  markForCheck$ = new Subject<Event>();
  detectChanges$ = new Subject<Event>();

  baseEffects$ = merge(
    this.markForCheck$.pipe(tap(() => this.cdRef_markForCheck())),
    this.detectChanges$.pipe(tap(() => this.cdRef_detectChanges()))
  );
}
