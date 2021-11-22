import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Output } from '@angular/core';
import { RxState } from '@rx-angular/state/state';
import { Observable, Subject } from 'rxjs';
import { ProvidedValues } from '../model';
import { PrimitivesProviderService } from '../primitives-provider.service';

@Component({
  selector: 'rxa-value-provider',
  exportAs: 'rxaValueProvider',
  template: `
    <ng-container *ngIf="buttons">

      <button mat-raised-button (click)="reset()">
        Reset
        <rxa-zone-patched-icon class="mat-icon" zoneState="patched"></rxa-zone-patched-icon>
      </button>
      <button mat-raised-button [unpatch]="unpatched" (click)="next()">
        Next
        <rxa-zone-patched-icon class="mat-icon" [zoneState]="getZoneState()"></rxa-zone-patched-icon>
      </button>
      <button mat-raised-button [unpatch]="unpatched" (click)="error()">
        Error
        <rxa-zone-patched-icon class="mat-icon" [zoneState]="getZoneState()"></rxa-zone-patched-icon>
      </button>
      <button mat-raised-button [unpatch]="unpatched" (click)="complete()">
        Complete
        <rxa-zone-patched-icon class="mat-icon" [zoneState]="getZoneState()"></rxa-zone-patched-icon>
      </button>
    </ng-container>
    <ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValueProviderComponent extends PrimitivesProviderService {
  @Input()
  unpatched;

  @Input()
  buttons = false;

  @Input()
  truthy = 0.5;

  @Input()
  min = 0;

  @Input()
  max = 10;

  @Input()
  set changes$(o$: Observable<any>) {
    this.outerChanges.next(o$);
  }

  @Output() resetState = new Subject();

  constructor(
    protected state: RxState<ProvidedValues>,
    protected cdRef: ChangeDetectorRef
  ) {
    super(state, cdRef);
  }

  reset() {
    super.reset();
    this.resetState.next(undefined);
  }

  getZoneState() {
    return this.unpatched?.length === 0 ? 'patched' : 'unpatched';
  }
}
