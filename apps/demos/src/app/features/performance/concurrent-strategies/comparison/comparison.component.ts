import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StrategyProvider } from '../../../../rx-angular-pocs';

@Component({
  selector: 'rxa-concurrent-strategies',
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <h1 class="mat-headline">Concurrent Strategies</h1>
        <div class="row">
          <div class="col-12 d-flex">
            <mat-form-field class="mr-2">
              <mat-label>Num Siblings</mat-label>
              <input matInput #i [unpatch] type="number" [value]="count$ | push" (input)="count$.next(i.value)">
            </mat-form-field>
            <button mat-button unpatch (click)="filled$.next(!filled$.getValue())">
              do change
            </button>
          </div>
          <div class="col-12">
            <div class="w-100 strategy-multiselect">
              <mat-checkbox #c *ngFor="let strategy of strategyProvider.strategyNames"
                            (change)="selectedStrategies[strategy] = c.checked">
                {{strategy}}
              </mat-checkbox>
            </div>
          </div>
        </div>
      </ng-container>
      <div class="row w-100">
        <ng-container *ngFor="let strategy of strategyProvider.strategyNames">
          <div class="col"
               *ngIf="visible(strategy)">
            <h2 class="mat-subheader">{{strategy}}</h2>
            <rxa-sibling-strategy [strategy]="strategy" [count]="count$" [filled]="filled$"></rxa-sibling-strategy>
          </div>
        </ng-container>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
  styles: [`
    .strategy-multiselect {
      display: flex;
      flex-wrap: wrap;
    }

    .strategy-multiselect .mat-checkbox {
      flex-grow: 1;
      width: 200px;
    }
  `]
})
export class ComparisonComponent {
  selectedStrategies: { [name: string]: boolean } = {};

  count$ = new BehaviorSubject<string | number[][]>('500');
  filled$ = new BehaviorSubject<boolean>(false);

  constructor(public strategyProvider: StrategyProvider) {
  }

  visible(choice) {
    return this.selectedStrategies[choice] === true;
  }

}
