import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RxLet } from '@rx-angular/template/let';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { UnpatchEventsModule } from '../../../../rx-angular-pocs/template/directives/unpatch/unpatch-events.module';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks/index';

import { VisualizerModule } from '../../../../shared/debug-helper/visualizer/visualizer.module';
import { DocsLinkComponent } from '../../../../shared/docs-link';
import { ContentChildDirective, ContentParent } from './intermediate.component';
import { StrategySelectComponent } from '../../../../shared/debug-helper/strategy-select';
import { ValueProviderComponent } from '../../../../shared/debug-helper/value-provider/value-provider/value-provider.component';

@Component({
  selector: 'rxa-rx-let-poc',
  standalone: true,
  imports: [
    MatButtonModule,
    ValueProviderComponent,
    UnpatchEventsModule,
    StrategySelectComponent,
    VisualizerModule,
    RxLet,
    DirtyChecksModule,
    DocsLinkComponent,
    ContentParent,
    ContentChildDirective,
  ],
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <header class="rxa-demo-header">
          <div>
            <h2>*rxLet — Scoping</h2>
            <p class="rxa-demo-subtitle">
              Demonstrates <code>*rxLet</code> parent scoping across several
              projected content children.
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
              <button
                class="btn btn-outline-secondary btn-sm"
                [unpatch]
                (click)="v.next()"
              >
                toggle (unpatched)
              </button>
            </div>
          </section>
        </div>
      </div>
      <div class="row w-100">
        <div class="col-sm-3">
          <h3 class="rxa-demo-section-title">RxLet</h3>
          <rxa-content-parent>
            <div
              class="dh-embedded-view"
              *rxLet="
                v.incremental$;
                let value;
                parent: withParent;
                renderCallback: renderCallback;
                strategy: strategy
              "
            >
              <rxa-dirty-check></rxa-dirty-check>
              Value: {{ value }}
              <div #letChild rxaContentChild></div>
            </div>
          </rxa-content-parent>
        </div>
        <div class="col-sm-3">
          <h3 class="rxa-demo-section-title">RxLet</h3>
          <rxa-content-parent>
            <div
              class="dh-embedded-view"
              *rxLet="
                v.incremental$;
                let value;
                parent: withParent;
                renderCallback: renderCallback;
                strategy: strategy
              "
            >
              <rxa-dirty-check></rxa-dirty-check>
              Value: {{ value }}
              <div #letChild rxaContentChild></div>
            </div>
          </rxa-content-parent>
        </div>
        <div class="col-sm-3">
          <h3 class="rxa-demo-section-title">RxLet</h3>
          <rxa-content-parent>
            <div
              class="dh-embedded-view"
              *rxLet="
                v.incremental$;
                let value;
                parent: withParent;
                renderCallback: renderCallback;
                strategy: strategy
              "
            >
              <rxa-dirty-check></rxa-dirty-check>
              Value: {{ value }}
              <div #letChild rxaContentChild></div>
            </div>
          </rxa-content-parent>
        </div>
        <div class="col-sm-3">
          <h3 class="rxa-demo-section-title">RxLet</h3>
          <rxa-content-parent>
            <div
              class="dh-embedded-view"
              *rxLet="
                v.incremental$;
                let value;
                parent: withParent;
                renderCallback: renderCallback;
                strategy: strategy
              "
            >
              <rxa-dirty-check></rxa-dirty-check>
              Value: {{ value }}
              <div #letChild rxaContentChild></div>
            </div>
          </rxa-content-parent>
        </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxLetScopingComponent implements AfterViewInit {
  private _renderCalled = 0;
  readonly renderCallback = new Subject();

  @ViewChildren('letChild') letChildren: QueryList<ElementRef>;

  rendered$ = this.renderCallback.pipe(map(() => this._renderCalled++));

  strategy;

  withParent = true;

  ngAfterViewInit() {
    this.letChildren.changes.subscribe((letDirs) => {
      console.log('letChildren', letDirs);
    });
  }
}
