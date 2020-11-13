import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
} from '@angular/core';
import { RxState } from '@rx-angular/state';

@Component({
  selector: 'rxa-bootstrap-state-extend',
  template: `<p>{{ get('text') }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class BootstrapStateExtendComponent
  extends RxState<any>
  implements AfterViewInit {
  constructor() {
    super();
    this.set({
      text: 'Extending RxState',
    });
    performance.mark('ExtendState Component Bootstrap');
  }

  ngAfterViewInit() {
    performance.mark('ExtendState Component Ready');
    performance.measure(
      '#extendState',
      'ExtendState Component Bootstrap',
      'ExtendState Component Ready'
    );
  }
}
