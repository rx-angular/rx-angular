import { Component } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-for-poc-overview',
  template: `
    <h1>CD EmbeddedView Overview</h1>
    <div class="cases-overview">
      <app-for-poc-basic-parent class="item">
      </app-for-poc-basic-parent>
      <app-for-poc-advanced-parent class="item">
      </app-for-poc-advanced-parent>
    </div>
  `,
  changeDetection: environment.changeDetection,
})
export class ForPocOverviewComponent {}
