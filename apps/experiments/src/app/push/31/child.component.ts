import { Component, Input, TemplateRef } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BaseComponent } from '../../base.component.ts/base.component';
@Component({
  selector: 'app-insertion',
  template: `
    <h3>Push Pipe Child 31</h3>
    <span>render: </span><b class="num-renders">{{ getNumOfRenderings() }}</b
    ><br />
    Value: <ng-container [ngTemplateOutlet]="template"></ng-container>
  `,
  changeDetection: environment.changeDetection,
})
export class Child31Component extends BaseComponent {
  @Input() template: TemplateRef<any>;
}
