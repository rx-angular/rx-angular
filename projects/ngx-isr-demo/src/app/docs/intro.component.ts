import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-intro',
  template: `
    <div>
      <h1 class="text-4xl font-bold">Introduction</h1>
    </div>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroComponent {}
