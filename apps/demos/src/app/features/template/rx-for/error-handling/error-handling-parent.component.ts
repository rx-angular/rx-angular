import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RxFor } from '@rx-angular/template/for';

import { DocsLinkComponent } from '../../../../shared/docs-link';
import { ErrorHandlingChildComponent } from './error-handling-child.component';
import { ArrayProviderComponent } from '../../../../shared/debug-helper/value-provider/array-provider/array-provider.component';

@Component({
  selector: 'rxa-error-handling-parent',
  standalone: true,
  imports: [
    AsyncPipe,
    RxFor,
    ArrayProviderComponent,
    DocsLinkComponent,
    ErrorHandlingChildComponent,
  ],
  template: `
    <div class="container pt-5">
      <header class="rxa-demo-header">
        <div>
          <h2>Error Handling</h2>
          <p class="rxa-demo-subtitle">
            Compare how <code>*rxFor</code> and <code>*ngFor</code> behave when
            a child view throws while rendering.
          </p>
        </div>
        <rxa-docs-link
          docs="template/rx-for-directive"
          source="apps/demos/src/app/features/template/rx-for"
        />
      </header>

      <div class="rxa-demo-toolbar">
        <section class="rxa-demo-group rxa-demo-group--wide">
          <span class="rxa-demo-label">Data</span>
          <rxa-array-provider
            [unpatched]="[]"
            [buttons]="true"
            #arrayP="rxaArrayProvider"
          ></rxa-array-provider>
        </section>
      </div>

      <div class="rxa-demo-columns">
        <div>
          <h3 class="rxa-demo-section-title">*rxFor</h3>
          <div class="d-flex flex-wrap">
            <rxa-error-handling-child
              *rxFor="
                let child of arrayP.array$;
                let i = index;
                trackBy: trackItem
              "
              [index]="i"
            ></rxa-error-handling-child>
          </div>
        </div>
        <div>
          <h3 class="rxa-demo-section-title">*ngFor</h3>
          <div class="d-flex flex-wrap">
            @for (
              child of arrayP.array$ | async;
              track trackItem(i, child);
              let i = $index
            ) {
              <rxa-error-handling-child [index]="i"></rxa-error-handling-child>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [],
})
export class ErrorHandlingParentComponent {
  trackItem = (i: number, item: any) => item.id;
}
