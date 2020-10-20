import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rxa-lazy-component-b',
  template: `
    <h3>Lazy Component B</h3>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazyComponentBComponent {

  constructor() {
  }
}

export const component = LazyComponentBComponent;
