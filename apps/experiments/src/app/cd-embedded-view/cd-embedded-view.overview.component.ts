import { Component } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-push-overview',
  template: `
    <h1>CD EmbeddedView Overview</h1>
    <div class="cases-overview">
      <app-cd-embedded-view-parent01 class="item">
      </app-cd-embedded-view-parent01>
      <app-cd-embedded-view-parent02 class="item">
      </app-cd-embedded-view-parent02>
      <app-cd-embedded-view-parent03 class="item">
      </app-cd-embedded-view-parent03>
      <app-cd-embedded-view-parent04 class="item">
      </app-cd-embedded-view-parent04>
      <app-cd-embedded-view-parent05 class="item">
      </app-cd-embedded-view-parent05>
      <app-cd-embedded-view-parent06 class="item">
      </app-cd-embedded-view-parent06>
    </div>
  `,
  changeDetection: environment.changeDetection,
})
export class CdEmbeddedViewOverviewComponent {}
