import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RxLet } from '@rx-angular/template/let';
import { placeholderImg } from '../../../shared/debug-helper/value-provider';

import { schedulingHelper } from '../../../shared/debug-helper/value-provider/scheduling-helper';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer';
import { DocsLinkComponent } from '../../../shared/docs-link';
import { ValueProviderComponent } from '../../../shared/debug-helper/value-provider/value-provider/value-provider.component';

@Component({
  selector: 'rxa-ngif-hack',
  standalone: true,
  imports: [RxLet, ValueProviderComponent, VisualizerModule, DocsLinkComponent],
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <header class="rxa-demo-header">
          <div>
            <h2>*rxLet — Preloading Images</h2>
            <p class="rxa-demo-subtitle">
              Show a placeholder via the <code>suspense</code> template while
              the next image URL resolves.
            </p>
          </div>
          <rxa-docs-link
            docs="template/rx-let-directive"
            source="apps/demos/src/app/features/template/rx-let"
          />
        </header>

        <div class="rxa-demo-toolbar">
          <section class="rxa-demo-group">
            <span class="rxa-demo-label">Actions</span>
            <div class="rxa-demo-controls">
              <button
                class="btn btn-outline-primary btn-sm"
                (click)="sh.tick(1, [500, 0])"
              >
                Delayed
              </button>
            </div>
          </section>
          <section class="rxa-demo-group rxa-demo-group--wide">
            <span class="rxa-demo-label">Data</span>
            <rxa-value-provider
              [changes$]="sh.ticks$"
              [buttons]="true"
              (resetState)="reset()"
              #valP="rxaValueProvider"
            ></rxa-value-provider>
          </section>
        </div>
      </div>
      <img [src]="url" *rxLet="valP.imgUrl$; let url; suspense: sV" />
      <ng-template #sV><img [src]="placeholder" /></ng-template>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreloadingImagesComponent {
  private domSanitizer = inject(DomSanitizer);

  sh = schedulingHelper();
  placeholder = this.domSanitizer.bypassSecurityTrustUrl(placeholderImg);

  reset() {
    this.sh = schedulingHelper();
  }
}
