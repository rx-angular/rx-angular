import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-docs-layout',
  template: `
    <div class="h-full mx-auto bg-white 2xl:max-w-7xl dark:bg-tuna">
      <router-outlet></router-outlet>
    </div>
  `,
  standalone: true,
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DocsLayoutComponent {}
