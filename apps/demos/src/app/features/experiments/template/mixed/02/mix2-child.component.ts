import { Component, Input } from '@angular/core';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'rxa-mixed-child02',
  template: `
    <h3>Mixed Setup Child 02</h3>
    <renders></renders><br />: strategy<br />
    Passed input binding: {{ value }}
    <!-- -->
  `,
  changeDetection: environment.changeDetection,
})
export class Mix2ChildComponent {
  @Input()
  value;
}
