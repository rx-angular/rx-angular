import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'rxa-push-overview',
  template: `
    <h1>CD EmbeddedView Overview</h1>
    <div class="cases-overview">
      <rxa-cd-embedded-view-parent01 class="item">
      </rxa-cd-embedded-view-parent01>
      <rxa-cd-embedded-view-parent02 class="item">
      </rxa-cd-embedded-view-parent02>
      <rxa-cd-embedded-view-parent03 class="item">
      </rxa-cd-embedded-view-parent03>
      <rxa-cd-embedded-view-parent04 class="item">
      </rxa-cd-embedded-view-parent04>
      <rxa-cd-embedded-view-parent05 class="item">
      </rxa-cd-embedded-view-parent05>
      <rxa-cd-embedded-view-parent06 class="item">
      </rxa-cd-embedded-view-parent06>
    </div>
  `,
  changeDetection: environment.changeDetection,
})
export class CdEmbeddedViewOverviewComponent {}
