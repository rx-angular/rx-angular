import { Component, Input } from '@angular/core';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'rxa-mixed-child02',
  template: `
    <h3>Mixed Setup Child 02</h3>
    <rxa-dirty-check></rxa-dirty-check><br/>: strategy<br/>
    Passed input binding: {{ value }}
    <!-- -->
  `,
  changeDetection: environment.changeDetection,
})
export class Mix2ChildComponent {
  @Input()
  value;
}
