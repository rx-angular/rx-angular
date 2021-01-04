import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StrategyProvider } from '../../../../rx-angular-pocs';
import { map } from 'rxjs/operators';

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
              <input *rxLet="count$; let count" matInput #i [unpatch] type="number" [value]="count"
                     (input)="count$.next(i.value)">
            </mat-form-field>
            <button mat-button unpatch (click)="filled$.next(!filled$.getValue())">
              do change
            </button>
          </div>
          <div class="col-12">
            <div class="w-100 strategy-multiselect">
              <mat-checkbox #c *rxFor="let strategy of strategyProvider.strategyNames"
                            (change)="setStrategy(strategy, c.checked)">
                {{strategy}}
              </mat-checkbox>
            </div>
          </div>
        </div>
      </ng-container>
      <div class="row w-100">
        <ng-container *rxFor="let strategy of strategyProvider.strategyNames">
          <div class="col"
               *rxIf="selectedStrategies$ | pipe:visible(strategy)">
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
  selectedStrategies$ = new BehaviorSubject<{ [name: string]: boolean }>({});

  count$ = new BehaviorSubject<string | number>('500');
  filled$ = new BehaviorSubject<boolean>(false);

  constructor(public strategyProvider: StrategyProvider) {
  }

  setStrategy(strategy, state) {
    const old = this.selectedStrategies$.getValue();
    this.selectedStrategies$.next({ ...old, [strategy]: state });
  }

  visible(choice: string) {
    return (o$: Observable<{ [name: string]: boolean }>) => o$.pipe(map((s) => s[choice] === true))
  }

}
