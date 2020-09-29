import { Component, Input } from '@angular/core';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'rxa-mixed-child01',
  template: `
    <h3>Mixed Setup Child 01</h3>
    <renders></renders><br />
    Passed input binding: {{ value }}
    <!-- -->
  `,
  changeDetection: environment.changeDetection,
})
export class Mix1ChildComponent {
  @Input()
  value;
}
