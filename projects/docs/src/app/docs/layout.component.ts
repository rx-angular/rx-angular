import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-docs-layout',
  template: `
    <div
      class="h-full mx-auto bg-white 2xl:max-w-7xl dark:bg-tuna text-center mt-20"
    >
      <div class="mb-10">Cooming soon...</div>

      <a routerLink="/" class="text-blue-500 text-xl mt-[200px]">Go home</a>
      <!-- <router-outlet></router-outlet> -->
    </div>
  `,
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DocsLayoutComponent {}
