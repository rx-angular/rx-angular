import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'rxa-bootstrap-pure',
  template: `<p>{{ text }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BootstrapPureComponent {
  text;
  constructor() {
    this.text = 'No service';
  }
}
