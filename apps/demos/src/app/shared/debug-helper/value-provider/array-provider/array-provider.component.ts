import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { ArrayProviderService } from '../array-provider.service';

@Component({
  selector: 'rxa-array-provider',
  exportAs: 'rxaArrayProvider',
  template: ` @if (buttons) {
      <div>
        <p>Immutable Operations</p>
        <div class="d-flex align-items-center">
          <button
            mat-raised-button
            [unpatch]="unpatched"
            (click)="addItemsImmutable(1)"
          >
            Add
          </button>
          <button
            mat-raised-button
            [unpatch]="unpatched"
            (click)="moveItemsImmutable(1)"
          >
            Move
          </button>
          <button
            mat-raised-button
            [unpatch]="unpatched"
            (click)="updateItemsImmutable(1)"
          >
            Update
          </button>
          <button
            mat-raised-button
            [unpatch]="unpatched"
            (click)="removeItemsImmutable(1)"
          >
            Remove
          </button>
          <div class="d-flex align-items-center">
            <mat-form-field>
              <mat-label>Number of items</mat-label>
              <input matInput value="10" #resetInput type="number" />
            </mat-form-field>
            <button
              mat-raised-button
              [unpatch]="unpatched"
              (click)="reset(resetInput.valueAsNumber)"
            >
              Reset
            </button>
          </div>
        </div>
        <div class="d-flex align-items-center">
          <button
            mat-raised-button
            [unpatch]="unpatched"
            (click)="addItemsImmutable(numberOfItems)"
          >
            Add Many
          </button>
          <button
            mat-raised-button
            [unpatch]="unpatched"
            (click)="prependItemsImmutable(numberOfItems)"
          >
            Prepend Many
          </button>
          <button
            mat-raised-button
            [unpatch]="unpatched"
            (click)="moveItemsImmutable(numberOfItems / 2)"
          >
            Move Many
          </button>
          <button
            mat-raised-button
            [unpatch]="unpatched"
            (click)="shuffleItemsImmutable()"
          >
            Shuffle
          </button>
          <button
            mat-raised-button
            [unpatch]="unpatched"
            (click)="shuffleAttack()"
          >
            Shuffle Attack
          </button>
          <button mat-raised-button [unpatch]="unpatched" (click)="swap()">
            Swap
          </button>
          <button
            mat-raised-button
            [unpatch]="unpatched"
            (click)="updateItemsImmutable(numberOfItems / 2)"
          >
            Update Many
          </button>
          <button
            mat-raised-button
            [unpatch]="unpatched"
            (click)="removeItemsImmutable(numberOfItems / 2)"
          >
            Remove Many
          </button>
          <mat-form-field>
            <mat-label>Number of items</mat-label>
            <input matInput [(ngModel)]="numberOfItems" type="number" />
          </mat-form-field>
        </div>
      </div>
    }
    <ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButton,
    RxUnpatch,
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
  ],
})
export class ArrayProviderComponent
  extends ArrayProviderService
  implements OnInit
{
  @Input()
  initialNumberOfItems = 0;

  @Input()
  numberOfItems = 10;

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

  ngOnInit() {
    if (this.initialNumberOfItems) {
      Promise.resolve().then(() =>
        this.addItemsImmutable(this.initialNumberOfItems),
      );
    }
  }
}
