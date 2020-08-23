import { Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BaseComponent } from '../../base.component.ts/base.component';

@Component({
  selector: 'app-mixed-child02',
  template: `
    <h3>Mixed Setup Child 02</h3>
    <span>render: </span><b class="num-renders">{{ getNumOfRenderings() }}</b
    ><br />: strategy<br />
    Passed input binding: {{ value }}
    <!-- -->
  `,
  changeDetection: environment.changeDetection,
})
export class Child02Component extends BaseComponent {
  @Input()
  value;
}
