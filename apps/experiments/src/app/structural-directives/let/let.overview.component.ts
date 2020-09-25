import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-push-overview',
  template: `
    <h1>Let Directive Overview</h1>
    <div class="cases-overview">
      <app-let-parent01 class="item"></app-let-parent01>
      <app-let-parent02 class="item"></app-let-parent02>
      <app-let-parent03 class="item"></app-let-parent03>
      <app-let-parent11 class="item"></app-let-parent11>
      <app-let-parent12 class="item"></app-let-parent12>
    </div>
  `,
  changeDetection: environment.changeDetection,
})
export class LetOverviewComponent {}
