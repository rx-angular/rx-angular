import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseComponent } from '../../../base.component.ts/base.component';
import { merge, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-cd04-child01-default',
  template: `
    <h3>ChangeDetection Child 01</h3>
    ChangeDetectionStrategy: Default<br />
    <renders></renders><br />
    <button mat-raised-button [unpatch] (click)="markForCheck$.next($event)">
      ChangeDetectorRef#markForCheck
    </button>
    <button mat-raised-button [unpatch] click="detectChanges$.next($event)">
      ChangeDetectorRef#detectChanges
    </button>
    <app-cd04-child0101-push></app-cd04-child0101-push>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class Child0401Component extends BaseComponent {
  markForCheck$ = new Subject<Event>();
  detectChanges$ = new Subject<Event>();

  baseEffects$ = merge(
    this.markForCheck$.pipe(tap(() => this.cdRef_markForCheck())),
    this.detectChanges$.pipe(tap(() => this.cdRef_detectChanges()))
  );
}
