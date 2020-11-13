import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
} from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'rxa-bootstrap-let-directive',
  template: `<p *rxLet="text$; let text">{{ text }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BootstrapLetDirectiveComponent implements AfterViewInit {
  text$;
  constructor() {
    this.text$ = of('Let directive value');

    performance.mark('Let Component Bootstrap');
  }

  ngAfterViewInit() {
    performance.mark('Let Component Ready');
    performance.measure(
      '#letDirective',
      'Let Component Bootstrap',
      'Let Component Ready'
    );
  }
}
