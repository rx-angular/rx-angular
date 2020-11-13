import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
} from '@angular/core';
import { EmptyService } from '../services/empty.service';

@Component({
  selector: 'rxa-bootstrap-service-extend',
  template: `<p>{{ text }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BootstrapServiceExtendComponent
  extends EmptyService
  implements AfterViewInit {
  constructor() {
    super();
    this.text = 'Extending service';

    performance.mark('ExtendService Component Bootstrap');
  }

  ngAfterViewInit() {
    performance.mark('ExtendService Component Ready');
    performance.measure(
      '#extendService',
      'ExtendService Component Bootstrap',
      'ExtendService Component Ready'
    );
  }
}
