import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RxStrategyProvider } from '@rx-angular/cdk/render-strategies';
import { RxLet } from '@rx-angular/template/let';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { RxForModule } from '../../../../rx-angular-pocs';
import { SiblingModule } from '../../../../shared/template-structures/sibling/sibling.module';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { DocsLinkComponent } from '../../../../shared/docs-link';

@Component({
  selector: 'rxa-concurrent-strategies',
  standalone: true,
  imports: [
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    RxLet,
    RxForModule,
    RxUnpatch,
    VisualizerModule,
    SiblingModule,
    DocsLinkComponent,
  ],
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <header class="rxa-demo-header">
          <div>
            <h2>Strategy Comparison</h2>
            <p class="rxa-demo-subtitle">
              Render many siblings at once and compare the selected RxAngular
              render strategies side by side.
            </p>
          </div>
          <rxa-docs-link
            docs="packages/cdk/legacy/render-strategies-overview"
            source="apps/demos/src/app/features/template/strategies"
          />
        </header>

        <div class="rxa-demo-toolbar">
          <section class="rxa-demo-group">
            <span class="rxa-demo-label">Num Siblings</span>
            <mat-form-field *rxLet="count$; let count">
              <mat-label>Num Siblings</mat-label>
              <input
                matInput
                #i
                [unpatch]
                type="number"
                [value]="count"
                (input)="count$.next(i.value)"
              />
            </mat-form-field>
          </section>

          <section class="rxa-demo-group">
            <span class="rxa-demo-label">Actions</span>
            <div class="rxa-demo-controls">
              <button
                class="btn btn-outline-primary btn-sm"
                unpatch
                (click)="filled$.next(!filled$.getValue())"
              >
                do change
              </button>
            </div>
          </section>

          <section class="rxa-demo-group rxa-demo-group--wide">
            <span class="rxa-demo-label">Strategies</span>
            <div class="strategy-multiselect">
              <mat-checkbox
                #c
                *rxFor="
                  let strategy of strategies$;
                  trackBy: trackByStrategyName
                "
                [checked]="strategy.checked"
                (change)="setStrategy(strategy.name, c.checked)"
              >
                {{ strategy.name }}
              </mat-checkbox>
            </div>
          </section>
        </div>
      </ng-container>
      <div class="rxa-demo-columns w-100">
        <ng-container
          *rxFor="
            let strategy of strategies$;
            strategy: 'immediate';
            trackBy: trackByStrategyName
          "
        >
          @if (strategy.checked) {
            <div class="d-flex flex-column">
              <h3 class="rxa-demo-section-title">{{ strategy.name }}</h3>
              <rxa-sibling-strategy
                [strategy]="strategy.name"
                [count]="count$"
                [filled]="filled$"
              ></rxa-sibling-strategy>
            </div>
          }
        </ng-container>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .strategy-multiselect {
        display: flex;
        flex-wrap: wrap;
      }

      .strategy-multiselect .mat-checkbox {
        flex-grow: 1;
        width: 200px;
      }
    `,
  ],
})
export class ComparisonComponent {
  readonly strategyProvider = inject(RxStrategyProvider);

  selectedStrategies$ = new BehaviorSubject<{ [strategy: string]: boolean }>(
    /*this.strategyProvider.strategyNames.reduce((selectedStrategies, strategy) => {
      selectedStrategies[strategy] = true;
      return selectedStrategies;
    }, {})*/ {},
  );
  strategies$ = this.selectedStrategies$.pipe(
    tap(() => console.log(this.strategyProvider.strategyNames)),
    map((selectedStrategies) =>
      this.strategyProvider.strategyNames.map((strategy) => ({
        name: strategy,
        checked: selectedStrategies[strategy] || false,
      })),
    ),
  );
  count$ = new BehaviorSubject<string | number>('500');
  filled$ = new BehaviorSubject<boolean>(false);

  setStrategy(strategy, state) {
    const old = this.selectedStrategies$.getValue();
    this.selectedStrategies$.next({ ...old, [strategy]: state });
  }

  visible(choice: string) {
    return (o$: Observable<{ [name: string]: boolean }>) =>
      o$.pipe(map((s) => s[choice] === true));
  }

  trackByStrategyName = (idx, v: { name: string }) => v.name;
}
