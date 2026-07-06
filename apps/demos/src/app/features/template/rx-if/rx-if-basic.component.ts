import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RxIf } from '@rx-angular/template/if';
import { RxLet } from '@rx-angular/template/let';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { DirtyChecksModule } from '../../../shared/debug-helper/dirty-checks';
import { StrategySelectModule } from '../../../shared/debug-helper/strategy-select';

import { VisualizerModule } from '../../../shared/debug-helper/visualizer';
import { DocsLinkComponent } from '../../../shared/docs-link';
import { UnpatchEventsModule } from '../../../rx-angular-pocs/template/directives/unpatch';
import { ValueProviderComponent } from '../../../shared/debug-helper/value-provider/value-provider/value-provider.component';

@Component({
  selector: 'rxa-rx-if-poc',
  standalone: true,
  imports: [
    RxIf,
    RxLet,
    VisualizerModule,
    DirtyChecksModule,
    StrategySelectModule,
    ValueProviderComponent,
    UnpatchEventsModule,
    DocsLinkComponent,
  ],
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <header class="rxa-demo-header">
          <div>
            <h2>*rxIf — Basic</h2>
            <p class="rxa-demo-subtitle">
              Render templates reactively with <code>*rxIf</code>, including
              else, suspense, complete and error templates.
            </p>
          </div>
          <rxa-docs-link
            docs="packages/template/reference/rx-if"
            source="apps/demos/src/app/features/template/rx-if"
          />
        </header>

        <div class="rxa-demo-toolbar">
          <section class="rxa-demo-group">
            <span class="rxa-demo-label">Strategy</span>
            <rxa-strategy-select
              (strategyChange)="strategy$.next($event)"
            ></rxa-strategy-select>
          </section>
          <section class="rxa-demo-group rxa-demo-group--wide">
            <span class="rxa-demo-label">Data</span>
            <rxa-value-provider
              #v="rxaValueProvider"
              [buttons]="true"
            ></rxa-value-provider>
          </section>
          <section class="rxa-demo-group">
            <span class="rxa-demo-label">Actions</span>
            <div class="rxa-demo-controls">
              <button
                class="btn btn-outline-primary btn-sm"
                (click)="staticBool.set(!staticBool()); v.next()"
              >
                toggle
              </button>
            </div>
          </section>
        </div>
      </div>
      <div class="row w-100">
        <div class="col-sm-3">
          <h3 class="rxa-demo-section-title">RxIf (observable value)</h3>
          <div class="rxa-stat-row">
            <div class="rxa-stat">
              <span class="rxa-stat-label">Rendercallback</span>
              <span class="rxa-stat-value" *rxLet="rendered$; let rendered">{{
                rendered
              }}</span>
            </div>
          </div>
          <div
            class="dh-embedded-view"
            *rxIf="
              v.boolean$;
              let value;
              renderCallback: renderCallback;
              strategy: strategy$;
              else: elseTpl;
              suspense: suspenseTpl;
              complete: completeTpl;
              error: errorTpl
            "
          >
            <rxa-dirty-check></rxa-dirty-check>
            TRUE TEMPLATE
          </div>
        </div>
        <div class="col-sm-3">
          <h3 class="rxa-demo-section-title">RxIf (static value)</h3>
          <div class="rxa-stat-row">
            <div class="rxa-stat">
              <span class="rxa-stat-label">Rendercallback</span>
              <span class="rxa-stat-value" *rxLet="rendered$; let rendered">{{
                rendered
              }}</span>
            </div>
          </div>
          <div
            class="dh-embedded-view"
            *rxIf="
              staticBool();
              renderCallback: renderCallback;
              strategy: strategy$;
              else: elseTpl
            "
          >
            <rxa-dirty-check></rxa-dirty-check>
            TRUE TEMPLATE
          </div>
        </div>
        <ng-template #elseTpl>
          <div class="dh-embedded-view">
            <rxa-dirty-check></rxa-dirty-check>
            FALSE TEMPLATE
          </div>
        </ng-template>
        <ng-template #errorTpl> ERROR </ng-template>
        <ng-template #completeTpl> COMPLETE </ng-template>
        <ng-template #suspenseTpl> SUSPENSE </ng-template>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxIfBasicComponent {
  private _renderCalled = 0;
  readonly renderCallback = new Subject();

  rendered$ = this.renderCallback.pipe(map(() => this._renderCalled++));

  strategy$ = new BehaviorSubject('normal');

  readonly staticBool = signal(true);
}
