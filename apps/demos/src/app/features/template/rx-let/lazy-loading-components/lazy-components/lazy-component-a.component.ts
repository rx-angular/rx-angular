import { ChangeDetectionStrategy, Component } from '@angular/core';

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
