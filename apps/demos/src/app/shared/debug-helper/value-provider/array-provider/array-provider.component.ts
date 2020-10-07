import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { ArrayProviderService } from '../array-provider.service';

@Component({
  selector: 'rxa-array-provider',
  exportAs: 'rxaArrayProvider',
  template: `
    <ng-container *ngIf="buttons">
      <div class="row">
        <div class="col-sm-12">
          <p>Observable Context</p>
          <button mat-raised-button [unpatch] (click)="reset()">
            Reset
          </button>
          <button mat-raised-button [unpatch] (click)="error()">
            Error
          </button>
          <button mat-raised-button [unpatch] (click)="complete()">
            Complete
          </button>
        </div>
        <div class="col-sm-6">
          <p>Mutable Operations</p>
          <button mat-raised-button [unpatch] (click)="addItemsMutable()">
            Add
          </button>
          <button mat-raised-button [unpatch] (click)="moveItemsMutable()">
            Move
          </button>
          <button mat-raised-button [unpatch] (click)="updateItemsMutable()">
            Update
          </button>
          <button mat-raised-button [unpatch] (click)="removeItemsMutable()">
            Remove
          </button>
        </div>
        <div class="col-sm-6">
          <p>Immutable Operations</p>
          <button mat-raised-button [unpatch] (click)="addItemsImmutable()">
            Add
          </button>
          <button mat-raised-button [unpatch] (click)="moveItemsImmutable()">
            Move
          </button>
          <button mat-raised-button [unpatch] (click)="updateItemsImmutable()">
            Update
          </button>
          <button mat-raised-button [unpatch] (click)="removeItemsImmutable()">
            Remove
          </button>
        </div>
      </div>
    </ng-container>
    <ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArrayProviderComponent extends ArrayProviderService {
  @Input()
  buttons = false;

  @Input()
  min = 0;

  @Input()
  max = 10;

  constructor(protected cdRef: ChangeDetectorRef) {
    super(cdRef);
  }
}
