import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { BaseComponent } from '../base.component.ts/base.component';

@Component({
  selector: 'app-cd-overview',
  template: `
    <h1>ChangeDetection Overview</h1>
    <span>render: </span><b class="num-renders">{{ getNumOfRenderings() }}</b
    ><br />
    <div class="cases-overview">
      <app-cd-parent01 class="item"></app-cd-parent01>
      <app-cd-parent02 class="item"></app-cd-parent02>
      <app-cd-parent03 class="item"></app-cd-parent03>
      <app-cd-parent04 class="item"></app-cd-parent04>
      <app-cd-parent05 class="item"></app-cd-parent05>
      <app-cd-parent06 class="item"></app-cd-parent06>
      <app-cd-parent11 class="item"></app-cd-parent11>
      <app-cd-parent12 class="item"></app-cd-parent12>
      <app-cd-parent13 class="item"></app-cd-parent13>
    </div>
  `,
  changeDetection: environment.changeDetection,
})
export class CdOverviewComponent extends BaseComponent {}
