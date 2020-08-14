import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { BaseComponent } from '../../base.component.ts/base.component';
import { defer, merge, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-cd04-child02-push',
  template: `
    <h3>ChangeDetection Child 02</h3>
    ChangeDetectionStrategy: OnPush<br />
    <span>render: </span><b class="num-renders">{{ getNumOfRenderings() }}</b
    ><br />
    <button [unpatch] (click)="markForCheck$.next($event)">
      ChangeDetectorRef#markForCheck
    </button>
    <button [unpatch] (click)="detectChanges$.next($event)">
      ChangeDetectorRef#detectChanges
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Child0402Component extends BaseComponent {
  markForCheck$ = new Subject<Event>();
  detectChanges$ = new Subject<Event>();

  baseEffects$ = merge(
    this.markForCheck$.pipe(tap(() => this.cdRef_markForCheck())),
    this.detectChanges$.pipe(tap(() => this.cdRef_detectChanges()))
  );
}
