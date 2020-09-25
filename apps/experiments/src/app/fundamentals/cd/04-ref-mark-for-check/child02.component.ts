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
    <button mat-raised-button [unpatch] (click)="markForCheck$.next($event)">
      ChangeDetectorRef#markForCheck
    </button>
    <button mat-raised-button [unpatch] (click)="detectChanges$.next($event)">
      ChangeDetectorRef#detectChanges
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Child0402Component extends BaseComponent {
  markForCheck$ = new Subject<Event>();
  detectChanges$ = new Subject<Event>();

  baseEffects$ = merge(
    this.markForCheck$.pipe(tap(() => this.cdRef_markForCheck())),
    this.detectChanges$.pipe(tap(() => this.cdRef_detectChanges()))
  );
}
