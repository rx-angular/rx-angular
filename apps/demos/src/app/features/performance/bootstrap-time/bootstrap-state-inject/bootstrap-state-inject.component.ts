import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
} from '@angular/core';
import { RxState } from '@rx-angular/state';

@Component({
  selector: 'rxa-bootstrap-state-inject',
  template: `<p>{{ state.get('text') }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class BootstrapStateInjectComponent implements AfterViewInit {
  constructor(public state: RxState<any>) {
    this.state.set({
      text: 'Injecting RxState',
    });
    performance.mark('InjectState Component Bootstrap');
  }

  ngAfterViewInit() {
    performance.mark('InjectState Component Ready');
    performance.measure(
      '#injectState',
      'InjectState Component Bootstrap',
      'InjectState Component Ready'
    );
  }
}
