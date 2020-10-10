import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core';
import { LazyComponentBComponent } from './lazy-component-b.component';

@Component({
  selector: 'rxa-lazy-component-a',
  template: `
    <h3>Lazy Component A</h3>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazyComponentAComponent {

  constructor() {
  }
}

export const component = LazyComponentAComponent;
