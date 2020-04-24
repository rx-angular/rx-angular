import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { BaseComponent } from '../../base.component.ts/base.component';
import { defer, merge } from 'rxjs';
import { fromZoneEvent } from '@rx-angular/template';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-cd04-child02-push',
  template: `
    <h3>ChangeDetection Child 02</h3>
    ChangeDetectionStrategy: OnPush<br />
    <span>render: </span><b class="num-renders">{{ getNumOfRenderings() }}</b
    ><br />
    <button #markForCheck>ChangeDetectorRef#markForCheck</button>
    <button #detectChanges>ChangeDetectorRef#detectChanges</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Child0402Component extends BaseComponent {
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
