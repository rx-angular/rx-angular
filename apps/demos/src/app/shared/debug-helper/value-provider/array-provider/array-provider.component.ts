import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { ArrayProviderService } from '../array-provider.service';

@Component({
  selector: 'rxa-array-provider',
  exportAs: 'rxaArrayProvider',
  template: `
    <ng-container *ngIf="buttons">
      <div class="row">
        <div class="col">
          <p>Immutable Operations</p>
          <button mat-raised-button [unpatch]="unpatched" (click)="addItemsImmutable(1)">
            Add
          </button>
          <button mat-raised-button [unpatch]="unpatched" (click)="moveItemsImmutable(1)">
            Move
          </button>
          <button mat-raised-button [unpatch]="unpatched" (click)="updateItemsImmutable(1)">
            Update
          </button>
          <button mat-raised-button [unpatch]="unpatched" (click)="removeItemsImmutable(1)">
            Remove
          </button>
          <br/>
          <button mat-raised-button [unpatch]="unpatched" (click)="addItemsImmutable(250)">
            Add Many
          </button>
          <button mat-raised-button [unpatch]="unpatched" (click)="moveItemsImmutable(5)">
            Move Many
          </button>
          <button mat-raised-button [unpatch]="unpatched" (click)="shuffleItemsImmutable(5)">
            Shuffle
          </button>
          <button mat-raised-button [unpatch]="unpatched" (click)="updateItemsImmutable(20)">
            Update Many
          </button>
          <button mat-raised-button [unpatch]="unpatched" (click)="removeItemsImmutable(4)">
            Remove Many
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
  unpatched: any[] = undefined;

  @Input()
  min = 0;

  @Input()
  max = 1000;

  constructor(protected cdRef: ChangeDetectorRef) {
    super(cdRef);
  }
}
