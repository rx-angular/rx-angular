import { Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BaseComponent } from '../../base.component.ts/base.component';

@Component({
  selector: 'app-mixed-child01',
  template: `
    <h3>Mixed Setup Child 01</h3>
    <span>render: </span><b class="num-renders">{{ getNumOfRenderings() }}</b
    ><br />
    Passed input binding: {{ value }}
    <!-- -->
  `,
  changeDetection: environment.changeDetection,
})
export class Child01Component extends BaseComponent {
  @Input()
  value;
}
