import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PrimitivesProviderService } from '../primitives-provider.service';

@Component({
  selector: 'rxa-value-provider',
  exportAs: 'rxaValueProvider',
  template: `
    <ng-container *ngIf="buttons">
    <button mat-raised-button (click)="reset()">Reset</button>
    <button mat-raised-button [unpatch] (click)="next()">Next</button>
    <button mat-raised-button [unpatch] (click)="error()">Error</button>
    <button mat-raised-button [unpatch] (click)="complete()">Complete</button>
    </ng-container>
      <ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValueProviderComponent extends PrimitivesProviderService {
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

  constructor(protected cdRef: ChangeDetectorRef) {
    super(cdRef);
  }
}
