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
          <button mat-raised-button [unpatch]="unpatched" (click)="addItemsImmutable(numberOfItems)">
            Add Many
          </button>
          <button mat-raised-button [unpatch]="unpatched" (click)="moveItemsImmutable(numberOfItems/2)">
            Move Many
          </button>
          <button mat-raised-button [unpatch]="unpatched" (click)="shuffleItemsImmutable()">
            Shuffle
          </button>
          <button mat-raised-button [unpatch]="unpatched" (click)="shuffleAttack()">
            Shuffle Attack
          </button>
          <button mat-raised-button [unpatch]="unpatched" (click)="updateItemsImmutable(numberOfItems/2)">
            Update Many
          </button>
          <button mat-raised-button [unpatch]="unpatched" (click)="removeItemsImmutable(numberOfItems/2)">
            Remove Many
          </button>
          <mat-form-field>
            <mat-label>Number of items</mat-label>
            <input matInput [(ngModel)]="numberOfItems" type="number">
          </mat-form-field>
        </div>
      </div>
    </ng-container>
    <ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArrayProviderComponent extends ArrayProviderService {
  numberOfItems = 10

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
