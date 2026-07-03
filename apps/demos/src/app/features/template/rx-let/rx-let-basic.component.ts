import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RxLet } from '@rx-angular/template/let';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { DirtyChecksModule } from '../../../rx-angular-pocs/cdk/debug/dirty-check/dirty-checks.module';
import { UnpatchEventsModule } from '../../../rx-angular-pocs/template/directives/unpatch/unpatch-events.module';

import { VisualizerModule } from '../../../shared/debug-helper/visualizer/visualizer.module';
import { DocsLinkComponent } from '../../../shared/docs-link';
import { StrategySelectComponent } from '../../../shared/debug-helper/strategy-select';
import { ValueProviderComponent } from '../../../shared/debug-helper/value-provider/value-provider/value-provider.component';

@Component({
  selector: 'rxa-rx-let-poc',
  standalone: true,
  imports: [
    RxLet,
    VisualizerModule,
    DirtyChecksModule,
    ValueProviderComponent,
    UnpatchEventsModule,
    DocsLinkComponent,
    StrategySelectComponent,
  ],
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <header class="rxa-demo-header">
          <div>
            <h2>*rxLet — Basic</h2>
            <p class="rxa-demo-subtitle">
              Renders an observable's values with <code>*rxLet</code> and tracks
              each render pass via the render callback.
            </p>
          </div>
          <rxa-docs-link
            docs="template/rx-let-directive"
            source="apps/demos/src/app/features/template/rx-let"
          />
        </header>

        <div class="rxa-demo-toolbar">
          <section class="rxa-demo-group">
            <span class="rxa-demo-label">Strategy</span>
            <rxa-strategy-select
              (strategyChange)="strategy = $event"
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
              <button class="btn btn-outline-primary btn-sm" (click)="v.next()">
                toggle
              </button>
            </div>
          </section>
        </div>
      </div>
      <div class="row w-100">
        <div class="col-sm-3">
          <h3 class="rxa-demo-section-title">RxLet</h3>
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
            *rxLet="
              v.incremental$;
              let value;
              renderCallback: renderCallback;
              strategy: strategy
            "
          >
            <rxa-dirty-check></rxa-dirty-check>
            Value: {{ value }}
          </div>
        </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxLetBasicComponent {
  private _renderCalled = 0;
  readonly renderCallback = new Subject();

  rendered$ = this.renderCallback.pipe(map(() => this._renderCalled++));

  strategy;
}
