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
    performance.mark('#injectServiceBootstrap');
  }

  ngAfterViewInit() {
    performance.mark('#injectServiceReady');
  }
}
