import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RxLet } from '@rx-angular/template/let';

import { DocsLinkComponent } from '../../../../shared/docs-link';
import { ErrorHandlingChildComponent } from './error-handling-child.component';
import { ValueProviderComponent } from '../../../../shared/debug-helper/value-provider/value-provider/value-provider.component';

@Component({
  selector: 'rxa-error-handling-parent',
  standalone: true,
  imports: [
    AsyncPipe,
    RxLet,
    ValueProviderComponent,
    DocsLinkComponent,
    ErrorHandlingChildComponent,
  ],
  template: `
    <div class="container pt-5">
      <header class="rxa-demo-header">
        <div>
          <h2>*rxLet — Error Handling</h2>
          <p class="rxa-demo-subtitle">
            Compare how <code>*rxLet</code> and the <code>async</code> pipe
            behave when the source observable throws.
          </p>
        </div>
        <rxa-docs-link
          docs="template/rx-let-directive"
          source="apps/demos/src/app/features/template/rx-let"
        />
      </header>

      <div class="rxa-demo-toolbar">
        <section class="rxa-demo-group rxa-demo-group--wide">
          <span class="rxa-demo-label">Data</span>
          <rxa-value-provider
            [unpatched]="[]"
            [buttons]="true"
            #valueProvider="rxaValueProvider"
          ></rxa-value-provider>
        </section>
      </div>

      <div class="rxa-demo-columns">
        <div class="demo-card">
          <h3 class="rxa-demo-section-title">*rxLet</h3>
          <div class="d-flex flex-wrap">
            <rxa-error-handling-child
              *rxLet="valueProvider.int$; let v"
              [index]="v"
            ></rxa-error-handling-child>
          </div>
        </div>
        <div class="demo-card">
          <h3 class="rxa-demo-section-title">async pipe</h3>
          <div class="d-flex flex-wrap">
            @if (valueProvider.int$ | async; as v) {
              <rxa-error-handling-child [index]="v"></rxa-error-handling-child>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .demo-card {
        padding: 1rem;
      }
    `,
  ],
})
export class ErrorHandlingParentComponent {}
