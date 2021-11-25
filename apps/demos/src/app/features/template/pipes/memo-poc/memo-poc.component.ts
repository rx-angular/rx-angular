import { ChangeDetectionStrategy, Component } from '@angular/core';
import { fibonacci } from '../../../../shared/debug-helper/work/fibonacci';

@Component({
  selector: 'rxa-memo-example',
  template: `
    <div class="row mb-2">
      <div class="col">
        <mat-button-toggle-group name="visibleExamples"
                                 aria-label="Visible Examples"
                                 [value]="displayStates.none"
                                 #group="matButtonToggleGroup">
          <mat-button-toggle [value]="displayStates.none">None</mat-button-toggle>
          <mat-button-toggle [value]="displayStates.all">All</mat-button-toggle>
          <mat-button-toggle [value]="displayStates.fnInTpl">Fn in Tpl</mat-button-toggle>
          <mat-button-toggle [value]="displayStates.purePipe">purePipe</mat-button-toggle>
          <mat-button-toggle [value]="displayStates.pureMemoPipe">pureMemoPipe</mat-button-toggle>
          <mat-button-toggle [value]="displayStates.memoPipe">memoPipe</mat-button-toggle>
        </mat-button-toggle-group>

        <button mat-raised-button (click)="changeNumPositions(-1)">decrement (-1)</button>
        <button mat-raised-button (click)="changeNumPositions(+1)">increment (+1)</button>
      </div>
    </div>
    <rxa-dirty-check></rxa-dirty-check>
    <div class="row">
      <div class="col" *ngIf="group.value === displayStates.fnInTpl || group.value === displayStates.all">
        <div class="mat-headline">
          Function Binding
        </div>
        <div> {{ fibonacci(numPositions) }}</div>
      </div>
      <div class="col" *ngIf="group.value === displayStates.purePipe || group.value === displayStates.all">
        <div class="mat-headline">
          Pure Pipe
        </div>
        <div> {{ numPositions | fibonacci }}</div>
      </div>
      <div class="col" *ngIf="group.value === displayStates.pureMemoPipe || group.value === displayStates.all">
        <div class="mat-headline">
          Pure Pipe with memoization
        </div>
        <div> {{ numPositions | fibonacciMemo }}</div>
      </div>
      <div class="col" *ngIf="group.value === displayStates.memoPipe || group.value === displayStates.all">
        <div class="mat-headline">
          Memo Pipe with fn as argument
        </div>
        <div> {{ numPositions | memo:fibonacci }}</div>
      </div>
    </div>
  `,
  styles: [`

  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemoPocComponent {
  displayStates = {
    none: -1,
    all: 0,
    fnInTpl: 1,
    purePipe: 2,
    pureMemoPipe: 3,
    memoPipe: 4
  };

  fibonacci = fibonacci;
  numPositions = 30;

  changeNumPositions(diff: number) {
    this.numPositions = this.numPositions + diff;
  }
}
