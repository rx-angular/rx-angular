import { Component, ChangeDetectionStrategy } from '@angular/core';
import { EmptyService } from '../services/empty.service';

@Component({
  selector: 'rxa-bootstrap-service-extend',
  template: `<p>{{ text }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BootstrapServiceExtendComponent extends EmptyService {
  constructor() {
    super();
    this.text = 'Extending service';
  }
}
