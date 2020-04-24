import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { BaseComponent } from '../../base.component.ts/base.component';
import { defer, merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { fromZoneEvent } from '@rx-angular/template';

@Component({
  selector: 'app-cd04-child01-default',
  template: `
    <h3>ChangeDetection Child 01</h3>
    ChangeDetectionStrategy: Default<br />
    <span>render: </span><b class="num-renders">{{ getNumOfRenderings() }}</b
    ><br />
    <button #markForCheck>ChangeDetectorRef#markForCheck</button>
    <button #detectChanges>ChangeDetectorRef#detectChanges</button>
    <app-cd02-child0101-push></app-cd02-child0101-push>
  `,
  changeDetection: ChangeDetectionStrategy.Default
})
export class Child0401Component extends BaseComponent {
  @ViewChild('markForCheck') markForCheckElem: ElementRef<HTMLButtonElement>;
  markForCheck$ = defer(() =>
    fromZoneEvent(this.markForCheckElem.nativeElement, 'click')
  );
  @ViewChild('detectChanges') detectChangesElem: ElementRef<HTMLButtonElement>;
  detectChanges$ = defer(() =>
    fromZoneEvent(this.detectChangesElem.nativeElement, 'click')
  );

  baseEffects$ = merge(
    this.markForCheck$.pipe(tap(() => this.cdRef_markForCheck())),
    this.detectChanges$.pipe(tap(() => this.cdRef_detectChanges()))
  );
}
