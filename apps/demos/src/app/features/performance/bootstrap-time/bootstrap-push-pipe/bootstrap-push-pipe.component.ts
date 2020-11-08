import { Component, ChangeDetectionStrategy } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'rxa-bootstrap-push-pipe',
  template: `<p>{{ text$ | push }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BootstrapPushPipeComponent {
  text$;
  constructor() {
    this.text$ = of('Push pipe value');
  }
}
