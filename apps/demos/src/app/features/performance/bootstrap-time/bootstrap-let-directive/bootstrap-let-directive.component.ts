import { Component, ChangeDetectionStrategy } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'rxa-bootstrap-let-directive',
  template: `<p *rxLet="text$; let text">{{ text }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BootstrapLetDirectiveComponent {
  text$;
  constructor() {
    this.text$ = of('Let directive value');
  }
}
