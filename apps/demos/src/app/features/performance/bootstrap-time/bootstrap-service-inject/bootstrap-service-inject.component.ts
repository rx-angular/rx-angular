import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
} from '@angular/core';
import { EmptyService } from '../services/empty.service';

@Component({
  selector: 'rxa-bootstrap-service-inject',
  template: `<p>{{ service.text }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EmptyService],
})
export class BootstrapServiceInjectComponent implements AfterViewInit {
  constructor(public service: EmptyService) {
    service.text = 'Injecting service';
    performance.mark('InjectService Component Bootstrap');
  }

  ngAfterViewInit() {
    performance.mark('InjectService Component Ready');
    performance.measure(
      '#injectService',
      'InjectService Component Bootstrap',
      'InjectService Component Ready'
    );
  }
}
