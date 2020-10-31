import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StrategyProvider } from '../../../shared/render-stragegies/strategy-provider.service';

@Component({
  selector: 'rxa-concurrent-strategies',
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <h1 class="mat-headline">Concurrent Strategies</h1>
        <div class="row">
          <div class="col-sm-12 col-md-12">
            <mat-form-field>
              <mat-label>Num Siblings</mat-label>
              <input matInput #i [unpatch] type="number" [value]="count$ | push" (input)="count$.next(i.value)">
            </mat-form-field>
            <div>
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
            <rxa-sibling-strategy [strategy]="strategy" [count]="count$"></rxa-sibling-strategy>
          </div>
        </ng-container>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.Default
})
export class ConcurrentStrategiesComponent {
  selectedStrategies: { [name: string]: boolean } = {};

  count$ = new BehaviorSubject<string>('1000');

  constructor(public strategyProvider: StrategyProvider) {
  }

  visible(choice) {
    return this.selectedStrategies[choice] === true;
  }

}
