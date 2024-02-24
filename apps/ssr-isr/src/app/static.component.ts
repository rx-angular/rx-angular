import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-static',
  template: `
    <div>
      <h1>Static</h1>
      <p>Static page</p>
    </div>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaticComponent {}
