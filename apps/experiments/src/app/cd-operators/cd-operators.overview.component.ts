import { Component } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-push-overview',
  template: `
    <h1>CD Operators Overview</h1>
    <div class="cases-overview">
      <app-cd-operators-parent01 class="item"></app-cd-operators-parent01>
    </div>
  `,
  changeDetection: environment.changeDetection,
})
export class CdOperatorsOverviewComponent {}
