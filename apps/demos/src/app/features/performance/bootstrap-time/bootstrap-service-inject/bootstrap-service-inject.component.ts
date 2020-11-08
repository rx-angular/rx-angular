import { Component, ChangeDetectionStrategy } from '@angular/core';
import { EmptyService } from '../services/empty.service';

@Component({
  selector: 'rxa-bootstrap-service-inject',
  template: `<p>{{ service.text }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EmptyService],
})
export class BootstrapServiceInjectComponent {
  constructor(public service: EmptyService) {
    service.text = 'Injecting service';
  }
}
